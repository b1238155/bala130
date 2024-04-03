import { createSlice } from '@reduxjs/toolkit';


const FormSlice = createSlice({
  name: 'form',
  initialState: {
 customer:{
    companyName: {},
    companyId:0,
    contactPersonName: '',
    licenceNo: '',
    phoneNo: '',
    emailId: '',
    address1: '',
    city: '',
    state: '',
    pincode: '',
    phoneNo1:'',
    address2:'',
    },
sampleDetails:{
  natureofsample: "",
  report: "",
  samplename: "",
  sampleretension: "",
  sampletype:[''],
  storage: "",
  submissiontype: "", 
  othercheck:''  ,
  msdsattached:''
},
data:{
  analyticalfeasibile:[''],
  choosefile:"",
  formfilling:'',
  methodologyfollowed:'',
  methodvalidation:'',
  specialinstruction:'',
  test:[''],
},
tabledata:[
  {
    batchNo:"",
    batchSize:"",
    natureOfPacking:'',
    mfgDate:'',
    expDate:'',
    retestDate:'',
    sampleQuantity:'',
    testParameter:[
      {
        testDataCode:"",
        testDataName:""
      }
    ]

  }
],
newArray:{
  additionalMobileNumber:  "",
  address1: "",
  address2: "",
  attachment: [],
  batchDetails:[{
  batchNo: "",
  batchSize: "",
  expDate: "",
  mfgDate: "",
  natureOfPacking: "",
  retestDate: "",
  sampleQuantity: "",
  testParameter: 
  [{

  }],}],
  city: "",
  comment : "",
  companyName: "",
  contactPerson :  "",
  email: "",
  id: 0,
  manufacturingLicenseNumber: "",
  methodology: "",
  mobileNumber: "",
  msdsAttached: [],
  natureOfSample: "",
  otherThanRegulatory : [],
  pincode: "",

  regulatory:"",
  reportRequiredaAsPerForm39:"",
  sampleName : "",
  sampleRetentionRequired: "",
  sampleType: [],
  sampleVerification: {},
  specialInstruction: "",
  state: "",
  status: "",
  storageCondition:  "",
  testToBeCarriedOut :[],
  typeOfSubmission:"",
  vvtddRefNo: ""},


  newArrayaccept:{
    additionalMobileNumber:  "",
    address1: "",
    address2: "",
    attachment: [],
    batchDetails:[{
    batchNo: "",
    batchSize: "",
    expDate: "",
    mfgDate: "",
    natureOfPacking: "",
    retestDate: "",
    sampleQuantity: "",
    testParameter: 
    [{
  
    }],}],
    city: "",
    comment : "",
    companyName: "",
    contactPerson :  "",
    email: "",
    id: 0,
    manufacturingLicenseNumber: "",
    methodology: "",
    mobileNumber: "",
    msdsAttached: [],
    natureOfSample: "",
    otherThanRegulatory : [],
    pincode: "",
  
    regulatory:"",
    reportRequiredaAsPerForm39:"",
    sampleName : "",
    sampleRetentionRequired: "",
    sampleType: [],
    sampleVerification: {},
    specialInstruction: "",
    state: "",
    status: "",
    storageCondition:  "",
    testToBeCarriedOut :[],
    typeOfSubmission:"",
    vvtddRefNo: "",
    rlplDetails: [
      {
          sampleId:0,
          rlplNumber: "",
          batchNo: "",
          batchSize: "",
          natureOfPacking: "",
          mfgDate: "",
          expDate: "",
          retestDate: "",
          sampleQuantity: "",
          testParameter: [
              {
                  testDataName: "",
                  testDataCode: ""
              }
          ],
          status: "",
          id:0
      }
  ],},
ditresponse:[
  
    {
      sampleId: 0,
      batchId: "",
      tdsNumber:"",
       id: 0,
      testDataName: "",
      testDataCode:""
  }
  
],
usertoken:{
  usertype:"",
  token:"",
  userid:"",
  username:""
},
batchId:'',
companyId:'',
AbatchId:'',
TdsId:'',
SroId:'',
companydetail:[''],
ReportDetail:[{}]
  },
  reducers: { 
      changeCustomerDetails: (state,action)=> {
        console.log(action.payload)
          state.customer = action.payload   
        },
        changeSampleDetails: (state,action)=> {
          console.log(action.payload)
              state.sampleDetails = action.payload   
            },
changeTypeofAnalysis: (state,action)=>{
  console.log(action.payload)
state.data = action.payload;
},

changeBatchDetails: (state,action)=>{
  console.log(action.payload)
state.tabledata =action.payload;
},
changeSubmitData:(state,action)=>{
  console.log(action.payload)
state.newArray =action.payload;
},
changeSubmitAccept:(state,action)=>{
  console.log(action.payload)
state.newArrayaccept =action.payload;
},changeUserToken:(state,action)=>{
  
  state.usertoken=action.payload;
},
changeBatchId:(state,action)=>{
  state.batchId=action.payload;
},changeSubmitDit:(state,action)=>{
  console.log(action.payload)
state.ditresponse =action.payload;
},
changeCompanyId:(state,action)=>{
  state.companyId=action.payload;
},
changeTDSId:(state,action)=>{
  state.TdsId=action.payload;
},
changeAnalystBatchId:(state,action)=>{
  state.AbatchId=action.payload;
},
changeSroId:(state,action)=>{
  state.SroId=action.payload;
},
changeRlplsearch:(state,action)=>{
  state.companydetail=action.payload
},changeReportDetails:(state,action)=>{
  state.ReportDetail=action.payload
}
  },

});

export const { changeCustomerDetails,changeSampleDetails,changeTypeofAnalysis,changeBatchDetails,changeSubmitData,changeUserToken,
changeBatchId,changeSubmitDit,changeCompanyId,changeTDSId,changeAnalystBatchId,changeSroId,changeRlplsearch,changeSubmitAccept,changeReportDetails} = FormSlice.actions;

export default FormSlice.reducer;