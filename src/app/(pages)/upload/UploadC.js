"use client"
import React, { useRef } from 'react'
import UploadFile from "../../../components/UploadFile"
import {AllDataByGroup} from "../catalyst/Functions"
import { StatisticsCard } from '@/components/StatisticsCard'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

function UploadC() {
  const tabRef = useRef("tabA")
  const fun = async ()=>{
    const groups = await  (await AllDataByGroup()).env
    console.log("GroupsDe",groups);
    const data =[]
    groups.map(el=>{ data.push([el.group,el.Active,el.NotActive,el.Total,el.PourCentageA,el.PourCentageN]) })
    const doc = new jsPDF()
    doc.text("Table Stats", 10, 10);
// It can parse html:
// <table id="my-table"><!-- ... --></table>
// autoTable(doc, { html: tabRef.current})

// Or use javascript directly:
autoTable(doc, {
  head: [['group','Active', 'NotActive', 'Total','PourCentageA','PourCentageN']],
  body: data,
})

// Sometimes you might have to call the default function on the export (for example in Deno)
// autoTable.default(doc, { html: '#my-table' })

doc.save('table.pdf')

  }

  let heading = ["Name", "City", "Course"];
  let body = [
      ["Kapil", "Jaipur", "MCA"],
      ["Aakash", "Hisar", "Btech"],
      ["Mani", "Ranchi", "MSc"],
      ["Yash", "Udaipur", "Mtech"],
  ];
  
  return (
    <div>
      <UploadFile/>
      {/* <button onClick={async ()=> {await fun() }} > Click </button> */}
      <div>
        {/* <StatisticsCard/> */}
      {/* <table style={{ width: 500 }} id='tabA' ref={tabRef}>
                <thead>
                    <tr>
                        {heading.map((head, headID) => (
                            <th key={headID}>{head}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                <tr >
                    {body.map((rowContent, rowID) => (
                       
                          <td key={rowID}>{rowContent}</td>
                        
                    ))}
                    </tr>
                </tbody>
            </table> */}

      </div>
      </div>
  )
}

export default UploadC