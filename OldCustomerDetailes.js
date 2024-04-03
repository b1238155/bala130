import React ,{useState,useEffect}from "react";
import "./Styles.css";
import Sidenavbar from "../components/Sidenavbar";
import Navbartitle from "../components/Navbartitle";
import { BiRightArrowAlt } from "react-icons/bi";
import { Card, Col, Row,} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useForm,Controller} from 'react-hook-form'
import { changeCustomerDetails } from '../redux/FormSlice';
import Select from "react-select";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import axios from 'axios';
export default function CustomerDetailes({onButtonClick}) {
  const dispatch = useDispatch();
  
  const navigate = useNavigate();
  const[options,setOptions]=useState([""]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [mappedData, setMappedData] = useState({ contactPersonName: '', licenceNo: '' ,phoneNo:'',phoneNo1:'',
emailId:'',address1:'',
address2:'',city:'',state:'',pincode:''});

  const[data,setData]=useState({})
  
  useEffect(()=>
    axios.get('http://3.91.97.121:3000/api/companyDetails')
    .then((response) =>{
    let data=response.data.map((item) =>{
      return{
        value: item.id,
        label: item.companyName
  
      };
      })
      console.log("data",data);
      setOptions(data);
      console.log("options",options)
    })
    .catch(error =>{
      console.error('error fetching data', error);
    }),
 [options]);
    console.log("")
  
  const schema = Yup.object().shape({
    //company: Yup.string().nullable().required("Please select language"),

    // contactPersonName: Yup.string()
    // .required('required'),
    // licenceNo: Yup.string()
    // .required('required'),
    // phoneNo: Yup.string()
    // .matches(/^[0-9]+$/,"must be only digits")
    // .min(10,"must be 10 digits")
    // .max(10,"must be 10 digits"),
    
    // emailId: Yup.string()
    // .email('Invalid email address')
    // .required('required'),
  //   address1: Yup.string()
  //   .required('required'),
  // city: Yup.string()
  //   .required('required'),
  //   state: Yup.string()
  //   .required('required'),
  //   pincode: Yup.string()
  //   .matches(/^[0-9]+$/,"must be only digits")
  //   .min(6,"must be 6 digits")
  //   .max(6,"must be 6 digits")
  //   .required('required')
  })
  const {
  control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema), 
    defaultValues: { company: data.company, contactPersonName: data.contactPersonName },
    mode: "onBlur",
  })
  
  const handleSelectChange = selected => {
    setSelectedOption(selected);
    // Use the selected value to map data to other fields
    const selectedValue = selected.value;
    const mappedItem = options.find(option => option.value === selectedValue);

    if (mappedItem) {
      setMappedData({
        contactPersonName: mappedItem.contactPerson,
        licenceNo: mappedItem.manufacturingLicenceNumber, // Replace with the correct property name from the API response
        phoneNo:mappedItem.mobileNumber,
        phoneNo1:mappedItem.mobileNumber2,
        emailId:mappedItem.email,
        address1:mappedItem.address1,
        address2:mappedItem.address2,
        city:mappedItem.city,
        state:mappedItem.state,
        pincode:mappedItem.pincode
      });
    }
  };
 //const { field: { value: companyValue, onChange: companyOnChange, ...restcompanyField } } = Controller({ name: 'company', control });
  const onSubmit = (data) => {
setData(data)
    console.log("data",data)
//  dispatch(changeCustomerDetails(
//       {
// company:data.company,
// contactPersonName:data.contactPersonName,
// licenceNo:data.licenceNo,
// phoneNo:data.phoneNo,
// emailId:data.emailId,
// address1:data.address1,
// city:data.city,
//  state:data.state,
//  pincode:data.pincode,
// phoneNo1:data.phoneNo1,
// address2:data.address2

//      })
//    )
    onButtonClick("SampleDetails")
    
      }
    
  return (
    <div >
      
  

<div >
         
    

      <div className="main">
        <div className="mainitem">
      

          <div>
            <Card className="maincards">
              <div className="cardtitle">
                <text className="cardtitlehed">Customer Details</text>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
              <div className="cardcolumnpadding">
                {/* ---------------------------------   card column start  -------------------------------------------- */}

                <Row className="mb-3 rowtabview">

                <Col>
                      <div>
                        <label className="cardcolhed">
                        Company Name
                          <text className="cardcolhedstar">*</text>
                        </label>
                      </div>
                     
                      <Controller
        name="company"
        control={control}
        defaultValue={null}
        render={({ field }) => (
          <Select
          selected={selectedOption}
            {...field}
            options={data}
            onChange={handleSelectChange}
          />
        )}
      /> 
    
      {errors.company && <p className="errormsg">{errors.company.message}</p>}
                    </Col>


                    <Col>
                      <div>
                        <label className="cardcolhed">
                        Contact Person Name
                        
                        </label>
                      </div>
                      <div>
                        <input type="text" className="cardcolumninputtype" name="contactPersonName"value={mappedData.contactPersonName} readOnly/>
                      </div>
                    
                    </Col>

                    <Col>
                      <div>
                        <label className="cardcolhed">
                        Manufacturing Lic No.
                
                        </label>
                      </div>
                      <div>
                        <input type="text" className="cardcolumninputtype"   name="licenceNo" value={mappedData.licenceNo} readOnly/>
                      </div>
                      {errors.licenceNo && <p>{errors.licenceNo.message}</p>}
                    </Col>


                 
                </Row>

                {/* ---------------------------------   card column start  -------------------------------------------- */}

                <Row className="mb-3 rowtabview">


                <Col>
                      <div>
                        <label className="cardcolhed">
                       Phone Number
                          
                        </label>
                      </div>
                      <div>
                        <input type="text" className="cardcolumninputtype" name="phoneNo" value={mappedData.phoneNo} readOnly/>
                      </div>
                      {errors.phoneNo && <p>{errors.phoneNo.message}</p>}
                    </Col>


                    <Col>
                      <div>
                        <label className="cardcolhed">
                        Additional Phone Number
                          {/* <text className="cardcolhedstar">*</text> */}
                        </label>
                      </div>
                      <div>
                        <input type="text" className="cardcolumninputtype" name="phoneNo1" value={mappedData.phoneNo1} readOnly/>
                      </div>
                    </Col>

                    <Col>
                      <div>
                        <label className="cardcolhed">
                        Email Id
                        
                        </label>
                      </div>
                      <div>
                        <input type="text" className="cardcolumninputtype"  name="emailId" value={mappedData.emailId} readOnly/>
                      </div>
                    </Col>

                </Row>

                {/* ---------------------------------   card column start  -------------------------------------------- */}

                <Row className="mb-3 rowtabview">


                <Col>
                      <div>
                        <label className="cardcolhed">
                        Address Line1
                        
                        </label>
                      </div>
                      <div>
                        <input type="text" className="cardcolumninputtype"  name="address1" value={mappedData.address1} readOnly/>
                      </div>
                      {errors.address1 && <p>{errors.address1.message}</p>}
                    </Col>


                    <Col>
                      <div>
                        <label className="cardcolhed">
                        Address Line2
                          {/* <text className="cardcolhedstar">*</text> */}
                        </label>
                      </div>
                      <div>
                        <input type="text" className="cardcolumninputtype" name="address2" value={mappedData.address2} readOnly/>
                      </div>
                    </Col>

                    <Col>
                      <div>
                        <label className="cardcolhed">
                        City
                        
                        </label>
                      </div>
                      <div>
                        <input type="text" className="cardcolumninputtype" name="city" value={mappedData.city} readOnly />
                      </div>
                      {errors.city && <p>{errors.city.message}</p>}
                    </Col>


                 
                </Row>

                {/* ---------------------------------   card column start  -------------------------------------------- */}

                <Row className="mb-3 rowtabview">

                <Col>
                      <div>
                        <label className="cardcolhed">
                        State
                          
                        </label>
                      </div>
                      <div>
                        <input type="text" className="cardcolumninputtype"  name="state" value={mappedData.state} readOnly/>
                      </div>
                      {errors.state && <p>{errors.state.message}</p>}
                    </Col>


                    <Col>
                      <div>
                        <label className="cardcolhed">
                        Pincode
                        
                        </label>
                      </div>
                      <div>
                        <input type="text" className="cardcolumninputtype"  name="picode" value={mappedData.pincode} rea/>
                      </div>
                      {errors.pincode && <p>{errors.pincode.message}</p>}
                    </Col>

                    <Col>
                      <div>
                        <label className="cardcolhed">
                       
                          {/* <text className="cardcolhedstar">*</text> */}
                        </label>
                      </div>
                      <div className="cardbuttonwid">
                      <button
                      className="cardbutton"
                    type="submit"
                    >
                      Next <BiRightArrowAlt />
                    </button>
                      </div>
                    </Col>



                  
                </Row>

                {/* ---------------------------------   card column end  -------------------------------------------- */}
              </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
