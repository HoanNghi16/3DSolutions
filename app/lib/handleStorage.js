export function handleStorage(storage={}, name){
    window.localStorage.setItem(name, JSON.stringify(storage))
    return
}