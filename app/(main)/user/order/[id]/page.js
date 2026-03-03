import { fetchOrderDetails } from "../../../../api/api";
import ProfileSideBar from "../../profileSideBar";
import { cookies } from "next/headers";

import './orderDetails.css'
import DetailShow from "./detail";

export default async function OrderDetails({params}){
    const id = (await params)?.id
    const cookieStore = (await cookies()).toString()
    const res = await fetchOrderDetails(id, cookieStore)
    const order = await res.json()
    return (
  <div className="detailContainer">
    <ProfileSideBar active={'order'} />
    <DetailShow order={order}></DetailShow>
  </div>
)
}