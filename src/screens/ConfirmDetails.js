import React from "react";
import "./Styles.css";
import { Col, Row, Table } from "react-bootstrap";
import { PiFilePdfFill } from "react-icons/pi";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import { useSelector } from "react-redux";
export default function ConfirmDetails({onButtonClick}) {
  
  const form=useSelector(state =>state.form.customer);
  const sample=useSelector(state =>state.form.sampleDetails);
  const analysis=useSelector(state =>state.form.data);
  const batch=useSelector(state=>state.form.tabledata); 
console.log("analysis",analysis)
console.log("batch", batch)
console.log("form",form)
console.log("sample",sample)
const updatedFilenames = analysis.choosefile.map(filename => filename.replace(/^\d+_/g, ''));
const updatedFilenamemsds = sample.msdsAttached.map(filename => filename.replace(/^\d+_/g, ''));

  const handleSubmit=()=>{
    onButtonClick("SampleVerification")
  }

  function combineValues(...values) {
    const nonEmptyValues = values.filter(value => value !== "" && value !== undefined);
    return nonEmptyValues.length > 0 ? nonEmptyValues.join(", ") : "N/A";
  }

  return (
    <div>
      

      <div>
        <div >
       

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
                {form.contactPersonName?
                <text className="cardcolhedtext mt-1">{form.contactPersonName}</text>:<text className="cardcolhedtext mt-1">N/A</text>}
              </div>
            </Col>
            <Col className="columnMb">
              <div className="d-flex row ">
                <text className="cardcolhed">Manufacturing Lic No</text>
                {form.licenceNo?
                <text className="cardcolhedtext mt-1">{form.licenceNo}</text>:<text className="cardcolhedtext mt-1">N/A</text>}
              </div>
            </Col>
            <Col  className="columnMb">
              <div className="d-flex row ">
                <text className="cardcolhed ">Email Id</text>
                {form.emailId?
                <text className="cardcolhedtext mt-1 ">{form.emailId}</text>:<text className="cardcolhedtext mt-1">N/A</text>}
              </div>
            </Col>
            <Col className="columnMb">
              <div className="d-flex row ">
                <text className="cardcolhed">Company Name & Address</text>
                {form.company || form.address1 ?
                <text className="cardcolhedtext mt-1">
                  {form.company},{form.address1}
                </text>:<text className="cardcolhedtext mt-1">N/A</text>}
              </div>
            </Col>
          </Row>

          <Row className="mt-3 rowtabview">
            <Col className="columnMb col-3">
              <div className="d-flex row">
                <text className="cardcolhed">Phone Number</text>
                {form.phoneNo?
                <text className="cardcolhedtext mt-1">{form.phoneNo}</text>:<text className="cardcolhedtext mt-1">N/A</text>}
              </div>
            </Col>
            <Col className="columnMb col-4">
              <div className="d-flex row">
                <text className="cardcolhed">Additional Phone Number</text>
                {form.phoneNo1?
                <text className="cardcolhedtext mt-1">{form.phoneNo1}</text>:<text className="cardcolhedtext mt-1">N/A</text>}
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
                {sample.samplename?
                <text className="cardcolhedtext mt-1">{sample.samplename}</text>:<text className="cardcolhedtext mt-1">N/A</text>}
              </div>
            </Col>
            <Col className="columnMb">
              <div className="d-flex row">
                <text className="cardcolhed">Storage Condition</text>
                {sample.storage ?
                <text className="cardcolhedtext mt-1">{sample.storage}</text>:<text className="cardcolhedtext mt-1">N/A</text>}
              </div>
            </Col>
            <Col className="columnMb">
              <div className="d-flex row">
                <text className="cardcolhed">Type of Submission</text>
                {sample.submissiontype?
                <text className="cardcolhedtext mt-1">{sample.submissiontype}</text>:<text className="cardcolhedtext mt-1">N/A</text>}
              </div>
            </Col>
            <Col className="columnMb">
           
              <div className="d-flex row">
             
                <text className="cardcolhed">Sample Type</text>
                {sample.sampletype ?
                <text className="cardcolhedtext mt-1">{sample.sampletype.join(",")}</text>:<text className="cardcolhedtext mt-1">N/A</text>}
            
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
                  <th>testParameter</th>
               
                </tr>
              </thead>
              <tbody className="tablebody-custom">
                
              {batch.map((item, i)=> (
    <tr key={i}>
      <td>{i + 1}</td>
      <td>{item.batchNo}</td>
      <td>{combineValues(item.batchSize)}</td>
      <td>{combineValues(item.natureOfPacking)}</td>
      <td>{combineValues(item.mfgDate)}</td>
      <td>{combineValues(item.expDate)}</td>
      <td>{combineValues(item.retestDate)}</td>
      <td>{combineValues(item.sampleQuantity)}</td>
      <td>{combineValues(item.testParameter?.map(option => option.value))}</td>
                
                        </tr>
              )           
                          
)}
              
              </tbody>
            </Table>
        

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
                {analysis.formfilling ?
                <text className="cardcolhedtext mt-1">{analysis.formfilling}</text>:<text className="cardcolhedtext mt-1">N/A</text>}
              </div>
            </Col>
            <Col className="columnMb">
              <div className="d-flex row">
                <text className="cardcolhed">Other than Regulatory </text>
                {analysis.analyticalfeasibile ? 
                <text className="cardcolhedtext mt-1">{(analysis.analyticalfeasibile).join(",")}</text>:<text className="cardcolhedtext mt-1">N/A</text>}
              </div>
            </Col>
          </Row>

          <Row className="mt-3 rowtabview">
            <Col className="columnMb">
              <div className="d-flex row">
                <text className="cardcolhed">
                  Test to be carried out as per{" "}
                </text>
                {analysis.test ?
                <text className="cardcolhedtext mt-1">{analysis.test.join("   ,  ")}</text>:<text className="cardcolhedtext mt-1">N/A</text>}
              </div>
            </Col>
            <Col className="columnMb">
              <div className="d-flex row">
                <text className="cardcolhed">
                  Special Instructions If any other{" "}
                </text>
                {analysis.specialinstruction ?
                <text className="cardcolhedtext mt-1">{analysis.specialinstruction}</text>:<text className="cardcolhedtext mt-1">N/A</text>}
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
                {analysis.methodvalidation ?
                <text className="cardcolhedtext mt-1">{analysis.methodvalidation}</text>:<text className="cardcolhedtext mt-1">N/A</text>}
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
            {analysis.methodologyfollowed?
              <div className="d-flex row">
                <text className="cardcolhed">Methodology </text>
                
                <text className="cardcolhedtext mt-1">{analysis.methodologyfollowed}</text>
              </div>:<text className="cardcolhedtext mt-1">N/A</text>}
            </Col>
            <Col className="columnMb">
              <div className="d-flex row">
                <text className="cardcolhed">Attachments </text>
                <span>
                  <PiFilePdfFill />
                  {analysis.choosefile?
                  <div><text className="cardcolhedtext mt-1">{(updatedFilenames).join(",")}</text>
  
    </div>:<text className="cardcolhedtext mt-1">N/A</text>}
    <PiFilePdfFill />
                  {sample.msdsAttached && sample.msdsAttached.length>0 ?
                  <div><text className="cardcolhedtext mt-1">{(updatedFilenamemsds).join(",")}</text>
  
    </div>:<text className="cardcolhedtext mt-1">N/A</text>}
                 
                </span>
              </div>
            </Col>
          </Row>

          <hr />

          <div className="cardbuttonboubleend mb-3">
            <button
              className="previous"
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
          </div>
        </div>
      </div>
    </div>
  );
}