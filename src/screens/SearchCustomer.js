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
import { useDispatch,useSelector } from "react-redux";
export default function SearchCustomer(){
  const token  = useSelector((state) => state.form.usertoken.token);
const[companyDetail,setCompanyDetail]=useState([]);
const [searchQuery, setSearchQuery] = useState('');
const [filterData, setFilterData] = useState([]);
const itemsPerPage = 10;
const [page, setPage] = useState(0);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        // Fetch company options from API
        axios
          .get(`http://54.167.30.227:3000/api/companyDetails?page=${page}&perPage=${itemsPerPage}`,{
            headers: {
              "Content-Type": "application/json",
              'Authorization': token
            },
          
          })
          .then((response) => setCompanyDetail(response.data))
          .catch((error) => console.error("Error fetching company data:", error));
      }, []);
      useEffect(() => {
        // Update the filtered data when the page or data changes
        const startIndex = page * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setFilterData(companyDetail.slice(startIndex, endIndex));
      }, [companyDetail, page]);
  
  
      const handlePageChange = (selectedPage) => {
        setPage(selectedPage.selected);
      };
      function handleSubmit(item) {
        console.log("item", item.id);
        dispatch(
          changeCompanyId({
            companyId: item.id,
          })
         );
        navigate("ViewCustomer");
      }
      const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
      };
    
      // Function to make an API request with the search query
      const searchCompanies = () => {
        axios
          .get(`http://54.167.30.227:3000/api/companyDetails/searchCompany?companyName=${searchQuery}`,{
            headers: {
              "Content-Type": "application/json",
              'Authorization': token
            },
          
          })
          .then((response) => {
            setCompanyDetail(response.data);
          })
          .catch((error) => console.error('Error searching companies:', error));
      };
    
    return(
        <div className='app'>
<Navbartitle/>

<div className='d-flex'>

            <Sidenavbar />

            <div className='main'>
                <div className='mainitem'>
                  
                  <div className='SearchCustomerSearchbox'>
                <div>
                    <input type='text' placeholder='Search Company' className='SearchCustomerSearchbox-input'
                     value={searchQuery}
                     onChange={handleSearchInputChange} />
                </div>
                <div>
                    <button className='SearchCustomer-searchbox-button' onClick={searchCompanies} >
                        <BsSearch className='SearchCustomer-searchbox-button-icon' /> <text className='SearchCustomer-searchbox-button-text'>Search</text>
                    </button>
                </div>
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

                <tbody className="trAlign">
                {filterData.map((item, index) => (
                <tr key={item.id} >
                    <td>{index + 1 + page * itemsPerPage}</td>
                    <td>{item.companyName}</td>
                    <td>{item.manufacturingLicenseNumber}</td>
                    <td>{item.state}</td>
                    <td><button className="tbbutton " onClick={() => handleSubmit(item)}>View</button></td>
                </tr>))}

               

                </tbody>
            </Table>
                </div>
                {companyDetail.length>0 ?
               <ReactPaginate 
        containerClassName={"pagination"}
        activeClassName={"active"}
        pageClassName={"page-item"}
        onPageChange={handlePageChange}
        pageCount={Math.ceil(companyDetail.length / itemsPerPage)}
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
    )
}