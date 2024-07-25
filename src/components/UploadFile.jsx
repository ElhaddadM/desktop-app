"use client"
import Papa from 'papaparse';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { StatisticsCard } from './StatisticsCard';
import {exportToExcel} from '../app/(pages)/catalyst/Functions'
import axios from 'axios'
const { Dragger } = Upload;

const files = ["CatalystUsageReport","PlacementTestReport","LearnerGrowthReport"]

const AddData =  (file, table, data1) => {
  const data = []
  const date = file.split(".")[1]
  data1?.slice(1, (data1.length - 4)).map((element) => { 
    const obj =  { 
      "Organization": element[0], 
      "LastName": element[1], 
      "FirstName": element[2], 
      "Email": element[3], 
      "Group": element[4], 
      "License": element[9], 
      "Profile": element[14],
      "date": date 
    }
    data.push(obj)
  })
  
  try {
    const resultObject = JSON.stringify({"id": "f384", data})
    axios.delete("http://localhost:3001/CatalystUsageReport/f384")
     axios.post(`http://localhost:3001/${table}`, resultObject)
    message.success(`${file} file uploaded successfully.`);
    console.log("Drop",table);
  } catch (error) {
    console.error(error)
  }
}

const AddDataPlacement =   (file, table, data1) => {
  console.log("infoPlacement" , file , table , data1);
  const data = []
  const date = file.split(".")[1]
  data1?.slice(1, (data1.length - 4)).map((element) => { 
    if (element[10] !="" & element[15] !=""){
          const obj =  { 
          "Organization": element[0], 
          "LastName": element[1], 
          "FirstName": element[2], 
          "Email": element[3], 
          "Group": element[4], 
          "Langue" : element[5],
          "Test1": element[10], 
          "Level1": element[15],
          "date": date 
        }
        data.push(obj)
    }
    
  })
  
 const StoreData = async ()=>{
  try {
    const resultObject = JSON.stringify({"id": "f385", data})
    await axios.post(`http://localhost:3001/${table}`, resultObject)
    message.success(`${file} file uploaded successfully.`);
    console.log("Drop",table);
  } catch (error) {
    console.error(error)
  }
 }
  axios.delete("http://localhost:3001/PlacementTestReport/f385").then(()=>{  StoreData() }).catch(()=>{ StoreData() })
}
const AddDataGrow =   (file, table, data1) => {
  console.log("infoPlacement" , file , table , data1);
  const data = []
  const date = file.split(".")[1]
  data1?.slice(1, (data1.length - 4)).map((element) => { 
    if (element[10] !="" & element[15] !=""){
          const obj =  { 
          "Organization": element[0], 
          "LastName": element[1], 
          "FirstName": element[2], 
          "Email": element[3], 
          "Group": element[4], 
          "Langue" : element[5],
          "type" : element[14],
          "Time" : element[12],
          "Test1": element[16],
          "Level1" : element[17],
          "Test2": element[21], 
          "Level2": element[22],
          "Test3": element[26], 
          "Level3": element[27],
          "date": date 
        }
        data.push(obj)
    }
    
  })
  exportToExcel(data,table)
  console.log("GrowD1" ,data1);
  console.log("GrowD" ,data);
 const StoreData = async ()=>{
  try {
    const resultObject = JSON.stringify({"id": "f385", data})
    await axios.post(`http://localhost:3001/${table}`, resultObject)
    message.success(`${file} file uploaded successfully.`);
    console.log("Drop",table);
  } catch (error) {
    console.error(error)
  }
 }
 axios.delete("http://localhost:3001/LearnerGrowthReport/f385").then(()=>{  StoreData() }).catch(()=>{ StoreData() })
}
const props = {
  name: 'file',
  multiple: false,
  accept: '.csv',
  onChange(info) {
    const { status, originFileObj } = info.file;
    // console.log("originFileObj" , originFileObj);
    // console.log("status" , originFileObj);
    if (status !== 'uploading') {
      Papa.parse(originFileObj, {
        complete: function(results) {
          console.log("Dderop" , results.data);
          const fileName = info.file.name.split(".")
          if (fileName.includes(files[0]))   AddData(info.file.name, files[0], results.data) ;
          if (fileName.includes(files[1]))   AddDataPlacement(info.file.name, files[1], results.data) ; ;
          if (fileName.includes(files[2]))   AddDataGrow(info.file.name, files[2], results.data) ;
          // AddData(info.file.name, files[0], results.data)
        }
      });
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully1.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    e.preventDefault();
    // console.log("Drop Search" ,e.dataTransfer );
    // const droppedFile = e.dataTransfer.files[0];
    // Papa.parse(droppedFile, {
    //   complete: function(results) {
    //     const fileName = droppedFile.name.split(".")
    //     if (fileName.includes(files[0])) AddData(droppedFile.name, files[0], results.data)
    //   }
    // });
  },
};

const UploadFile = () => (
  <div className='h-72'>
    <Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Click or drag file to this area to upload</p>
    <p className="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned files.
    </p>
  </Dragger>

  {/* <StatisticsCard /> */}
  </div>

);

export default UploadFile;
