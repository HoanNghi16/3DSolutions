import { redirect } from "next/navigation"

export default async function ResultPage({searchParams}){
    const params = await searchParams
    const pay = Number(await params?.pay)
    const OrderId = await params?.id
    if (!OrderId){
        redirect('/')
    }
    if (!OrderId){
        console.log('mất')
    }
    return (<div>Đặt hàng thành công</div>)
}