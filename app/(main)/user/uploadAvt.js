"use client"
import { useState, useCallback } from "react"
import Cropper from "react-easy-crop"
import getCroppedImg from "./cropAvt"
import { useNoti } from "../../notification"
import { postFile } from "../../api/api"
import './uploadAvt.css'

export default function UploadAvt({openForm}) {
    const [image, setImage] = useState(null)
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const {setMessage, setType} = useNoti()

    const onCropComplete = useCallback((_, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (!file) return

        const reader = new FileReader()
        reader.onload = () => {
            setImage(reader.result)
        }
        reader.readAsDataURL(file)
    }

    const handleUpload = async (e) => {
        openForm(false)
        setMessage('Đang xử lý...')
        setType(null)
        e.target.disabled = true
        const croppedBlob = await getCroppedImg(image, croppedAreaPixels)
        setImage(null)
        const formData = new FormData()
        formData.append("file", croppedBlob)
        formData.append('type', 'avt')
        
        console.log('   ',formData)
        const res = await postFile(formData)
        const result = await res.json()
        setMessage(result.message)
        if(res.ok){
            setType('success')
            openForm(false)
            setTimeout(()=>window.location.reload(), 1000)
        }else{
            setType('warning')
        }
        
    }

    return (
        <div className="uploadBackground" onClick={(e)=> {
            if (e.target == e.currentTarget){
                openForm(false)
            }
            }}>
            <div className="uploadContainer">
                <h2>Tải ảnh đại diện</h2>
                <button className="closeBtn" onClick={()=>openForm(false)}>x</button>
                <input id="inputFile" className="inputFile" type="file" accept="image/*" onChange={handleFileChange}/>
                <span className="fileError">{image?"": "Vui lòng chọn ảnh!"}</span>
                {!image && <label className="fileButton" htmlFor='inputFile'>Chọn ảnh</label>}
                {image && (
                    <div className="cropBox" style={{ position: "relative", width: 300, height: 300 }}>
                        <Cropper 
                            className='cropper'
                            image={image}
                            crop={crop}
                            zoom={zoom}
                            aspect={1} // vuông (avatar)
                            cropShape="round" // tròn
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={onCropComplete}
                        />
                    </div>
                )}

                {image && (
                    <>  
                        <input className="zoomStick"
                            type="range"
                            min={1}
                            max={3}
                            step={0.01}
                            value={zoom}
                            onChange={(e) => setZoom(e.target.value)}
                        />
                        <div className="btns">
                            <button className="changeBtn" onClick={handleUpload}>
                                Xác nhận
                            </button>
                            <button className="cancelBtn" onClick={()=> openForm(false)}>Hủy</button>
                        </div>
                    </>
                )}
             </div>
        </div>
    )
}