"use client"
import { ActivateQuizModel, DeActivateQuizModel } from '@/app/actions/ActiveQuizActions'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
type Props = {
    isactive: boolean,
    id: number
}
export default function ActivateComponent({ isactive, id }: Props) {
    const [loading, setisloading] = useState(false)
    const router = useRouter()
    const handleActivate = async (id: number) => {
        setisloading(true)
        if (!id) {
            alert('id not present')
            setisloading(false)
            return
        }
        const activateQuiz = await ActivateQuizModel(id)
        if (activateQuiz.success) {
            setisloading(false)
            router.replace(activateQuiz.redirectUrl)
        } else {
            alert('activate quiz error')
            alert(activateQuiz.msg)
            setisloading(false)
        }
    }
    const handleDeactivate = async (id: number) => {
        setisloading(true)
        if (!id) {
            alert('id not present')
            setisloading(false)
            return
        }
        const activateQuiz = await DeActivateQuizModel(id)
        if (activateQuiz.success) {
            setisloading(false)
            router.replace(activateQuiz.redirectUrl)
        } else {
            alert('deactive quiz error')
            alert(activateQuiz.msg)
            setisloading(false)
        }
    }
    return loading ? <button>LOADING...</button> : isactive ? <button onClick={() => handleDeactivate(id)} className='bg-red-300 text-red-900 font-bold p-2 rounded-md'>DEACTIVATE</button> : <button className='bg-green-300 text-green-900 font-bold p-2 rounded-md' onClick={() => handleActivate(id)}>SET ACTIVE</button>
}
