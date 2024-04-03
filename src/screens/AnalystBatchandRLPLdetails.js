import React, { useState, useEffect, useRef } from "react";
import "./Styles.css";
import {
  //  Col, Row,
  Table,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { PiFilePdfFill } from "react-icons/pi";
import { AiOutlineLeft } from "react-icons/ai";
import { BsArrowDownCircle } from "react-icons/bs";
import { PiFileArrowUp } from "react-icons/pi";
import { MdOutlineDelete } from "react-icons/md";
import { BiRightArrowAlt } from "react-icons/bi";
import NavbartitleAddco from "../components/NavbartitleAddco";
import SidenavbarAnalyst from "../components/SidenavbarAnalyst";
import { useSelector } from "react-redux";
import axios from "axios";
export default function AnalystBatchandRLPLdetails() {
  const [analystView, setAnalystView] = useState({});
  const [datasheet, setDatasheet] = useState([]);
  const [selectedFileNames, setSelectedFileNames] = useState([]);
  const [names, setNames] = useState([]);
  const [result,setResult]=useState({});
  const [selectedAFileNames, setSelectedAFileNames] = useState([]);
  const [anames, setANames] = useState([]);
  const fileInputRefs = useRef([]);
  const fileAnalytical =useRef([]);
  const [previewFile, setPreviewFile] = useState(null);

  const navigate = useNavigate();
  // const id = useSelector((state) => state.form.AbatchId.AbatchId);
  // const token = useSelector((state) => state.form.usertoken.token);
  const id = localStorage.getItem('batchid');
  const token = localStorage.getItem('accessToken');
  const updatedFilenames = names.map(filename => filename.replace(/^\d+_/g, ''));
  const updatedFilenameanadoc = anames.map(filename => filename.replace(/^\d+_/g, ''));
  console.log(id);
  const item = {tdsId:id};
  console.log(item)
  useEffect(() => {
    axios
      .get(
        "http://54.167.30.227:3000/api/tdsDetails/getTdsById?tdsId=" + id,
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
  useEffect(() => {
    axios
      .get(
        "http://54.167.30.227:3000/api/batchDetails/getDataSheets?batchId=" + id,
        {
          headers: {
            "Content-Type": "application/json",
            'Authorization': token,
          },
        }
      )
      .then((response) => setDatasheet(response.data))
      .catch((error) => console.error("Error fetching batch data:", error));
  }, [id, token]);
  console.log("datasheet",datasheet)
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter((file) => file instanceof File && file.size > 0);
  
    // Rename and add the files to selectedFileNames using the refNo
    const renamedFiles = validFiles.map((file) => {
      const epoch = "" + Date.now();
      const refNo = epoch.substring(0, 10);
      const newName = `${refNo}_${file.name}`;
      return new File([file], newName);
    });
  
    setSelectedFileNames((prevSelectedFiles) => [...prevSelectedFiles, ...renamedFiles]);
  
    const extractedNames = renamedFiles.map((file) => file.name);
    setNames((prevNames) => [...prevNames, ...extractedNames]);
  };

  useEffect(() => {
    // Retrieving the names from localStorage
    setNames(selectedFileNames.map(obj => obj.name));
    const storedNames =sessionStorage.getItem("names");
    if(storedNames){
      setNames(JSON.parse(storedNames));
    }
  },[])
  console.log("files",names)
  const handleRemoveFile = (indexToRemove) => {
    const updatedSelectedFilenames = selectedFileNames.filter(
      (files) => files !== indexToRemove
    );
    setSelectedFileNames(updatedSelectedFilenames);

    // Remove the corresponding name from namesArray
    const updatedNames = names.filter(
      (name) => name !== indexToRemove
    );
    setNames(updatedNames);
   
  };
  const handleAFileChange = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter((file) => file instanceof File && file.size > 0);
  
    // Rename and add the files to selectedFileNames using the refNo
    const renamedFiles = validFiles.map((file) => {
      const epoch = "" + Date.now();
      const refNo = epoch.substring(0, 10);
      const newName = `${refNo}_${file.name}`;
      return new File([file], newName);
    });
  
    setSelectedAFileNames((prevSelectedFiles) => [...prevSelectedFiles, ...renamedFiles]);
  
    const extractedNames = renamedFiles.map((file) => file.name);
    setANames((prevNames) => [...prevNames, ...extractedNames]);
  };

  useEffect(() => {
    // Retrieving the names from localStorage
    setANames(selectedAFileNames.map(obj => obj.name));
    const storedNames =sessionStorage.getItem("anames");
    if(storedNames){
      setANames(JSON.parse(storedNames));
    }
  },[])
  console.log("files",names)
  const handleARemoveFile = (indexToRemove) => {
    const updatedSelectedFilenames = selectedFileNames.filter(
      (files) => files !== indexToRemove
    );
    setSelectedAFileNames(updatedSelectedFilenames);

    // Remove the corresponding name from namesArray
    const updatedNames = anames.filter(
      (name) => name !== indexToRemove
    );
    setANames(updatedNames);
   
  };
  const handlePreview = (file) => {
    try {
      // Create a Blob object with the file data
      const blob = new Blob([file.file], { type: 'application/pdf' });
  
      // Create a data URL for the blob
      const fileURL = URL.createObjectURL(blob);
      setPreviewFile(fileURL);
    } catch (error) {
      console.error('Error creating preview:', error);
    }
  };
  

  const closePreview = () => {
    // Revoke the URL to release resources
    URL.revokeObjectURL(previewFile);
    setPreviewFile(null);
  };
  function FilePreviewModal() {
    return (
      <div className="preview-modal">
        <div className="modal-content">
          <button onClick={closePreview} className="close-button">
            Close
          </button>
          {previewFile ? (
            <iframe src={previewFile} width="100%" height="500" title="File Preview" />
          ) : null}
        </div>
      </div>
    );
  }
  const handleSubmit = async (event) => {
    
    if (selectedFileNames.length > 0 || selectedAFileNames.length > 0) {
      const formData = new FormData();
  
      // Append the first file to the formData
      formData.append("file1", selectedFileNames[0]);
  
      // Append the second file to the formData
      formData.append("file2", selectedAFileNames[0]);
  
      try {
        let res = await fetch("http://54.167.30.227:3000/api/container/sampleDoc/upload", {
          method: "POST",
          body: formData,
          headers: {
            'Authorization': token,
          },
        });
  
        let result = await res.json();
        setResult(result.result.files);
        if (result.result.files) {
        const tdsDocument= result.result.files.file1.map(item=>item.name).join("");
        const sysDocument=  result.result.files.file2.map(item=>item.name).join('');
        
        console.log(result.result.files , 'result.files');
        console.log(tdsDocument, sysDocument,"payload");
        const payload = {
          tdsId: id,
          tdsDocument,
          sysDocument,
        };
        const newLocal = "http://54.167.30.227:3000/api/tdsDetails/docSubmit";
   const response=await fetch(newLocal, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': token,
      },

      body: JSON.stringify(payload),
    })
      const data= await response.json();
        console.log("Success:", data);

        // handle the response data here
      
  
        if (result.result.files != null) {
          alert("Files uploaded");
        }
        navigate("/Analystdashboaed");
      }  else {
        console.error('No files were uploaded.');
      }
    } catch (error) {
        console.error('Error uploading files:', error);
      }
    } else {
      // If either file is not selected, show an alert
      alert('Please Select both files first');
    }
   
  };
  function combineValues(...values) {
    const nonEmptyValues = values.filter(value => value !== "" && value !== undefined);
    return nonEmptyValues.length > 0 ? nonEmptyValues.join(", ") : "NA";
  }

      

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
              
                  
                </tr>
              </thead>
              {analystView.batchDetails ? (
              <tbody className="tablebody-custom">
                <tr>
                  <td>01</td>
                  <td>{analystView.batchDetails.rlplNumber}</td>
                  <td>{combineValues(analystView.batchDetails.batchNo)}</td>
                  <td>{combineValues(analystView.batchDetails.natureOfPacking)}</td>
                  <td>{combineValues(analystView.batchDetails.sampleQuantity)}</td>
                  <td>{combineValues(analystView.batchDetails.mfgDate)}</td>
                  <td>{combineValues(analystView.batchDetails.expDate)}</td>
                  <td>{combineValues(analystView.batchDetails.retestDate)}</td>

        
                  
                </tr>
              </tbody>) : (
  <tbody className="tablebody-custom">
    <tr>
      <td colSpan="9">Data not available</td>
    </tr>
  </tbody>
)}
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
        
                    
      <tr>
        <td>{1}</td>
        <td>{analystView.tdsNumber}</td>
        <td>{analystView.testDataCode}</td>
        <td>
          {/* Render download link for datasheet */}
          {datasheet ? (
            <div>
              <a
                href={datasheet}
                target="_blank"
                rel="noopener noreferrer"
              >
                <PiFilePdfFill /> Download
                <BsArrowDownCircle size={23} color="#9AC037" />
              </a>
              
            </div>
          ) : (
            <span>No data available</span>
          )}
        </td>
                      <td>
                        <PiFileArrowUp
                          size={23}
                          color="#818181"
                          
                        />
                    
                        <input
                          type="file"
                    name="tdsdoc"
                    multiple
                          style={{ display: "none" }}
                          onChange={handleFileChange}
                        /> <label className="customInputLabel">
                        
                        Selected Files: {' '}
                        <input
                          type="button"
                          className="customInputButton"
                          value="Browse"
                          onClick={() => document.querySelector('[name="tdsdoc"]').click()} // Trigger the hidden file input
                        /> 
                                  {names.map(name => (
                                    <li key={name}>
                                      {name}
                                      <MdOutlineDelete size={20} color="red" onClick={() => handleRemoveFile(name)}/>
                                    </li> 
                                  ))}
                            
                                
                      </label>
                                  
                      </td>
                      <td>
                        <PiFileArrowUp
                          size={23}
                          color="#818181"
                          
                        />
                    
                        <input
                          type="file"
                    name="sysdoc"
                    multiple
                          style={{ display: "none" }}
                          onChange={handleAFileChange}
                        /> <label className="customInputLabel">
                        
                        Selected Files: {' '}
                        <input
                          type="button"
                          className="customInputButton"
                          value="Browse"
                          onClick={() => document.querySelector('[name="sysdoc"]').click()} // Trigger the hidden file input
                        /> 
                                  {anames.map(name => (
                                    <li key={name}>
                                      {name}
                                      <MdOutlineDelete size={20} color="red" onClick={() => handleARemoveFile(name)}/>
                                      <button onClick={() => handlePreview(name)}>Preview</button> 
                                    </li> 
                                    
                                  ))}
                            
                               
                      </label>
                                  
                      </td>
                      
                      </tr>
              </tbody>
            </Table>
            {previewFile && (
      <iframe
        title="File Preview"
        width="100%"
        height="500"
        src={previewFile}
      ></iframe>
    )}
            <div className="cardbuttonboubleend mb-3">
              <button
                className="cardbutton"
                type="submit"
                onClick={handleSubmit}
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