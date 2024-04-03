import React, { useState,useEffect } from "react";
import './Styles.css';
import { useForm } from "react-hook-form";
import {  Card, } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Button, Field, Form, Input } from "../Forms";
import {  BiLeftArrowAlt } from "react-icons/bi";
import {MdDone} from 'react-icons/md'
import{TbLogout2} from 'react-icons/tb';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useSelector,useDispatch } from "react-redux";
import { changeSubmitData,changeSubmitAccept} from "../redux/FormSlice";
// import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
export default function SampleVerification({onButtonClick}) {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal)
  const[result,setResult]=useState({});
  // ---------------------------------------Radiobuttons functionality starts---------------------------------------------
  const dispatch = useDispatch();
  const token  = useSelector((state) => state.form.usertoken.token);
  
  const form=useSelector(state =>state.form.customer);
  const sample=useSelector(state =>state.form.sampleDetails);
  const analysis=useSelector(state =>state.form.data);
  const batch=useSelector(state=>state.form.tabledata); 
console.log("analysis",analysis)
console.log("batch", batch)
console.log("form",form)
console.log("sample",sample)
// const validationSchema = yup.object().shape({
//   trf: yup.string().required('This field is required.'),
//   sampledetail: yup.string().required('This field is required.'),
//   regulatory: yup.string().required('This field is required.'),
//   leakage: yup.string().required('This field is required.'),
//   splinstruction: yup.string().required('This field is required.'),
//   datalog: yup.string().required('This field is required.'),
//   samplematch: yup.string().required('This field is required.'),
//   method: yup.string().required('This field is required.'),
//   specification: yup.string().required('This field is required.'),
//   sampletype: yup.string().required('This field is required.'),
//   testparam: yup.string().required('This field is required.'),
//   comments: yup.string().required('This field is required.'),
// });

  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    trigger,
  } = useForm();
  
  const postapicallreject=()=>{
    const data1 = getValues();
    console.log("data",data1)
    const item={
      companyName:form.company,
      companyId:form.companyId,
      manufacturingLicenseNumber:form.licenceNo,
      contactPerson: form.contactPersonName,
      mobileNumber: form.phoneNo,
      additionalMobileNumber:form.phoneNo1,
      email:form.emailId,
      address1: form.address1,
      address2:form.address2,
      city:form.city,
      state: form.state,
      pincode:form.pincode,
      sampleName:sample.samplename,
      reportRequiredaAsPerForm39:sample.report,
      storageCondition: sample.storage,
      natureOfSample:sample.natureofsample,
      sampleType:sample.sampletype,
      sampleRetentionRequired:sample.sampleretension ,
      typeOfSubmission:sample.submissiontype,
      batchDetails:
        batch.map((item,i)=>(
          {
            batchNo:item.batchNo,
            batchSize:item.batchSize,
            natureOfPacking:item.natureOfPacking,
            mfgDate:item.mfgDate,
            expDate:item.expDate,
            retestDate:item.retestDate,
            sampleQuantity:item.sampleQuantity,
            testParameter:item.testParameter.map(option=>(
              {
                testDataName:option.label,
                testDataCode:option.value
              }))
          }
        )),
      regulatory:analysis.formfilling,
      otherThanRegulatory:analysis.analyticalfeasibile ,
      vvtddRefNo:analysis.methodvalidation,
      methodology: analysis.methodologyfollowed,
      testToBeCarriedOut:analysis.test,
      attachment:analysis.choosefile,
      specialInstruction:analysis.specialinstruction,
    sampleVerification:data1,
    comment:data1.comments,
    msdsAttached:sample.msdsAttached,
    status:"reject"
    }
    console.log("item", item)
  fetch("http://54.167.30.227:3000/api/sampleDetails/createSample", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Authorization': token
    },
  
  
    body: JSON.stringify(item),
  })
    .then((response) => response.json())
  
    .then((data) => {
      dispatch(changeSubmitData(data))
      console.log("Success:", data);
      
       // handle the response data here
    })
  
    .catch((error) => {
      // handle any errors here
    });
  }
  const postapicall=()=>{
    const data1 = getValues();
    console.log("data",data1)
    const item={
      companyName:form.company,
      companyId:form.companyId,
      manufacturingLicenseNumber:form.licenceNo,
      contactPerson: form.contactPersonName,
      mobileNumber: form.phoneNo,
      additionalMobileNumber:form.phoneNo1,
      email:form.emailId,
      address1: form.address1,
      address2:form.address2,
      city:form.city,
      state: form.state,
      pincode:form.pincode,
      sampleName:sample.samplename,
      reportRequiredaAsPerForm39:sample.report,
      storageCondition: sample.storage,
      natureOfSample:sample.natureofsample,
      sampleType:sample.sampletype,
      sampleRetentionRequired:sample.sampleretension ,
      typeOfSubmission:sample.submissiontype,
      batchDetails:
        batch.map((item,i)=>(
          {
            batchNo:item.batchNo,
            batchSize:item.batchSize,
            natureOfPacking:item.natureOfPacking,
            mfgDate:item.mfgDate,
            expDate:item.expDate,
            retestDate:item.retestDate,
            sampleQuantity:item.sampleQuantity,
            testParameter:item.testParameter.map(option=>(
              {
                testDataName:option.label,
                testDataCode:option.value
              }))
          }
        )),
      regulatory:analysis.formfilling,
      otherThanRegulatory:analysis.analyticalfeasibile ,
      vvtddRefNo:analysis.methodvalidation,
      methodology: analysis.methodologyfollowed,
      testToBeCarriedOut:analysis.test,
      attachment:analysis.choosefile,
      specialInstruction:analysis.specialinstruction,
    sampleVerification:data1,
    comment:data1.comments,
    msdsAttached:sample.msdsAttached,
    status:"accept"
    }
    console.log("item", item)
  fetch("http://54.167.30.227:3000/api/sampleDetails/createSample", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Authorization': token
    },
  
  
    body: JSON.stringify(item),
  })
    .then((response) => response.json())
  
    .then((data) => {
      dispatch(changeSubmitAccept(data))
      console.log("Success:", data);
      
       // handle the response data here
    })
  
    .catch((error) => {
      // handle any errors here
    });
  }
  
  const saveData = async(action) => {
    const isValid = await trigger(); // Trigger validation
  if (isValid) {

    const data1 = getValues();
    console.log("result",data1)
    if (action === 'accept') {
  MySwal.fire({
    title: 'Are you sure?',
    text: "You want to accept the sample!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#9AC037',
    cancelButtonColor: '#3A4175',
    confirmButtonText: 'Yes!'
  }).then((data1) => {
    if (data1.isConfirmed) {
      postapicall()
      MySwal.fire(
        'RLPL number is generated!',
        'success'
        
      )
      navigate("RLPLgenerated")
    }

  })
}
  if(action === 'reject') {
    MySwal.fire({
      title: 'Are you sure?',
      text: "You want to reject this sample!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#9AC037',
      cancelButtonColor: '#3A4175',
      confirmButtonText: 'Yes!'
    }).then((data1) => {
      if (data1.isConfirmed) {
        postapicallreject()
        MySwal.fire(
          'RLPL number is not generated!',
          'success'
        )
        navigate("RLPLNotgenerated")
      }

    })
  }}
  else{
    alert("please fill all fields")
  }
};
  // ---------------------------------------Radiobuttons functionality ends---------------------------------------------

  return (
    <div >
    
      <div>
        <div>
          <div className="Progressbar"></div>
          <Card className="maincards">
            <div className="cardtitle">
              <text className="cardtitlehed">Sample Verification List</text>
            </div>
            <Form onSubmit={handleSubmit(saveData)}>
              <fieldset>
            <div className="cardcolumnpadding">
              <div className="row">
                <div className="col-12 d-flex new">
                  <div className="col-6">
                    <div className="cardcolhed p-3">
                      <div className="mb-3 new1">
                        <text>
                          Whether the sample received along with the Test
                          Requisition Form (TRF) or through customer IOC? Please
                          (Ö) on the specific received copy (TRF/IOC)
                        </text>
                      </div>
                      <div className="d-flex">
                        <span style={{ display: "flex" }}>
                          <div>
                            <Field>
                          <Input
                              {...register("trf" , { required: true })}
                            type="radio"
                            value="yes"
                            id="yes"
                            name="trf"
                            className="customRadio"
                            
                          />
                          </Field>
                          </div>
                          <div>
                          <label className="space">Yes</label>
                          </div>
                        </span>
                        <span style={{ display: "flex"}}>
                          <div>
                            <Field>
                          <Input
                          {...register("trf" , { required: true })}
                            type="radio"
                            value="no"
                           id="no"
                           name="trf"
                            className="customRadioMargin"
                          />
                          </Field>
                          </div>
                          <div>
                          <label className="space">No</label>
                          </div>
                        </span>
                        <span style={{ display: "flex"}}>
                          <div>
                            <Field>
                          <Input
                          {...register("trf" , { required: true })}
                            type="radio"
                            value="na"
                           id="na"
                           name="trf"
                            className="customRadioMargin"
                          />
                          </Field>
                          </div>
                          <div>
                          <label
                            className="space"
                           
                          >
                            NA
                          </label>
                          </div>
                        </span>
                        <div className="text-danger mt-3">
                        {errors.trf && <p className="error">
                              "This field is required." </p>}
                          </div>
                      </div>

                      <div className="mt-3 mb-3 new1">
                        <text>
                          Is the Sample Name, Batch No. & Storage condition
                          details mentioned on the TRF?
                        </text>
                      </div>
                      <div className="d-flex">
                        <span style={{ display: "flex" }}>
                          <div>
                            <Field>
                          <Input
                          {...register("sampledetail", { required: true })}
                            type="radio"
                            value="yes"
                            id="yes"
                          name="sampledetail"
                            className="customRadio"
                          />
                          </Field></div>
                          <div>
                          <label className="space">Yes</label>
                          </div>
                        </span>
                        <span style={{ display: "flex" }}>
                          <div>
                            <Field>
                            <Input
                          {...register("sampledetail", { required: true })}
                            type="radio"
                            value="no"
                            id="no"
                            name="sampledetail"
                           className="customRadioMargin"
                          />
                            </Field>
                          </div>
                         <div>
                         <label className="space">No</label>
                         </div>
                          
                        </span>
                        <span style={{ display: "flex" }}>
                          <div>
                            <Field>
                            <Input
                           {...register("sampledetail", { required: true })}
                            type="radio"
                            value="na"
                            id="na"
                            name="sampledetail"
                            className="customRadioMargin"
                          />
                            </Field>
                          </div>
                         <div>
                          <label
                            className="space"
                          
                          >
                            NA
                          </label>
                          </div>
                        </span>
                        <div className="text-danger mt-3">
                            {errors.sampledetail &&  <p className="error">
                              "This field is required." </p>}
                          </div>
                      </div>

                      <div className="mt-3 mb-3 new1">
                        <text>
                          For the regulatory batch release is the product Method
                          Validation/Verification/Transfer is done at (Revin)?
                        </text>
                      </div>
                      <div className="d-flex">
                        <span style={{ display: "flex"}}>
                          <div>
                            <Field>
                          <Input
                          {...register("regulatory", { required: true })}
                            type="radio"
                            value="yes"
                            name="regulatory"
                            id="yes"
                            className="customRadio"
                          />
                          </Field>
                          </div>
                          <div>
                          <label className="space">Yes</label>
                          </div>
                        </span>
                        <span style={{ display: "flex" }}>
                          <div>
                            <Field>
                            <Input
                          {...register("regulatory", { required: true })}
                            type="radio"
                            value="no"
                            id="no"
                          name="regulatory"
                            className="customRadioMargin"
                          />
                            </Field>
                          </div>
                         <div>
                          <label className="space">No</label>
                          </div>
                        </span>
                        <span style={{ display: "flex" }}>
                          <div>
                            <Field>
                            <Input
                          {...register("regulatory", { required: true })}
                            type="radio"
                            value="na"
                            id="na"
                          name="regulatory"
                            className="customRadioMargin"
                          />
                            </Field>
                          </div>
                          <div>
                          <label
                            className="space">
                            NA
                          </label>
                          </div>
                        </span>
                        <div className="text-danger mt-3">
                            {errors.regulatory &&  <p className="error">
                              "This field is required." </p>}
                          </div>
                      </div>

                      <div className="mt-3 mb-3 new1">
                        <text>
                          Is the sample packing or container free from
                          damage/leakage?
                        </text>
                      </div>
                      <div className="d-flex">
                        <span style={{ display: "flex" }}>
                          <div>
                            <Field>
                          <Input
                           {...register("leakage", { required: true })}
                            type="radio"
                            value="yes"
                            id="yes"
                            name="leakage"
                            
                            className="customRadio"
                          />
                            </Field></div>
                         
                          <div>
                          <label className="space">Yes</label>
                          </div>
                          
                        </span>
                        <span style={{ display: "flex" }}>
                          <div>
                            <Field>
                            <Input
                           {...register("leakage", { required: true })}
                            type="radio"
                            value="no"
                            id="no"
                            name="leakage"
                            className="customRadioMargin"
                          />
                            </Field>
                          </div>
                          
                          <div>
                          <label className="space">No</label>
                          </div>
                          
                        </span>
                        <span style={{ display: "flex" }}>
                          <div>
                            <Field>
                            <Input
                           {...register("leakage", { required: true })}
                            type="radio"
                            value="na"
                            id="na"    
                            name="leakage"
                            className="customRadioMargin"
                          />
                            </Field>
                          </div>
                          <div>
                          <label
                            className="space"
                          >
                            NA
                          </label>
                          </div>
                          
                        </span>
                        <div className="text-danger mt-3">
                            {errors.leakage &&  <p className="error">
                              "This field is required." </p>}
                          </div>
                      </div>

                      <div className="mt-3 mb-3 new1">
                        <text>
                          Is there any special instruction mention on TRF?
                        </text>
                      </div>
                      <div className="d-flex">
                        <span style={{ display: "flex" }}>
                          <div>
                            <Field>
                            <Input
                           {...register("splinstruction", { required: true })}
                            type="radio"
                            value="yes"
                            id="yes"
                            name="splinstruction"
                            
                            className="customRadio"
                          />
                            </Field>
                          </div>
                      <div>
                      <label className="space">Yes</label>
                      </div>
                          
                        </span>
                        <span style={{ display: "flex"}}>
                          <div>
                            <Field>
                            <Input
                           {...register("splinstruction", { required: true })}
                            type="radio"
                            value="no"
                            id="no"
                            name="splinstruction"
                           
                            className="customRadioMargin"
                          />
                            </Field>
                          </div>
                         
                          <div>
                          <label className="space">No</label>
                          </div>
                          
                        </span>
                        <span style={{ display: "flex"}}>
                          <div>
                            <Field>
                            <Input
                           {...register("splinstruction", { required: true })}
                            type="radio"
                            value="na"
                            id="na"
                            name="splinstruction"
                            
                            className="customRadioMargin"
                          />
                            </Field>
                          </div>
                          
                          <div>
                          <label
                            className="space"
                            style={{ height: 20, width: 20 }}
                          >
                            NA
                          </label>
                          </div>
                          
                        </span>
                        <div className="text-danger mt-3">
                            {errors.splinstruction &&  <p className="error">
                              "This field is required." </p>}
                          </div>
                      </div>

                      <div className="mt-3 mb-3 new1">
                        <text>
                          Whether the data logger is placed in sample kit for
                          sensitive products?
                        </text>
                      </div>
                      <div className="d-flex">
                        <span style={{ display: "flex" }}>
                          <div>
                            <Field>
                            <Input
                           {...register("datalog", { required: true })}
                            type="radio"
                            value="yes"
                            id="yes"
                            name="datalog"
                           
                            className="customRadio"
                        />
                            </Field>
                          </div>
                         
                        <div>
                        <label className="space">Yes</label>
                        </div>
                          
                        </span>
                        <span style={{ display: "flex" }}>
                          <div>
                            <Field>
                            <Input
                           {...register("datalog", { required: true })}
                            type="radio"
                            value="no"
                            id="no"
                            name="datalog"
                            
                            className="customRadioMargin"
                        />
                            </Field>
                          </div>
                       
                        <div>
                        <label className="space">No</label>
                        </div>
                         
                        </span>
                        <span style={{ display: "flex" }}>
                          <div>
                            <Field>
                            <Input
                           {...register("datalog", { required: true })}
                            type="radio"
                            value="na"
                            id="na"
                            name="datalog"
                            
                            className="customRadioMargin"
                          />
                            </Field>
                          </div>
                          
                          <div>
                          <label
                            className="space"
                            
                          >
                            NA
                          </label>
                          </div>
                          
                        </span>
                        <div className="text-danger mt-3">
                            {errors.datalog &&  <p className="error">
                              "This field is required." </p>}
                          </div>
                      </div>
                    </div>
                  </div>

                  {/* ----------------------------------Second Column----------------------------- */}
                  <div className="col-6">
                    <div className="cardcolhed p-3">
                      <div className="mb-3 new1">
                        <text>
                          TRF received along with sample details matches with
                          the details mentioned on the sample label?
                        </text>
                      </div>
                      <div className="d-flex">
                        <span style={{ display: "flex"}}>
                          <div>
                            <Field>
                            <Input
                           {...register("samplematch", { required: true })}
                            type="radio"
                            value="yes"
                            id="yes"
                            name="samplematch"
                           
                            className="customRadio"
                          />
                            </Field>
                          </div>
                          
                          <div>
                          <label className="space">Yes</label>
                          </div>
                          
                        </span>
                        <span style={{ display: "flex" }}>
                          <div>
                            <Field>
                            <Input
                           {...register("samplematch", { required: true })}
                            type="radio"
                            value="no"
                            id="no"
                            name="samplematch"
                           
                            className="customRadioMargin"
                        />
                            </Field>
                          </div>
                        
                        <div>
                        <label className="space">No</label>
                        </div>
                          
                        </span>
                        <span style={{ display: "flex" }}>
                          <div>
                            <Field>
                            <Input
                           {...register("samplematch", { required: true })}
                            type="radio"
                            value="na"
                            id="na"
                            name="samplematch"
                            
                            className="customRadioMargin"
                          />
                            </Field>
                          </div>
                         
                          <div>
                          <label
                            className="space"
                            
                          >
                            NA
                          </label>
                          </div>
                          
                        </span>
                        <div className="text-danger mt-3">
                            {errors.samplematch &&  <p className="error">
                              "This field is required." </p>}
                          </div>
                      </div>

                      <div className="mt-3 mb-3 new1">
                        <text>
                          Is the Method of analysis/Pharmacopeial reference
                          details mentioned on the TRF?
                        </text>
                      </div>
                      <div className="d-flex">
                        <span style={{ display: "flex"}}>
                          <div>
                            <Field>
                            <Input
                           {...register("method", { required: true })}
                            type="radio"
                            value="yes"
                            id="yes"
                            name="method"
                           
                            className="customRadio"
                          />
                            </Field>
                          </div>
                          
                          <div>
                          <label className="space">Yes</label>
                          </div>
                          
                        </span>
                        <span style={{ display: "flex" }}>
                          <div>
                            <Field>
                            <Input
                           {...register("method", { required: true })}
                            type="radio"
                            value="no"
                            id="no"
                            name="method"
                           
                            className="customRadioMargin"
                        />
                            </Field>
                          </div>
                        
                        <div>
                        <label className="space">No</label>
                        </div>
                          
                        </span>
                        <span style={{ display: "flex" }}>
                          <div>
                            <Field>
                            <Input
                           {...register("method", { required: true })}
                            type="radio"
                            value="na"
                            id="na"
                            name="method"
                            
                            className="customRadioMargin"
                          />
                            </Field>
                          </div>
                         
                          <div>
                          <label
                            className="space" >
                            NA
                          </label>
                          </div>
                          
                        </span>
                        <div className="text-danger mt-3">
                            {errors.method &&  <p className="error">
                              "This field is required." </p>}
                          </div>
                      </div>

                      <div className="mt-3 mb-3 new1">
                        <text>
                          For regulatory release approved
                          STP/Specification/justification (if any) is received
                          from the customer to initiate the batch analysis
                        </text>
                      </div>
                      <div className="d-flex">
                        <span style={{ display: "flex" }}>
                          <div>
                            <Field>
                            <Input
                           {...register("specification", { required: true })}
                            type="radio"
                            value="yes"
                            id="yes"
                            name="specification"
                            
                            className="customRadio"
                          />
                            </Field>
                          </div>
                          
                          <div>
                          <label className="space">Yes</label>
                          </div>
                          
                        </span>
                        <span style={{ display: "flex"}}>
                          <div>
                            <Field>
                            <Input
                           {...register("specification", { required: true })}
                            type="radio"
                            value="no"
                            id="no"
                            name="specification"
                            
                            className="customRadioMargin"
                          />
                            </Field>
                          </div>
                          
                          <div>
                          <label className="space">No</label>
                          </div>
                          
                        </span>
                        <span style={{ display: "flex"}}>
                          <div>
                            <Field>
                            <Input
                           {...register("specification", { required: true })}
                            type="radio"
                            value="na"
                            id="na"
                            name="specification"
                            
                            className="customRadioMargin"
                          />
                            </Field>
                          </div>
                          
                          <div>
                          <label
                            className="space"
                           
                          >
                            NA
                          </label>
                          </div>
                          
                        </span>
                        <div className="text-danger mt-3">
                            {errors.specification &&  <p className="error">
                              "This field is required." </p>}
                          </div>
                      </div>

                      <div className="mt-3 mb-3 new1">
                        <text>Is the sample type marked on the TRF?</text>
                      </div>
                      <div className="d-flex">
                        <span style={{ display: "flex" }}>
                          <div>
                            <Field>
                            <Input
                           {...register("sampletype", { required: true })}
                            type="radio"
                            value="yes"
                            id="yes"
                            name="sampletype"
                            
                            className="customRadio"
                          />
                            </Field>
                          </div>
                      
                          <div>
                          <label className="space">Yes</label>
                          </div>
                          
                        </span>
                        <span style={{ display: "flex" }}>
                          <div>
                            <Field>
                            <Input
                           {...register("sampletype", { required: true })}
                            type="radio"
                            value="no"
                            id="no"
                            name="sampletype"
                            
                            className="customRadioMargin"
                          />
                            </Field>
                          </div>
                        
                          <div>
                          <label className="space">No</label>
                          </div>
                         
                        </span>
                        <span style={{ display: "flex" }}>
                          <div>
                            <Field>
                            <Input
                           {...register("sampletype", { required: true })}
                            type="radio"
                            value="na"
                            id="na"
                            name="sampletype"
                            
                            className="customRadioMargin"
                          />
                            </Field>
                          </div>
                        
                          <div>
                          <label
                            className="space"
                          >
                            NA
                          </label>
                          </div>
                          
                        </span>
                        <div className="text-danger mt-3">
                            {errors.sampletype &&  <p className="error">
                              "This field is required." </p>}
                          </div>
                      </div>

                      <div className="mt-3 mb-3 new1">
                        <text>
                          Is the Analytical test parameter of the sample mention
                          on TRF?
                        </text>
                      </div>
                      <div className="d-flex">
                        <span style={{ display: "flex"}}>
                          <div>
                            <Field>
                            <Input
                           {...register("testparam", { required: true })}
                            type="radio"
                            value="yes"
                            id="yes"
                            name="testparam"
                            
                         className="customRadio"
                          />
                            </Field>
                          </div>
                        
                          <div>
                          <label className="space">Yes</label>
                          </div>
                          
                        </span>
                        <span style={{ display: "flex"}}>
                          <div>
                            <Field>
                            <Input
                           {...register("testparam", { required: true })}
                            type="radio"
                            value="no"
                            id="no"
                            name="testparam"
                            
                            className="customRadioMargin"
                          />
                            </Field>
                          </div>
                          
                          <div>
                          <label className="space">No</label>
                          </div>
                          
                        </span>
                        <span style={{ display: "flex"}}>
                          <div>
                            <Field>
                            <Input
                           {...register("testparam", { required: true })}
                            type="radio"
                            value="na"
                            id='na'
                            name="testparam"
                            className="customRadioMargin"
                          />
                            </Field>
                          </div>
                         
                          <div>
                          <label
                            className="space"
                          
                          >
                            NA
                          </label>
                          </div>
                          
                        </span>
                        <div className="text-danger mt-3">
                            {errors.testparam &&  <p className="error">
                              "This field is required." </p>}
                          </div>
                      </div>

                      <div className="mt-3 mb-3 new1">
                        <text>Comments</text>
                      </div>
                      <div >
                        <div className="d-flex">
                        <Input
                         {...register("comments", { required: true })}
                        className="commentsInput"
                          type="text" 
                          id="comments" />
                          </div>
                           <div className="text-danger mt-3">
                            {errors.comments &&  <p className="error">
                              "This field is required." </p>}
                          </div>
                      </div>

                     
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3 mb-3">
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            margin: 10,
                          
                            
                          }}
                        >
                          <div>
                            <Button
                            type="button"
                            className="previous"
                             onClick={()=>onButtonClick("ConfirmDetails")}
                            >
                              <BiLeftArrowAlt size={24} />&nbsp;
                              Previous
                            </Button>
                          </div>
                            
                            <div>
                          <Button
                          type="button"
                          onClick={()=>saveData('reject')}
                          className="previous"
                          >
                            <TbLogout2 size={24} />&nbsp;
                            Reject
                          </Button>
                          <Button
                            type="button"
                            className="cardbutton"
                            onClick={()=>saveData('accept')}
                      
                          >
                             <MdDone size={24} color="#fff" />&nbsp;Accept
                          </Button>
                          </div>
                        </div>
                      </div>






            </div>
            </fieldset>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
}
