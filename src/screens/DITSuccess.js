import React, { useEffect,useState } from "react";
import "./Styles.css";

import { useNavigate } from "react-router-dom";
import { BsFileEarmarkCheck } from "react-icons/bs";
import { Table } from "react-bootstrap";
import NavbartitleAddco from "../components/NavbartitleAddco";
import SidenavbarDIT from "../components/SidenavbarDIT";
import { useSelector, useDispatch } from "react-redux";
import { changeTDSId } from "../redux/FormSlice";
export default function DITSuccess() {
const navigate=useNavigate()
const dispatch = useDispatch();
const [ditFromLocalStorage, setDitFromLocalStorage] = useState([]);
const [isLoading, setIsLoading] = useState(true);

console.log("localdit",ditFromLocalStorage)
useEffect(() => {
  localfunction();
}, []);
const localfunction = () => {
  try {
    const storedDataString = sessionStorage.getItem('dit');
    console.log('Stored data from localStorage:', storedDataString);
    const localDit = JSON.parse(storedDataString) || [];
    console.log('Parsed local dit data:', localDit);
    setDitFromLocalStorage(localDit);
    setIsLoading(false);
  } catch (error) {
    console.error('Error parsing local dit data:', error);
  }
};

function handleSubmit(item) {
  console.log("item", item.id);
  localStorage.setItem('tdsid', item.id);
  dispatch(
    changeTDSId({
      TdsId: item.id,
    })
   );
  navigate("DITTDSExpandedview");
}
if (isLoading) {
  // You can render a loading state here
  return <div>Loading...</div>;
}
  return (
    <div className="app">
      <NavbartitleAddco />

      <div className="d-flex">
        <SidenavbarDIT />

        <div className="main">
          <div className="DITSuccess-card">
            <div>
              <BsFileEarmarkCheck size={80} color={"#9AC037"} />
            </div>

            <div className="mt-3">
              <text className="DITSuccesstext">
                The TDS has been generated Successfully
              </text>
            </div>

            <div className="mt-3">
              <Table responsive border={1}>
                <thead className="table-custom">
                  <tr>
                    <th>S.No</th>
                    <th>TDS Number</th>
                    <th>Test Parameter</th>
                    <th>View</th>
                  </tr>
                </thead>
                
                <tbody className="tablebody-custom">
                {ditFromLocalStorage.map((item,i)=>(
                  <tr key={i}>
                    <td>{i+1}</td>
                    <td>{item.tdsNumber}</td>
                    <td>{item.testDataCode}</td>
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

            <div className="mt-3">
              <button
                style={{
                  width: 80,
                  height: 40,
                  borderRadius: 6,
                  background: "#9AC037",
                }}
                className="DITSuccessButton"
                onClick={()=>navigate("/DitDashboard")}
              >
                <text className="DITSuccessButtontext">ok</text>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
