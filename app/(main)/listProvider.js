'use client'
import { useContext, createContext, useState } from "react"

const listContext = createContext(null)

export function ListProvider ({children}){
    const [selected, setSelected] = useState([])

    function addItem(id){
        if (selected.includes(id)) return false
        setSelected(arr => [...arr, id])
        return true
    }

    return (
        <listContext.Provider value={{selected, addItem,}}>
            {children}
        </listContext.Provider>
    )
}

export function useList(){
    return useContext(listContext)
}