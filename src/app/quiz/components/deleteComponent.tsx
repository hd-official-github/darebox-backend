"use client";
import { DeleteItemAction } from '@/app/actions/DeleteItemAction';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
type Props = {
    id: string | number,
    model: string,
    redirecturl: string,

}
export default function DeleteComponent(data: Props) {
    const [isclicked, setisclicked] = useState(false)
    const router = useRouter()
    const handleClick = async () => {
        setisclicked(true)
        const delres = await DeleteItemAction(data)
        console.log(delres)
        if (!delres.success) {
            alert(delres.msg)
            // router.refresh()
            setisclicked(false)
            return
        } else {
            setisclicked(false)
            window.location.reload()
        }
    }
    return (isclicked ? <p className='font-bold'>WAIT...</p> :
        <button className='flex items-center justify-center bg-red-500 text-white p-2 rounded-md font-bold' onClick={handleClick}>
            DELETE
        </button>
    )
}
