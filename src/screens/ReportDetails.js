/* eslint-disable react-hooks/exhaustive-deps */
import React,{useEffect,useState} from 'react';
import Sidenavbar from '../components/Sidenavbar';
import Navbartitle from '../components/Navbartitle';
import{Table} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './pahin.css';
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import { IconContext } from "react-icons";
import {BsSearch} from 'react-icons/bs';
import { changeCompanyId } from "../redux/FormSlice";
import { AiOutlineLeft, AiOutlineEye } from "react-icons/ai";
import { useDispatch,useSelector } from "react-redux";
import { changeAnalystBatchId } from "../redux/FormSlice";

export default function ReportDetails(){
  const token  = useSelector((state) => state.form.usertoken.token);
  const reports = useSelector((state) => state.form.ReportDetail);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [pageNumber, setPageNumber] = useState(0);
  const reportsPerPage = 10; // Adjust as needed

  const pagesVisited = pageNumber * reportsPerPage;
  function handleSubmit(report) {
    console.log("item",report.id);
    localStorage.setItem('rbatchid', report.id);
    dispatch(
      changeAnalystBatchId({
        AbatchId: report.id,
      })
     );
    navigate("Reportexpandedview");
  }
  const displayReports = reports
    .slice(pagesVisited, pagesVisited + reportsPerPage)
    .map((report, i) => (       
        <tr key={i}>
            <td>{i+1+ pageNumber* reportsPerPage}</td>
            <td>{report.sampleDetails.companyName}</td>
            <td>{report.sampleDetails.manufacturingLicenseNumber}</td>
            <td>{report.sampleDetails.State}</td>
            <td><button className="tbbutton " onClick={()=>handleSubmit(report)}>View</button></td>
        </tr>

    ));

  const pageCount = Math.ceil(reports.length / reportsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
    return(
        <div className='app'>
<Navbartitle/>

<div className='d-flex'>

            <Sidenavbar />

            <div className='main'>
                <div className='mainitem'>
                  
                <div
              className="analystbackbutton mt-3"
              onClick={() => navigate("/Report")}
            >
              <AiOutlineLeft
                onClick={() =>
                  navigate("/Report")
                }
              />{" "}
              <text>back</text>
            </div>

                    {/* --------------------Table Starts here---------------- */}
                  
                    <Table className="tableSearch mt-3" border={1}>
                <thead className="tbhed">
                    <tr>
                    <th>S.No</th>
                    <th>Company Name</th>
                    <th>Manufacturing Lic No.</th>
                    <th>State</th>
                    <th>View & Edit</th>
                    </tr>
                </thead>
                <tbody className="trAlign">{displayReports}</tbody>
                
            </Table>
                 <ReactPaginate
        previousLabel="Previous"
        nextLabel="Next"
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName="pagination"
    
        disabledClassName="pagination__link--disabled"
        activeClassName="pagination__link--active"
        pageLinkClassName="custom-page-link" // Add custom class to page links
previousLinkClassName="custom-previous-link" // Add custom class to the previous link
nextLinkClassName="custom-next-link" // Add custom class to the next link
previousClassName="custom-previous-button" // Add custom class to the previous button
nextClassName="custom-next-button" 
      />
                </div>
            
            </div>
            </div>
       
        </div>
    )
} 