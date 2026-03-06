'use client'
import dynamic from "next/dynamic"
export default function PieChart({data}){
    const ReactECharts = dynamic(
    () => import("echarts-for-react"),
    { ssr: false }
    )
    const option = {
        grid: {
            top: 30,
            bottom: 10,
            left: 10,
            right: 10,
        },
        tooltip: {trigger: 'item'},
        legend: {top: 'top'},
        series: {
            name: 'Tỉ lệ đơn hàng theo trạng thái',
            type: 'pie',
            radius: ['50%', '80%'],
            data: data
        }
    }
    return (
        <ReactECharts option={option} style={{width:'100%', height:'100%'}}></ReactECharts>
    )
}