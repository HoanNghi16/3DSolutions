'use client'
import dynamic from "next/dynamic"
export default function PieChart({data}){
    const ReactECharts = dynamic(
    () => import("echarts-for-react"),
    { ssr: false }
    )
    const option = {
        grid: {
            top: 0,
            bottom: 50,
            left: 10,
            right: 10,
        },
        tooltip: {trigger: 'item'},
        legend: {top: 'bottom'},
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