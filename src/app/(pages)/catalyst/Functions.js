"use client"
// import { useState } from "react" 
// import { useEffect, useState } from 'react';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import * as XLSX from 'xlsx';
import axios from 'axios';



// import { headers } from "next/headers";
// import { Content } from "next/font/google";

const GetData = async ()=>{ 
                const fetch = await axios.get("http://localhost:3001/CatalystUsageReport")
                const  data =  fetch.data[0].data
                  return data
            }

export const UsersStatus = async ()=>{
  const data = await GetData()
  const AllUsersA = data
  ?.map((item) => {
    if (item.License != "") {
      return item.Email;
    }
  })
  ?.filter((item) => {
    return item != undefined;
  });
const AllUsers = new Set(AllUsersA).size;
const b = [...new Set(AllUsersA)];
const AllUsersAB = data?.filter((item) => {
  !b.includes(item.Email);
});
//const AllUsersB = new Set(AllUsersAB).size
// console.log("All Users ", AllUsers );
//------------ Users Active -------------------
const ActiveUsers = data?.map((item) => {
  if (item.Profile != "" && item.License != "") {
    return item.Email;
  }
});
const ActiveUserA = ActiveUsers?.filter((item) => {
  return item != undefined;
});
const AllUsersActive = new Set(ActiveUserA).size;
// console.log('Active Users ',AllUsersActive);

// ----------- Users Not Active ----------------
const NoActiveUsers = data?.map((item) => {
  if (item.Profile == "" && item.License != "") {
    return item.Email;
  }
});
const NotActive = NoActiveUsers?.filter((item) => {
  return item != undefined;
});
const UserNoActive = new Set(NotActive).size;
// console.log('Not Active Users' ,UserNoActive );

return { "Organization" : data[0].Organization ,date : data[0].date,"AllUsers" : AllUsers, "ActiveUsers" :AllUsersActive, "UserNoActive" : UserNoActive ,"ActivePourcentage" : ((AllUsersActive / AllUsers)*100).toFixed(2) ,"NotActivePourcentage" :((UserNoActive / AllUsers)*100).toFixed(2) };

}

export const Groups = async ()=>{ 
  const data = await GetData()
  const groupsFacA = data?.map((item) => {
  return item.Group.split("_")[0].toUpperCase();
});
const groupFact = [...new Set(groupsFacA)];
  return groupFact
}
 export const FilterFaculty = async (faculte=[])=> {
     
      const data = await GetData()
    const env = []
        faculte?.map((f)=>{
          const groupData =  data?.map(item =>{ if( item.Group.split('_')[0].toLowerCase()==f.toLowerCase() && item.License !="" ) { return item }})?.filter((item) =>{ return item !=undefined})
          // ----------- All Users ----------------------
          const AllUsersA = groupData?.map(item =>{ return item.Email})
          const AllUsers = new Set(AllUsersA).size
     
          //------------ Users Active -------------------
          const ActiveUsers = groupData?.map(item =>{ if (item.Profile != "" && item.License != "") { return item.Email }  })
          const ActiveUserA = ActiveUsers?.filter((item) =>{ return item !=undefined})
          const AllUsersActive = new Set(ActiveUserA).size
         //  setActiveUsers(AllUsersActive)
          // ----------- Users Not Active ----------------
          const NoActiveUsers = groupData?.map(item =>{ if (item.Profile == "" && item.License != "") { return item.Email }  })
          const NotActive = NoActiveUsers?.filter((item) =>{ return item !=undefined})
          const UserNoActive = new Set(NotActive).size
         //  setNotActiveUsers(UserNoActive)
          // ----------- Not Mutch Users ---------
          const UsersErrA = groupData?.map(item =>{ if (item.License == "" && item.Profile != "") { return item.Email }  })
          const UsersErrB = UsersErrA?.filter((item) =>{ return item !=undefined})
          const infoUsers = UsersErrB?.map((el)=>{ return  data.find(u => u.Email== el )})
          const UserErr =[...new Set(infoUsers)]
          // console.log("Faculte" , UserErr);
         //  setInfo(UserErr)
       
          const rest = { "Group" :f.toUpperCase(),"Active" : AllUsersActive ,"NotActive" : UserNoActive , "Total":AllUsers ,"PourCentageA" : ((AllUsersActive / AllUsers ) * 100).toFixed() ,"PourCentageN" : ((UserNoActive / AllUsers ) * 100).toFixed() }
           env.push(rest)

        })
        let TotalAll = []
      let TotalActive = []
      let TotalNActive = []
      env?.map((el)=>{    
        TotalAll.push(el.Total)
        TotalActive.push(el.Active)
        TotalNActive.push(el.NotActive)
       })
      //  const ResultFilterA =[ [{ data: TotalAll}, { data:TotalActive }, { data: TotalNActive  }] , ...env] 
       const ResultFilter = { "barChart" : [{ data: TotalAll}, { data:TotalActive }, { data: TotalNActive  }] , "pieChart" : env }

       return ResultFilter

}

export  const detailGrp = async (grp='') =>{ 
  const data = await GetData()
  //------------- All Occurence -----------
  const detailA =data?.map(item =>{ if( item.Group.split('_')[0].toLowerCase() == grp.toLowerCase() && item.License !="") { return item }})?.filter((item) =>{ return item !=undefined})
  const grpSplited = detailA.map((gr)=>{ return (gr.Group.split('_')[0] + '_'+ gr.Group.split('_')[1] ) })
  const groupsAA = [...new Set(grpSplited)]
  // setGroupsA(groupsAA)
  const env = []
  groupsAA?.map((f)=>{
    const groupData =  detailA?.map(item =>{ if(( item.Group.split('_')[0]?.toLowerCase() + '_' +  item.Group.split('_')[1]?.toLowerCase()) ==f?.toLowerCase() && item.License !="" ) { return item }})?.filter((item) =>{ return item !=undefined})
    // ----------- All Users ----------------------
    const AllUsersA = groupData?.map(item =>{ return item.Email})
    const AllUsers = new Set(AllUsersA).size

    //------------ Users Active -------------------
    const ActiveUsers = groupData?.map(item =>{ if (item.Profile != "" && item.License !="") { return item.Email }  })
    const ActiveUserA = ActiveUsers?.filter((item) =>{ return item !=undefined})
    const AllUsersActive = new Set(ActiveUserA).size
   //  setActiveUsers(AllUsersActive)
    // ----------- Users Not Active ----------------
    const NoActiveUsers = groupData?.map(item =>{ if (item.Profile == "" && item.License !="") { return item.Email }  })
    const NotActive = NoActiveUsers?.filter((item) =>{ return item !=undefined})
    const UserNoActive = new Set(NotActive).size
   //  setNotActiveUsers(UserNoActive)
    // ----------- Not Mutch Users ---------
    // const UsersErrA = groupData?.map(item =>{ if (item.License == "" && item.Profile != "") { return item.Email }  })
    // const UsersErrB = UsersErrA?.filter((item) =>{ return item !=undefined})
    // const infoUsers = UsersErrB?.map((el)=>{ return  data.find(u => u.Email== el )})
    // const UserErr =[...new Set(infoUsers)]
    // console.log("Via Group ", UserErr);
   //  setInfo(UserErr)
 
    const rest = { "Organization":data[0]?.Organization  ,"Group" :f.toUpperCase(),"Active" : AllUsersActive ,"NotActive" : UserNoActive , "Total":AllUsers ,"PourCentageA" : ((AllUsersActive / AllUsers ) * 100).toFixed() ,"PourCentageN" : ((UserNoActive / AllUsers ) * 100).toFixed() }
     env.push(rest)
     
  })

  let TotalAll = 0;
  let TotalActive = 0;
  let TotalNActive = 0;
  env?.map((el) =>
    {
      TotalAll += el.Total;
      TotalActive += el.Active;
      TotalNActive += el.NotActive;
      });
  const details = { env , TotalAll,TotalActive,TotalNActive}

  // setDetails(env)
  return details
 

}

export  const detailGrpFiliere = async (grp='') =>{ 
  const data = await GetData()
  //------------- All Occurence -----------
  const detailA =data?.map(item =>{ if( item.Group.split('_')[0] + "_" +  item.Group.split('_')[1]  == grp && item.License !="") { return item }})?.filter((item) =>{ return item !=undefined})
  const grpSplited = detailA.map((gr)=>{ return (gr.Group.split('_')[0] + '_'+ gr.Group.split('_')[1]  + '_'+ gr.Group.split('_')[2] ) })
  const groupsAA = [...new Set(grpSplited)]
  // setGroupsA(groupsAA)
  const env = []
  groupsAA?.map((f)=>{
    const groupData =  detailA?.map(item =>{ if(( item.Group.split('_')[0]?.toLowerCase() + '_' +  item.Group.split('_')[1]?.toLowerCase() + '_' +  item.Group.split('_')[2] ?.toLowerCase()) ==f?.toLowerCase() && item.License !="" ) { return item }})?.filter((item) =>{ return item !=undefined})
    // ----------- All Users ----------------------
    const AllUsersA = groupData?.map(item =>{ return item.Email})
    const AllUsers = new Set(AllUsersA).size

    //------------ Users Active -------------------
    const ActiveUsers = groupData?.map(item =>{ if (item.Profile != "" && item.License !="") { return item.Email }  })
    const ActiveUserA = ActiveUsers?.filter((item) =>{ return item !=undefined})
    const AllUsersActive = new Set(ActiveUserA).size
   //  setActiveUsers(AllUsersActive)
    // ----------- Users Not Active ----------------
    const NoActiveUsers = groupData?.map(item =>{ if (item.Profile == "" && item.License !="") { return item.Email }  })
    const NotActive = NoActiveUsers?.filter((item) =>{ return item !=undefined})
    const UserNoActive = new Set(NotActive).size
   //  setNotActiveUsers(UserNoActive)
    // ----------- Not Mutch Users ---------
    // const UsersErrA = groupData?.map(item =>{ if (item.License == "" && item.Profile != "") { return item.Email }  })
    // const UsersErrB = UsersErrA?.filter((item) =>{ return item !=undefined})
    // const infoUsers = UsersErrB?.map((el)=>{ return  data.find(u => u.Email== el )})
    // const UserErr =[...new Set(infoUsers)]
    // console.log("Via Group ", groupData);
   //  setInfo(UserErr)
 
    const rest = { "Group" :f.toUpperCase(),"Active" : AllUsersActive ,"NotActive" : UserNoActive , "Total":AllUsers ,"PourCentageA" : ((AllUsersActive / AllUsers ) * 100).toFixed() ,"PourCentageN" : ((UserNoActive / AllUsers ) * 100).toFixed() }
     env.push(rest)
     
  })
  

 
  let TotalAll = 0;
  let TotalActive = 0;
  let TotalNActive = 0;
  env?.map((el) =>
    {
      TotalAll += el.Total;
      TotalActive += el.Active;
      TotalNActive += el.NotActive;
      });
  const Resultats = { env , TotalAll,TotalActive,TotalNActive}
return Resultats
  // setDetails(env)
  return { "detailsFiliere" : env}
  // return { "detailsFiliere" : groupsAA,"details": detailA}
 

}
  
export const getFaculty = async ()=>{  
  const data = await GetData()
  const groupsFacA = data?.map(item =>{ return item.Group.split('_')[0]})
  const groupFact = [...new Set(groupsFacA)] 
  return groupFact
}
export const  ListeFiliere = async ()=>{
  const data = await GetData()
  const faculte = await getFaculty ()
  const listA = [...new Set(data?.map((f)=>{  return ( f.Group.split('_')[0] + '_' + f.Group.split('_')[1] ) }))]
  // const listAA = listA.map((fl)=>{ if (fl.split('_')[1] == "un"){ return fl.split('_')[1] }else{ return fl }  })
  const listB = [...new Set( listA?.map((u)=>{ return ( u.split('_')[0] + '_' + u.split('_')[1].slice(0,2)  ) }) )]
  // .filter((itm)=>{ return faculte.includes(itm.split('_')[0]) })
  const listCorreger =  listB.sort().map((fl,i)=>{ return listB.sort()[i].split("_")[1] =="un"   ? listB.sort()[i].split("_")[0]  : listB.sort()[i] })
  // console.log('Filiere UN',listCorreger)
  return listCorreger
}

export const FindByFiliere = async (flr)=>{
  const data = await GetData()
  const resultFltr = data
  ?.map((el) => {
   if (flr?.split("_")[1] == undefined && (
    el.Group.split("_")[0]
  ).toLowerCase() == flr &&
  el.License != ""){
    
      return el;
    
    
   }else{
    if (
      (
        el.Group.split("_")[0] +
        "_" +
        el.Group.split("_")[1]?.slice(0, 2)
      ).toLowerCase() == flr &&
      el.License != ""
    ) {
      return el;
    }
   }
  })
  ?.filter((item) => {
    return item != undefined;
  });
// const groupData =  resultFltr?.map(item =>{ if(( item.Group.split('_')[0].toLowerCase() + '_' +  item.Group.split('_')[1].toLowerCase()) ==f.toLowerCase() ) { return item }})?.filter((item) =>{ return item !=undefined})
// ----------- All Users ----------------------
const AllUsersA = resultFltr?.map((item) => {
  return item.Email;
});
const AllUsers = new Set(AllUsersA).size;

//------------ Users Active -------------------
const ActiveUsers = resultFltr?.map((item) => {
  if (item.Profile != "" && item.License != "") {
    return item.Email;
  }
});
const ActiveUserA = ActiveUsers?.filter((item) => {
  return item != undefined;
});
const AllUsersActive = new Set(ActiveUserA).size;
//  setActiveUsers(AllUsersActive)
// ----------- Users Not Active ----------------
const NoActiveUsers = resultFltr?.map((item) => {
  if (item.Profile == "" && item.License != "") {
    return item.Email;
  }
});
const NotActive = NoActiveUsers?.filter((item) => {
  return item != undefined;
});
const UserNoActive = new Set(NotActive).size;

const env = []
const rest = {
  group: flr.toUpperCase() == "" ? "Sans_Group" : flr.toUpperCase(),
  Active: AllUsersActive,
  NotActive: UserNoActive,
  Total: AllUsers,
  PourCentageA:   isNaN(((AllUsersActive / AllUsers) * 100).toFixed()) ? 0 : ((AllUsersActive / AllUsers) * 100).toFixed(),
  PourCentageN: isNaN(((UserNoActive / AllUsers) * 100).toFixed()) ? 0 : ((UserNoActive / AllUsers) * 100).toFixed() ,
  date : dataa[0].date
};
env.push(rest);
  let TotalAll = 0;
  let TotalActive = 0;
  let TotalNActive = 0;
  env?.map((el) =>
    {
      TotalAll += el.Total;
      TotalActive += el.Active;
      TotalNActive += el.NotActive;
      });
  const Resultats = { env , TotalAll,TotalActive,TotalNActive}
return Resultats

    
}

export const getUsersInfo = async ()=>{
  const data = await GetData()
  // const NoActiveUsers = data?.map(  ()=>{item.Email}  )
  // const NotActive = NoActiveUsers?.filter((item) =>{ return item !=undefined})
  // const emails = new Set(NotActive).size

   const UsersErrA = data?.map(item =>{  return item.Email   })
    const UsersErrB = UsersErrA?.filter((item) =>{ return item !=undefined})
    const infoUsers = UsersErrB?.map((el)=>{ return  data.find(u => u.Email== el )})
    const UserErr =[...new Set(infoUsers)]
    // setInfo(UserErr)
    // console.log("Autre Users" , UserErr);
    const EmailErr = UserErr?.map((el)=>{ return el.Email })
    const  TestEmail = AllUsersA?.filter(item =>{  EmailErr.includes(item)  })
    return TestEmail
    console.log("Email Err ==> " , TestEmail);

  // setNotActiveUsers(UserNoActive)
}

export const AllDataByFiliere = async ()=>{
  const dataa = await GetData()
  const filieres = await ListeFiliere();
  // console.log("Filieres", filieres);
  const env = [];
  filieres?.map((flr) =>{
    const resultFltr = dataa
    ?.map((el) => {
     if (flr?.split("_")[1] == undefined && (
      el.Group.split("_")[0]
    ).toLowerCase() == flr.toLowerCase() &&
    el.License != ""){
      
        return el;
      
      
     }else{
      if (
        (
          el.Group.split("_")[0] +
          "_" +
          el.Group.split("_")[1]?.slice(0, 2)
        ).toLowerCase() == flr.toLowerCase() &&
        el.License != ""
      ) {
        return el;
      }
     }
    })
    ?.filter((item) => {
      return item != undefined;
    });
  // const groupData =  resultFltr?.map(item =>{ if(( item.Group.split('_')[0].toLowerCase() + '_' +  item.Group.split('_')[1].toLowerCase()) ==f.toLowerCase() ) { return item }})?.filter((item) =>{ return item !=undefined})
  // ----------- All Users ----------------------
  const AllUsersA = resultFltr?.map((item) => {
    return item.Email;
  });
  const AllUsers = new Set(AllUsersA).size;

  //------------ Users Active -------------------
  const ActiveUsers = resultFltr?.map((item) => {
    if (item.Profile != "" && item.License != "") {
      return item.Email;
    }
  });
  const ActiveUserA = ActiveUsers?.filter((item) => {
    return item != undefined;
  });
  const AllUsersActive = new Set(ActiveUserA).size;
  //  setActiveUsers(AllUsersActive)
  // ----------- Users Not Active ----------------
  const NoActiveUsers = resultFltr?.map((item) => {
    if (item.Profile == "" && item.License != "") {
      return item.Email;
    }
  });
  const NotActive = NoActiveUsers?.filter((item) => {
    return item != undefined;
  });
  const UserNoActive = new Set(NotActive).size;
  const rest = {
    Organization : dataa[0].Organization,
    Group: flr.toUpperCase() == "" ? "Sans_Group" : flr.toUpperCase(),
    Active: AllUsersActive,
    NotActive: UserNoActive,
    Total: AllUsers,
    PourCentageA:   isNaN(((AllUsersActive / AllUsers) * 100).toFixed()) ? 0 : ((AllUsersActive / AllUsers) * 100).toFixed() + '%',
    PourCentageN: isNaN(((UserNoActive / AllUsers) * 100).toFixed()) ? 0 : ((UserNoActive / AllUsers) * 100).toFixed() + '%',
    date : dataa[0].date
  };
  if (rest.Total !=0){  env.push(rest);}
 
  return env

  } ) // ici
 
  let TotalAll = 0;
  let TotalActive = 0;
  let TotalNActive = 0;
  env?.map((el) =>
    {
      TotalAll += el.Total;
      TotalActive += el.Active;
      TotalNActive += el.NotActive;
      });
  const Resultats = { env , TotalAll,TotalActive,TotalNActive}
  return Resultats
  // console.log("FilieresData", env);


 

}

export const AllDataByGroup = async ()=>{
  const dataa = await GetData()
  const Groupes = await Groups();
  // console.log("dataa", dataa);
  const env = [];
  Groupes?.map((flr) =>{
    const resultFltr = dataa
    ?.map((el) => { if ( (el.Group.split("_")[0]).toLowerCase() == flr.toLowerCase() && el.License != ""){return el; }})?.filter((item) => {return item != undefined;});
  // const groupData =  resultFltr?.map(item =>{ if(( item.Group.split('_')[0].toLowerCase() + '_' +  item.Group.split('_')[1].toLowerCase()) ==f.toLowerCase() ) { return item }})?.filter((item) =>{ return item !=undefined})
  // ----------- All Users ----------------------
  const AllUsersA = resultFltr?.map((item) => {
    return item.Email;
  });
  const AllUsers = new Set(AllUsersA).size;

  //------------ Users Active -------------------
  const ActiveUsers = resultFltr?.map((item) => {
    if (item.Profile != "" && item.License != "") {
      return item.Email;
    }
  });
  const ActiveUserA = ActiveUsers?.filter((item) => {
    return item != undefined;
  });
  const AllUsersActive = new Set(ActiveUserA).size;
  //  setActiveUsers(AllUsersActive)
  // ----------- Users Not Active ----------------
  const NoActiveUsers = resultFltr?.map((item) => {
    if (item.Profile == "" && item.License != "") {
      return item.Email;
    }
  });
  const NotActive = NoActiveUsers?.filter((item) => {
    return item != undefined;
  });
  const UserNoActive = new Set(NotActive).size;
  const rest = {
    Organization : dataa[0].Organization,
    Group: flr.toUpperCase() == "" ? "Sans_Group" : flr.toUpperCase(),
    Active: AllUsersActive,
    NotActive: UserNoActive,
    Total: AllUsers,
    PourCentageA:   isNaN(((AllUsersActive / AllUsers) * 100).toFixed()) ? 0 : ((AllUsersActive / AllUsers) * 100).toFixed() + '%',
    PourCentageN: isNaN(((UserNoActive / AllUsers) * 100).toFixed()) ? 0 : ((UserNoActive / AllUsers) * 100).toFixed() + '%',
    date : dataa[0].date
    
  };
  if (rest.Total !=0){  env.push(rest);}
 
  return env

  } ) // ici
 
  let TotalAll = 0;
  let TotalActive = 0;
  let TotalNActive = 0;
  env?.map((el) =>
    {
      TotalAll += el.Total;
      TotalActive += el.Active;
      TotalNActive += el.NotActive;
      });
  const Resultats = { env , TotalAll,TotalActive,TotalNActive}
  // console.log("Dqte" , dataa);
  return Resultats
}

export function exportToExcel(data,filenamea = "details") { 
  console.log("Excel",data);
  const fileNameA = []
   if (data[0]?.Organization) data[0].Organization?.split(" ")?.map((e,i)=>{ if (e[0] !="-"){ fileNameA.push(e[0])} })
    const fileName = fileNameA.slice(-length,-1).slice(0,3).join("")
  const filename = filenamea + "_"+fileName + ".xlsx"
  // Create a new workbook and add the data
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  // Write the workbook to a binary string
  const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });

  // Convert the binary string to a Blob and trigger a download
  const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function s2ab(s) {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < s.length; i++) {
    view[i] = s.charCodeAt(i) & 0xFF;
  }
  return buf;
}


// Set the virtual file system for fonts
pdfMake.vfs = pdfFonts.pdfMake.vfs;
export const PrintPdf = async (AllDataGroups=[],name="Groupes") => {
  // const AllDataGroups = (await AllDataByGroup())
  const DataGroups = AllDataGroups.env
  const fileNameA = []
 DataGroups[0].Organization.split(" ")?.map((e,i)=>{ if (e[0] !="-"){ fileNameA.push(e[0])} })
  console.log("DataPDF" ,AllDataGroups);
 const fileName = fileNameA.slice(-length,-1).slice(0,3).join("")
  // console.log("DataPDFFileName" , fileName.slice(-length,-1).slice(0,3).join(""));
  const DataTotal = AllDataGroups?.TotalAll
  const DataActive = AllDataGroups?.TotalActive
  const DataNA = AllDataGroups?.TotalNActive
  const PourCentageA = ((DataActive / DataTotal)*100).toFixed()
  const PourCentageNA = ((DataNA / DataTotal)*100).toFixed()
  // const obj = [
  //   {text:"TOTAL",fontSize:9,margin: [0,2,0,2],background:"green"},
  //   {text:DataActive,fontSize:9,margin: [0,2,0,2],},
  //   {text:DataNA,fontSize:9,margin: [0,2,0,2],},
  //   {text:DataTotal,fontSize:9,margin: [0,2,0,2],},
  //   {text:PourCentageA,fontSize:9,margin: [0,2,0,2],},
  //   {text:PourCentageNA,fontSize:9,margin: [0,2,0,2],},
    
  // ]
  const dataRows = DataGroups?.map((itm)=>{
    return [
      {text:itm.Group,fontSize:9,margin: [0,2,0,2]},
      {text:itm.Active,fontSize:9,margin: [0,2,0,2]},
      {text:itm.NotActive,fontSize:9,margin: [0,2,0,2]},
      {text:itm.Total,fontSize:9,margin: [0,2,0,2]},
      {text:itm.PourCentageA,fontSize:9,margin: [0,2,0,2]},
      {text:itm.PourCentageN,fontSize:9,margin: [0,2,0,2]},
      
    ]
  })
  // dataRows.push(obj)
  // Define the title section
  const rapportTitle = 
  [   
    { text: " statistique Rosetta Stone Catalyst ", fontSize:18,bold :true ,alignment: 'center',color :"blue" ,decoration:"underline"},
   
  ];
  
  // Define the details section with a table
  const details = [
   {
    columns:[
      {
        width : "80%",
        text :DataGroups[0].Organization,
        fontSize:12,bold :true ,color :"blue" ,decoration:"underline",lineHeight:2
      },
      {
        
        width : "20%",
        text :"Date :"+ DataGroups[0].date,
        fontSize:12,bold :true ,color :"blue" ,decoration:"underline",lineHeight:2
      },
      
    ]
   },
    // { text: DataGroups[0].Organization +". "+ "Date :" + " 24-06-2024", fontSize:12,bold :true ,color :"blue" ,decoration:"underline",lineHeight:2},
    {
      
      table: {
        headerRows: 1,
        widths: ["*", "*", "*", "10%", "*", "*"],  // Corrected the number of columns
        body: [
          
          [
            { text: "Groupe", style: "tableHeader", fontSize: 10 , bold:true},
            { text: "Active", style: "tableHeader", fontSize: 10 , bold:true},
            { text: "Non Active", style: "tableHeader", fontSize: 10, bold:true },
            { text: "Total", style: "tableHeader", fontSize: 10 , bold:true},
            { text: "Active %", style: "tableHeader", fontSize: 10, bold:true },
            { text: "Non Active %", style: "tableHeader", fontSize: 10 , bold:true}
          ],
         
          ...dataRows
        ],
        
      },
      layout: "lightHorizontalLines"
    },
    
  ];
 
  
  // Define the footer section
  const footer = [];

  // Create the document definition
  const docDefinition = {
  
    pageSize: "A4",
    pageMargins: [15, 50, 15, 40],
    header: rapportTitle,
    content: details,
    footer: footer
  };

  // Generate and download the PDF
  pdfMake.createPdf(docDefinition).download(fileName+"_"+name + "_"+DataGroups[0].date+".pdf");
};