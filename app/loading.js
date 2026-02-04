import './loading.css'
export default function Loading({loading_title = "Kiểm tra"}){
    return (
        <>
            <div className="loadingContainer">
                <div className='loadingWindow'>
                    <div className="loader"></div>
                    <h5 className='loadingTitle'>Đang tải..</h5>
                </div>
            </div>
        </>
    )
}