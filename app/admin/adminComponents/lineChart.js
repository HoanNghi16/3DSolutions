"use client"
import EChartsReact from "echarts-for-react";

export default function LineChart({data}){
    const option = {
        grid: {
            left: 40,
            right: 20,
            top: 0,
            bottom: 50
        },
        tooltip: {trigger: 'axis'},
        xAxis: {
            type: 'category',
            data: data?.date ?? []
        },
        legend: {
            data: ["Tiền mặt", "Chuyển khoản"],
            top: 'bottom'
        },
        yAxis: {
            type: "value"
        },
        series: [
            {
                name:'Tiền mặt',
                type: 'line',
                data: data['0'] ?? [],
                smooth: true
            },
            {
                name: 'Chuyển khoản',
                type: 'line',
                data: data['1'] ?? [],
                smooth: true
            }
        ]
    }
    return (
        <EChartsReact option={option} style={{widht: '100%', height: '100%'}}></EChartsReact>
    )
}