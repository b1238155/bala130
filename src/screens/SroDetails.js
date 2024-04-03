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
import axios from "axios";
import SubTable from '../components/SubTable';
export default function SroDetails() {
  const [analystView, setAnalystView] = useState({});
  const navigate = useNavigate();
  const id = useSelector((state) => state.form.SroId.SroId);
  const token = useSelector((state) => state.form.usertoken.token);
  console.log(id)
  useEffect(() => {
    axios
      .get(
        "http://54.167.30.227:3000/api/sampleDetails/getSampleById?sampleId="+id,
        {
          headers: {
            "Content-Type": "application/json",
            'Authorization': token,
          },
        }
      )

      .then((response) => setAnalystView(response.data))
      .catch((error) => console.error("Error fetching batch data:", error));
  }, [id, token]);
  console.log("analystview", analystView);
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

          <div className="">
            <text className="mainheadtitle">Name Of the Sample : <span>{analystView.sampleName}</span></text>
          </div>

          <div className="mt-2">
            <text className="mainheadtitlesub">Company details</text>
            <hr />
          </div>

          <Row className="rowtabview">
            <Col className="">
              <div className="d-flex row " >
                <text className="cardcolhed" xs={8}>Contact Person Name</text>
            
                <text className="cardcolhedtext mt-1">{analystView.contactPerson}</text>
              </div>
            </Col>
            <Col className="columnMb">
              <div className="d-flex row ">
                <text className="cardcolhed">Manufacturing Lic No</text>
                
                <text className="cardcolhedtext mt-1">{analystView.manufacturingLicenseNumber}</text>
              </div>
            </Col>
            <Col  className="columnMb">
              <div className="d-flex row ">
                <text className="cardcolhed ">Email Id</text>
                
                <text className="cardcolhedtext mt-1 ">{analystView.email}</text>
              </div>
            </Col>
            <Col className="columnMb">
              <div className="d-flex row ">
                <text className="cardcolhed">Company Name & Address</text>
                
                <text className="cardcolhedtext mt-1">
                  {analystView.companyName},{analystView.address1}
                </text>
              </div>
            </Col>
          </Row>

          <Row className="mt-3 rowtabview">
            <Col className="columnMb col-3">
              <div className="d-flex row">
                <text className="cardcolhed">Phone Number</text>
                
                <text className="cardcolhedtext mt-1">{analystView.mobileNumber}</text>
              </div>
            </Col>
            <Col className="columnMb col-4">
              <div className="d-flex row">
                <text className="cardcolhed">Additional Phone Number</text>
                
                <text className="cardcolhedtext mt-1"></text>
              </div>
            </Col>
          </Row>

          <div className="mt-3">
            <text className="mainheadtitlesub">Sample details</text>
            <hr />
          </div>
          {analystView?(
          <Row className="rowtabview">
            <Col className="">
              <div className="d-flex row">
                <text className="cardcolhed">Name of the Sample</text>
                
                <text className="cardcolhedtext mt-1">{analystView.sampleName}</text>
              </div>
            </Col>
            <Col className="columnMb">
              <div className="d-flex row">
                <text className="cardcolhed">Storage Condition</text>
              
                <text className="cardcolhedtext mt-1">{analystView.storageCondition}</text>
              </div>
            </Col>
            <Col className="columnMb">
              <div className="d-flex row">
                <text className="cardcolhed">Type of Submission</text>
                
                <text className="cardcolhedtext mt-1">{analystView.typeOfSubmission}</text>
              </div>
            </Col>
            <Col className="columnMb">
           
              <div className="d-flex row">
             
                <text className="cardcolhed">Sample Type</text>{analystView.sampleType?
                
                <text className="cardcolhedtext mt-1">{analystView.sampleType.join(",")}</text>:<text className="cardcolhedtext mt-1">NA</text>}
            
              </div>
             
            </Col>
          </Row>):( <div>N/A</div>)}
          {analystView?(
          <Row className="mt-3 rowtabview">
            <Col className="columnMb col-3">
              <div className="d-flex row">
                <text className="cardcolhed">Nature of Sample</text>

                <text className="cardcolhedtext mt-1">{analystView.natureOfSample}</text> 
              </div>
            </Col>
            <Col className="columnMb col-3">
              <div className="d-flex row">
                <text className="cardcolhed">
                  Report required as per Form-39*
                </text>
                <text className="cardcolhedtext mt-1">{analystView.reportRequiredaAsPerForm39}</text>
              </div>
            </Col>
            <Col className="columnMb col-6">
              <div className="d-flex row">
                <text className="cardcolhed">
                  Sample Retention required(Drug Product/Substance){" "}
                </text>
                <text className="cardcolhedtext mt-1">{analystView.sampleRetentionRequired}</text>
              </div>
            </Col>
          </Row>):( <div>N/A</div>)}

          <div className="mt-3">
            <text className="mainheadtitlesub">Batch & RLPL details</text>
            <hr />
          </div>
          
          {analystView.batchDetails ? (
       analystView.batchDetails.map((item, i)=> (
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
                  {/* <th>testParameter</th> */}
               
                </tr>
              </thead>

             

              <tbody className="tablebody-custom">
               
                <tr key={i}>
                  <td>{i+1}</td>
                  <td>{item.rlplNumber}</td>
                  <td>{item.batchNo}</td>
      <td>{combineValues(item.batchSize)}</td>
      <td>{combineValues(item.natureOfPacking)}</td>
      <td>{combineValues(item.mfgDate)}</td>
      <td>{combineValues(item.expDate)}</td>
      <td>{combineValues(item.retestDate)}</td>
      <td>{combineValues(item.sampleQuantity)}</td>
    </tr>
                         
                          
</tbody>

</Table>
{item.tdsDetails && item.tdsDetails.length > 0 ? (
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
  
         { item.tdsDetails.map((item1, i) => (
            <tr key={i+1}>
    <td>{item.rlplNumber}</td>
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
))
) : (
  <Table>
  <tbody className="tablebody-custom">
    <tr>
      <td colSpan="9">Data not available</td>
    </tr>
  </tbody>
  </Table>
)}

 

    




{/* -----------------------------------table two -------------------------- */}

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
                {analystView.regulatory?
                <text className="cardcolhedtext mt-1">{analystView.regulatory}</text>:<text className="cardcolhedtext mt-1">N/A</text>}
              </div>
            </Col>
            <Col className="columnMb">
              <div className="d-flex row">
                <text className="cardcolhed">Other than Regulatory </text>
                {analystView.otherThanRegulatory ?
                <text className="cardcolhedtext mt-1"><ul>{(analystView.otherThanRegulatory).join(",")}</ul></text>:<text className="cardcolhedtext mt-1">N/A</text>}
              </div>
            </Col>
          </Row>

          <Row className="mt-3 rowtabview">
            <Col className="columnMb">
              <div className="d-flex row">
                <text className="cardcolhed">
                  Test to be carried out as per{" "}
                </text>
                {analystView.testToBeCarriedOut ?
                <text className="cardcolhedtext mt-1">{analystView.testToBeCarriedOut.join("   ,  ")}</text>:<text className="cardcolhedtext mt-1">N/A</text>}
              </div>
            </Col>
            <Col className="columnMb">
              <div className="d-flex row">
                <text className="cardcolhed">
                  Special Instructions If any other{" "}
                </text>
                {analystView.specialInstruction?
                <text className="cardcolhedtext mt-1">{analystView.specialInstruction}</text>:<text className="cardcolhedtext mt-1">N/A</text>}
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
                {analystView.vvtddRefNo?
                <text className="cardcolhedtext mt-1">{analystView.vvtddRefNo}</text>:<text className="cardcolhedtext mt-1">N/A</text>}
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
                {analystView.methodology?
                <text className="cardcolhedtext mt-1">{analystView.methodology}</text>:<text className="cardcolhedtext mt-1">N/A</text>}
              </div>
            </Col>
            <Col className="columnMb">
              <div className="d-flex row">
                <text className="cardcolhed">Attachments </text>
                <span>
                  <PiFilePdfFill />
                  {analystView.attachment?
                  <div><text className="cardcolhedtext mt-1">{(analystView.attachment).join(",")}</text>
  
                  </div>:<text className="cardcolhedtext mt-1">N/A</text>}
  
  
                </span>
              </div>
            </Col>
          </Row>

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