import { Chart, useChart } from "@chakra-ui/charts"
import { useEffect, useState } from "react"
import { Box } from "@chakra-ui/react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts"

function DayRankChart({ allMatchesOnDate }) {

    const [data, setData] = useState([])

    useEffect(() => {
        const theData = () => {
            const arr = allMatchesOnDate.map(element => ({
            MMR: element.LocalMMRAfter,
            time: element.StartTime
        }))
            return arr.reverse()
        }
        
        setData(theData())
    }, [allMatchesOnDate])

    const chart = useChart({
    data: data,
    series: [
      { name: "MMR", color: "text.quiet" }
    ],
  })

  return (
        <Chart.Root chart={chart} h={250} pr={10} pt={6}>
            <AreaChart data={chart.data}>
                <CartesianGrid strokeDasharray="1 3" stroke={chart.color("text.base")} vertical={false} />
                <XAxis 
                    dataKey={chart.key("time")}
                    axisLine={false}
                    tickLine={false}
                />
                <YAxis 
                    dataKey={chart.key("MMR")}
                    domain={['dataMin - 20', 'dataMax + 20']}
                    axisLine={false}
                    tickLine={false}
                />
                <Tooltip 
                    content={<Chart.Tooltip />}
                />
                {chart.series.map((item, index) => (
                        <Area
                            baseValue={data.length !== 0 && data[0]["MMR"]} 
                            key={index}
                            type="natural"
                            dataKey={chart.key(item.name)}
                            fill={chart.color(item.color)}
                            stroke={chart.color("text.base")}
                        /> 
                ))}
            </AreaChart>
        </Chart.Root>
    )
}

export default DayRankChart