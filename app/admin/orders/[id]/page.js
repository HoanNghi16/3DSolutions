import { fetchOrderDetails } from "../../../api/api";
import AdminOrderRow from "../orderRow";
import { cookies } from "next/headers";
import "./editOrder.css"
import EditOrderForm from "./editOrderForm";
export default async function EditOrder({params}){
    const id = (await params)?.id
    const res_order = await fetchOrderDetails(id,(await cookies()).toString())
    const order = await res_order.json()
    return (
        <div className="editOrderContainer">
            <div className="editOrderWrapper">
                <AdminOrderRow order={order} onEdit={true}></AdminOrderRow>
                <EditOrderForm order={order}></EditOrderForm>
            </div>
            
        </div>
    )
}