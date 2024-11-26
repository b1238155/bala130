import React, { useState , useEffect} from "react";

import { Col, Row, Table } from "react-bootstrap";
import { PiFilePdfFill } from "react-icons/pi";
// import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import { useSelector,useDispatch } from "react-redux";
import { changeSubmitData} from "../redux/FormSlice";

import printlogo from "../assets/logo 2.png"

export default function ConfirmDetails({onButtonClick}) {
  const dispatch = useDispatch();
  const token  = useSelector((state) => state.form.usertoken.token);
  const [newArray,setNewArray]=useState([])
  const form=useSelector(state =>state.form.customer);
  const sample=useSelector(state =>state.form.sampleDetails);
  const analysis=useSelector(state =>state.form.data);
  const batch=useSelector(state=>state.form.tabledata); 
console.log("analysis",analysis)
console.log("batch", batch)
console.log("form",form)
const item={
  companyName:form.company,
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
  sampleName:sample.sampleName,
  reportRequiredaAsPerForm39:sample.report,
  storageCondition: sample.storage,
  natureOfSample:sample.natureOfSample,
  sampleType:sample.sampleType,
  sampleRetentionRequired:sample.sampleretension ,
  typeOfSubmission:sample.submissiontype,
  batchDetails:batch,
  regulatory:analysis.formfilling,
  otherThanRegulatory:analysis.analyticalfeasibile ,
  vvtddRefNo:analysis.methodvalidation,
  methodology: analysis.methodologyfollowed,
  testToBeCarriedOut:analysis.test,
  attachment:analysis.choosefile,
  specialInstruction:analysis.specialInstruction 
}
console.log("item", item)
const postapicall=()=>{
fetch("http://3.91.97.121:3000/api/sampleDetails/createSample", {
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
console.log("newarray",newArray)
  const handleSubmit=()=>{
    postapicall()
    dispatch(changeSubmitData(newArray))

    onButtonClick("SampleVerification")
  }
  const [printing, setPrinting] = useState(false);
  
  useEffect(() => {
   
    if (printing) {
      window.print();
      setPrinting(false);
    }
},[printing]
  )



  return (
    <div>
      

      <div>
        <div className="printmain">

            <div className="printlogo">
                <img src={printlogo} alt="logo" />
            </div>
       

          <div className="mt-3">
            <text className="mainheadtitle">Please Confirm the details</text>
          </div>

          <div className="mt-2">
            <text className="mainheadtitlesub">Company details</text>
            <hr />
          </div>

          <Row className="rowtabview">
            <Col className="">
              <div className="d-flex row " >
                <text className="cardcolhed" xs={8}>Contact Person Name</text>
                <text className="cardcolhedtext mt-1">{form.contactPersonName}</text>
              </div>
            </Col>
            <Col className="columnMb">
              <div className="d-flex row ">
                <text className="cardcolhed">Manufacturing Lic No</text>
                <text className="cardcolhedtext mt-1">{form.licenceNo}</text>
              </div>
            </Col>
            <Col  className="columnMb">
              <div className="d-flex row ">
                <text className="cardcolhed ">Email Id</text>
                <text className="cardcolhedtext mt-1 ">{form.emailId}</text>
              </div>
            </Col>
            <Col className="columnMb">
              <div className="d-flex row ">
                <text className="cardcolhed">Company Name & Address</text>
                <text className="cardcolhedtext mt-1">
                  {form.company},{form.address1}
                </text>
              </div>
            </Col>
          </Row>

          <Row className="mt-3 rowtabview">
            <Col className="columnMb col-3">
              <div className="d-flex row">
                <text className="cardcolhed">Phone Number</text>
                <text className="cardcolhedtext mt-1">{form.phoneNo}</text>
              </div>
            </Col>
            <Col className="columnMb col-4">
              <div className="d-flex row">
                <text className="cardcolhed">Additional Phone Number</text>
                <text className="cardcolhedtext mt-1">{form.phoneNo1}</text>
              </div>
            </Col>
          </Row>

          <div className="mt-3">
            <text className="mainheadtitlesub">Sample details</text>
            <hr />
          </div>

          <Row className="rowtabview">
            <Col className="">
              <div className="d-flex row">
                <text className="cardcolhed">Name of the Sample</text>
                <text className="cardcolhedtext mt-1">{sample.samplename}</text>
              </div>
            </Col>
            <Col className="columnMb">
              <div className="d-flex row">
                <text className="cardcolhed">Storage Condition</text>
                <text className="cardcolhedtext mt-1">{sample.storage}</text>
              </div>
            </Col>
            <Col className="columnMb">
              <div className="d-flex row">
                <text className="cardcolhed">Type of Submission</text>
                <text className="cardcolhedtext mt-1">{sample.submissiontype}</text>
              </div>
            </Col>
            <Col className="columnMb">
              <div className="d-flex row">
                <text className="cardcolhed">Sample Type</text>
                <text className="cardcolhedtext mt-1">{(sample.sampletype).join('    ,   ')}</text>
              </div>
            </Col>
          </Row>

          <Row className="mt-3 rowtabview">
            <Col className="columnMb col-3">
              <div className="d-flex row">
                <text className="cardcolhed">Nature of Sample</text>
                <text className="cardcolhedtext mt-1">{sample.natureofsample}</text>
              </div>
            </Col>
            <Col className="columnMb col-3">
              <div className="d-flex row">
                <text className="cardcolhed">
                  Report required as per Form-39*
                </text>
                <text className="cardcolhedtext mt-1">{sample.report}</text>
              </div>
            </Col>
            <Col className="columnMb col-6">
              <div className="d-flex row">
                <text className="cardcolhed">
                  Sample Retention required(Drug Product/Substance){" "}
                </text>
                <text className="cardcolhedtext mt-1">{sample.sampleretension}</text>
              </div>
            </Col>
          </Row>

          <div className="mt-3">
            <text className="mainheadtitlesub">Batch details</text>
            <hr />
          </div>

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
                  <th>testparameters</th>
                  {/* <th>Edit & Delete</th> */}
                </tr>
              </thead>
              <tbody className="tablebody-custom">
                
              {batch.map(item => (
    
                      <tr key={item.id}>
                
                  <td>{item.id}</td>
                       <td>{item.batchNo}</td>
                        <td>{item.batchSize}</td>
                        <td>{item.natureOfPacking}</td>
                        <td>{item.mfgDate}</td>
                        <td>{item.expDate}</td>
                        <td>{item.retestDate}</td>
                        <td>{item.sampleQuantity}</td>
                        <td>
                        {item.testparameters.map((value,index)=>(
                         <li key={index}>{value.label}</li>
                        ))}
                   </td>
                        </tr>
              )           
                          
)}
              
              </tbody>
            </Table>
          {/* </Card> */}

          <div className="mt-3">
            <text className="mainheadtitlesub">Type of Analysis</text>
            <hr />
          </div>

          <Row className="rowtabview">
            <Col className="">
              <div className="d-flex row">
                <text className="cardcolhed">
                  Regulatory(Form-39/DMF Filing/ANDA Filing/Any Query)
                </text>
                <text className="cardcolhedtext mt-1">{analysis.formfilling}</text>
              </div>
            </Col>
            <Col className="columnMb">
              <div className="d-flex row">
                <text className="cardcolhed">Other than Regulatory </text>
                <text className="cardcolhedtext mt-1"><ul>{(analysis.analyticalfeasibile)}</ul></text>
              </div>
            </Col>
          </Row>

          <Row className="mt-3 rowtabview">
            <Col className="columnMb">
              <div className="d-flex row">
                <text className="cardcolhed">
                  Test to be carried out as per{" "}
                </text>
                <text className="cardcolhedtext mt-1">{analysis.test}</text>
              </div>
            </Col>
            <Col className="columnMb">
              <div className="d-flex row">
                <text className="cardcolhed">
                  Special Instructions If any other{" "}
                </text>
                <text className="cardcolhedtext mt-1">{analysis.specialinstruction}</text>
              </div>
            </Col>
          </Row>

          <Row className="mt-3 rowtabview">
            <Col className="columnMb">
              <div className="d-flex row">
                <text className="cardcolhed">
                  If Method Validation/Verification/Transfer/Development are
                  performed atRevin Labs please specify the Report Ref.num.{" "}
                </text>
                <text className="cardcolhedtext mt-1">{analysis.methodvalidation}</text>
              </div>
            </Col>
            <Col className="columnMb">
              <div className="d-flex row">
                <text className="cardcolhed">
              
                </text>
                <text className="cardcolhedtext mt-1"></text>
              </div>
            </Col>
          </Row>

          <Row className="mt-3 rowtabview">
            <Col className="columnMb">
              <div className="d-flex row">
                <text className="cardcolhed">Methodology </text>
                <text className="cardcolhedtext mt-1">{analysis.methodologyfollowed}</text>
              </div>
            </Col>
            <Col className="columnMb">
              <div className="d-flex row">
                <text className="cardcolhed">Attachments </text>
                <span>
                  <PiFilePdfFill />
                  <div>{Array.from(analysis.choosefile).map(f => (<text className="cardcolhedtext mt-1" key={f.name}> {f.name}</text>
      ))}
    </div>
                  {/* <text className="cardcolhedtext mt-1">{}</text> */}
                </span>
              </div>
            </Col>
          </Row>

          <hr />

          {/* <div className="cardbuttonboubleend mb-3">
            <button
              className="cardbuttonoutline"
              onClick={() => onButtonClick("TypeOfAnalysis")}
            >
              <BiLeftArrowAlt size={24} /> Previous
            </button>
            <button
              className="cardbutton"
              type="submit"
                onClick={handleSubmit}
            >
              Confirm <BiRightArrowAlt size={24} />
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}