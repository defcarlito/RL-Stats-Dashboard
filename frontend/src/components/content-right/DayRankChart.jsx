import { Chart, useChart } from "@chakra-ui/charts"
import { useEffect, useState } from "react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
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
      { name: "MMR", color: "blue.300" }
    ],
  })

  return (
        
        <Chart.Root maxH="2xs" chart={chart}>
        <AreaChart data={chart.data}>
            <CartesianGrid stroke={chart.color("border.muted")} vertical={false} />
            <XAxis 
                dataKey={chart.key("time")}
            />
            <YAxis 
                dataKey={chart.key("MMR")}
                domain={['dataMin - 100', 'dataMax + 100']}
            />
            <Tooltip 
                content={<Chart.Tooltip />}
            />
            {chart.series.map((item, index) => (
                <Area 
                    key={index}
                    type="monotone"
                    dataKey={chart.key(item.name)}
                    fill={chart.color(item.color)}
                    stroke={chart.color(item.color)}
                />
            ))}

        </AreaChart>
        </Chart.Root>
    )
}

export default DayRankChart