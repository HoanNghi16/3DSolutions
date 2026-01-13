import { getProductDetails } from "../../../api/api"
export default async function DetailPage({params}){
    const id = (await params)?.id
    const res = await getProductDetails(id)
    return (<div>
        Đây là trang chi tiết
    </div>)
}