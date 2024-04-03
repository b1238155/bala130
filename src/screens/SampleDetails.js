import { useForm } from "react-hook-form";
import { useAppState } from "../state";
import { Button, Field, Form, Input } from "../Forms";
import React, {useState,useEffect } from "react";

import { Row, Col, Card } from "react-bootstrap";
import "./Styles.css";
import { MdOutlineDelete } from "react-icons/md";
import { BiRightArrowAlt, BiLeftArrowAlt } from "react-icons/bi";
import { useDispatch,useSelector } from 'react-redux';
import { changeSampleDetails } from '../redux/FormSlice';
import Spinner from "../Forms/Spinner"; 
export default function SampleDetails({ onButtonClick }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptioncheck, setSelectedOptioncheck] = useState([]);
const [isOthersChecked, setIsOthersChecked] = useState(false);
  const [selectedOptioncheck1, setSelectedOptioncheck1] = useState(false);
  const [otherValue, setOtherValue] = useState('');
  const [sampleTypeOther, setSampleTypeOther] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [names, setNames] = useState([]);
  const dispatch = useDispatch();
  const [state, setState] = useAppState();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: state });
  const [selectedFileNames, setSelectedFileNames] = useState([]);
  const token = useSelector((state) => state.form.usertoken.token);
  const updatedFilenames = names.map(filename => filename.replace(/^\d+_/g, ''));
  const handlecheckboxchange = (event) => {
    const value = event.target.value;
    if (value === "Others") {
      setIsOthersChecked(!isOthersChecked);
    } else if (value === "MSDS") {
      setSelectedOptioncheck1(!selectedOptioncheck1);
    } else {
      setSelectedOptioncheck((prevSelectedOptioncheck) => {
        if (prevSelectedOptioncheck.includes(value)) {
          return prevSelectedOptioncheck.filter((item) => item !== value);
        } else {
          return [...prevSelectedOptioncheck, value];
        }
      });
    }
  };
  
  useEffect(() => {
    const initialNatureOfSample = state.natureofsample || null;
    setSelectedOption(initialNatureOfSample);
    const initialSampleType = state.sampletype || [];
    setSelectedOptioncheck(initialSampleType.filter(item => item !== "Others"));
    setIsOthersChecked(initialSampleType.includes("Others"));
    setSelectedOptioncheck1(initialSampleType.includes("MSDS"));
    if (initialNatureOfSample === "Others") {
      const initialSampleName = state.othersample || '';
      setOtherValue(initialSampleName);
      // Set the value of "otherValue" in react-hook-form
      setValue("othersample", initialSampleName);
    }
    if (initialSampleType.includes("Others")) {
      const initialSample = state.othercheck || '';
      setSampleTypeOther(initialSample);
      // Set the value of "otherValue" in react-hook-form
      setValue("othercheck", initialSample);
    }
  }, [state.natureofsample, state.sampletype]);

   const handlemsdschange = () => {
    setSelectedOptioncheck1(!selectedOptioncheck1);;
    };
    const handleInputChange = (event) => {
      const inputValue = event.target.value;
      setOtherValue(inputValue);
      
      // Update the value of the "samplename" field in react-hook-form
      setValue("othersample", inputValue);
    };
    const handleFileChange = (event) => {
      const files = Array.from(event.target.files);
      const validFiles = files.filter((file) => file instanceof File && file.size > 0);
    
      // Rename and add the files to selectedFileNames using the refNo
      const renamedFiles = validFiles.map((file) => {
        const epoch = "" + Date.now();
        const refNo = epoch.substring(0, 10);
        const newName = `${refNo}_${file.name}`;
        return new File([file], newName);
      });
    
      setSelectedFileNames((prevSelectedFiles) => [...prevSelectedFiles, ...renamedFiles]);
    
      const extractedNames = renamedFiles.map((file) => file.name);
      setNames((prevNames) => [...prevNames, ...extractedNames]);
    };
  
    useEffect(() => {
      // Retrieving the names from localStorage
      setNames(selectedFileNames.map(obj => obj.name));
      const storedNames =sessionStorage.getItem("mnames");
      if(storedNames){
        setNames(JSON.parse(storedNames));
      }
    },[])
    console.log("files",names)
    const handleRemoveFile = (indexToRemove) => {
      const updatedSelectedFilenames = selectedFileNames.filter(
        (files) => files !== indexToRemove
      );
      setSelectedFileNames(updatedSelectedFilenames);
  
      // Remove the corresponding name from namesArray
      const updatedNames = names.filter(
        (name) => name !== indexToRemove
      );
      setNames(updatedNames);
     
    };
    const handleRadioChange = (event) => {
      const selectedValue = event.target.value;
      setSelectedOption(selectedValue);
      
      // When a radio option other than "Others" is selected, clear the "otherValue" and react-hook-form field
      if (selectedValue !== "Others") {
        setOtherValue('');
        setValue("othersample", '');
      }
    };
    let concatenatedElements=[]
  const saveData = async(data) => {
    
   concatenatedElements =[data.sampletype + "," + "(" + sampleTypeOther +")" ];
  //  if (selectedOptioncheck1) {
  //   concatenatedElements.push("MSDS");
  // }
    console.log("sampleType" ,concatenatedElements)
    setIsLoading(true); 
    const formData = new FormData();
    selectedFileNames.forEach((file, index) => {
      formData.append(`file${index}`, file);
    });

    try {
      const response = await fetch('http://54.167.30.227:3000/api/container/sroDoc/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': token,
        },
      });
  
      if (response.ok) {
        // Handle successful upload
        console.log('File uploaded successfully');
      } else {
        // Handle upload error
        console.error('File upload failed');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
    setIsLoading(false);
    if (data.natureofsample !== "Others") {
      data.othersample = ""; // Reset the value if it's not "Others"
    }
    setState({ ...state, ...data });
    dispatch(changeSampleDetails(
      {
     
natureofsample:`${data.natureofsample} (${data.othersample})`,
report:data.report,
samplename:data.samplename,
sampletype:concatenatedElements,
sampleretension:data.sampleretension,
storage:data.storage,
submissiontype:data.submissiontype,
msdsAttached:names
      })
    )
    sessionStorage.setItem('mnames', JSON.stringify(names));
    onButtonClick("BatchDetails");
  };

  return (
    <div>
      <div>
        <div>
          <div>
            <Card className="maincards">
              <div className="cardtitle">
                <text className="cardtitlehed">Sample Details</text>
              </div>
              <Form onSubmit={handleSubmit(saveData)}>
                <fieldset>
                <div className="cardcolumnpadding">
                  <div  className="cardcolhed mb-4"> <label> Name of the Sample</label></div>
                  <Field>
                    <Input {...register("samplename")} id="samplename"  className="form-control1" />
                  </Field>
                  <hr />
                  <div className="">
                    <Row>
                      <Col>
                        <div
                          className="cardcolhed mb-4"
                          style={{ }}
                        >
                          <Field label=" Report required as per Form-39">
                            <text className="cardcolhedstar">*</text>
                          </Field>
                          <div
                            style={{
                              //flexDirection: "row",
                              justifyContent: "space-between",
                              display: "flex",
                              //alignItems: "center",
                              //marginTop: "5px",

                              fontSize: "12px",
                              fontWeight: 400,
                            }}
                          >
                            <div className="col">
                              <span

                                  style={{
                                    flexDirection:'row',
                                    display:'flex',}}
                              ><div>
                                <Field>
                                  <Input
                                    {...register("report", { required: true })}
                                    type="radio"
                                    id="Yes"
                                    value="Yes"
                                    name="report"
                                    // checked={selectedOption === "option1"}
                                    //onChange={handleChange}
                                    className="customRadio"
                                  />
                                </Field>
                                </div>
                                <div>
                                <label className="space">Yes</label>
                                </div>
                              </span>
                              </div>
                              <div className="col">
                              <span  style={{
                                flexDirection:'row',
                                display:'flex',}}>
                                  <div>
                                <Field>
                                  <Input
                                    {...register("report", { required: true })}
                                    type="radio"
                                    id="No"
                                    value="No"
                                    name="report"
                                    // checked={selectedOption === "option2"}
                                    //onChange={handleChange}
                                    className="customRadio"
                                  />
                                </Field>
                                </div>
                                <div>
                                <label className="space">No</label>
                                </div>
                              </span>
                              </div>
                              <div className="col">
                              <span  style={{
                                flexDirection:'row',
                                display:'flex'}}>
                                  <div>
                                <Field>
                                  <Input
                                    {...register("report", { required: true })}
                                    type="radio"
                                    id="Local FDA(DCA)"
                                    value="Local FDA(DCA)"
                                    name="report"
                                    // checked={selectedOption === "option2"}
                                    //onChange={handleChange}
                                    className="customRadio"
                                  />
                                </Field>
                                </div>
                                <div>
                                <label className="space">Local FDA(DCA)</label>
                                </div>
                              </span>
                              </div>
                            </div>
                          

                          <div className="text-danger mt-3">
                            {errors.report?.type === "required" &&
                              "This field is required."}
                          </div>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div
                          className="cardcolhed mb-4"
                          style={{ }}
                        >
                          <Field label="Storage Condition">
                            <text className="cardcolhedstar">*</text>
                          </Field>
                          <div
                            style={{
                             // flexDirection: "row",
                              justifyContent: "space-between",
                              display: "flex",
                              marginTop: "5px",
                              fontSize: "12px",
                              fontWeight: 400,
                            }}
                          >
                            <div className="col">
                              <span  style={{
                                flexDirection:'row',
                                display:'flex'}}>
                                  <div>
                                <Field>
                                  <Input
                                    {...register("storage", { required: true })}
                                    type="radio"
                                    name="storage"
                                    value="Ambient/RT"
                                    // checked={selectedOption3 === "option13"}
                                    //onChange={handleChange}
                                    className="customRadio"
                                    id="Ambient/RT"
                                  />
                                </Field>
                                </div>
                                <div>
                                <label className="space">Ambient/RT</label>
                                </div>
                              </span>
                            </div>
                            <div className="col">
                              <span style={{
                                flexDirection:'row',
                                display:'flex' }}
                                >
                                  <div>
                                <Field>
                                  <Input
                                    {...register("storage", { required: true })}
                                    type="radio"
                                    name="storage"
                                    id="Freezer (-20°C)"
                                    value="Freezer (-20°C)"
                                    // checked={selectedOption3 === "option14"}
                                    //onChange={handleChange}
                                    className="customRadio"
                                  />
                                </Field>
                                </div>
                                <div>
                                <label className="space">Freezer (-20°C)</label>
                                </div>
                              </span>
                            </div>
                            <div className="">
                              <span  style={{
                                flexDirection:'row',
                                display:'flex' }}>
                                  <div>
                                <Field>
                                  <Input
                                    {...register("storage", { required: true })}
                                    type="radio"
                                    id="Refrigerator (2-8°C)"
                                    value="Refrigerator (2-8°C)"
                                    name="storage"
                                    // checked={selectedOption3 === "option15"}
                                    // onChange={handleChange}
                                    className="customRadio"
                                  />
                                </Field>
                                </div>
                                <div>
                                <label className="space">
                                Refrigerator (2-8°C)
                              </label>
                              </div>
                              </span>
                            </div>
                          </div>
                          <div className="text-danger mt-3">
                            {errors.storage?.type === "required" &&
                              "This field is required."}
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col md={6}>
                        <div>
                        <div
                          className="cardcolhed mb-4"
                          style={{ }}
                        >
                          <Field label="Nature of Sample">
                            <text className="cardcolhedstar">*</text>
                          </Field>
                          <div>
                          <div
                            style={{
                              //flexDirection: "row",
                              justifyContent: "space-between",
                              display: "flex",
                              //alignItems: "center",
                              marginTop: "5px",

                              fontSize: "12px",
                              fontWeight: 400,
                            }}
                          >
                            <div className="col">
                              <span
                                style={{
                                  //alignItems: "center",
                                  display: "flex",
                                }}
                              >
                                <div>
                                <Field>
                                  <Input
                                    {...register("natureofsample", {
                                      required: true,
                                    })}
                                    type="radio"
                                    id="RM"
                                    name="natureofsample"
                                    value="RM"
                                    checked={selectedOption === "RM"}
                                    onChange={() =>
                                      setSelectedOption("RM")
                                    }
                                    //checked={selectedOption1 === "option4"}
                                    //onChange={handleChange}
                                    className="customRadio"
                                  />
                                </Field>
                                </div>
                                <div>
                                <label className="space">RM</label>
                                </div>
                              </span>
                            </div>

                            <div className="col">
                              <span style={{ display: "flex" }}>
                                <div>
                                <Field>
                                  <Input
                                    {...register("natureofsample", {
                                      required: true,
                                    })}
                                    type="radio"
                                    id="In-Progress"
                                    name="natureofsample"
                                    value="In-Progress"
                                    checked={selectedOption === "In-Progress"}
                                    onChange={() =>
                                      setSelectedOption("In-Progress")
                                    }
                                    //checked={selectedOption1 === "In-Progress"}
                                    //onChange={handleChange}
                                    className="customRadio"
                                  />
                                </Field>
                                </div>
                                <div>
                                <label className="space">In-Progress</label>
                                </div>
                              </span>
                            </div>
                            <div className="col">
                              <span style={{ display: "flex" }}>
                                <div>
                                <Field>
                                  <Input
                                    {...register("natureofsample", {
                                      required: true,
                                    })}
                                    type="radio"
                                    id="Intermediate"
                                    name="natureofsample"
                                    value="Intermediate"
                                    checked={selectedOption === "Intermediate"}
                                    onChange={() =>
                                      setSelectedOption("Intermediate")
                                    }
                                    //checked={selectedOption1 === "option6"}
                                    //onChange={handleChange}
                                    className="customRadio"
                                  />
                                </Field>
                                </div>
                                <div>
                                <label className="space">Intermediate</label>
                                </div>
                              </span>
                            </div>
                          </div>
                      

                        <div
                          className="cardcolhed mt-4"
                          style={{ display: "block" }}
                        >
                          <div
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              display: "flex",
                              marginBottom:'5px',
                              fontSize: "12px",
                              fontWeight: 400,
                            }}
                          >
                            <div className="col">
                              <span style={{ display: "flex" }}>
                                <div>
                                <Field>
                                  <Input
                                    {...register("natureofsample", {
                                      required: true,
                                    })}
                                    type="radio"
                                    id="API"
                                    name="natureofsample"
                                    value="API"
                                    checked={selectedOption === "API"}
                                    onChange={() =>
                                      setSelectedOption("API")
                                    }
                                    //checked={selectedOption1 === "option7"}
                                    //onChange={handleChange}
                                    className="customRadio"
                                  />
                                </Field>
                                </div>
                                <div>
                                <label className="space">API</label>
                                </div>
                              </span>
                            </div>
                            <div className="col">
                              <span style={{ display: "flex" }}>
                                <div>
                                <Field>
                                  <Input
                                    {...register("natureofsample", {
                                      required: true,
                                    })}
                                    type="radio"
                                    id="Excipient"
                                    name="natureofsample"
                                    value="Excipient"
                                    checked={selectedOption === "Excipient"}
                                    onChange={() =>
                                      setSelectedOption("Excipient")
                                    }
                                    //checked={selectedOption1 === "option8"}
                                    // onChange={handleChange}
                                    className="customRadio"
                                  />
                                </Field>
                                </div>
                                <div>
                                <label className="space">Excipient</label>
                                </div>
                              </span>
                            </div>
                            <div className="col">
                              <span style={{ display: "flex" }}>
                                <div>
                                <Field>
                                  <Input
                                    {...register("natureofsample", {
                                      required: true,
                                    })}
                                    type="radio"
                                    id="Drug Product"
                                    name="natureofsample"
                                    value="Drug Product"
                                    checked={selectedOption === "Drug Product"}
                                    onChange={() =>
                                      setSelectedOption("Drug Product")
                                    }
                                    //checked={selectedOption1 === "option9"}
                                    //onChange={handleChange}
                                    //checked={!showTextBox}
                                    //onChange={handleRadioChange}
                                    className="customRadio"
                                  />
                                </Field>
                                </div>
                                <div>
                                <label className="space">Drug Product</label>
                                </div>
                              </span>
                            </div>
                          </div>
                        </div>

                        <div
                          className="cardcolhed mt-4"
                          style={{ display: "block" }}
                        >
                          <div
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              display: "flex",
                              fontSize: "12px",
                              fontWeight: 400,
                            }}
                          >
                            <div className="col">
                              <span style={{ display: "flex" }}>
                                <div>
                                <Field>
                                  <Input
                                    {...register("natureofsample", {
                                      required: true,
                                    })}
                                    type="radio"
                                    id="Others"
                                    name="natureofsample"
                                    value="Others"
                                    checked={selectedOption === "Others"}
                                    onChange={handleRadioChange}
                                    
                                    //checked={selectedOption1 === "option10"}
                                    //checked={showTextBox}
                                    //onChange={handleRadioChange}
                                    className="customRadio"
                                  />
                                </Field>
                                </div>
                                <div>
                                <label className="space">Others</label>
                                </div>
                              </span>
                            </div>

                            <div className="col">
                              <span>
                                {selectedOption === "Others" && (
                                  <Field>
                                  <Input
                                  {...register("othersample")}
                                  
                                    type="text"
                                    className="NatureOfSample"
                                    onChange={handleInputChange}
                                    value={otherValue}
                                  />
                                  </Field>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                        </div>
                        <div className="text-danger mt-3">
                            {errors.natureofsample?.type === "required" &&
                              "This field is required."}
                          </div>
                        </div>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div>
                        <div
                          className="cardcolhed mb-4"
                          style={{ display: "block" }}
                        >
                          <Field label="Sample Type">
                            <text className="cardcolhedstar">*</text>
                          </Field>
                          <div
                            style={{
                              //flexDirection: "row",
                              justifyContent: "space-between",
                              display: "flex",
                              alignItems: "center",
                              marginTop: "5px",
                              fontSize: "12px",
                              fontWeight: 400,
                            }}
                          >
                            <div className="col">
                              <span
                                style={{
                                //  alignItems: "center",
                                  display: "flex",
                                }}
                              >
                                <div>
                                <Field>
                                  <Input
                                    {...register("sampletype", {
                                      required: true,
                                    })}
                                    type="checkbox"
                                
                                    name="sampletype"
                                    value="Hygroscopic"
                                   // id="hygroscopic"
                                    checked={selectedOptioncheck.includes("Hygroscopic")}
                                    onChange={handlecheckboxchange }
                                   
                                    className="customRadio"
                                  />
                                </Field>
                                </div>
                                <div>
                                <label className="space">Hygroscopic</label>
                                </div>
                              </span>
                            </div>
                            <div className="col">
                              <span style={{ display: "flex" }}>
                                <div>
                                <Field>
                                  <Input
                                    {...register("sampletype", {
                                      required: true,
                                    })}
                                    type="checkbox"
                                     value="Lightsensitive"
                                    name="sampletype"
                                  
                                   // id="lightsensitive"
                                    checked={selectedOptioncheck.includes("Lightsensitive")}
                                     onChange={handlecheckboxchange }
                                  
                                    className="customRadio"
                                  />
                                </Field>
                                </div>
                                <div>
                                <label className="space">Light Sensitive</label>
                                </div>
                              </span>
                            </div>
                            <div className="col">
                              <span style={{ display: "flex" }}>
                                <div>
                                <Field>
                                  <Input
                                    {...register("sampletype", {
                                      required: true,
                                    })}
                                    type="checkbox"
                  
                                    name="sampletype"
                                    value="Non-Hazardous"
                                    //id="non-hazardous"
                                   checked={selectedOptioncheck.includes("Non-Hazardous")}
                                    onChange={handlecheckboxchange}
                                   
                                    className="customRadio"
                                  />
                                </Field>
                                </div>
                                <div>
                                <label className="space">Non-Hazardous</label>
                                </div>
                              </span>
                            </div>
                          </div>
</div>
                          <div
                            className="cardcolhed mb-4"
                            style={{ display: "block" }}
                          >
                            <div
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                display: "flex",

                                fontSize: "12px",
                                fontWeight: 400,
                              }}
                            >
                              <div className="col">
                                <span style={{ display: "flex" }}>
                                  <div>
                                  <Field>
                                    <input
                                      {...register("sampletype", {
                                        required: true,
                                      })}
                                      type="checkbox"
                                      name="sampletype"
                                      value="Hazardous"
                                      //id="hazardous"
                                      checked={ selectedOptioncheck.includes("Hazardous") }
                                      onChange={handlecheckboxchange}
                                     
                                      className="customRadio"
                                    />
                                  </Field>
                                  </div>
                                  <div>
                                  <label className="space">Hazardous</label>
                                  </div>
                                </span>
                              </div>
                              <div className="col">
                                <span style={{ display: "flex" }}>
                                  <div>
                                  <Field>
                                    <Input
                                      {...register("sampletype", {
                                        required: true,
                                      })}
                                      type="checkbox"
                                    
                                      name="sampletype"
                                      value="Others"
                                      //id="others"
                                      checked={isOthersChecked}
                                      onChange={handlecheckboxchange}
                                      
                                      className="customRadio"
                                    />
                                  </Field>
                                  </div>
                                  <div>
                                  <label className="space">Others</label>
                                  </div>
                                </span>
                              </div>
                              <div className="col">
                                <span>
                                  {isOthersChecked  && (
                                    <Field>
                                    <Input
                                    {...register("othercheck")}
                                    type="text"
                                    name="othercheck"
                                    value={sampleTypeOther}
                                      className="NatureOfSample"
                                      //value="sampletype"
                                      id="othercheck"
                                      onChange={(e) =>{setSampleTypeOther(e.target.value);
                                      setValue("othercheck", e.target.value);
        }}
                                    />
                                    </Field>
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div
                            className="cardcolhed mb-4"
                            style={{ display: "block" }}
                          >
                            <div
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                display: "flex",
                                fontSize: "12px",
                                fontWeight: 400,
                              }}
                            ><div className="col">
                            <span style={{ display: "flex" }}>
                              <div>
                              <Field>
                                <Input
                                  {...register("sampletype", {
                                    required: true,
                                  })}
                                  type="checkbox"
                                  //id="msds"
                                  name="sampleType"
                                  value="MSDS"
                                  checked={selectedOptioncheck1}
                                  onChange={handlecheckboxchange}
                                  className="customRadio"
                                />
                              </Field>
                              </div>
                              <div>
                              <label className="space">MSDS Attached</label>
                              </div>
                            </span>
                          </div>

                          <div className="col">
                          
                              <span>
                              {selectedOptioncheck1  && (
                                <Field>
                                <Input
                                 {...register("choosefile")}
                                  type="file"
                                  multiple
                                  name="choosefile"
                          
                                  style={{ width: 170 }}
                                  className="customInput"
                                  onChange={handleFileChange}   
                                />
                                </Field>)}
                                <div>
                                 <label className="customInputLabel">
                        
                        Selected Files: {' '}
            
                                  {names.map(name => (
                                    <li key={name}>
                                      {name}
                                      
                                      <MdOutlineDelete size={20} color="red" onClick={() => handleRemoveFile(name)}/>
                                    </li> 
                                  ))}
                   </label>
                   </div>
                              </span>
                          
                          </div>
                              
                            </div>
                          </div>
                          <div className="text-danger mt-3">
                            {errors.sampletype?.type === "required" &&
                              "This field is required."}
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <hr />

                    <Row>
                      <Col md={6}>
                        <div
                          className="cardcolhed mb-4"
                          style={{ display: "block" }}
                        >
                          <Field label="Sample Retention required(Drug Product/Substance)">
                            <text className="cardcolhedstar">*</text>
                          </Field>
                          <div
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              display: "flex",

                              marginTop: "5px",
                              fontSize: "12px",
                              fontWeight: 400,
                            }}
                          >
                            <div className="col">
                              <span style={{ display: "flex" }}>
                                <div>
                                <Field>
                                  <Input
                                    {...register("sampleretension", {
                                      required: true,
                                    })}
                                    type="radio"
                                    id="Yes"
                                    value="Yes"
                                    //checked={selectedOption2 === "option11"}
                                    // onChange={handleChange}
                                    className="customRadio"
                                  />
                                </Field>
                                </div>
                                <div>
                                <label className="space">Yes</label>
                                </div>
                              </span>
                            </div>
                            <div className="col">
                              <span style={{ display: "flex" }}>
                                <div>
                                <Field>
                                  <Input
                                    {...register("sampleretension", {
                                      required: true,
                                    })}
                                    type="radio"
                                    id="No"
                                    value="No"
                                    //checked={selectedOption2 === "option12"}
                                    //onChange={handleChange}
                                    className="customRadio"
                                  />
                                </Field>
                                </div>
                                <div>
                                <label className="space">No</label>
                                </div>
                              </span>
                            </div>
                           <div className="col">
                            <span style={{ display: "flex" }}>
                            
                              <label className="space"></label>
                            </span>
                          </div>
                          </div>
                          <div className="text-danger mt-3">
                            {errors.sampleretension?.type === "required" &&
                              "This field is required."}
                          </div>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div
                          className="cardcolhed mb-4"
                          style={{ display: "block" }}
                        >
                          <Field label="Type of Submission">
                            <text className="cardcolhedstar">*</text>
                          </Field>
                          <div
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              display: "flex",

                              marginTop: "5px",
                              fontSize: "12px",
                              fontWeight: 400,
                            }}
                          >
                            <div className="col">
                              <span style={{ display: "flex" }}>
                                <div>
                                <Field>
                                  <Input
                                    {...register("submissiontype", {
                                      required: true,
                                    })}
                                    type="radio"
                                    id="Person"
                                    value="Person"
                                    //checked={selectedOption5 === "option22"}
                                    //onChange={handleChange}
                                    className="customRadio"
                                  />
                                </Field>
                                </div>
                                <div>
                                <label className="space">Person</label>
                                </div>
                              </span>
                            </div>
                            <div className="col">
                              <span style={{ display: "flex" }}>
                                <div>
                                <Field>
                                  <Input
                                    {...register("submissiontype", {
                                      required: true,
                                    })}
                                    type="radio"
                                    id="Courier"
                                    value="Courier"
                                    // checked={selectedOption5 === "option23"}
                                    // onChange={handleChange}
                                    className="customRadio"
                                  />
                                </Field>
                                </div>
                                <div>
                                <label className="space">Courier</label>
                                </div>
                              </span>
                            </div>
                            <div className="col">
                              <span style={{ display: "flex" }}>
                                <div>
                                <Field>
                                  <Input
                                    {...register("submissiontype", {
                                      required: true,
                                    })}
                                    type="radio"
                                    id="By Post"
                                    value="By Post"
                                    //checked={selectedOption5 === "option24"}
                                    // onChange={handleChange}
                                    className="customRadio"
                                  />
                                </Field>
                                </div>
                                <div>
                                <label className="space">By Post</label>
                                </div>
                              </span>
                            </div>
                          </div>
                          <div className="text-danger mt-3">
                            {errors.submissiontype?.type === "required" &&
                              "This field is required."}
                          </div>
                        </div>
                      </Col>
                    

                    <hr />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        margin: 10,
                      }}
                    >
                      <Button
                        type="button"
                        className="previous"
                        onClick={() => onButtonClick("CustomerDetailes")}
                      >
                        <BiLeftArrowAlt size={24} />
                        Previous
                      </Button>

                      <Button type="submit" className="next" disabled={isLoading}>
                      {isLoading ? <Spinner /> : "Next"}<BiRightArrowAlt size={24} color="#fff" />
                      </Button>
                    </div>
                    </Row>
                  </div>
                  </div>
                </fieldset>
              
              </Form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
