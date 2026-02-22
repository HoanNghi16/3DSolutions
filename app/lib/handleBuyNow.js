import { handleStorage } from "./handleStorage";

export function HandleBuyNow(name, storage){
    handleStorage(storage, name)
    window.location.href = '/checkout'
}