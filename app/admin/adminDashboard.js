import { ShowPriceFormat } from "../lib/handleTextShow";
import LineChart from "./adminComponents/lineChart";
import PieChart from "./adminComponents/pieChart";

export default function AdminDashboard({data}){
    return (
    <div className="adminDashboard">
        <div className="saleSumary">
            <span>Doanh thu tháng</span>
            <h1>{ShowPriceFormat(data?.total ?? '000')} &#8363;</h1>
            <div className="orderSumary">
                <span>Số đơn hàng</span>
                <h2>{data?.order_count ?? '0'}</h2>
                <span>Số sản phẩm</span>
                <h2>{data?.product_count ?? '0'}</h2>
            </div>
        </div>
        <div className="lineChart">
            <LineChart data={data?.pay_method}></LineChart>
            <h4>Phân loại thanh toán theo ngày</h4>
        </div>
        <div className="pieChart">
            <PieChart data={data?.order_status}></PieChart>
            <h4>Tỉ lệ đơn hàng theo trạng thái</h4>
        </div>

    </div>)
}