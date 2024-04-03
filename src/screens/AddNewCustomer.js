import React from "react";
import "./Styles.css";
import { AiOutlineLeft, AiOutlineCheck } from "react-icons/ai";
import { Card } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Sidenavbar from "../components/Sidenavbar";
import {useNavigate} from 'react-router-dom';
import { useForm,Controller } from "react-hook-form";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useSelector} from "react-redux";
import NavbartitleAddco from "../components/NavbartitleAddco";


export default function AddNewCustomer() {
  const token  = useSelector((state) => state.form.usertoken.token);
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm();
  const MySwal = withReactContent(Swal)
  const saveData = (data) => {
console.log("data" ,data)
    const item={
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
    fetch("http://54.167.30.227:3000/api/companyDetails/createCompany", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
          'Authorization': token
  
      },
    
    
      body: JSON.stringify(item),
    })
      .then((response) => response.json())
    
      .then((data) => {
    
        console.log("Success:", data);
        
       
      })
    
      .catch((error) => {
        
      });
      Swal.fire(
        'Good job!',
        'New Company Added!',
        'success'
      )
    navigate('/Progress')
  };
  

    

 
  return (
    <div className="app">
      
      <NavbartitleAddco/>

    <div className="d-flex">

      <Sidenavbar />

      <div className="main">
        <div className="mainitem">
         

          <div className="backbutton" onClick={()=>navigate('/Progress')}>
            <AiOutlineLeft /> <text>back</text>
          </div>

          <div className="titlesm">
            <text>Add New Customer</text>
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
  defaultValue="" // Set your default value here if needed
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
  defaultValue="" // Set your default value here if needed
  render={({ field }) => (
                    <Form.Control className="cardcolhedinput"
                    {...register("contactPerson")}
                    type="text"
                {...field}
                    isInvalid={!!errors.contactPerson}
                    />
  )}
  />
                     <Form.Control.Feedback type="invalid">
                  {errors.contactPerson?.type ==="required" &&
                  "This field is required."}
                </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} controlId="validationFormikUsername">
                    <Form.Label className="cardcolhed">
                      Manufacturing Lic No
              
                    </Form.Label>
                    <Controller
  name="licno"
  control={control}
  defaultValue="" // Set your default value here if needed
  render={({ field }) => (
                    <Form.Control className="cardcolhedinput" 
                    {...register("licno")}
                     type="text"
                    {...field}
                     isInvalid={!!errors.licno}
                    />
  )}
  />
                    {/* <Form.Control.Feedback type="invalid">
                  {errors.licno?.type ==="required" &&
                  "This field is required."}
                </Form.Control.Feedback> */}
                
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
  defaultValue="" // Set your default value here if needed
  render={({ field }) => (
                    <Form.Control className="cardcolhedinput"
                    {...register("phonenumber", { required: true })}
                     type="number"
                    {...field}
                     isInvalid={!!errors.phonenumber}
                    />
  )}
  />
                     <Form.Control.Feedback type="invalid">
                {errors.phonenumber?.type === "required" &&
                              "This field is required."}
              </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} >
                    <Form.Label className="cardcolhed">
                      Additional Phone Number{" "}
                    </Form.Label>
                    <Controller
  name="phonenumber2"
  control={control}
  defaultValue="" // Set your default value here if needed
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
  defaultValue="" // Set your default value here if needed
  render={({ field }) => (
                    <Form.Control className="cardcolhedinput" 
                    {...register("emailid", { required: true })}
                     type="email"
                    {...field}
                     isInvalid={!!errors.emailid}
                    />
  )}
  />
                     <Form.Control.Feedback type="invalid">
                {errors.emailid?.type === "required" &&
                              "This field is required."}
              </Form.Control.Feedback>
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
  defaultValue="" // Set your default value here if needed
  render={({ field }) => (
                    <Form.Control className="cardcolhedinput"
                    {...register("address1", { required: true })}
                     type="text"
                    {...field}
                     isInvalid={!!errors.address1}
                    />
  )}
  />
                     <Form.Control.Feedback type="invalid">
                {errors.address1?.type === "required" &&
                              "This field is required."}
              </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label className="cardcolhed">
                      Address Line2{" "}
                    </Form.Label>
                    <Controller
  name="address2"
  control={control}
  defaultValue="" // Set your default value here if needed
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
  defaultValue="" // Set your default value here if needed
  render={({ field }) => (
                    <Form.Control className="cardcolhedinput" 
                    {...register("city", { required: true })}
                    type="text"
                    {...field}
                    isInvalid={!!errors.city}
                    />
  )}
  />
                     <Form.Control.Feedback type="invalid">
                {errors.city?.type === "required" &&
                              "This field is required."}
              </Form.Control.Feedback>
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
  defaultValue="" // Set your default value here if needed
  render={({ field }) => (
                    <Form.Control className="cardcolhedinput" 
                    {...register("state", { required: true })}
                     type="text"
                    {...field}
                     isInvalid={!!errors.state}
                    />
  )}
  />
                     <Form.Control.Feedback type="invalid">
                {errors.state?.type === "required" &&
                              "This field is required."}
              </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} controlId="validationFormik08">
                    <Form.Label className="cardcolhed">
                      Pincode<text className="cardcolhedstar">*</text>{" "}
                    </Form.Label>
                    <Controller
  name="pincode"
  control={control}
  defaultValue="" // Set your default value here if needed
  render={({ field }) => (
                    <Form.Control className="cardcolhedinput"
                    {...register("pincode", { required: true })}
                     type="text"
                     {...field}
                     isInvalid={!!errors.pincode}
                    />
  )}
                    />
              <Form.Control.Feedback type="invalid">
                {errors.pincode?.type === "required" &&
                              "This field is required."}
              </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} className="cardbuttonwid">
                    <Form.Label></Form.Label>
                    <button className="cardbutton" type="submit"
                    //  onClick={() => navigate("customerdetailes")}
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

