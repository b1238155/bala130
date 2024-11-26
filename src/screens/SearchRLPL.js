import React, { useState, useEffect } from "react";
import "./Styles.css";
import { AiOutlineLeft } from "react-icons/ai";
import Sidenavbar from '../components/Sidenavbar';
import NavbartitleAddco from "../components/NavbartitleAddco";
import { useNavigate } from "react-router-dom";
import { Col, Row, Table } from "react-bootstrap";
import { PiFilePdfFill } from "react-icons/pi";
// import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import { useSelector } from "react-redux";

export default function SearchRLPL() {
  const navigate = useNavigate();
  const rlpl = useSelector((state) => state.form.companydetail.companydetail);
  const analystView=rlpl[0]
  console.log("view", analystView.rlplNumber)

  const handleSubmit=()=>{
    navigate("/SroDashboard")
  }
  function combineValues(...values) {
    const nonEmptyValues = values.filter(value => value !== "" && value !== undefined);
    return nonEmptyValues.length > 0 ? nonEmptyValues.join(", ") : "N/A";
  }

  return (
    <div className='app'>
    <NavbartitleAddco/>
    
    <div className='d-flex'>
    
                <Sidenavbar />
    
                <div className='main'>
                    <div className='mainitem'>
                    <div
              className="analystbackbutton mt-3"
              onClick={() => navigate("/SroDashboard")}
            >
              <AiOutlineLeft
                onClick={() =>
                  navigate("/SroDashboard")
                }
              />{" "}
              <text>back</text>
            </div>
            {analystView?(
           <div className="">
            <text className="mainheadtitle">Name Of the Sample : <span>{analystView.sampleDetails.sampleName}</span></text>
          </div>):( <div>N/A</div>)}

          <div className="mt-2">
            <text className="mainheadtitlesub">Company details</text>
            <hr />
          </div>
          {analystView?(
          <Row className="rowtabview">
            <Col className="">
              <div className="d-flex row " >
                <text className="cardcolhed" xs={8}>Contact Person Name</text>
            
                <text className="cardcolhedtext mt-1">{analystView.sampleDetails.contactPerson}</text>
              </div>
            </Col>
            <Col className="columnMb">
              <div className="d-flex row ">
                <text className="cardcolhed">Manufacturing Lic No</text>
                
                <text className="cardcolhedtext mt-1">{analystView.sampleDetails.manufacturingLicenseNumber}</text>
              </div>
            </Col>
            <Col  className="columnMb">
              <div className="d-flex row ">
                <text className="cardcolhed ">Email Id</text>
                
                <text className="cardcolhedtext mt-1 ">{analystView.sampleDetails.email}</text>
              </div>
            </Col>
            <Col className="columnMb">
              <div className="d-flex row ">
                <text className="cardcolhed">Company Name & Address</text>
                
                <text className="cardcolhedtext mt-1">
                  {analystView.sampleDetails.companyName},{analystView.sampleDetails.address1}
                </text>
              </div>
            </Col>
          </Row>):( <div>N/A</div>)}
          {analystView?(
          <Row className="mt-3 rowtabview">
            <Col className="columnMb col-3">
              <div className="d-flex row">
                <text className="cardcolhed">Phone Number</text>
                
                <text className="cardcolhedtext mt-1">{analystView.sampleDetails.mobileNumber}</text>
              </div>
            </Col>
            <Col className="columnMb col-4">
              <div className="d-flex row">
                <text className="cardcolhed">Additional Phone Number</text>
                
                <text className="cardcolhedtext mt-1"></text>
              </div>
            </Col>
          </Row>):( <div>N/A</div>)}

          <div className="mt-3">
            <text className="mainheadtitlesub">Sample details</text>
            <hr />
          </div>
          {analystView?(
          <Row className="rowtabview">
            <Col className="">
              <div className="d-flex row">
                <text className="cardcolhed">Name of the Sample</text>
                
                <text className="cardcolhedtext mt-1">{analystView.sampleDetails.sampleName}</text>
              </div>
            </Col>
            <Col className="columnMb">
              <div className="d-flex row">
                <text className="cardcolhed">Storage Condition</text>
              
                <text className="cardcolhedtext mt-1">{analystView.sampleDetails.storageCondition}</text>
              </div>
            </Col>
            <Col className="columnMb">
              <div className="d-flex row">
                <text className="cardcolhed">Type of Submission</text>
                
                <text className="cardcolhedtext mt-1">{analystView.sampleDetails.typeOfSubmission}</text>
              </div>
            </Col>
            <Col className="columnMb">
           
              <div className="d-flex row">
             
                <text className="cardcolhed">Sample Type</text>{analystView.sampleDetails.sampleType?
                
                <text className="cardcolhedtext mt-1">{analystView.sampleDetails.sampleType.join(",")}</text>:<text className="cardcolhedtext mt-1">NA</text>}
            
              </div>
             
            </Col>
          </Row>):( <div>N/A</div>)}
          {analystView?(
          <Row className="mt-3 rowtabview">
            <Col className="columnMb col-3">
              <div className="d-flex row">
                <text className="cardcolhed">Nature of Sample</text>

                <text className="cardcolhedtext mt-1">{analystView.sampleDetails.natureOfSample}</text> 
              </div>
            </Col>
            <Col className="columnMb col-3">
              <div className="d-flex row">
                <text className="cardcolhed">
                  Report required as per Form-39*
                </text>
                <text className="cardcolhedtext mt-1">{analystView.sampleDetails.reportRequiredaAsPerForm39}</text>
              </div>
            </Col>
            <Col className="columnMb col-6">
              <div className="d-flex row">
                <text className="cardcolhed">
                  Sample Retention required(Drug Product/Substance){" "}
                </text>
                <text className="cardcolhedtext mt-1">{analystView.sampleDetails.sampleRetentionRequired}</text>
              </div>
            </Col>
          </Row>):( <div>N/A</div>)}

          <div className="mt-3">
            <text className="mainheadtitlesub">Batch & RLPL details</text>
            <hr />
          </div>
          
        
        <div style={{border:"1px solid", borderColor:"#000",padding:5,paddingTop:20,marginBottom:10}}>
            <Table responsive >
               
              <thead className="table-custom">

                <tr>
                  <th>S.No</th>
                  <th>RLPL ID</th>
                  <th>Batch No./Lot No(s)</th>
                  <th>Batch Size</th>
                  <th>Nature Of Packaging</th>
                  <th>Mfg. Date</th>
                  <th>Exp. Date</th>
                  <th>Retest Date</th>
                  <th>Sample Quantity</th>
                
               
                </tr>
              </thead>

             

              <tbody className="tablebody-custom">
               
                <tr >
                  <td>{1}</td>
                  <td>{analystView.rlplNumber}</td>
                  <td>{analystView.batchNo}</td>
      <td>{combineValues(analystView.batchSize)}</td>
      <td>{combineValues(analystView.natureOfPacking)}</td>
      <td>{combineValues(analystView.mfgDate)}</td>
      <td>{combineValues(analystView.expDate)}</td>
      <td>{combineValues(analystView.retestDate)}</td>
      <td>{combineValues(analystView.sampleQuantity)}</td>
    </tr>
                         
                          
</tbody>

</Table>
{analystView.tdsDetails && analystView.tdsDetails.length > 0 ? (
  <Table className="table-customsub" >
    <thead style={{backgroundColor:"#505050"}}>
      <tr>
  <th>RLPL Number</th>
     <th>TDS Number </th>
     <th>Test Parameter</th>
      <th>Current Status </th>
      </tr>
    </thead>
    <tbody style={{backgroundColor:'#ffffff',color:'#8f8f8f'}}>
  
         {analystView.tdsDetails.map((item1, i) => (
            <tr key={i+1}>
    <td>{analystView.rlplNumber}</td>
    <td>{item1.tdsNumber}</td>
    <td>{item1.testDataCode}</td>
    <td> <text style={{backgroundColor:"##9AC037"}}>{item1.status}</text></td>
    </tr>))}
    </tbody>
  
  </Table>):(
    <Table className="table-customsub" >
      <tbody style={{backgroundColor:'#ffffff',color:'#8f8f8f'}}> <tr>
      <td colSpan="9">TDS not yet created</td>
    </tr></tbody>
    </Table>
   
  )}

  </div>


 

    




{/* -----------------------------------table two -------------------------- */}

           <div className="mt-3">
            <text className="mainheadtitlesub">Type of Analysis</text>
            <hr />
          </div>
          {analystView.sampleDetails ?(
          <Row className="rowtabview">
            <Col className="">
            
              <div className="d-flex row">
             
                <text className="cardcolhed">
                  Regulatory(Form-39/DMF Filing/ANDA Filing/Any Query)
                </text>
                {analystView.sampleDetails.regulatory?
                <text className="cardcolhedtext mt-1">{analystView.sampleDetails.regulatory}</text>:<text className="cardcolhedtext mt-1">N/A</text>}
              </div>
            </Col>
            <Col className="columnMb">
              <div className="d-flex row">
                <text className="cardcolhed">Other than Regulatory </text>
                {analystView.sampleDetails.otherThanRegulatory ?
                <text className="cardcolhedtext mt-1"><ul>{(analystView.sampleDetails.otherThanRegulatory).join(",")}</ul></text>:<text className="cardcolhedtext mt-1">N/A</text>}
              </div>
            </Col>
          </Row>):( <div>N/A</div>)}
          {analystView?(
          <Row className="mt-3 rowtabview">
            <Col className="columnMb">
              <div className="d-flex row">
                <text className="cardcolhed">
                  Test to be carried out as per{" "}
                </text>
                {analystView.sampleDetails.testToBeCarriedOut ?
                <text className="cardcolhedtext mt-1">{analystView.sampleDetails.testToBeCarriedOut.join("   ,  ")}</text>:<text className="cardcolhedtext mt-1">N/A</text>}
              </div>
            </Col>
            <Col className="columnMb">
              <div className="d-flex row">
                <text className="cardcolhed">
                  Special Instructions If any other{" "}
                </text>
                {analystView.sampleDetails.specialInstruction?
                <text className="cardcolhedtext mt-1">{analystView.sampleDetails.specialInstruction}</text>:<text className="cardcolhedtext mt-1">N/A</text>}
              </div>
            </Col>
          </Row>):( <div>N/A</div>)}
          {analystView?(
          <Row className="mt-3 rowtabview">
            <Col className="columnMb">
            
              <div className="d-flex row">
                <text className="cardcolhed">
                  If Method Validation/Verification/Transfer/Development are
                  performed atRevin Labs please specify the Report Ref.num.{" "}
                </text>
                {analystView.sampleDetails.vvtddRefNo?
                <text className="cardcolhedtext mt-1">{analystView.sampleDetails.vvtddRefNo}</text>:<text className="cardcolhedtext mt-1">N/A</text>}
              </div>
            </Col>
            <Col className="columnMb">
              <div className="d-flex row">
                <text className="cardcolhed">
              
                </text>
                <text className="cardcolhedtext mt-1"></text>
              </div>
            </Col>
          </Row>):( <div>N/A</div>)}
          {analystView?(
          <Row className="mt-3 rowtabview">
            <Col className="columnMb">
            
              <div className="d-flex row">
                <text className="cardcolhed">Methodology </text>
                {analystView.sampleDetails.methodology?
                <text className="cardcolhedtext mt-1">{analystView.sampleDetails.methodology}</text>:<text className="cardcolhedtext mt-1">N/A</text>}
              </div>
            </Col>
            <Col className="columnMb">
              <div className="d-flex row">
                <text className="cardcolhed">Attachments </text>
                <span>
                  <PiFilePdfFill />
                  {analystView.sampleDetails.attachment?
                  <div><text className="cardcolhedtext mt-1">{(analystView.sampleDetails.attachment).join(",")}</text>
  
                  </div>:<text className="cardcolhedtext mt-1">N/A</text>}
  
  
                </span>
              </div>
            </Col>
          </Row> ):( <div>N/A</div>)}

          <hr />

          <div className="cardbuttonboubleend mb-3">
            {/* <button
              className="previous"
              onClick={() => onButtonClick("TypeOfAnalysis")}
            >
              <BiLeftArrowAlt size={24} /> Previous
            </button> */}
            <button
              className="cardbutton"
              type="submit"
                onClick={handleSubmit}
            >
              DONE 
              {/* <BiRightArrowAlt size={24} /> */}
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>

  );
}