import React,{useState,useEffect} from "react";
import Sidenavbar from "../components/Sidenavbar";
import ReactPaginate from "react-paginate";
import { AiFillLeftCircle, AiFillRightCircle, AiOutlineFileText, AiOutlineFileProtect } from "react-icons/ai";
import { IconContext } from "react-icons";
import "./pahin.css";
import {
  Table,
  Row,
  Col,
  // Button,
  Card,
} from "react-bootstrap";
import axios from "axios";
import {BsSearch} from 'react-icons/bs';
import { TbClockEdit,TbFileStar } from "react-icons/tb";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import {LuClipboardEdit} from 'react-icons/lu';
import {FaRegWindowClose} from 'react-icons/fa';
import NavbartitleAddco from "../components/NavbartitleAddco";
import { useSelector,useDispatch } from "react-redux";
import { changeSroId,changeRlplsearch } from "../redux/FormSlice";
export default function SroDashboard() {
  const navigate = useNavigate();
  // const token = useSelector((state) => state.form.usertoken.token);
  const token = localStorage.getItem('accessToken');
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
const[dashboard,setDashboard]=useState({});
  const [data, setData] = useState([]); // Initialize data as an empty array
  const [filterData, setFilterData] = useState([]);
  const itemsPerPage = 10; 
  const [selectedOption, setSelectedOption] = useState('');
  const[companyDetail,setCompanyDetail]=useState([]);
const [searchQuery, setSearchQuery] = useState('');
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
  };

  useEffect(() => {
    // Fetch data from your API endpoint here
    fetch(`http://54.167.30.227:3000/api/sampleDetails/getSamples?page=${page}&perPage=${itemsPerPage}`,{
      headers: {
        "Content-Type": "application/json",
        'Authorization': token
      },
    })
      .then((response) => response.json())
      .then((apiData) => {
        
        setData(apiData); // Set the fetched data in the state
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
  }, [page, token]);
console.log("data", data)
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
  dispatch(
    changeSroId({
      SroId: item.id,
    })
   );
  navigate("SroDetails");
}
const handleSearchInputChange = (event) => {
  setSearchQuery(event.target.value);
};

// Function to make an API request with the search query
const searchCompanies = () => {
  const item={
    "number":searchQuery,"type":selectedOption}
    console.log(item)

    fetch("http://54.167.30.227:3000/api/batchDetails/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
          'Authorization': token
        
        
      },
    
    
      body: JSON.stringify(item),
    })
      .then((response) => response.json())
    
      .then((data) => {
        console.log("result:", data);
        setCompanyDetail(data)
        dispatch(
          changeRlplsearch({
            companydetail:data ,
          })
         );
        if(selectedOption==="RLPL"){
        navigate('/SroDashboard/SearchRLPL')
         // handle the response data here
      }if(selectedOption==="TDS"){
        navigate('/SroDashboard/SearchTDS')
      }}
      )
    
      .catch((error) => {
        // handle any errors here
      });
    }

  return (
    <div className="app">
      <NavbartitleAddco />

      <div className="d-flex">
        <Sidenavbar />
        <div className="main">
          <div className="mainitem">
            {/* -----------------------------------------Top Card Start---------------------------------- */}
<div className="col" style={{display:"flex" ,alignItems:"center"}}>
            <div className='SearchCustomerSearchbox'>
            <div >
        
        <select className="titleselectsearch titleselectsize"
        id="profile"
        value={selectedOption}
        onChange={handleSelectChange}>
          <option className="titleselect" >Type</option>
          <option className="titleselect" value="RLPL">RLPL ID</option>
          <option className="titleselect" value="TDS">TDS ID</option>
        </select>
      </div>
                <div>
                    <input type='text' placeholder='Select type of search' className='SearchCustomerSearchbox-input'
                     value={searchQuery}
                      onChange={handleSearchInputChange}
                      disabled={!selectedOption}
                      />
                </div>
                <div>
                    <button className='SearchCustomer-searchbox-button'
                     onClick={searchCompanies}
                     disabled={!selectedOption}
                      >
                        <BsSearch className='SearchCustomer-searchbox-button-icon' /> <text className='SearchCustomer-searchbox-button-text'>Search</text>
                    </button>
                </div>
                  </div>
                
        </div>
            <div className="mt-4 row wholeCardDiv">
              <div>
                {/* <p className="overview">Overview</p> */}
               
              
              <Row>

              <Col md={3}>
                  <Card className="mainCard1 p-2">
                    <div className="cardArrangement">
                      <div style={{ justifyContent: "space-evenly" }}>
                        <p className="CardName">Total Test Requisition  </p>
                        <p className="cardNum">30</p>
                      </div>
                      <div>
                        <AiOutlineFileText size={30} color="#fff" />
                      </div>
                    </div>
                  </Card>
                </Col>
                
                <Col md={3}>
                  <Card className="mainCard2 p-2">
                    <div className="cardArrangement">
                      <div style={{ justifyContent: "space-evenly" }}>
                        <p className="CardName">Document Issuance</p>
                        <p className="cardNum">30</p>
                      </div>
                      <div>
                        <FiEdit size={30} color="#fff" />
                      </div>
                    </div>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card
                    className="mainCard2 p-2"
                    onClick={() => navigate("AwaitingSamplesReview")}
                  >
                    <div className="cardArrangement">
                      <div>
                        <p className="CardName">Samples Analyst</p>
                        <p className="cardNum">30</p>
                      </div>
                      <div>
                        <TbClockEdit size={30} color="#fff" />
                      </div>
                    </div>
                  </Card>
                </Col>

                <Col md={3}>
                  <Card
                    className="mainCard2 p-2"
                    onClick={() => navigate("AwaitingSamplesReview")}
                  >
                    <div className="cardArrangement">
                      <div>
                        <p className="CardName"> Samples Reviewed</p>
                        <p className="cardNum">15</p>
                      </div>
                      <div>
                        <TbFileStar size={30} color="#fff" />
                      </div>
                      
                    </div>
                    
                  </Card>
                  
                </Col>
              </Row>

              <Row className="mt-5">
              <Col md={3}>
                  <Card className="mainCard2 p-2">
                    <div className="cardArrangement">
                      <div style={{ justifyContent: "space-evenly" }}>
                        <p className="CardName">Samples Approved</p>
                        <p className="cardNum">30</p>
                      </div>
                      <div>
                        <AiOutlineFileProtect size={30} color="#fff" />
                      </div>
                    </div>
                  </Card>
                </Col>
{/* 
                <Col md={3}>
                  <Card className="mainCard2 p-2">
                    <div className="cardArrangement">
                      <div style={{ justifyContent: "space-evenly" }}>
                        <p className="CardName">Awaiting Samples for Test</p>
                        <p className="cardNum">30</p>
                      </div>
                      <div>
                        <LuClipboardEdit size={30} color="#fff" />
                      </div>
                    </div>
                  </Card>
                </Col> */}

                <Col md={3}>
                  <Card className="mainCard2 p-2">
                    <div className="cardArrangement">
                      <div style={{ justifyContent: "space-evenly" }}>
                        <p className="CardName">QMS</p>
                        <p className="cardNum">30</p>
                      </div>
                      <div>
                        <FaRegWindowClose size={30} color="#fff" />
                      </div>
                    </div>
                  </Card>
                </Col>
              </Row>
              </div>
             
              {/* -----------------------------------------Top Card Ended---------------------------------- */}

              <div className="topforsamplewaitingandviewall">
                <p className="tableTop mt-3">Samples awaiting Review</p>

          
              </div>
              <div>
                <Table className="table" border={1}>
                  <thead className="table-custom">
                    <tr>
                      <th>S.No</th>
                      <th>Company Name</th>
<th>Sample Name</th>
                      <th>View & Edit</th>
                    </tr>
                  </thead>
                  <tbody className="tablebody-custom">
                  {filterData.map((item, index) => (
     <tr key={item.id}>
                    
                      <td>{index+1 + page * itemsPerPage}</td>
                      <td>{item.companyName}</td>
                
<td>{item.sampleName}</td>
                      <td>
                        <button className="tbbutton " onClick={()=>handleSubmit(item)}>View</button>
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
