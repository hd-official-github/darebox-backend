/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { getquizmodeldata } from "@/app/actions/ui/fetchactions";
import { Updatequizmodel } from "@/app/actions/Updatequizmodel";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import { useEffect } from "react";

export default function EditQz({ params }: { params: { id: string } }) {
    const router = useRouter()
    const [loading, setloading] = useState(false)
    const [error, setError] = useState<{ msg: string | undefined } | null>(null);
    const [quizmodelstate, setquizmodelstate] = useState<any>()
    useEffect(() => {
        async function fetchQuizmodelData() {
            setloading(true)
            if (!params.id) {
                router.back()
            } else {
                const quizmodeldata = await getquizmodeldata(params.id)
                setquizmodelstate(quizmodeldata)
                setloading(false)
            }
        }
        fetchQuizmodelData()
    }, [])
    // console.log('qmodel ', quizmodelstate)
    async function handleSubmit(data: FormData) {
        const timingInfo = data.get('timingInfo') as string
        const questionCount = data.get('questionCount') as string
        data.append("id", params.id)
        if (!timingInfo || !questionCount) {
            setError({ msg: "Invalid form Fields" })
            return
        }
        const response = await Updatequizmodel(data)
        if (!response.success) {
            setError({ msg: response.msg })
            return
        }
        else router.replace(response.redirectUrl)
    }
    return < Navbar >

        <div className='font-black text-md p-4'>
            <h3>Edit Quizmodel</h3>
        </div>

        <form action={handleSubmit} className='flex flex-col gap-y-4 max-w-[50%] m-4 font-bold'>
            <div className='flex flex-col'>
                <label>Question Count</label>
                {loading ? <p>LOADING...</p> : <input type='text' placeholder='Question Count' className='p-2 border border-primary' name='questionCount'
                    defaultValue={quizmodelstate && quizmodelstate.questionCount} />}
            </div>
            <div className='flex flex-col'>
                <label>Timing Info</label>
                {loading ? <p>LOADING...</p> : <input type='text' placeholder='Timimg of the Quiz' className='p-2 border border-primary' name='timingInfo'
                    defaultValue={quizmodelstate && quizmodelstate.timingInfo} />}
            </div>
            {error?.msg && <span className="text-red-500">{error.msg}</span>}
            <button type='submit' className='font-black text-white p-4 rounded-md bg-primary'>SUBMIT</button>
        </form>

    </Navbar >
}