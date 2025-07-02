import { Chart, useChart } from "@chakra-ui/charts"
import { useEffect, useState } from "react"
import { Box } from "@chakra-ui/react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis
} from "recharts"

function DayRankChart({ allMatchesOnDate }) {

    const [data, setData] = useState([])

    const FormatTime = (time) => {
        const hour = parseInt(time.split("-")[0])
        const minute = time.split("-")[1]
        const symbol = hour < 12 ? "AM" : "PM"

        const adjustHour = (hour === 0 ? 12 : (hour < 13 ? hour : hour - 12 ))

        return `${adjustHour}:${minute} ${symbol}`
    }

    useEffect(() => {
        const theData = () => {
            const arr = allMatchesOnDate.map(element => ({
            MMR: element.LocalMMRAfter,
            time: FormatTime(element.StartTime)
        }))
            return arr.reverse()
        }
        
        setData(theData())
    }, [allMatchesOnDate])

    const chart = useChart({
    data: data,
    series: [
      { name: "MMR", color: "text.base" }
    ],
  })

    const gradientOffset = () => {
        if (data.length === 0) return 0.5;
        const base = data[0].MMR;
        const mmrValues = data.map(d => d.MMR);
        const max = Math.max(...mmrValues);
        const min = Math.min(...mmrValues);

        if (max === min) return 0.5;

        return 1 - (base - min) / (max - min);
    }

    const offset = gradientOffset()

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
                    domain={['dataMin - 25', 'dataMax + 25']}
                    axisLine={false}
                    tickLine={false}
                />
                <Tooltip 
                    content={<Chart.Tooltip />}
                />
                <defs>
                    <Chart.Gradient
                        id="uv-gradient"
                        stops={[
                        { offset, color: "green.300", opacity: 0.4 },
                        { offset, color: "red.300", opacity: 0.4 },
                        ]}
                    />
                </defs>
                <Area
                    baseValue={data.length !== 0 && data[0]["MMR"]}
                    type="natural"
                    dataKey={chart.key("MMR")}
                    stroke={chart.color("text.base")}
                    fill="url(#uv-gradient)"
                /> 
            </AreaChart>
        </Chart.Root>
    )
}

export default DayRankChart