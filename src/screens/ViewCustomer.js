import React,{useEffect,useState} from "react";
import "./Styles.css";
import { AiOutlineLeft, AiOutlineCheck } from "react-icons/ai";
import { Card } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Sidenavbar from "../components/Sidenavbar";
import {useNavigate} from 'react-router-dom';
import { useForm,Controller } from "react-hook-form";

import NavbartitleAddco from "../components/NavbartitleAddco";
import { useSelector} from "react-redux";
import axios from "axios";
export default function ViewCustomer() {
  const navigate = useNavigate();
  const[detailedView,setDetailedView]=useState({});
  const id=useSelector(state =>state.form.companyId.companyId);
  const token  = useSelector((state) => state.form.usertoken.token);
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    setValue,
  } = useForm();
  useEffect(() => {
    axios
      .get("http://54.167.30.227:3000/api/companyDetails/" + id,{
        headers: {
    "Content-Type": "application/json",
    'Authorization': token
  },
      })
      .then((response) => {
        setDetailedView(response.data);
        // Set form field values when detailedView data is available
        setValue("companyName", response.data.companyName);
        setValue("contactPerson", response.data.contactPerson);
        setValue("licno", response.data.manufacturingLicenseNumber);
        setValue("phonenumber", response.data.mobileNumber);
        setValue("emailid", response.data.email);
        setValue("address1", response.data.address1);
        setValue("address2", response.data.address2);
        setValue("city", response.data.city);
        setValue("state", response.data.state);
        setValue("pincode", response.data.pincode);
      })
      .catch((error) => console.error("Error fetching company data:", error));
  }, [id, setValue]); 
  
  const saveData = (data) => {
console.log("data" ,data)
    const item={
      id:id,
      companyName:data.companyName,
      manufacturingLicenseNumber:data.licno,
      contactPerson:data.contactPerson,
      mobileNumber:data.phonenumber,
      email:data.emailid,
      address1:data.address1,
      address2:data.address2,
      city:data.city,
      state:data.state,
      pincode:data.pincode
    }
    fetch("http://54.167.30.227:3000/api/companyDetails/" +id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
          'Authorization': token
        },
        
      body: JSON.stringify(item),
    })
      .then((response) => response.json())
    
      .then((data) => {
    
        console.log("Success:", data);
        
         // handle the response data here
      })
    
      .catch((error) => {
        // handle any errors here
      });
    navigate('/SearchCustomer')
  };
  
 
  return (
    <div className="app">
      
      <NavbartitleAddco/>

    <div className="d-flex">

      <Sidenavbar />

      <div className="main">
        <div className="mainitem">
         

          <div className="backbutton" onClick={()=>navigate('/SearchCustomer')}>
            <AiOutlineLeft /> <text>back</text>
          </div>

          <div className="titlesm">
            <text>View Customer</text>
          </div>

          <div>
            <Card className="maincards">
              <div className="cardtitle">
                <text className="cardtitlehed">Customer Details</text>
              </div>
              <div className="cardcolumnpadding">
                {/* ---------------------------------   card column start  -------------------------------------------- */}

                <Form onSubmit={handleSubmit(saveData)}>
         
      
                <Row className="mb-3 rowtabview ">
                  <Form.Group as={Col} controlId="validationFormik01">
                    <Form.Label className="cardcolhed">
                      Company Name<text className="cardcolhedstar">*</text>{" "}
                    </Form.Label>
                    <Controller
  name="companyName"
  control={control}
  defaultValue=""
  render={({ field }) => (
                    <Form.Control className="cardcolhedinput"
                    {...register("companyName", { required: true })}
                     type="text"
                     {...field}
                     isInvalid={!!errors.companyName}
                    />)}
                    />
                    <Form.Control.Feedback type="invalid">
                  {errors.companyName?.type ==="required" &&
                  "This field is required."}
                </Form.Control.Feedback>
            
                  </Form.Group>

                  <Form.Group as={Col} controlId="validationFormik02">
                    <Form.Label className="cardcolhed">
                      Contact Person Name
                      <text className="cardcolhedstar">*</text>{" "}
                    </Form.Label>
                    <Controller
  name="contactPerson"
  control={control}
  defaultValue=""
  render={({ field }) => (
                    <Form.Control className="cardcolhedinput"
                    {...register("contactPerson")}
                    type="text"
                {...field}
                 
                    />
  )}
  />
                    
                  </Form.Group>

                  <Form.Group as={Col} controlId="validationFormikUsername">
                    <Form.Label className="cardcolhed">
                      Manufacturing Lic No
                      <text className="cardcolhedstar">*</text>{" "}
                    </Form.Label>
                    <Controller
  name="licno"
  control={control}
  defaultValue=""
  render={({ field }) => (
                    <Form.Control className="cardcolhedinput" 
                    {...register("licno")}
                     type="text"
                    {...field}
                    
                    />
  )}
  />
                   
                
                  </Form.Group>
                </Row>

                {/* ---------------------------------   card column start  -------------------------------------------- */}

                <Row className="mb-3 rowtabview ">
                  <Form.Group as={Col} controlId="validationFormik03">
                    <Form.Label className="cardcolhed">
                      Phone Number<text className="cardcolhedstar">*</text>{" "}
                    </Form.Label>
                    <Controller
  name="phonenumber"
  control={control}
  defaultValue=""
  render={({ field }) => (
                    <Form.Control className="cardcolhedinput"
                    {...register("phonenumber")}
                     type="number"
                    {...field}
                    
                    />
  )}
  />
                    
                  </Form.Group>

                  <Form.Group as={Col} >
                    <Form.Label className="cardcolhed">
                      Additional Phone Number{" "}
                    </Form.Label>
                    <Controller
  name="phonenumber2"
  control={control}

  render={({ field }) => (
                    <Form.Control className="cardcolhedinput"
                  
                    type="numeric"
                    {...field}/>
  )}
  />
                  </Form.Group>

                  <Form.Group as={Col} controlId="validationFormik04">
                    <Form.Label className="cardcolhed">
                      Email Id<text className="cardcolhedstar">*</text>{" "}
                    </Form.Label>
                    <Controller
  name="emailid"
  control={control}
  defaultValue=""
  render={({ field }) => (
                    <Form.Control className="cardcolhedinput" 
                    {...register("emailid")}
                     type="email"
                    {...field}
                    
                    />
  )}
  />
                    
                  </Form.Group>
                </Row>

                {/* ---------------------------------   card column start  -------------------------------------------- */}

                <Row className="mb-3 rowtabview">
                  <Form.Group as={Col} controlId="validationFormik05">
                    <Form.Label className="cardcolhed">
                      Address Line1<text className="cardcolhedstar">*</text>{" "}
                    </Form.Label>
                    <Controller
  name="address1"
  control={control}
  defaultValue=""
  render={({ field }) => (
                    <Form.Control className="cardcolhedinput"
                    {...register("address1")}
                     type="text"
                    {...field}
                     
                    />
  )}
  />
                    
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label className="cardcolhed">
                      Address Line2{" "}
                    </Form.Label>
                    <Controller
  name="address2"
  control={control}
  defaultValue=""
  render={({ field }) => (
                    <Form.Control className="cardcolhedinput" 
                
                    type="text"
                    {...field}
                    />
  )}
  />
                  </Form.Group>

                  <Form.Group as={Col} controlId="validationFormik06">
                    <Form.Label className="cardcolhed">
                      City<text className="cardcolhedstar">*</text>{" "}
                    </Form.Label>
                    <Controller
  name="city"
  control={control}
  defaultValue=""
  render={({ field }) => (
                    <Form.Control className="cardcolhedinput" 
                    {...register("city")}
                    type="text"
                    {...field}
                   
                    />
  )}
  />
                    
                  </Form.Group>
                </Row>

                {/* ---------------------------------   card column start  -------------------------------------------- */}

                <Row className="mb-3 rowtabview ">
                  <Form.Group as={Col} controlId="validationFormik07">
                    <Form.Label className="cardcolhed">
                      State<text className="cardcolhedstar">*</text>{" "}
                    </Form.Label>
                    <Controller
  name="state"
  control={control}
  defaultValue=""
  render={({ field }) => (
                    <Form.Control className="cardcolhedinput" 
                    {...register("state")}
                     type="text"
                    {...field}
                  
                    />
  )}
  />
                    
                  </Form.Group>

                  <Form.Group as={Col} controlId="validationFormik08">
                    <Form.Label className="cardcolhed">
                      Pincode<text className="cardcolhedstar">*</text>{" "}
                    </Form.Label>
                    <Controller
  name="pincode"
  control={control}
  defaultValue=""
  render={({ field }) => (
                    <Form.Control className="cardcolhedinput"
                    {...register("pincode")}
                     type="text"
                     {...field}
                    
                    />
  )}
                    />
             
                  </Form.Group>

                  <Form.Group as={Col} className="cardbuttonwid">
                    <Form.Label></Form.Label>
                    <button className="cardbutton" type="submit"
                   
                      >
                      <AiOutlineCheck size={19}  /> Save
                    </button>
                  </Form.Group>
                </Row>
                </Form>
        
                </div>

                {/* ---------------------------------   card column end  -------------------------------------------- */}
              
            </Card>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

