import React, { useState, useEffect, useRef } from "react";
import "./Styles.css";
import {
  //  Col, Row,
  Table,
} from "react-bootstrap";
import { BsCheckCircle, BsTrash } from "react-icons/bs";

import { useNavigate } from "react-router-dom";
import { PiFilePdfFill } from "react-icons/pi";
import { AiOutlineLeft } from "react-icons/ai";
import { BsArrowDownCircle } from "react-icons/bs";
import { PiFileArrowUp } from "react-icons/pi";
import { BiRightArrowAlt } from "react-icons/bi";
import NavbartitleAddco from "../components/NavbartitleAddco";
import SidenavbarAnalyst from "../components/SidenavbarAnalyst";
import { useSelector } from "react-redux";
import axios from "axios";
export default function AnalystBatchandRLPLdetails() {
  const [analystView, setAnalystView] = useState({});
  const [datasheet, setDatasheet] = useState([]);
  const [fileData, setFileData] = useState([]);
  const [result,setResult]=useState({});
  const [isSubmitting, setIsSubmitting] = useState([]);

  const [fileAnalyticalData, setFileAnalyticalData] = useState([]);
  const fileInputRefs = useRef([]);
  const fileAnalytical =useRef([]);
  const navigate = useNavigate();
  const id = useSelector((state) => state.form.AbatchId.AbatchId);
  const token = useSelector((state) => state.form.usertoken.token);
  console.log(id);
  const item = {tdsId:id};
  console.log(item)
 
  useEffect(() => {
    axios
      .get(
        "http://54.167.30.227/api/batchDetails/getBatchById?batchId=" + id,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      )

      .then((response) => {setAnalystView(response.data);
      setIsSubmitting(Array(response.data.tdsDetails.length).fill(false));
      })
      .catch((error) => console.error("Error fetching batch data:", error));
  }, [id, token]);
  console.log("analystview", analystView);
  useEffect(() => {
    axios
      .get(
        "http://54.167.30.227/api/batchDetails/getDataSheets?batchId=" +id,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      )
      .then((response) => setDatasheet(response.data))
      .catch((error) => console.error("Error fetching batch data:", error));
  }, [id, token]);
  const handleFileUpload = (index, event) => {
    const files = event.target.files;
    const newFileData = [...fileData];
    const epoch = "" + Date.now();
    const refNo = epoch.substring(0, 10);
    const renamedFile = new File([files[0]], refNo + "_" + files[0].name, {
      type: files[0].type,
    });
    newFileData[index] = renamedFile;
    setFileData(newFileData);
  
  };
  const handleUploadClick = (index) => {
    fileInputRefs.current[index].click();
    console.log("hello")
    
  };
  const handleFileRemove = (index) => {
    const newFileData = [...fileData];
    newFileData[index] = null; // Set the file at the specified index to null
    setFileData(newFileData);
  };
  const handleFileAnaRemove = (index) => {
    const newFileData = [...fileAnalyticalData];
    newFileData[index] = null; // Set the file at the specified index to null
    setFileAnalyticalData(newFileData);
  };
  const handleAnalyticalFileUpload = (index, event) => {
    const files = event.target.files;
    const newFileData = [...fileAnalyticalData];
    const epoch = "" + Date.now();
    const refNo = epoch.substring(0, 10);
    const renamedFile = new File([files[0]], refNo + "_" + files[0].name, {
      type: files[0].type,
    });
    newFileData[index] = renamedFile;
    setFileAnalyticalData(newFileData);
  };
  const handleAnalyticalUploadClick = (index) => {
    fileAnalytical.current[index].click();
  
  };
  
  const handleSubmit = async (index) => {
  console.log("Clicked on row with index:", index);
    if (fileData[index] && fileAnalyticalData[index]) {
      setIsSubmitting((prevStatus) => {
        const newStatus = [...prevStatus];
        newStatus[index] = true; // Set the submission status for the current row to true
        return newStatus;
      });
      const formData = new FormData();
  
      // Append the first file to the formData
      formData.append("file1", fileData[index]);
  
      // Append the second file to the formData
      formData.append("file2", fileAnalyticalData[index]);
  
      try {
        let res = await fetch("http://54.167.30.227/api/container/sampleDoc/upload", {
          method: "POST",
          body: formData,
          headers: {
            Authorization: token,
          },
        });
  
        let result = await res.json();
        setResult(result.result.files);
        if (result.result.files) {
        const tdsDocument= result.result.files.file1.map(item=>item.name).join("");
        const sysDocument=  result.result.files.file2.map(item=>item.name).join('');
        
        console.log(result.result.files , 'result.files');
        console.log(tdsDocument, sysDocument,"payload");
      
  
        if (result.result.files != null) {
          alert("Files uploaded");
        }
      }  else {
        console.error('No files were uploaded.');
      }
    } catch (error) {
        console.error('Error uploading files:', error);
       }
      //setIsSubmitting((prevStatus) => {
      //   const newStatus = [...prevStatus];
      //   newStatus[index] = false;
      //   return newStatus;
      // });
    } else {
      // If either file is not selected, show an alert
      alert('Please Select both files first');
    }
    
  };
 
  const submitFinalDocument = async () => {
    if (fileData.length > 0 && fileAnalyticalData.length > 0) {
      const tdsDocument = fileData[0].name;
      const sysDocument = fileAnalyticalData[0].name;
  
      const payload = {
        tdsId: id,
        tdsDocument,
        sysDocument,
      };
  
      try {
        const response = await fetch(
          "http://54.167.30.227/api/tdsDetails/docSubmit",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
            body: JSON.stringify(payload),
          }
        );
  
        const data = await response.json();
        console.log("Success:", data);
  
        // Handle the response data here
        if (data) {
          alert("Final document submitted");
        }
      } catch (error) {
        console.error('Error submitting final document:', error);
      }
      navigate("/Analystdashboaed");
    } else {
      // If either file is not selected, show an alert
      alert('Please select both files first');
    }
    
  };
    

  return (
    <div className="app">
      <NavbartitleAddco />

      <div className="d-flex">
        <SidenavbarAnalyst />

        <div className="main">
          <div className="mainitem">
            <div
              className="analystbackbutton mt-3"
              onClick={() => navigate("/AnalystDashboaed")}
            >
              <AiOutlineLeft onClick={() => navigate("/AnalystDashboaed")} />{" "}
              <text>back</text>
            </div>

            <div className="mt-3">
              <div className="titlemainreference ">
                <text className="mainheadtitlesub">Batch & RLPL Details</text>
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
                  <td>{analystView.rlplNumber}</td>
                  <td>{analystView.batchNo}</td>
                  <td>{analystView.natureOfPacking}</td>
                  <td>{analystView.sampleQuantity}</td>
                  <td>{analystView.mfgDate}</td>
                  <td>{analystView.expDate}</td>
                  <td>{analystView.retestDate}</td>

                  <td>
                    
                    {analystView.testParameter ? (
                      analystView.testParameter.map((item, index) => (
                        <li style={{ listStyleType: "none" }} key={index}>
                          {item.testDataCode}
                        </li>
                      ))
                    ) : (
                      <span>No test parameters available</span>
                    )}
                  </td>
                  
                </tr>
              </tbody>
            </Table>

            <div className="mt-3">
              <text className="mainheadtitlesub">TDS details</text>
              <hr />
            </div>

            <Table responsive border={1}>
              <thead className="table-custom">
                <tr>
                  <th>S.No</th>
                  <th>TDS Number</th>
                  <th>Test Parameter</th>
                  <th>Download</th>
                  <th>TDS Upload</th>
                  <th>Analytical Data Upload</th>
                </tr>
              </thead>
              <tbody className="tablebody-custom">
                {analystView.tdsDetails ? (
                  analystView.tdsDetails.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.tdsNumber}</td>
                      <td>
                        {analystView.testParameter &&
                        Array.isArray(analystView.testParameter) ? (
                            <li style={{ listStyleType: "none" }} key={index}>
                              {analystView.testParameter[index].testDataCode}
                            </li>
                          
                        ) : (
                          <span>No test parameters available</span>
                        )}
                      </td>
                      <td>
                    {datasheet &&
                    Array.isArray(datasheet) &&
                    datasheet[index] &&
                    datasheet[index].url ? (
                      <ul style={{ listStyleType: "none" }} key={index}>
                        <li style={{ listStyleType: "none" }}>
                        
                          <PiFilePdfFill />{" "}
                          <a
                            href={datasheet[index].url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >{datasheet[index].testDataCode}
                            <BsArrowDownCircle size={23} color="#9AC037" />
                          </a>
                        </li>
                      </ul>
                    ):(<span>no data available</span>)}
                      </td>
                      <td>
                      {fileData[index] ? (
    <div>
      <BsCheckCircle size={23} color="#00CC00" />
      <span>{fileData[index].name}</span>
      <BsTrash
        size={23}
        color="red"
        onClick={() => handleFileRemove(index)}
      />
    </div>
  ) : (
    <div>
                        <PiFileArrowUp
                          size={23}
                          color="#818181"
                          onClick={() => handleUploadClick(index)}
                        />
                        {/* Display the uploaded file name */}
                        {fileData[index] ? (<span>{fileData[index].name}</span>
                          )
                          :  (
                            <span>No file selected</span>)}
                          </div>)}
                        <input
                          type="file"
                          ref={(ref) => (fileInputRefs.current[index] = ref)}
                          style={{ display: "none" }}
                          onChange={(event) => handleFileUpload(index, event)}
                        />
                      </td>
                      <td>
                      {fileAnalyticalData[index] ? (
    <div>
      <BsCheckCircle size={23} color="#00CC00" />
      <span>{fileAnalyticalData[index].name}</span>
      <BsTrash
        size={23}
        color="red"
        onClick={() => handleFileAnaRemove(index)}
      />
    </div>
  ) : (<div><PiFileArrowUp
                          size={23}
                          color="#818181"
                          onClick={() => handleAnalyticalUploadClick(index)}
                        />
                        {/* Display the uploaded file name */}
                        {fileAnalyticalData[index]
                          ?(<span>{fileAnalyticalData[index].name}</span>)
                          : (<span>"No file selected"</span>)}
                          </div>)}
                        <input
                          type="file"
                          ref={(ref) => (fileAnalytical.current[index] = ref)}
                          style={{ display: "none" }}
                          onChange={(event) => handleAnalyticalFileUpload(index, event)}
                        /></td>
                        <td>
                        
              <button
                className="cardbutton"
                type="button"
                onClick={()=>handleSubmit(index)}
                disabled={isSubmitting[index]} 
              >
                {isSubmitting[index] ? (

  
    <BsCheckCircle size={24} color="#00CC00" /> // Show the completed icon when isCompleted is true
  ) : (
    <>
      Submit <BiRightArrowAlt size={24} />
    </>
  )}
        
              </button>
            
                        </td>
                    </tr>
                  ))
                ) : (
                  <span>No tds available</span>
                )}
              </tbody>
            </Table>

            <div className="cardbuttonboubleend mb-3">
              <button
                className="cardbutton"
                type="submit"
                onClick={submitFinalDocument}
              >
                Submit <BiRightArrowAlt size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
