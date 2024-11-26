import React, { useState } from "react";
import CustomerDetailes from "./CustomerDetailes";
import SampleDetails from "./SampleDetails";
import BatchDetails from "./BatchDetails";
import MultiStepProgressBar from "../components/MultiStepProgressBar";
import TypeOfAnalysis from "./TypeOfAnalysis";
import Sidenavbar from "../components/Sidenavbar";
import ConfirmDetails from "./ConfirmDetails";
import SampleVerification from "./SampleVerification";
import './Styles.css';
import Navbartitle from "../components/Navbartitle";
import { AppProvider } from "../state";

function Progress() {
    const [page, setPage] = useState("CustomerDetailes");
  
    const nextPage = (page) => {
      setPage(page);
    };
  
    const nextPageNumber = (pageNumber) => {
      switch (pageNumber) {
        case "1":
          setPage("CustomerDetailes");
          break;
        case "2":
          setPage("SampleDetails");
          break;
        case "3":
          setPage("BatchDetails");
          break;
          case "4":
          setPage("TypeOfAnalysis");
          break;
         case "5":
          setPage("ConfirmDetails");
          break;
          case "6":
          setPage("SampleVerification");
          break;
        
        default:
          setPage("1");
      }
    };
  
    return (
      
         <div className="app">

          <Navbartitle/>

<div className="d-flex">

          <Sidenavbar />
          
      <div className="main">
        <div className="mainitem">
        
        
      
<AppProvider>
        <div style={{marginTop:50,marginBottom:70}}>
        <MultiStepProgressBar page={page} onPageNumberClick={nextPageNumber} />
        </div>
        {
          {
            CustomerDetailes: <CustomerDetailes onButtonClick={nextPage} />,
            SampleDetails: <SampleDetails onButtonClick={nextPage} />,
            BatchDetails: <BatchDetails onButtonClick={nextPage} />,
            TypeOfAnalysis: <TypeOfAnalysis onButtonClick={nextPage} />,
            ConfirmDetails:<ConfirmDetails onButtonClick={nextPage}/>,
            SampleVerification:<SampleVerification onButtonClick={nextPage}/>
        
      
          }[page]
        }
       </AppProvider>
       </div> 
      </div>
      </div>
      </div>
      
    
    );
  }
  
  export default Progress;
  