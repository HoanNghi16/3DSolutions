'use client'
import { useContext, createContext, useState, useEffect } from "react"
import { handleStorage } from "../lib/handleStorage"

const listContext = createContext(null)

export function ListProvider ({children}){
    const [selected, setSelected] = useState([])

    function addItem(id){
        if (selected.includes(id)){
            console.log("include nè")
            setSelected((arr) => {
                const term_arr = arr.filter((a) => {if (a != id) return a})
                return term_arr
            })
        }
        else{
            setSelected((arr) => ([...arr, id]))
        }
        handleStorage({list_ids: selected, mode: 'order'}, 'checkout')
        return true
    }
    useEffect(()=>{
        function getSelected(){
            const list_ids = JSON.parse(window.localStorage.getItem('checkout')).list_ids ?? []
            if (list_ids.length != 0){
                setSelected(list_ids)
            }
        }
        getSelected()
    },[])
    return (
        <listContext.Provider value={{selected, addItem}}>
            {children}
        </listContext.Provider>
    )
}

export function useList(){
    return useContext(listContext)
}