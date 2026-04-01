import { fetchOrderDetails } from "../../../api/api";
import AdminOrderRow from "../orderRow";
import { cookies } from "next/headers";
import "./editOrder.css"
import EditOrderForm from "./editOrderForm";
import { BiArrowBack } from "react-icons/bi";
import OrderDetails from "./orderDetails";
export default async function EditOrder({params}){
    const id = (await params)?.id
    const res_order = await fetchOrderDetails(id,(await cookies()).toString())
    const order = await res_order.json()
    return (
        <div className="editOrderContainer">
            <a className="backIcon" href="/admin/orders"><BiArrowBack></BiArrowBack> Trở lại</a>
            <div className="editOrderWrapper">
                <div className="orderInfor">
                    <AdminOrderRow order={order} onEdit={true}></AdminOrderRow>
                    <OrderDetails details={order?.details}></OrderDetails>
                </div>
                <EditOrderForm order={order}></EditOrderForm>
            </div>
        </div>
    )
}