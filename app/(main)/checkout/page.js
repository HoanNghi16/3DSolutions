import ListOrder from "./listOrder"
export default async function OrderPage({searchParams}){

    return (
        <div className="orderContainer">
            <div>
            </div>
            <div className="listOrder">
                <h1>Chi tiết đơn hàng</h1>
                <ListOrder></ListOrder>
            </div>
        </div>
    )
}