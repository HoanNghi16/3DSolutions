import ListCheckout from "./listCheckout"
import './checkout.css'
export default async function OrderPage({searchParams}){

    return (
        <div className="checkoutContainer">
            <div>
            </div>
            <div className="listCheckout">
                <h1 style={{color: "#072161"}}>Chi tiết đơn hàng</h1>
                <ListCheckout></ListCheckout>
            </div>
        </div>
    )
}