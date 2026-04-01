import { BiArrowBack } from "react-icons/bi";
import AddProductForm from "./addProductForm";

export default function AddProduct(){
    return (
        <div className="addProductContainer">
            <a className="backIcon" href="/admin/products"><BiArrowBack></BiArrowBack> Trở lại</a>
            <AddProductForm></AddProductForm>
        </div>
    )
}