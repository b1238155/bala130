/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import { AiOutlineRightCircle, AiOutlineLeftCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import "./pahin.css";
import { Table, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BsBoxSeam, BsClipboardCheck } from "react-icons/bs";
import { LuClipboardEdit } from "react-icons/lu";
import NavbartitleAddco from "../components/NavbartitleAddco";
import SidenavbarDIT from "../components/SidenavbarDIT";
import { changeBatchId } from "../redux/FormSlice";
import { useDispatch, useSelector } from "react-redux";
export default function DitDashboard() {
  // const token = useSelector((state) => state.form.usertoken.token);
  const token = localStorage.getItem('accessToken');
  console.log(token)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const[dashBoard,setDashboard]=useState({});
  const [data, setData] = useState([]); // Initialize data as an empty array
  const [filterData, setFilterData] = useState([]);
  const itemsPerPage = 10;

useEffect(()=>{
  window.sessionStorage.removeItem("tdsid");
  window.sessionStorage.removeItem("dit");
})
  useEffect(() => {
    // Fetch data from your API endpoint here
    fetch(
      `http://54.167.30.227:3000/api/batchDetails/getBatchDetails?page=${page}&perPage=${itemsPerPage}`,
      {
        headers: {
          "Content-Type": "application/json",
          'Authorization': token,
        },
      }
    )
      .then((response) => response.json())
      .then((apiData) => {
        setData(apiData.samples); // Set the fetched data in the state
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  console.log(data)
  useEffect(() => {
    // Fetch data from your API endpoint here
    fetch('http://54.167.30.227:3000/api/batchDetails/dashBoard',{
      headers: {
        "Content-Type": "application/json",
        'Authorization': token,
      },
    })
      .then((response) => response.json())
      .then((apiData) => {
        
        setDashboard(apiData); // Set the fetched data in the state
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [token]);

  useEffect(() => {
    // Update the filtered data when the page or data changes
    const startIndex = page * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setFilterData(data.slice(startIndex, endIndex));
  }, [data, page]);

  const handlePageChange = (selectedPage) => {
    setPage(selectedPage.selected);
  };
  function handleSubmit(item) {
    console.log("item", item.id);
    localStorage.setItem('batchid', item.id);
    dispatch(
      changeBatchId({
        batchId: item.id,
      })
    );
    navigate("DITExpandedview");
  }
  return (
    <div className="app">
      <NavbartitleAddco />

      <div className="d-flex">
        <SidenavbarDIT />
        <div className="main">
          <div className="mainitem">
            {/* -----------------------------------------Top Card Start---------------------------------- */}
            <div className="mt-4 row wholeCardDiv">
              <Row>
              
                <Col md={3}>
                  <Card className="mainCard2 p-2">
                    <div className="cardArrangement">
                      <div style={{ justifyContent: "space-evenly" }}>
                        <p>Approved</p>
                        <p className="cardNum">{dashBoard.todayCompleted}</p>
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
                        <p>Remain</p>
                        <p className="cardNum">{dashBoard.pending}</p>
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
                <p className="tableTop mt-3">Samples awaiting </p>
          
              </div>
              <div>
                <Table className="table" border={1}>
                  <thead className="table-custom">
                    <tr>
                      <th>S.No</th>
                      <th>Registration No</th>
                      <th>Test Parameters</th>
                      <th>View</th>
                    </tr>
                  </thead>
                  <tbody className="tablebody-custom">
                    {filterData.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1 + page * itemsPerPage}</td>
                        <td>{item.rlplNumber}</td>
                        <td>
                          {item.testParameter
                            ? item.testParameter
                                .map((option) => option.testDataCode)
                                .join(" , ")
                            : "N/A"}
                        </td>
                        <td>
                          <button
                            className="tbbutton"
                            onClick={() => handleSubmit(item)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
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
