"use client"
import {useState} from 'react'
import { AllDataByGroup } from "../Functions"
import CardA  from '@/components/CardA'
// import { LineChartA } from '@/components/Chart/LineChartA';
// import { GraphChart } from '@/components/Chart/GraphChart';
import { RadialChart } from '@/components/Chart/RadialChart';
import { LineChartM } from '@/components/Chart/LineChartM';
import { PieChartA } from '@/components/Chart/PieChartA';
import { AreaChartA } from '@/components/Chart/AreaChartA';
import { BarChartA } from '@/components/Chart/BarChartA';
import { LineChartL } from '@/components/Chart/LineChartL';

function Stats() {
    const [TotalActive, setTotalActive] = useState(0);
    const [TotalAll, setTotalAll] = useState(0);
    const [TotalNActive, setTotalNActive] = useState(0);
    const [Organization, setOrganization] = useState("-");
    const [date, setDate] = useState("-");

  const chartData1 =[]
  const chartData2 =[]
    const getData = async ()=>{
      const dataGroups = await AllDataByGroup()
      setTotalActive(dataGroups.TotalActive)
      setTotalAll(dataGroups.TotalAll)
      setTotalNActive(dataGroups.TotalNActive)
      setOrganization(dataGroups.env[0].Organization)
      setDate(dataGroups.env[0].date)
      // setDate(dataGroups.env[0].date)
        dataGroups.env?.map((el)=>{  
          chartData1.push(  { month: el.Group, Active: el.Active, NoActive: el.NotActive ,PourCentageA: ((el.Active/el.Total)*100).toFixed() , PourCentageN:((el.NotActive/el.Total)*100).toFixed() } )
          // chartData2.push(  { month: el.Group, Active: el.Active, mobile: el.NotActive } )
        })
        // console.log("YEAR" , chartData1);
    }
    getData()
// { date: "2024-04-01", desktop: 222, mobile: 150 },

  return (
    <div>
       <div className="badge badge-info gap-2">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    className="inline-block h-4 w-4 stroke-current">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M6 18L18 6M6 6l12 12"></path>
  </svg>
  {Organization}
</div>
          <div className='flex gap-6 flex-wrap mx-auto mb-2'>
          {/* <div className='flex-grow-1 basis-96 w-auto'><CardA title={Organization} num={"Organization"} /></div> */}
          <div className='flex-grow-1'> <CardA title={"Active"} num={TotalActive} pourcentage={ ((TotalActive/TotalAll)*100).toFixed()  + "%" } /></div>
          <div className='flex-grow-1'><CardA title={"Not Active"} num={TotalNActive} pourcentage={((TotalNActive/TotalAll)*100).toFixed() + "%"} /></div>
          <div className='flex-grow-1'><CardA title={"Total"} num={TotalAll} pourcentage={((TotalAll/TotalAll)*100).toFixed() + "%"} /> </div>
          
        </div>
        <div className='grid grid-cols-2 gap-4 my-3'>
                <div> <RadialChart /> </div>
                {/* <div> <PieChartA /> </div> */}
                <div> <LineChartM chartData={chartData1} date={date} /> </div>
        </div>  
        <div className='flex flex-col gap-y-3'>
            {/* <AreaChartA chartData={chartData2} /> */}
            <BarChartA chartData={chartData1} date={date} />
            <LineChartL  chartData={chartData1} date={date} />
        </div>
    </div>
  )
}

export default Stats