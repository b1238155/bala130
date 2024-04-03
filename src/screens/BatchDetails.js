/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState,useEffect} from "react";
import "./Styles.css";
import {
  Card,
  Col,
  Row,
  Table,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useAppState } from "../state";
import { BiRightArrowAlt, BiEdit, BiLeftArrowAlt } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { MdOutlineAdd } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch,useSelector } from 'react-redux';
import { changeBatchDetails } from "../redux/FormSlice";
import Select from "react-select";
import { Form } from "../Forms";
import axios from "axios";
export default function BatchDetails({onButtonClick}) {
  const dispatch = useDispatch();
  const token  = useSelector((state) => state.form.usertoken.token);
 const [state, setState] = useAppState();
  const [testData,setTestData]=useState([]);
  const initialInputs = {
    batchNo: "",
    batchSize: "",
    natureOfPacking: "",
    mfgDate: "",
    expDate: "",
    retestDate: "",
    sampleQuantity: "",
    testParameter: [],
  };

const { handleSubmit } = useForm({ defaultValues: state });
const [inputs, setInputs] = useState(initialInputs);
  const [disabletext]=useState(false);
  const [formErrors, setFormErrors] = useState({
    batchNo: "",
    batchSize: "",
    natureOfPacking:"",
    mfgDate:"",
    expDate:"",
    retestDate:"",
    sampleQuantity:"",
    testParameter:"",
  });
  const initialSelectedOptions = [];
  const [isSubmit, setIsSubmit] = useState(false);
  const [tableData, setTableData] = useState([]);
  const tableLimit = 6; 
  const [editClick, setEditClick] = useState(false);
  const [editIndex, setEditIndex] = useState("");
  const [selectedOptions, setSelectedOptions] = useState(initialSelectedOptions);
  const [naMfgDate, setNaMfgDate] = useState(false);
  const [naExpDate, setNaExpDate] = useState(false);
  const [naRetestDate, setNaRetestDate] = useState(false);
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);

  const handleSelectChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
    setInputs({
      batchNo: inputs.batchNo,
       batchSize:inputs.batchSize,
     natureOfPacking:inputs.natureOfPacking,
       mfgDate:inputs.mfgDate,
       expDate:inputs.expDate,
       retestDate:inputs.retestDate,
       sampleQuantity:inputs.sampleQuantity,
    testParameter:selectedOptions,
  });
  setFormErrors({
    ...formErrors,
    selectedOptions: "",
  });
    
  };
  const resetForm = () => {
    setInputs(initialInputs);
    setSelectedOptions(initialSelectedOptions);
    setEditClick(false);
    setEditIndex("");
    setIsSubmit(false);
  };
  
  useEffect(() => {
    // Call the resetForm function when you come back to the page
    resetForm();
  }, []);
  useEffect(() => {
    // const storedTableData = sessionStorage.getItem("tableData");
    // if (storedTableData) {
    //   setTableData(JSON.parse(storedTableData));
    // }
  
    // Check if tableData has at least one item
    if (tableData.length > 0) {
      setIsNextButtonDisabled(false);
    } else {
      setIsNextButtonDisabled(true);
    }
  }, [tableData]);
  
  const handleNaChange = (fieldName) => {
    switch (fieldName) {
      case "mfgDate":
        setNaMfgDate(!naMfgDate);
        break;
      case "expDate":
        setNaExpDate(!naExpDate);
        break;
      case "retestDate":
        setNaRetestDate(!naRetestDate);
        break;
      default:
        break;
    }
  };
  console.log("input" ,inputs);
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Perform date validation for date fields
    if (name === "mfgDate" || name === "expDate" || name === "retestDate") {
      // Check if the entered date is a valid date
      if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        setFormErrors({
          ...formErrors,
          [name]: "Invalid date format. Please use YYYY-MM-DD format.",
        });
      } else {
        // Clear any previous error messages for the date field
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
  
        // Check if Exp. Date is greater than or equal to Mfg Date
        if (name === "expDate" && inputs.mfgDate) {
          if (new Date(value) <= new Date(inputs.mfgDate)) {
            setFormErrors({
              ...formErrors,
              [name]: "Exp Date must be after Mfg Date!",
            });
          }
        }
  
        // Check if Retest Date is greater than or equal to Exp Date
        if (name === "retestDate" && inputs.expDate) {
          if (new Date(value) <= new Date(inputs.expDate)) {
            setFormErrors({
              ...formErrors,
              [name]: "Retest Date must be after Exp Date!",
            });
          }
        }
        if (name === "retestDate" && inputs.mfgDate) {
          if (new Date(value) <= new Date(inputs.mfgDate)) {
            setFormErrors({
              ...formErrors,
              [name]: "Retest Date must be after mfg Date!",
            });
          }
        }
      }
    }
  setInputs({
       ...inputs,
       [name]: value,
     });

   };
   useEffect(()=>{
    if(naMfgDate===true&&naExpDate===true&&naRetestDate===true){
      setInputs({
        batchNo: inputs.batchNo,
         batchSize:inputs.batchSize,
       natureOfPacking:inputs.natureOfPacking,
         mfgDate:"",
         expDate:"",
         retestDate:"",
         sampleQuantity:inputs.sampleQuantity,
      testParameter:selectedOptions,
    })
  };
  if(naMfgDate===true&&naExpDate===false&&naRetestDate===false){
      setInputs({
        batchNo: inputs.batchNo,
         batchSize:inputs.batchSize,
       natureOfPacking:inputs.natureOfPacking,
         mfgDate:"",
         expDate:inputs.expDate,
         retestDate:inputs.retestDate,
         sampleQuantity:inputs.sampleQuantity,
      testParameter:selectedOptions,
    })
    };
  if(naMfgDate===false&&naExpDate===false&&naRetestDate===true){
      setInputs({
        batchNo: inputs.batchNo,
         batchSize:inputs.batchSize,
       natureOfPacking:inputs.natureOfPacking,
         mfgDate:inputs.mfgDate,
         expDate:inputs.expDate,
         retestDate:"",
         sampleQuantity:inputs.sampleQuantity,
      testParameter:selectedOptions,
    })
    }
    if(naMfgDate===false&&naExpDate===true&&naRetestDate===true){
      setInputs({
        batchNo: inputs.batchNo,
         batchSize:inputs.batchSize,
       natureOfPacking:inputs.natureOfPacking,
         mfgDate:inputs.mfgDate,
         expDate:"",
         retestDate:"",
         sampleQuantity:inputs.sampleQuantity,
      testParameter:selectedOptions,
    })
    }
    if(naMfgDate===false&&naExpDate===true&&naRetestDate===false){
      setInputs({
        batchNo: inputs.batchNo,
         batchSize:inputs.batchSize,
       natureOfPacking:inputs.natureOfPacking,
         mfgDate:inputs.mfgDate,
         expDate:"",
         retestDate:inputs.retestDate,
         sampleQuantity:inputs.sampleQuantity,
      testParameter:selectedOptions,
    })
    }
    if(naMfgDate===true&&naExpDate===true&&naRetestDate===false){
      setInputs({
        batchNo: inputs.batchNo,
         batchSize:inputs.batchSize,
       natureOfPacking:inputs.natureOfPacking,
         mfgDate:"",
         expDate:"",
         retestDate:inputs.retestDate,
         sampleQuantity:inputs.sampleQuantity,
      testParameter:selectedOptions,
    })
    }
    if(naMfgDate===true&&naExpDate===false&&naRetestDate===true){
      setInputs({
        batchNo: inputs.batchNo,
         batchSize:inputs.batchSize,
       natureOfPacking:inputs.natureOfPacking,
         mfgDate:"",
         expDate:inputs.expDate,
         retestDate:"",
         sampleQuantity:inputs.sampleQuantity,
      testParameter:selectedOptions,
    })
    }
   });
    const handleClear=()=>{
      setInputs("")
setSelectedOptions("")
    }
  const handleadd = (e) => {
    if (tableData.length >= tableLimit) {
      alert(`Table limit of ${tableLimit} rows reached. You cannot add more rows.`);
    } else {
   const isMfgDateUnchecked = !naMfgDate && !inputs.mfgDate;
  
   // Check if the "NA" checkbox for Exp. Date is unchecked
   const isExpDateUnchecked = !naExpDate && !inputs.expDate;
 
   // Check if the "NA" checkbox for Retest Date is unchecked
   const isRetestDateUnchecked = !naRetestDate && !inputs.retestDate;
 
   const newinputerror = validate(inputs, isMfgDateUnchecked, isExpDateUnchecked, isRetestDateUnchecked);
   setFormErrors(newinputerror);
 
   const hasErrors = Object.values(newinputerror).some((error) => !!error);
   if(!hasErrors){ 
    
    
    if (editClick) {
      const tempTableData = tableData;
      Object.assign(tempTableData[editIndex], inputs);
      setTableData([...tempTableData]);
      setEditClick(false);
      setInputs({
         batchNo: "",
        batchSize: "",
        natureOfPacking:"",
        mfgDate:"",
        expDate:"",
        retestDate:"",
        sampleQuantity:"",
        testParameter:[],
      });
    } else {
      setTableData([...tableData, inputs]);
      setInputs({
        batchNo: "",
        batchSize: "",
        natureOfPacking:"",
        mfgDate:"",
        expDate:"",
        retestDate:"",
        sampleQuantity:"",
        testParameter:[],
      });
    }
    
    setSelectedOptions(null)
    console.log("inputs", inputs)
    setIsSubmit(true)
  };
}
  }
  useEffect(() => {
    
    axios
      .get("http://54.167.30.227:3000/api/testParameters?filter[fields][testDataName]=true&filter[fields][testDataCode]=true",{
        headers: {
          "Content-Type": "application/json",
          'Authorization': token
        },
      })
      .then((response) => setTestData (response.data.map(item => ({
        value: item.testDataCode,
        label: item.testDataName
      })))
      
      )
      .catch((error) => console.error("Error fetching company data:", error));
    
        
  }, []);
console.log("testdata",testData)
  useEffect(() => {
   
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(inputs)
    }
  }, [formErrors, inputs, isSubmit]);

const saveData=(inputs)=>{
  dispatch(changeBatchDetails(tableData))
  setState({ ...state, ...inputs})
  console.log("tableData", tableData);
  sessionStorage.setItem('tableData', JSON.stringify(tableData));
  onButtonClick("TypeOfAnalysis")
}
useEffect(()=>{
  const storedTableData =sessionStorage.getItem("tableData");
  if(storedTableData){
    setTableData(JSON.parse(storedTableData));
  }
},[])



  const handleDelete = (index) => {
    const filterData = tableData.filter((item, i) => i !== index);
    setTableData(filterData);
  };
  const handleEdit = (index) => {
    const tempData = tableData[index];

    setInputs({ batchNo: tempData.batchNo, batchSize: tempData.batchSize, natureOfPacking: tempData.natureOfPacking,
    mfgDate:tempData.mfgDate,expDate: tempData.expDate, retestDate:tempData.retestDate,sampleQuantity: tempData.sampleQuantity ,testParameter:tempData.testParameter});
    setSelectedOptions(tempData.testParameter);
    setEditClick(true);
    setEditIndex(index);
  };
  function combineValues(...values) {
    const nonEmptyValues = values.filter(value => value !== "" && value !== undefined);
    return nonEmptyValues.length > 0 ? nonEmptyValues.join(", ") : "N/A";
  }

  function validate(values, isMfgDateUnchecked, isExpDateUnchecked, isRetestDateUnchecked) {
    const errors = {};
  
    if (!values.batchNo) {
      errors.batchNo = "This field is required!";
    }
  
    if (isMfgDateUnchecked) {
      if (!values.mfgDate) {
        errors.mfgDate = "This field is required!";
      }
    }
  
    if (isExpDateUnchecked) {
      if (!values.expDate) {
        errors.expDate = "This field is required!";
      } else {
        // Check if Exp. Date is greater than or equal to Mfg Date
        if (new Date(values.expDate) <= new Date(values.mfgDate)) {
          errors.expDate = "Exp Date must be after Mfg Date!";
        }
      }
    }
  
    if (isRetestDateUnchecked) {
      if (!values.retestDate) {
        errors.retestDate = "This field is required!";
      } else {
        // Check if Retest Date is greater than or equal to Exp Date
        if (new Date(values.retestDate) <= new Date(values.expDate)) {
          errors.retestDate = "Retest Date must be after Exp Date!";
        }
      }
    }
  
    if (!values.testParameter || values.testParameter.length === 0) {
      errors.selectedOptions = "This field is required!";
    }
  
    return errors;
  }
  return (
    <div>
    

      <div>
    
        <div>
          <div >
            <div>
    
            
              <Card className="maincards">
                <div className="cardtitle">
                  <text className="cardtitlehed">Batch Details</text>
                </div>
                <div className="cardcolumnpadding">
                  {/* ---------------------------------   card column start  -------------------------------------------- */}
                  <Form validate onSubmit={handleSubmit(saveData)}>
                  <Row className="mb-3 rowtabview">
                    <Col>
                      <div>
                        <label className="cardcolhed">
                          Batch No./Lot No(s)
                          <text className="cardcolhedstar">*</text>
                        </label>
                      </div>
                      <div>
                        <input type="text" className="cardcolumninputtype" 
                        name="batchNo"
                         value={inputs.batchNo}
                         onChange={handleChange}/>
                      </div>
                      <p style={{color:"red"}}>{formErrors.batchNo}</p>
                    </Col>

                    <Col>
                      <div>
                        <label className="cardcolhed">
                          Batch Size
                          {/* <text className="cardcolhedstar">*</text> */}
                        </label>
                      </div>
                      <div>
                        <input type="text" className="cardcolumninputtype" 
                        name="batchSize"
                        value={inputs.batchSize}
                        onChange={handleChange}/>
                      </div>

                    </Col>

                    <Col>
                      <div>
                        <label className="cardcolhed">
                          {" "}
                          Nature Of Packing
                          {/* <text className="cardcolhedstar">*</text> */}
                        </label>
                      </div>
                      <div>
                        <input type="text" className="cardcolumninputtype"
                        name="natureOfPacking"
                        value={inputs.natureOfPacking}
                        onChange={handleChange} />
                      </div>
                    </Col>
                  </Row>

 
                  <Row className="mb-3 rowtabview">
                    <Col>
                    <div style={{alignItems:'center',display:'flex'}} className="mb-3"> 
 <div>               {/* ---------------------------------   card column start  -------------------------------------------- */}
<label className="cardcolhed me-2" >NA</label>
</div>
<div>
  <input className="customRadio"
type="checkbox"
 checked={naMfgDate}
              onChange={() => handleNaChange("mfgDate")} // Handle "N/A" checkbox
              />
</div>
</div>
                      <div>
                        <label className="cardcolhed">
                          Mfg. Date
                          <text className="cardcolhedstar">*</text>
                        </label>
                      </div>
                      <div>
                        <input type="date" className="cardcolumninputtype"
                        name="mfgDate"
                        value={naMfgDate? '' :inputs.mfgDate}
                        onChange={handleChange}
                        disabled={disabletext || naMfgDate} // Disable if "N/A" is checked
            />
                      </div>
                      <p style={{color:"red"}}>{formErrors.mfgDate}</p>
                    </Col>

                    <Col>
                    <div style={{alignItems:'center',display:'flex'}} className="mb-3"> 
 <div>               {/* ---------------------------------   card column start  -------------------------------------------- */}
<label className="cardcolhed me-2" >NA</label>
</div>
<div>
  <input className="customRadio"
type="checkbox"
checked={naExpDate}
onChange={() => handleNaChange("expDate")} // Handle "N/A" checkbox
/>
</div>
</div>
                      <div>
                        <label className="cardcolhed">
                          Exp. Date
                          <text className="cardcolhedstar">*</text>
                        </label>
                      </div>
                      <div>
                        <input type="date" className="cardcolumninputtype"
                        name="expDate"
                        value={naExpDate? "" :inputs.expDate}
                      
                        min={inputs.mfgDate}
                        onChange={handleChange}
              disabled={disabletext || naExpDate} // Disable if "N/A" is checked
              />
                      </div>
                      <p style={{color:"red"}}>{formErrors.expDate}</p>
                    </Col>

                    <Col>
                    <div style={{alignItems:'center',display:'flex'}} className="mb-3"> 
 <div>               {/* ---------------------------------   card column start  -------------------------------------------- */}
<label className="cardcolhed me-2" >NA</label>
</div>
<div>
  <input className="customRadio"
type="checkbox"
checked={naRetestDate}
onChange={() => handleNaChange("retestDate")} // Handle "N/A" checkbox
/>
</div>
</div>
                      <div>
                        <label className="cardcolhed">
                          Retest Date
                          <text className="cardcolhedstar">*</text>
                        </label>
                      </div>
                      <div>
                        <input type="date" className="cardcolumninputtype" 
                        name="retestDate"
                        value={naRetestDate?"": inputs.retestDate}
                        min={inputs.expDate}
                        onChange={handleChange}
                        disabled={disabletext || naRetestDate} // Disable if "N/A" is checked
                        />
                      </div>
                      <p style={{color:"red"}}>{formErrors.retestDate}</p>
                    </Col>
                  </Row>

                  {/* ---------------------------------   card column start  -------------------------------------------- */}

                  <Row className="mb-3 rowtabview">
                    <Col>
                      <div>
                        <label className="cardcolhed">
                          Sample Quantity
                          {/* <text className="cardcolhedstar">*</text> */}
                        </label>
                      </div>
                      <div>
                        <input type="text" className="cardcolumninputtype"
                        name="sampleQuantity"
                        value={inputs.sampleQuantity}
                        onChange={handleChange} />
                      </div>
                    </Col>

                    <Col>
                    <div>
                    <label className="cardcolhed" >
                    Analytical Test Parameter
                    </label>
                   {/* <text style={{fontSize:10.5,fontWeight:300}}>(If require attach Annexure
                          along with this filled TRF)</text>  */}
                           <text className="cardcolhedstar">*</text> 
                       
                        </div>
                    <div>
                      
                    <Select name="testParameter"  value={selectedOptions} 
        onChange={handleSelectChange}style={{borderRadius:6}} options={testData} isClearable isMulti={true} />
            
                      </div>
                      <p style={{color:"red"}}>{formErrors.selectedOptions}</p>
                    </Col>

                    <Col>
                      <div>
                        <label className="cardcolhed">
                          {/* <text className="cardcolhedstar">*</text> */}
                        </label>
                      </div>
                      <div className="cardbuttonwiddouble">
                        {/* <input type="date" className="cardcolumninputtype"/> */}

                        <button type="reset"
                          className="cardbuttonbatchdetails"
                        onClick={handleClear}
                        >
                          <div>
                          <AiOutlineClose size={18} /> </div> <text>Clear</text> 
                        </button>
                        
                        <button type="button"
                          className="cardbuttonbatchdetails"
                            onClick={handleadd}
                        >
                          <text>
                             {editClick ? "update" : "Add"}
                             </text>
                             <div>
                          <MdOutlineAdd size={18} />
                          </div>
                        </button>
                         
                      </div>
                    </Col>
                  </Row>

                  {/* ---------------------------------   card column start  -------------------------------------------- */}

                  <hr className="hrcolor" />
                
                  {/* <Card className="cardtablesize"> */}
                  <Table responsive border={1}>
                    <thead className="table-custom">
                      <tr>
                        <th>S.No</th>
                        <th>Batch No./Lot No(s)</th>
                        <th>Batch Size</th>
                        <th>Nature Of Packaging</th>
                        <th>Mfg. Date</th>
                        <th>Exp. Date</th>
                        <th>Retest Date</th>
                        <th>Sample Quantity</th>
                        <th>Test Parameter</th>
                        <th>Edit & Delete</th>
                      </tr>
                    </thead>
                   
                    <tbody className="tablebody-custom ">
                    {tableData.slice(0, tableLimit).map((item, i) => (
    <tr key={item.id}>
      <td>{i + 1}</td>
      <td>{item.batchNo}</td>
      <td>{combineValues(item.batchSize)}</td>
      <td>{combineValues(item.natureOfPacking)}</td>
      <td>{combineValues(item.mfgDate)}</td>
      <td>{combineValues(item.expDate)}</td>
      <td>{combineValues(item.retestDate)}</td>
      <td>{combineValues(item.sampleQuantity)}</td>
      <td>{combineValues(item.testParameter?.map(option => option.label))}</td>
                
                        <td>
                          <div className="tablerowicon" style={{justifyContent:"space-between"}}>
                            <BiEdit size={20} color={"#9AC037"} onClick={() => handleEdit(i)} />

                            
                            <RiDeleteBinLine size={20} color={"#9AC037"}  onClick={() => handleDelete(i)}/>
                          </div>
                        </td>
                      </tr>

))}


                    </tbody>
                   
                  </Table>
                  {/* </Card> */}

                  <div className="cardbuttonboubleend">
                    <button
                      className="previous"
                       onClick={() => onButtonClick("SampleDetails")}
                    >
                      <BiLeftArrowAlt size={24} /> Previous
                    </button>
                    <button type="submit"
                      className="cardbutton"
        
                      disabled={isNextButtonDisabled}
                    >
                      Next <BiRightArrowAlt size={24} />
                    </button>
                
                  </div>

                  {/* ---------------------------------   card column end  -------------------------------------------- */}
               </Form>
                </div>
                
              </Card>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}