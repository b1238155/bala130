import React, { useEffect } from "react";
import Sidenavbar from "../components/Sidenavbar";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";

import {
  AiOutlineMail,
  AiOutlineCheck,
  AiFillPrinter,
  AiOutlineFileExcel,
} from "react-icons/ai";
import "./Styles.css";

import { useNavigate } from "react-router-dom";
import Navbartitle from "../components/Navbartitle";
import { useSelector } from "react-redux";
export default function RLPLNotgenerated() {
  const navigate = useNavigate();
  const sample = useSelector((state) => state.form.sampleDetails);
  const batch = useSelector((state) => state.form.newArray);
  const token = useSelector((state) => state.form.usertoken.token);
  useEffect(() => {
    window.sessionStorage.removeItem("tableData");
    window.sessionStorage.removeItem("names");
    window.sessionStorage.removeItem("mnames");
  }, []);
  let Id = 0;
  Id = batch.id;

  const item = {
    sampleId: Id,
  };
  const postapicall = () => {
    fetch("http://54.167.30.227:3000/api/sampleDetails/sendMail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },

      body: JSON.stringify(item),
    })
      .then((response) => response.json())

      .then((data) => {
        console.log("result:", data);

        // handle the response data here
      })

      .catch((error) => {
        // handle any errors here
      });
  };

  console.log("batch", batch);
  return (
    <div className="app">
      <Navbartitle />

      <div className="d-flex">
        <Sidenavbar />

        <div className="main">
          <div className="mainitem">
            <div className="progressbar"></div>
            <div
              style={{
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
                marginTop: 30,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignContent: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  width: "60%",
                  border: "none",
                  marginTop: 20,
                }}
              >
                <div
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div className="mt-1 mb-3">
                    <AiOutlineFileExcel size={80} color="#9AC037" />
                  </div>
                  <div>
                    <text
                      style={{
                        color: "#8F8F8F",
                        fontSize: 12,
                        fontWeight: 500,
                      }}
                    >
                      The Samples has been Rejected, The RLPL has been not
                      generated for below batches
                    </text>
                  </div>
                </div>

                <div>
                  <div className="mt-4">
                    <h4
                      style={{
                        color: "#3a4175",
                        fontSize: 18,
                        fontWeight: 600,
                      }}
                    >
                      Sample Details
                    </h4>
                    <Table md={6} borderless>
                      <thead>
                        <tr>
                          <td
                            style={{
                              color: "#8F8F8F",
                              fontSize: 12,
                              fontWeight: 500,
                            }}
                          >
                            Name of the Sample
                          </td>
                          <td
                            style={{
                              color: "#8F8F8F",
                              fontSize: 12,
                              fontWeight: 500,
                            }}
                          >
                            Sample Type
                          </td>
                          <td
                            style={{
                              color: "#8F8F8F",
                              fontSize: 12,
                              fontWeight: 500,
                            }}
                          >
                            Nature of Sample
                          </td>
                          <td
                            style={{
                              color: "#8F8F8F",
                              fontSize: 12,
                              fontWeight: 500,
                            }}
                          >
                            Storage Condition
                          </td>
                        </tr>
                        <tr>
                          <td
                            style={{
                              color: "#3A4175",
                              fontSize: 12,
                              fontWeight: 500,
                            }}
                          >
                            {sample.samplename}
                          </td>
                          {sample.sampletype ? (
                            <td
                              style={{
                                color: "#3A4175",
                                fontSize: 12,
                                fontWeight: 500,
                              }}
                            >
                              {sample.sampletype.join(",")}
                            </td>
                          ) : (
                            <text className="cardcolhedtext mt-1">N/A</text>
                          )}
                          <td
                            style={{
                              color: "#3A4175",
                              fontSize: 12,
                              fontWeight: 500,
                            }}
                          >
                            {sample.natureofsample}
                          </td>
                          <td
                            style={{
                              color: "#3A4175",
                              fontSize: 12,
                              fontWeight: 500,
                            }}
                          >
                            {sample.storage}
                          </td>
                        </tr>
                      </thead>
                    </Table>
                    <Table className="rlpltable" md={6} border={1}>
                      <thead>
                        <tr className="table">
                          <th
                            style={{
                              color: "#d1d1d1",
                              fontSize: 12,
                              fontWeight: 600,
                            }}
                          >
                            S.No
                          </th>
                          <th
                            style={{
                              color: "#d1d1d1",
                              fontSize: 12,
                              fontWeight: 600,
                            }}
                          >
                            Registration No
                          </th>
                          <th
                            style={{
                              color: "#d1d1d1",
                              fontSize: 12,
                              fontWeight: 600,
                            }}
                          >
                            Batch No./Lot No(s)
                          </th>
                          <th
                            style={{
                              color: "#d1d1d1",
                              fontSize: 12,
                              fontWeight: 600,
                            }}
                          >
                            Batch Size
                          </th>
                          <th
                            style={{
                              color: "#d1d1d1",
                              fontSize: 12,
                              fontWeight: 600,
                            }}
                          >
                            Batch Quantity
                          </th>
                          <th
                            style={{
                              color: "#d1d1d1",
                              fontSize: 12,
                              fontWeight: 600,
                            }}
                          >
                            Test Parameter
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {batch.batchDetails.map((item, i) => (
                          <tr key={i}>
                            <td
                              style={{
                                color: "#8F8F8F",
                                fontSize: 12,
                                fontWeight: 500,
                              }}
                            >
                              {i + 1}
                            </td>
                            <td
                              style={{
                                color: "#8F8F8F",
                                fontSize: 12,
                                fontWeight: 500,
                              }}
                            >
                              NA
                            </td>
                            <td
                              style={{
                                color: "#8F8F8F",
                                fontSize: 12,
                                fontWeight: 500,
                              }}
                            >
                              {item.batchNo}
                            </td>
                            <td
                              style={{
                                color: "#8F8F8F",
                                fontSize: 12,
                                fontWeight: 500,
                              }}
                            >
                              {item.batchSize}
                            </td>
                            <td
                              style={{
                                color: "#8F8F8F",
                                fontSize: 12,
                                fontWeight: 500,
                              }}
                            >
                              {item.sampleQuantity}
                            </td>
                            <td
                              style={{
                                fontSize: 12,
                                fontWeight: 500,
                                borderLeft: "1px solid #d1d1d1",
                                borderBottom: "none",
                              }}
                            >
                              {item.testParameter.map((value, index) => (
                                <li
                                  style={{ listStyleType: "none" }}
                                  key={index}
                                >
                                  {value.testDataCode}
                                </li>
                              ))}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <div style={{ flexDirection: "column", display: "flex" }}>
                      <label
                        style={{
                          color: "#8F8F8F",
                          fontSize: 12,
                          fontWeight: 500,
                        }}
                      >
                        Reason for Rejections
                      </label>
                      <text
                        style={{
                          color: "#3A4175",
                          fontSize: 12,
                          fontWeight: 500,
                        }}
                      >
                        {batch.comment}
                      </text>
                    </div>
                    <div
                      className="mt-5"
                      style={{
                        justifyContent: "space-between",
                        display: "flex",
                        marginBottom: 20,
                      }}
                    >
                      <div>
                        <Button
                          onClick={postapicall}
                          style={{
                            height: "40px",
                            width: "166px",
                            borderRadius: "6px",
                            backgroundColor: "#3A4175",
                            fontWeight: 600,
                            fontSize: 12,
                            border: "none",
                          }}
                          name="Next"
                        >
                          <AiOutlineMail className="me-1" size={20} color="#fff" />
                          Send an email
                        </Button>
                        <Button
                          onClick={() => navigate("/Printreject")}
                          style={{
                            height: "40px",
                            width: "122px",
                            borderRadius: "6px",
                            backgroundColor: "#9AC037",
                            fontWeight: 600,
                            fontSize: 12,
                            marginLeft: 20,
                            border: "none",
                          }}
                          name="Next"
                        >
                          <AiFillPrinter
                          className="me-1"
                            size={20}
                            color="#fff"
                            onClick={() => navigate("/Print")}
                          />
                          Print
                        </Button>
                      </div>

                      <Button
                        onClick={() => navigate("/Progress")}
                        style={{
                          height: "40px",
                          width: "122px",
                          borderRadius: "6px",
                          backgroundColor: "#3A4175",
                          fontWeight: 600,
                          fontSize: 12,
                          border: "none",
                        }}
                        name="Next"
                      >
                        <AiOutlineCheck className="me-1" size={20} color="#fff" />
                        Done
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
