
export function ShortedName(name){
    const result = name.split(" ")
    if (result.length > 2){
        return `${result[0]} ${result[result.length-1]}`
    }
    return name
}

export function ShowPriceFormat(price){
    return new Intl.NumberFormat("vi-VN").format(price);
}