'use client'
import EChartsReact from "echarts-for-react"
export default function BarChart1({data}){
    const option = {
        grid: {
            top: 0,
            bottom: 40,
            left: 0,
            right: 10
        },
        tooltip: {trigger: 'item'},
        xAxis: {
            type: 'value'
        },
        yAxis: {
            type: 'category',
            data: data?.products
        },
        series:[
            {
                type: 'bar',
                data: data?.count
            }
        ]
    }
    return (
        <EChartsReact option={option} style={{width: '100%', height: '100%'}}></EChartsReact>
    )
}