/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./Styles.css";
import { Col, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import {
  AiOutlineLeft,
 
} from "react-icons/ai";
import { useSelector} from "react-redux";
import { PiFilePdfFill } from "react-icons/pi";

import NavbartitleAddco from "../components/NavbartitleAddco";
import SidenavbarDIT from "../components/SidenavbarDIT";
import axios from "axios";
export default function DITTDSExpandedView() {
  const navigate = useNavigate();
  // const id = useSelector((state) => state.form.TdsId.TdsId);
  // const token  = useSelector((state) => state.form.usertoken.token);
  const id = localStorage.getItem('tdsid');
  const token = localStorage.getItem('accessToken');
  const [detailedView, setDetailedView] = useState({});

  const [tdsView,setTdsView]=useState({});
  const analysis = useSelector((state) => state.form.data);


  console.log(id);
  useEffect(() => {

    axios
      .get("http://54.167.30.227:3000/api/tdsDetails/getTdsById?tdsId="+id,{
        headers: {
          "Content-Type": "application/json",
          'Authorization': token
        },
      })
      .then((response) => {
        setDetailedView(response.data);
        setTdsView(response.data.batchDetails);})
      .catch((error) => console.error("Error fetching batch data:", error));
  }, [id]);
console.log("detailedview",detailedView)
console.log("detail", tdsView)


  return (
    <div className="app">
      <NavbartitleAddco />

      <div className="d-flex">
        <SidenavbarDIT />

        <div className="main">
          <div className="mainitem">
            <div
              className="analystbackbutton mt-3"
              onClick={() => navigate("/DitDashboard/DITExpandedview/DITSuccess")}
            >
              <AiOutlineLeft onClick={() => navigate("/DitDashboard")} />{" "}
              <text>back</text>
            </div>

            <div className="mt-3">
              <div className="titlemainreference ">
                <text className="mainheadtitlesub">Batch & RLPL details</text>
                <text className="titlesubreference">
                  TDS Number:{detailedView.tdsNumber}
                </text>
              </div>
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
                
                </tr>
              </thead>
              <tbody className="tablebody-custom">
                <tr>
                  <td>01</td>
                  <td>{tdsView.rlplNumber}</td>
                  <td>{tdsView.batchNo}</td>
                  <td>{tdsView.natureOfPacking}</td>
                  <td>{tdsView.sampleQuantity}</td>
                  <td>{tdsView.mfgDate}</td>
                  <td>{tdsView.expDate}</td>
                  <td>{tdsView.retestDate}</td>
                  <td>
                  {detailedView.testDataCode ?(
                            <text>{detailedView.testDataCode} </text>
                          ) : (
                          <span>No test parameters available</span>
                        )}
                  </td>

               
                </tr>
              </tbody>
            </Table>
            {/* </Card> */}

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
                      <text className="cardcolhedtext mt-1">
                        {detailedView.sampleDetails.sampleName}
                      </text>
                    </div>
                  </Col>
                  <Col className="columnMb">
                    <div className="d-flex row">
                      <text className="cardcolhed">Storage Condition</text>
                      <text className="cardcolhedtext mt-1">
                        {detailedView.sampleDetails.storageCondition}
                      </text>
                    </div>
                  </Col>
                  <Col className="columnMb">
                    <div className="d-flex row">
                      <text className="cardcolhed">Type of Submission</text>
                      <text className="cardcolhedtext mt-1">
                        {detailedView.sampleDetails.typeOfSubmission}
                      </text>
                    </div>
                  </Col>
                  <Col className="columnMb">
                    <div className="d-flex row">
                      <text className="cardcolhed">Sample Type</text>
                      {detailedView.sampleDetails.sampleType ? (
                        <text className="cardcolhedtext mt-1">
                          {detailedView.sampleDetails.sampleType.join(",")}
                        </text>
                      ) : (
                        "N/A"
                      )}
                    </div>
                  </Col>
                </Row>

                <Row className="mt-3 rowtabview">
                  <Col className="columnMb col-3">
                    <div className="d-flex row">
                      <text className="cardcolhed">Nature of Sample</text>
                      <text className="cardcolhedtext mt-1">
                        {detailedView.sampleDetails.natureOfSample}
                      </text>
                    </div>
                  </Col>
                  <Col className="columnMb col-3">
                    <div className="d-flex row">
                      <text className="cardcolhed">
                        Report required as per Form-39
                      </text>
                      <text className="cardcolhedtext mt-1">
                        {detailedView.sampleDetails.reportRequiredaAsPerForm39}
                      </text>
                    </div>
                  </Col>
                  <Col className="columnMb col-6">
                    <div className="d-flex row">
                      <text className="cardcolhed">
                        Sample Retention required(Drug Product/Substance){" "}
                      </text>
                      <text className="cardcolhedtext mt-1">
                        {detailedView.sampleDetails.sampleRetentionRequired}
                      </text>
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
                      {detailedView.sampleDetails.regulatory ? (
                        <text className="cardcolhedtext mt-1">
                          {detailedView.sampleDetails.regulatory}
                        </text>
                      ) :(<text className="cardcolhedtext mt-1">NA</text>)}
                    </div>
                  </Col>
                  <Col className="columnMb">
                    <div className="d-flex row">
                      <text className="cardcolhed">Other than Regulatory </text>
                      {detailedView.sampleDetails.otherThanRegulatory ? (
                        <text className="cardcolhedtext mt-1">
                          {detailedView.sampleDetails.otherThanRegulatory.join("   ,  ")}
                        </text>
                      ) : (
                        <text className="cardcolhedtext mt-1">NA</text>
                      )}
                    </div>
                  </Col>
                </Row>

                <Row className="mt-3 rowtabview">
                  <Col className="columnMb">
                    <div className="d-flex row">
                      <text className="cardcolhed">
                        Test to be carried out as per{" "}
                      </text>
                      {detailedView.sampleDetails.testToBeCarriedOut ? (
                        <text className="cardcolhedtext mt-1">
                          {detailedView.sampleDetails.testToBeCarriedOut.join(
                            "  ,  "
                          )}
                        </text>
                      ) : (
                        "N/A"
                      )}
                    </div>
                  </Col>
                  <Col className="columnMb">
                    <div className="d-flex row">
                      <text className="cardcolhed">
                        Special Instructions If any other{" "}
                      </text>
                      <text className="cardcolhedtext mt-1">
                        {detailedView.sampleDetails.specialInstruction}
                      </text>
                    </div>
                  </Col>
                </Row>

                <Row className="mt-3 rowtabview">
                  <Col className="columnMb">
                    <div className="d-flex row">
                      <text className="cardcolhed">
                        If Method Validation/Verification/Transfer/Development
                        are performed atRevin Labs please specify the Report
                        Ref. No.{" "}
                      </text>
                      <text className="cardcolhedtext mt-1">
                        {detailedView.sampleDetails.vvtddRefNo}
                      </text>
                    </div>
                  </Col>
                  <Col className="columnMb">
                    <div className="d-flex row">
                      <div>
                        <text className="cardcolhed">
                          Analytical Test Parameter; If require attach Annexure
                          along with this filled TRF{" "}
                        </text>
                      </div>

                      <div className="analyticalbutton-div">
                        {detailedView.testDataCode ?(
                            <text className="analyticalbutton mt-1 ">{detailedView.testDataCode} </text>
                          ) : (
                          <span>No test parameters available</span>
                        )}
                      </div>

                     
                    </div>
                  </Col>
                </Row>

                <Row className="mt-3 rowtabview">
                  <Col className="columnMb">
                    <div className="d-flex row">
                      <text className="cardcolhed">Methodology </text>
                      <text className="cardcolhedtext mt-1">
                        {detailedView.sampleDetails.methodology}
                      </text>
                    </div>
                  </Col>
                  <Col className="columnMb">
                    <div className="d-flex row">
                      <text className="cardcolhed">Attachments </text>
                      <span>
                        <PiFilePdfFill />
                        {detailedView.sampleDetails.attachment &&
                        Array.isArray(detailedView.sampleDetails.attachment) ? (
                          detailedView.sampleDetails.attachment.map((item, index) => (
                            <text >
                              <li style={{listStyleType:"none"}}  className="cardcolhedtext mt-1" key={index}>{item}</li>
                            </text>
                          ))
                        ) : (
                          <span>No attachments available</span>
                        )}
                         <PiFilePdfFill />
                        {detailedView.sampleDetails.msdsAttached &&
                        Array.isArray(detailedView.sampleDetails.msdsAttached) ? (
                          detailedView.sampleDetails.msdsAttached.map((item, index) => (
                            <text >
                              <li style={{listStyleType:"none"}}  className="cardcolhedtext mt-1" key={index}>{item}</li>
                            </text>
                          ))
                        ) : (
                          <span>No attachments available</span>
                        )}
                      </span>
                    </div>
                  </Col>
                </Row>
              </>
            ) : (
              // Display a loading indicator if data is still loading
              <div>Loading...</div>
            )}
            <div className="cardbuttonboubleend mb-3">
              <button
                className="DITcardbutton"
                type="submit"
                onClick={()=>{navigate("/DitDashboard")}}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
