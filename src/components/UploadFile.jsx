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
  const data = [];
  const date = file.split(".")[1];
  
  data1?.slice(1, (data1.length - 4)).map((element) => { 
      if (element[34] != "") {
          const cr = "placement for catalyst";
          const obj = { 
              "Organization": element[0], 
              "LastName": element[1], 
              "FirstName": element[2], 
              "Email": element[3], 
              "Group": element[4], 
              "Langue": element[5],
              "TypeTest": element[14].toLowerCase() == cr.toLowerCase() ? "PL" : "PR",
              "TotalTime": "",
              "Time": element[12],
              "Test1": element[14].toLowerCase() == cr.toLowerCase() ? element[16] : "" ,
              "Level1": element[14].toLowerCase() == cr.toLowerCase() ? element[17] : "" ,
              "Test2": element[14].toLowerCase() != cr.toLowerCase() ? element[16] : element[21] ,
              "Level2": element[14].toLowerCase() != cr.toLowerCase() ? element[17] : element[22] ,
              "Test3": element[26] , 
              "Level3": element[27],
              "Note": element[34],
              "dateTest2": element[18] 
          };
          data.push(obj);
      }
  });

  const DataPR = data.map((el)=> { if ( el.TypeTest == "PR" ){ return el }  }).filter((item) =>{ return item !=undefined})
  const DataPL = data.map((el)=> { if ( el.TypeTest == "PL" ){ return el }  }).filter((item) =>{ return item !=undefined})
 
  console.log("Data" , data);
  console.log("PL" , DataPL);
  console.log("PR" , DataPR);
  
  // DataPR.map((e)=>{
  //   DataPL.map((elm)=>{
  //     if ( e.Email.toLowerCase() == elm.Email.toLowerCase() && e.Langue.split(" ")[0].toLowerCase() == elm.Langue.split(" ")[0].toLowerCase() ){
  //         e.Test1 = elm.Test1
  //         e.Level1 = elm.Level1
  //     }
  //   })
  // })

  DataPL.map((e)=>{
    DataPR.map((elm)=>{
      if ( e.Email.toLowerCase() == elm.Email.toLowerCase() && e.Langue.split(" ")[0].toLowerCase() == elm.Langue.split(" ")[0].toLowerCase() ){
          if ( e.Test2 =="" && e.Level2 ==""){
            e.Test2 = elm.Test2
            e.Level2 = elm.Level2
          }
      }
    })
  })

  // console.log("PRU" , DataPR);
  console.log("PLU" , DataPL);
  // const modifiedData = [];  // New array to store the modified objects

  // for (let i = 0; i < data.length - 1; i++) {
  //     if (data[i].Email.toLowerCase() === data[i + 1].Email.toLowerCase()) {
  //         console.log("Place 1");
  //         data[i].ana = "ana1";
  
  //         if (data[i].Langue.split(" ")[0].toLowerCase() === data[i + 1].Langue.toLowerCase()) {
  //             console.log("Place 2");
  //             data[i].ana = "ana2";
  
  //             if (data[i].TypeTest == "PR") {
  //                 console.log("Place 3");
  //                 data[i].ana = "ana3";
  //                 data[i].dateTest2 = "ok";
  //                 data[i].Test1 = data[i + 1].Test1;
  //                 data[i].Level1 = data[i + 1].Level1;
  //             } else {
  //                 console.log("Place 4");
  //                 data[i].Test2 = data[i + 1].Test2;
  //                 data[i].Level2 = data[i + 1].Level2;
  //             }
  //         }
  //         modifiedData.push({ ...data[i] });  // Add the modified object to the new array
  //     }
  //     modifiedData.push({ ...data[i] })
  // }
  
  // console.log(modifiedData); 
  


  const FilterFun = (DataPL,lang) =>{
    const ListEnglish = DataPL.map((lng) => {
      if (lng.Langue.split(" ")[0].toLowerCase() === lang.toLowerCase()) {
        return lng;
      }
    })
    .filter((item) => item !== undefined);
  
    ListEnglish.sort((a, b) => {
      if (a.Email.toLowerCase() < b.Email.toLowerCase()) return -1;
      if (a.Email.toLowerCase() > b.Email.toLowerCase()) return 1;
      return 0;
    });
  
    const copyItems1 = [];
  for (let i = 0; i < ListEnglish.length - 1; i++) {
    if (ListEnglish[i].Email.toLowerCase() === ListEnglish[i + 1].Email.toLowerCase()) {
  
      const tme1 = ListEnglish[i]?.Time.split(':').map(Number);
      const tme2 = ListEnglish[i + 1]?.Time.split(':').map(Number);
      
      const totalHours = tme1[0] + tme2[0];
      const totalMinutes = tme1[1] + tme2[1];
      const totalSeconds = tme1[2] + tme2[2];
      
      const normalizedMinutes = Math.floor(totalSeconds / 60);
      const normalizedHours = Math.floor((totalMinutes + normalizedMinutes) / 60);
  
      ListEnglish[i].TotalTime = `${totalHours + normalizedHours}:${(totalMinutes + normalizedMinutes) % 60}:${totalSeconds % 60}`;
     
      copyItems1.push(ListEnglish[i]);
      i++; // Skip the next item since it's merged
    } else {
      // ListEnglish[i].TotalTime = ListEnglish[i].Times
      copyItems1.push(ListEnglish[i]);
    }
  }
  // ----Cas 3 occurence---
  
  // copyItems1.sort((a, b) => {
  //   if (a.Email.toLowerCase() < b.Email.toLowerCase()) return -1;
  //   if (a.Email.toLowerCase() > b.Email.toLowerCase()) return 1;
  //   return 0;
  // });
  
   const copyItems11 = []
  for (let i = 0; i < ListEnglish.length - 1; i++) {
    if (ListEnglish[i].Email.toLowerCase() === ListEnglish[i + 1].Email.toLowerCase()) {
          if( ListEnglish[i].TotalTime !="" & ListEnglish[i + 1].TotalTime =="" ){
            delete ListEnglish[i + 1]
          }
      i++; // Skip the next item since it's merged
    } else {
      // copyItems1[i].TotalTime = copyItems1[i].Times
      copyItems11.push(ListEnglish[i]);
    }
  }
  // if (copyItems1.length > 0 && copyItems1[copyItems1.length - 1].Email.toLowerCase() !== copyItems1[copyItems1.length - 2]?.Email.toLowerCase()) {
  //   copyItems11.push(copyItems1[copyItems1.length - 1]);
  // }

    const ListOk = ListEnglish .filter((item) => item !== undefined);  
    ListOk.map((itm)=>{
      if(itm.Test2 !="" & itm.Test3 =="" ) {
        if (parseInt(itm.Test2.split("/")[0] - itm.Test1.split("/")[0]  ) >= 0) {
          itm.CurrTest = itm.Test2.split("/")[0] + "/400"
          itm.CurrLevel = itm.Level2
          itm.Diff =  parseInt(itm.Test2.split("/")[0] - itm.Test1.split("/")[0]  )
      } 
      if (parseInt(itm.Test2.split("/")[0] - itm.Test1.split("/")[0]  ) < 0) {
        itm.CurrTest = itm.Test1.split("/")[0] + "/400"
        itm.CurrLevel = itm.Level1
        itm.Diff =  parseInt(itm.Test2.split("/")[0] - itm.Test1.split("/")[0]  )
    }
    }
    if(itm.Test2 !="" & itm.Test3 !="" ){
      if (parseInt(itm.Test2.split("/")[0] - itm.Test3.split("/")[0]  ) >= 0){
            if (parseInt(itm.Test2.split("/")[0] - itm.Test1.split("/")[0]  ) >= 0) {
              itm.CurrTest = itm.Test2.split("/")[0] + "/400"
              itm.CurrLevel = itm.Level2
              itm.Diff =  parseInt(itm.Test2.split("/")[0] - itm.Test1.split("/")[0]  )
          } 
          if (parseInt(itm.Test2.split("/")[0] - itm.Test1.split("/")[0]  ) < 0) {
            itm.CurrTest = itm.Test1.split("/")[0] + "/400"
            itm.CurrLevel = itm.Level1
            itm.Diff =  parseInt(itm.Test2.split("/")[0] - itm.Test1.split("/")[0]  )
        } 
       }
      if (parseInt(itm.Test2.split("/")[0] - itm.Test3.split("/")[0]  ) < 0){
        if (parseInt(itm.Test3.split("/")[0] - itm.Test1.split("/")[0]  ) >= 0){
          itm.CurrTest = itm.Test3.split("/")[0] + "/400"
            itm.CurrLevel = itm.Level3
            itm.Diff =  parseInt(itm.Test3.split("/")[0] - itm.Test1.split("/")[0]  )
        }
        if (parseInt(itm.Test3.split("/")[0] - itm.Test1.split("/")[0]  ) < 0){
            itm.CurrTest = itm.Test1.split("/")[0] + "/400"
            itm.CurrLevel = itm.Level1
            itm.Diff =  parseInt(itm.Test3.split("/")[0] - itm.Test1.split("/")[0]  )
        }

      }

    }
    if(itm.Test2 =="" & itm.Test3 =="" ){
      itm.CurrTest = "Abs" 
      itm.CurrLevel ="Abs" 
      itm.Diff =  "Abs"
    }



    })

    ListOk.map((record)=>{ 
        record.TotalTime =="" ? record.TotalTime = record.Time : record.TotalTime;
        if (record.Langue.split(" ")[0].toLowerCase() === "english") record.Langue = record.Langue.split(" ")[0]
        if (record.Langue.split(" ")[0].toLowerCase() === "spanish") record.Langue = record.Langue.split(" ")[0]
        delete record.Time;
       })
    
    return ListOk


  }

 const AllDataFilter = [... FilterFun(DataPL,"french"),... FilterFun(DataPL,"english"),... FilterFun(DataPL,"Spanish")]
// const AllDataFilter = [... FilterFun(data,"Spanish")]
      AllDataFilter.map((record)=>{ 
        record.TotalTime =="" ? record.TotalTime = record.Time : record.TotalTime;
        delete record.Time;
       })
       exportToExcel(AllDataFilter,table+"_"+date)

// console.log( "English", FilterFun(data,"english"));
// console.log( "Spanish", FilterFun(data,"spanish"));
// console.log( "AllDataFilterA", data);
// console.log( "AllData", data);
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
  // axios.delete("http://localhost:3001/LearnerGrowthReport/f385").then(()=>{  StoreData() }).catch(()=>{ StoreData() })
  exportToExcel(AllDataFilter,table+"_"+date)
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
