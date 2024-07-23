"use client"
import {AllDataByGroup} from "../../app/(pages)/catalyst/Functions"
import { TrendingUp } from "lucide-react"
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useState } from "react"

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
}  

export function RadialChart() {
  const [total,setTotal] = useState(0)
  const [active,setActive] = useState(0)
  const [notActive,setNotActive] = useState(0)
  const [date,setDate] = useState("-")
  const chartData = [{ month: "Etudiants", Active: active, NoActive: notActive }]

  const GetData = async ()=>{
      const dataGroups = await AllDataByGroup()
        setTotal(dataGroups.TotalAll)
        setActive(dataGroups.TotalActive)
        setNotActive(dataGroups.TotalNActive)
        setDate(dataGroups.env[0].date)
      console.log("ChartDaara" , dataGroups);
  }

  GetData()
  // const totalVisitors = chartData[0].desktop + chartData[0].mobile

  return (
    <Card className="flex flex-col h-[100%]">
      <CardHeader className="items-center pb-0">
        <CardTitle>Radial Chart </CardTitle>
        <CardDescription> {date} </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0 h-[90%]">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px] h-[100%]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
            className="h-[90%]"
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {total.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Etudiants
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="Active"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-mobile)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="NoActive"
              fill="var(--color-desktop)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
