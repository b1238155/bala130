/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import "./pahin.css";
import {
  Table,
  Row,
  Col,
  Card,
} from "react-bootstrap";

import "./Styles.css";
import { BsBoxSeam, BsClipboardCheck } from "react-icons/bs";
import { LuClipboardEdit } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import NavbartitleAddco from "../components/NavbartitleAddco";
import SidenavbarAnalyst from "../components/SidenavbarAnalyst";
import { changeAnalystBatchId } from "../redux/FormSlice";
import { useDispatch,useSelector } from "react-redux";
export default function AnalystDashboaed() {
  // const token  = useSelector((state) => state.form.usertoken.token);
  const token = localStorage.getItem('accessToken');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);

  const [data, setData] = useState([]); // Initialize data as an empty array
const [dashboard ,setDashboard]=useState({});
  const [filterData, setFilterData] = useState([]);
  const itemsPerPage = 10;
  useEffect(()=>{
    window.sessionStorage.removeItem('names')
  
  },[])
  useEffect(() => {
    
    // Fetch data from your API endpoint here
    fetch(`http://54.167.30.227:3000/api/tdsDetails/getDitApprovedTdsDetails?page=${page}&perPage=${itemsPerPage}`,{
      headers: {
        "Content-Type": "application/json",
        'Authorization': token
      },
    })
      .then((response) => response.json())
      .then((apiData) => {

        setData(apiData.samples); // Set the fetched data in the state
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
      
  }, []);
  useEffect(() => {
    // Fetch data from your API endpoint here
    fetch('http://54.167.30.227:3000/api/batchDetails/dashBoard',{
      headers: {
        "Content-Type": "application/json",
        'Authorization': token
      },
    })
      .then((response) => response.json())
      .then((apiData) => {
        
        setDashboard(apiData); // Set the fetched data in the state
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [page, token]);
console.log("data", data)
  useEffect(() => {
    
    const startIndex = page * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setFilterData(data.slice(startIndex, endIndex));
  }, [data, page]);

  const handlePageChange = (selectedPage) => {
    setPage(selectedPage.selected);
  };
  function handleSubmit(item) {
    
    console.log("item", item.id);
    localStorage.setItem('abatchid', item.id);
    dispatch(
      changeAnalystBatchId({
        AbatchId: item.id,
      })
     );
    navigate("AnalystBatchandRLPLdetails");
  }
  return (
    <div className="app">
      <NavbartitleAddco />

      <div className="d-flex">
        <SidenavbarAnalyst />
        <div className="main">
          <div className="mainitem">
            {/* -----------------------------------------Top Card Start---------------------------------- */}

            <div className="mt-4 row wholeCardDiv">
              <Row>
              
                <Col md={3}>
                  <Card className="mainCard2 p-2">
                    <div className="cardArrangement">
                      <div style={{ justifyContent: "space-evenly" }}>
                        <p>Samples Completed</p>
                        <p className="cardNum">{dashboard.todayCompleted}</p>
                      </div>
                      <div>
                        <BsClipboardCheck size={50} color="#fff" />
                      </div>
                    </div>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card
                    className="mainCard2 p-2"
              
                  >
                    <div className="cardArrangement">
                      <div>
                        <p>Samples Awaiting</p>
                        <p className="cardNum">{dashboard.pending}</p>
                      </div>
                      <div>
                        <LuClipboardEdit size={50} color="#fff" />
                      </div>
                    </div>
                  </Card>
                </Col>
              </Row>
              {/* -----------------------------------------Top Card Ended---------------------------------- */}

              <div className="topforsamplewaitingandviewall">
                <p className="tableTop mt-3">Samples awaiting testing</p>
               
              </div>
              <div>
                <Table className="table" border={1}>
                  <thead className="table-custom">
                    <tr>
                      <th>S.No</th>
                      <th>TDS ID</th>
                       <th>RLPL ID</th>
                      <th>View</th>
                    </tr>
                  </thead>
                  <tbody className="tablebody-custom">
                    {filterData.map((item, index) => (
     <tr key={item.id}>
     <td>{index + 1 + page * itemsPerPage}</td>
     <td>{item.tdsNumber}</td>
     <td>{item.batchDetails.rlplNumber}</td>
    
     <td>
       <button
         className="tbbutton"
         onClick={() => handleSubmit(item)}
       >
         View
       </button>
     </td>
   </tr>))} 
                  
                  </tbody>
                </Table>
              </div>
              {data.length>0 ?
               <ReactPaginate 
        containerClassName={"pagination"}
        activeClassName={"active"}
        pageClassName={"page-item"}
        onPageChange={handlePageChange}
        pageCount={Math.ceil(data.length / itemsPerPage)}
        previousLabel={
          <IconContext.Provider value={{ color: "#B8C1CC", size: "36px" }}>
            <AiFillLeftCircle />
          
          </IconContext.Provider>
        }
        nextLabel={
          <IconContext.Provider value={{ color: "#B8C1CC", size: "36px"}}>
           
          
            <AiFillRightCircle />
          </IconContext.Provider>
        }
        pageLinkClassName="custom-page-link" // Add custom class to page links
        previousLinkClassName="custom-previous-link" // Add custom class to the previous link
        nextLinkClassName="custom-next-link" // Add custom class to the next link
        previousClassName="custom-previous-button" // Add custom class to the previous button
        nextClassName="custom-next-button" 
      />
      :null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
