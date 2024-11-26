import React,{useState,useEffect} from "react";
import Sidenavbar from "../components/Sidenavbar";
import ReactPaginate from "react-paginate";
import { AiFillLeftCircle, AiFillRightCircle} from "react-icons/ai";
import { IconContext } from "react-icons";
import "./pahin.css";
import {
  Table,
  Row,
  Col,
  // Button,
  Card,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Form } from "../Forms";
import Select from "react-select";
import axios from "axios";
import {BsSearch} from 'react-icons/bs';
import { TbClockEdit,TbFileStar } from "react-icons/tb";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import {LuClipboardEdit} from 'react-icons/lu';
import {FaRegWindowClose} from 'react-icons/fa';
import NavbartitleAddco from "../components/NavbartitleAddco";
import { useSelector,useDispatch } from "react-redux";
import { changeSroId,changeReportDetails } from "../redux/FormSlice";
export default function Report() {
  const navigate = useNavigate();
  // const token = useSelector((state) => state.form.usertoken.token);
  const token = localStorage.getItem('accessToken');
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]); // Initialize data as an empty array
  const [filterData, setFilterData] = useState([]);
  const [testData,setTestData]=useState([]);
  const itemsPerPage = 10; 
  const [isSubmit, setIsSubmit] = useState(false);

const initialInputs = {
fromDate:"",
toDate:"",
companyId:"",
type:"",
number:""
};
const typeData=[{value:1,label:"RLPL"},{value:2,label:"TDS"}]
const [inputs, setInputs] = useState(initialInputs);
const [formErrors, setFormErrors] = useState({
  fromDate:"",
  toDate:"",
  companyId:"",
  type:"",
  number:""
});
const initialSelectedOptions = [];
const [selectedOptions, setSelectedOptions] = useState(initialSelectedOptions);
const initialSelectedTypes = [];
const [selectedtype, setSelectedtype] = useState(initialSelectedTypes);
const { handleSubmit } = useForm();
const handleSelectChange = (selectedOptions) => {
  setSelectedOptions(selectedOptions);
  setInputs({
    fromDate:inputs.fromDate,
    toDate:inputs.toDate,
    companyId:selectedOptions,
    number:inputs.number,
 type:selectedtype,
});
setFormErrors({
  ...formErrors,
  selectedOptions: "",
});
  
};
const handleTypeChange = (selectedtype) => {
  setSelectedtype(selectedtype);
  setInputs({
    fromDate:inputs.fromDate,
    toDate:inputs.toDate,
    companyId:selectedOptions,
    number:inputs.number,
 type:selectedtype,
});
setFormErrors({
  ...formErrors,
  selectedtype: "",
});
  
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
const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Perform date validation for date fields
    if (name === "fromDate" || name === "toDate") {
      // Check if the entered date is a valid date
      if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        setFormErrors({
          ...formErrors,
          [name]: "Invalid date format. Please use YYYY-MM-DD format.",
        });
    } else {
        // Clear any previous error messages for the date field
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
  
        // Check if Exp. Date is greater than or equal to Mfg Date
        if (name === "toDate" && inputs.fromDate) {
          if (new Date(value) <= new Date(inputs.fromDate)) {
            setFormErrors({
              ...formErrors,
              [name]: "Exp Date must be after Mfg Date!",
            });
          }
        }
  

      }
    }
  setInputs({
       ...inputs,
       [name]: value,
     });

  };
  
  

 useEffect(() => {
   
  console.log(formErrors);
  if (Object.keys(formErrors).length === 0 && isSubmit) {
    console.log(inputs)
  }
}, [formErrors, inputs, isSubmit]);
 useEffect(() => {
    
  axios
    .get("http://54.167.30.227:3000/api/companyDetails",{
      headers: {
        "Content-Type": "application/json",
        'Authorization': token
      },
    })
    .then((response) => setTestData (response.data.map(item => ({
      value: item.id,
      label: item.companyName
    })))
    
    )
    .catch((error) => console.error("Error fetching company data:", error));
  
      
}, []);
console.log("testdata",testData)

const handlePagination=(item) =>{
  console.log("item", item.id);
  dispatch(
    changeSroId({
      SroId: item.id,
    })
   );
  navigate("SroReportdetail");
}
const saveData=()=>{

    const item={
        'fromDate' : inputs.fromDate, 'toDate': inputs.toDate, 'type':selectedtype.label, 'number' : inputs.number}
      console.log("item",item)
    fetch("http://54.167.30.227:3000/api/batchDetails/report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': token
      },
    
    
      body: JSON.stringify(item),
    })
      .then((response) => response.json())
    
      .then((data) => {
        dispatch(changeReportDetails(data))
        console.log("Success:", data);
        navigate('/Report/ReportDetails')
         // handle the response data here
      })
    
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

<div>

<Card className="admincard">

<div className="topforsamplewaitingandviewall">
                <p className="tableTop mt-3">Filter</p>
              </div>
              <Form validate onSubmit={handleSubmit(saveData)}>
              <Row className="mb-3 rowtabview">
                    <Col>

                      <div>
                        <label className="cardcolhed">
                          From Date
                          <text className="cardcolhedstar">*</text>
                        </label>
                      </div>
                      <div>
                        <input type="date" className="cardcolumninputtype"
                        name="fromDate"
                        value={inputs.fromDate}
                        onChange={handleChange}
            />
                      </div>
                      <p style={{color:"red"}}>{formErrors.fromDate}</p>
                    </Col>

                    <Col>
 
                      <div>
                        <label className="cardcolhed">
                          To Date
                          <text className="cardcolhedstar">*</text>
                        </label>
                      </div>
                      <div>
                        <input type="date" className="cardcolumninputtype"
                        name="toDate"
                        value={inputs.toDate}
                        min={inputs.fromDate}
                        onChange={handleChange}
              />
                      </div>
                      <p style={{color:"red"}}>{formErrors.toDate}</p>
                    </Col>

                    <Col>
                    <div>
                    <label className="cardcolhed" >
                   Company
                    </label>
                  
                       
                        </div>
                    <div>
                      
                    <Select name="companyName" 
                     value={selectedOptions} 
                     options={testData} 
        onChange={handleSelectChange}style={{borderRadius:6}}
        
         isClearable  />
            
                      </div>
                      <p style={{color:"red"}}>
                         {formErrors.selectedOptions} 
                        </p>
                    </Col>
                  </Row>
                  
                  <Row className="mb-3 rowtabview">
                   

                    
                    <Col>
                    <div>
                    <label className="cardcolhed" >
                   Type
                    </label>
                  
                       
                        </div>
                    <div>
                      
                    <Select name="Type" 
                    value={selectedtype} 
                    options={typeData} 
        onChange={handleTypeChange}style={{borderRadius:6}}
        
         isClearable  />
            
                      </div>
                      <p style={{color:"red"}}>
                        {formErrors.selectedtype}
                        </p>
                    </Col>


                    <Col>
 
 <div>
   <label className="cardcolhed">
    Number
   </label>
 </div>
 <div>
   <input type="text" className="cardcolumninputtype"
   name="number"
   value={inputs.number}
   onChange={handleChange}
//           
/>
 </div>
 <p style={{color:"red"}}>
   {formErrors.number} 
   </p>
</Col>

<Col>
</Col>

                  </Row>

                  <Row>
                    <Col>
                    <button type="submit"className="AdminButton">
                        Search
                    </button>
                    </Col>
                  </Row>
</Form>
</Card>

</div>




           
             
             
              {/* -----------------------------------------Top Card Ended---------------------------------- */}

              <div className="topforsamplewaitingandviewall">
                <p className="tableTop mt-3">Company Details</p>

          
              </div>
              <div>
                <Table className="table" border={1}>
                  <thead className="table-custom">
                    <tr>
                      <th>S.No</th>
                      <th>Company Name</th>
<th>Sample Name</th>
                      <th>View</th>
                    </tr>
                  </thead>
                  <tbody className="tablebody-custom">
                  {filterData.map((item, index) => (
     <tr key={item.id}>
                    
                      <td>{index+1 + page * itemsPerPage}</td>
                      <td>{item.companyName}</td>
                
<td>{item.sampleName}</td>
                      <td>
                        <button className="tbbutton " onClick={()=>handlePagination(item)}>View</button>
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
  );
}
