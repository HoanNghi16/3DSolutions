'use client'
import {useContext, createContext, useState, useEffect} from 'react'

const PageContext = createContext(null)

export function PageProvider(){
    const [page, setPage] = useState(1);

    return (
        <PageContext.Provider value={{page, setPage}}></PageContext.Provider>
    )

}

export function usePage(){
    return useContext(PageContext)
}