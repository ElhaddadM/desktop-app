"use client"
import {useState} from 'react'
import CardA  from '@/components/CardA'
// import { LineChartA } from '@/components/Chart/LineChartA';
// import { GraphChart } from '@/components/Chart/GraphChart';
import { RadialChart } from '@/components/Chart/RadialChart';
import { LineChartM } from '@/components/Chart/LineChartM';
import { PieChartA } from '@/components/Chart/PieChartA';
import { AreaChartA } from '@/components/Chart/AreaChartA';

function Stats() {
    const [TotalActive, setTotalActive] = useState(0);
    const [TotalAll, setTotalAll] = useState(0);
    const [TotalNActive, setTotalNActive] = useState(0);
    const [Organization, setOrganization] = useState("-");
  return (
    <div>
          <div className='w-full flex gap-6 flex-wrap justify-center'>
          <div className='w-96'><CardA title={Organization} num={"Organization"} /></div>
          <div className='w-96'> <CardA title={"Active"} num={TotalActive} pourcentage={ ((TotalActive/TotalAll)*100).toFixed()  + "%" } /></div>
          <div className='w-96'><CardA title={"Not Active"} num={TotalNActive} pourcentage={((TotalNActive/TotalAll)*100).toFixed() + "%"} /></div>
          <div className='w-96'><CardA title={"Total"} num={TotalAll} pourcentage={((TotalAll/TotalAll)*100).toFixed() + "%"} /> </div>
          
        </div>
        <div className='grid grid-cols-2 gap-4 my-3'>
                <div> <RadialChart /> </div>
                {/* <div> <PieChartA /> </div> */}
                <div> <LineChartM /> </div>
        </div>  
        <div>
            <AreaChartA/>
        </div>
    </div>
  )
}

export default Stats