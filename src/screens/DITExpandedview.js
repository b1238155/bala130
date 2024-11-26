/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState,useEffect} from "react";
import "./Styles.css";
import { Col, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import {
  AiOutlineLeft,
  
} from "react-icons/ai";
import { useSelector ,useDispatch} from "react-redux";
import { PiFilePdfFill } from "react-icons/pi";
import { BiRightArrowAlt } from "react-icons/bi";
import NavbartitleAddco from "../components/NavbartitleAddco";
import SidenavbarDIT from "../components/SidenavbarDIT";
import axios from "axios";
import { changeSubmitDit } from "../redux/FormSlice";
export default function DITExpandedView() {
  const navigate = useNavigate();
  // const id=useSelector(state =>state.form.batchId.batchId);
  const id = localStorage.getItem('batchid');
  const token = localStorage.getItem('accessToken');
  const[detailedView,setDetailedView]=useState({});
  const[datasheet, setDatasheet]=useState([]);
  const analysis=useSelector(state =>state.form.data);
  const dispatch = useDispatch();
  // const token  = useSelector((state) => state.form.usertoken.token);
  const updatedFilenames = detailedView.sampleDetails?.attachment?.map(filename => filename.replace(/^\d+_/g, ''))||[];
const updatedFilenamemsds = detailedView.sampleDetails?.msdsAttached?.map(filename => filename.replace(/^\d+_/g, ''))||[];
  console.log(id)
 const item={"batchId" : id,"status" : "approved", "ditId" : token.userid}
 function combineValues(...values) {
  const nonEmptyValues = values.filter(value => value !== "" && value !== undefined);
  return nonEmptyValues.length > 0 ? nonEmptyValues.join(", ") : "NA";
}

  useEffect(() => {

    axios
      .get("http://54.167.30.227:3000/api/batchDetails/getBatchById?batchId="+id,{
        headers: {
    "Content-Type": "application/json",
    'Authorization': token
  },

      })
      
      .then((response) => setDetailedView(response.data))
      .catch((error) => console.error("Error fetching batch data:", error));
  }, [id]);
  console.log(detailedView)
  useEffect(() => {

    axios
      .get("http://54.167.30.227:3000/api/batchDetails/getDataSheets?batchId="+id,{
        headers: {
    "Content-Type": "application/json",
    'Authorization': token
  },

      })
      .then((response) => setDatasheet(response.data))
      .catch((error) => console.error("Error fetching batch data:", error));
  }, [id]);
  console.log(datasheet)
  const postapicall=()=>{
    const newLocal = "http://54.167.30.227:3000/api/batchDetails/ditApproval";
    fetch(newLocal, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
    'Authorization': token

      },
    
    
      body: JSON.stringify(item),
    })
      .then((response) => response.json())
    
      .then((data) => {
        const dataString = JSON.stringify(data);
sessionStorage.setItem('dit', dataString);
        console.log("data",data)
        dispatch(changeSubmitDit(data))
        console.log("Success:", data);
        
         // handle the response data here
      })
    
      .catch((error) => {
        // handle any errors here
      });
      navigate("DITSuccess")
    }

  console.log("details",detailedView)
  return (
    <div className="app">
      <NavbartitleAddco />

      <div className="d-flex">
        <SidenavbarDIT />

        <div className="main">
          <div className="mainitem">
            <div
              className="analystbackbutton mt-3"
              onClick={() => navigate("/DitDashboard")}
            >
              <AiOutlineLeft
                onClick={() =>
                  navigate("/DitDashboard")
                }
              />{" "}
              <text>back</text>
            </div>

            <div className="mt-3">
              <text className="mainheadtitlesub">Batch & RLPL details</text>
              <hr />
            </div>

          
            <Table responsive border={1}>
              <thead className="table-custom">
                <tr>
                  <th>S.No</th>
                  <th>RLPL ID</th>
                  <th>Batch No./Lot No(s)</th>
                  <th>Nature Of Packaging</th>
                  <th>Sample Quantity</th>
                  <th>Mfg. Date</th>
                  <th>Exp. Date</th>
                  <th>Retest Date</th>
                  <th>Test Parameter</th>
                  <th>Required Documents</th>
                </tr>
              </thead>
              <tbody className="tablebody-custom">
                <tr>
                  <td>01</td>

                  <td>{detailedView.rlplNumber}</td>
                  <td>{combineValues(detailedView.batchNo)}</td>
                  <td>{combineValues(detailedView.natureOfPacking)}</td>
                  <td>{combineValues(detailedView.sampleQuantity)}</td>
                  <td>{combineValues(detailedView.mfgDate)}</td>
                  <td>{combineValues(detailedView.expDate)}</td>
                  <td>{combineValues(detailedView.retestDate)}</td>
         <td>
  {detailedView.testParameter && Array.isArray(detailedView.testParameter) ? (
    detailedView.testParameter.map((item, index) => (
      <li  style={{listStyleType:"none"}}key={index}>{item.testDataCode}</li>
    ))
  ) : (
    <span>No test parameters available</span>
  )}
</td>
                
                  <td> {Array.isArray(datasheet) && datasheet.length > 0 ? (datasheet.map((item, i)=> (
   <ul style={{listStyleType:"none"}} key={i}><li style={{listStyleType:"none"}} ><PiFilePdfFill /> <a href={item.url} target="_blank" rel="noopener noreferrer">
   {item.testDataCode ? item.testDataCode : "No testdatacode available"}
 </a></li>
   </ul>))) : (
  <span>No datasheets available</span>
)}
    </td>
        </tr>      
</tbody>
            </Table>
         

            <div className="mt-3">
              <text className="mainheadtitlesub">Sample details</text>
              <hr />
            </div>
{Object.keys(detailedView).length > 0 ? (
  <>
            <Row className="rowtabview">
              <Col className="">
                <div className="d-flex row">
                  <text className="cardcolhed">Name of the Sample</text>
                  {detailedView.sampleDetails.sampleName?
                  <text className="cardcolhedtext mt-1">{detailedView.sampleDetails.sampleName}</text> :<text className="cardcolhedtext mt-1">NA</text>}
                </div>
              </Col>
              <Col className="columnMb">
                <div className="d-flex row">
                  <text className="cardcolhed">Storage Condition</text>
                  {detailedView.sampleDetails.storageCondition ?
                  <text className="cardcolhedtext mt-1">{detailedView.sampleDetails.storageCondition}</text>: <text className="cardcolhedtext mt-1">NA</text>}
                </div>
              </Col>
              <Col className="columnMb">
                <div className="d-flex row">
                  <text className="cardcolhed">Type of Submission</text>
                  <text className="cardcolhedtext mt-1">{detailedView.sampleDetails.typeOfSubmission}</text>
                </div>
              </Col>
              <Col className="columnMb">
                <div className="d-flex row">
                  <text className="cardcolhed">Sample Type</text>
                  {detailedView.sampleDetails.sampleType&& detailedView.sampleDetails.sampleType.length>0 ?
                  <text className="cardcolhedtext mt-1">{detailedView.sampleDetails.sampleType.join(",")}</text>:<text className="cardcolhedtext mt-1">NA</text>}
                </div>
              </Col>
            </Row>

            <Row className="mt-3 rowtabview">
              <Col className="columnMb col-3">
                <div className="d-flex row">
                  <text className="cardcolhed">Nature of Sample</text>
                  <text className="cardcolhedtext mt-1">{detailedView.sampleDetails.natureOfSample}</text>
                </div>
              </Col>
              <Col className="columnMb col-3">
                <div className="d-flex row">
                  <text className="cardcolhed">
                    Report required as per Form-39
                  </text>
                  <text className="cardcolhedtext mt-1">{detailedView.sampleDetails.reportRequiredaAsPerForm39}</text>
                </div>
              </Col>
              <Col className="columnMb col-6">
                <div className="d-flex row">
                  <text className="cardcolhed">
                    Sample Retention required(Drug Product/Substance){" "}
                  </text>
                  <text className="cardcolhedtext mt-1">{detailedView.sampleDetails.sampleRetentionRequired}</text>
                </div>
              </Col>
            </Row>

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
                  {detailedView.sampleDetails.regulatory?
                  <text className="cardcolhedtext mt-1">{detailedView.sampleDetails.regulatory}</text>:<text className="cardcolhedtext mt-1">NA</text>}
                </div>
              </Col>
               <Col className="columnMb">
                <div className="d-flex row">
                  <text className="cardcolhed">Other than Regulatory </text>
                  {detailedView.sampleDetails.otherThanRegulatory && detailedView.sampleDetails.otherThanRegulatory.length>0 ?
                  <text className="cardcolhedtext mt-1">{detailedView.sampleDetails.otherThanRegulatory.join('   ,  ')}</text>: <text className="cardcolhedtext mt-1">NA</text>}
                </div>
              </Col> 
</Row>


            

            <Row className="mt-3 rowtabview">
            <Col className="columnMb">
                <div className="d-flex row">
                  <text className="cardcolhed">
                    If Method Validation/Verification/Transfer/Development are
                    performed atRevin Labs please specify the Report Ref. No.{" "}
                  </text>
                  {detailedView.sampleDetails.vvtddRefNo?
                  <text className="cardcolhedtext mt-1">{detailedView.sampleDetails.vvtddRefNo}</text>: <text className="cardcolhedtext mt-1">NA</text>}
                </div>
              </Col>
              <Col className="columnMb">
                <div className="d-flex row">
                  <text className="cardcolhed">
                    Test to be carried out as per{" "}
                  </text>
                  {detailedView.sampleDetails.testToBeCarriedOut && detailedView.sampleDetails.testToBeCarriedOut.length>0 ?
                  <text className="cardcolhedtext mt-1">{detailedView.sampleDetails.testToBeCarriedOut.join('  ,  ')}</text>:<text className="cardcolhedtext mt-1">NA</text>}
                </div>
              </Col>
            


            </Row>


            <Row className="mt-3 rowtabview">
               <Col className="columnMb">
                <div className="d-flex row">
                  <text className="cardcolhed">Methodology </text>
                  <text className="cardcolhedtext mt-1">{detailedView.sampleDetails.methodology}</text>
                </div>
              </Col> 
              
              <Col className="columnMb">
                <div className="d-flex row">
                  <text className="cardcolhed">Attachments </text>
                  <span>
                    <div>
                    <PiFilePdfFill />
                   {detailedView.sampleDetails.attachment && detailedView.sampleDetails.attachment.length>0 ? (
                      
                        <text  className="cardcolhedtext mt-1">{updatedFilenames.join(',')}
                        </text>
                    
                    ) : (
                      <span>No attachments available</span>
                    )}
                    </div>
                    <div>
                    <PiFilePdfFill />
                   {detailedView.sampleDetails.msdsAttached &&
                    Array.isArray(detailedView.sampleDetails.msdsAttached) ? (
                      detailedView.sampleDetails.msdsAttached.map((item, index) => (
                        <text  className="cardcolhedtext mt-1" >{updatedFilenamemsds.join(",")}
                        </text>
                      ))
                    ) : (
                      <span>No attachments available</span>
                    )}
                   </div>
                  </span>
                </div>
              </Col>

              

            </Row>
            <Row>
            <Col className="columnMb">
                <div className="d-flex row">
                  <text className="cardcolhed">Special Instructions If any other </text>
                  {detailedView.sampleDetails.specialInstruction?
                  <text className="cardcolhedtext mt-1">{detailedView.sampleDetails.specialInstruction}</text> :<text className="cardcolhedtext mt-1">NA</text>}
                </div>
              </Col>
              <Col className="columnMb">
                <div className="d-flex row">
                  </div>
              </Col>
            </Row>
            </>
):(
            // Display a loading indicator if data is still loading
            <div>Loading...</div>
          )}
            <div className="cardbuttonboubleend mb-3">
             
              <button
                className="cardbutton"
                type="submit"
                onClick={postapicall}
              >
                Review <BiRightArrowAlt size={24} />
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
