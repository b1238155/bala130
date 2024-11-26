import React from "react";
import "../screens/Styles.css";
import { ProgressBar, Step } from 'react-step-progress-bar'

const MultiStepProgressBar = ({ page, onPageNumberClick }) => {
  let stepPercentage
  if (page === "CustomerDetailes") {
    stepPercentage=0;
  } else if (page === "SampleDetails") {
    stepPercentage = 20;
  } else if (page === "BatchDetails") {
    stepPercentage =40;
  } else if (page === "TypeOfAnalysis") {
    stepPercentage = 60;
  } else if (page === "ConfirmDetails") {
    stepPercentage =80 ;
  } else if (page === "SampleVerificationCheckList") {
    stepPercentage =100 ;
   } else {
    stepPercentage =100;
  }

  return (
   
    <ProgressBar percent={stepPercentage}>
    
      <Step>
        {({ accomplished, index }) => (
          <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
          <div
            className={`indexedStep ${accomplished ? "accomplished" : null}`}
            // onClick={() => onPageNumberClick("1")}
          >
            {index + 1}
        
            
          </div>
          <div className="mt-1 progresstext">
            <label  className="progressbarfont">Customer Details</label> 
          </div>
          </div>
        )}
      </Step>

      <Step>
        {({ accomplished, index }) => (
          <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
          <div
            className={`indexedStep ${accomplished ? "accomplished" : null}`}
            // onClick={() => onPageNumberClick("2")}
          >
            {index + 1}
          </div>
          <div className="mt-1 progresstext">
          
            <label  className="progressbarfont">Sample Details</label>
          </div>
          </div>
        )}
      </Step>
      <Step>
        {({ accomplished, index }) => (
          <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
          <div
            className={`indexedStep ${accomplished ? "accomplished" : null}`}
            // onClick={() => onPageNumberClick("3")}
          >
            {index + 1}
          </div>
          <div className="mt-1 progresstext">
            <label  className="progressbarfont">Batch Details</label> 
          </div>
          </div>
        )}
      </Step>
      <Step>
        {({ accomplished, index }) => (
          <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
          <div
            className={`indexedStep ${accomplished ? "accomplished" : null}`}
            // onClick={() => onPageNumberClick("4")}
          >
            {index + 1}
          </div>
          <div className="mt-1 progresstext">
            <label  className="progressbarfont">Type of Analysis</label> 
          </div>
          </div>
        )}
      </Step>
      <Step>
        {({ accomplished, index }) => (
          <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
          <div
            className={`indexedStep ${accomplished ? "accomplished" : null}`}
            // onClick={() => onPageNumberClick("5")}
          >
            {index + 1}
          </div>
          <div className="mt-1 progresstext">
            <label className="progressbarfont">Confirm Details</label> 
          </div>
          </div>
        )}
      </Step>
      <Step>
        {({ accomplished, index }) => (
          <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
          <div
            className={`indexedStep ${accomplished ? "accomplished" : null}`}
            // onClick={() => onPageNumberClick("6")}
          >
            {index + 1}
          </div>
          <div className="mt-1 progresstext">
            
            <label  className="progressbarfont">SampleVerificationChecklist</label>
          </div>
          </div>
        )}
      </Step>
      
      
    </ProgressBar>
  
  );
};

export default MultiStepProgressBar;
