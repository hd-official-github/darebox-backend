"use client";
import { AddProductivityAction } from '@/app/actions/AddProductivityAction';
import { getUsers } from '@/app/actions/ui/fetchactions'
import Navbar from '@/components/Navbar'
import { useRouter } from 'next/navigation';

import React, { useEffect, useState } from 'react'

type UserType = {
    id: string,
    fullname: string
}
export default function ProductivityAdd() {
    const router = useRouter()
    const [users, setUsers] = useState<UserType[]>([])
    const [isloading, setisloading] = useState(true)
    const [error, seterror] = useState<{ msg: string | undefined } | null>(null);
    async function handleSubmit(data: FormData) {
        seterror({ msg: "" })
        const userid = data.get('userid') as string
        const points = Number(data.get('points'))
        if (!userid || !points) {
            seterror({ msg: "Please Select a User" })
            return
        }
        if (isNaN(points)) {
            seterror({ msg: "Please Enter valid Points" })
            return
        }
        console.log('user id ', userid, 'poi ', points);
        // const data = new FormData()
        setisloading(true)
        const response = await AddProductivityAction({ userid, points })
        setisloading(false)
        if (!response.success) {
            seterror({ msg: response.msg })
            return
        }
        else router.replace(response.redirectUrl)

    }
    useEffect(() => {

        async function fetchData() {
            const u: UserType[] = await getUsers()
            setUsers(u)
            setisloading(false)
        }
        fetchData()
    }, [])

    return (
        <Navbar>
            <div className='font-black text-md p-4'>
                <h3>Add Productivity</h3>
            </div>
            <form action={handleSubmit} className='flex flex-col gap-y-4 max-w-[50%] m-4 font-bold'>
                <div className='flex flex-col'>
                    {
                        isloading ? "LOADING..." : <><label>Select User</label>
                            <select name='userid' className='p-2 border-primary' defaultValue={''}>
                                <option value={''} disabled>Select</option>
                                {
                                    users.length > 0 && users.map((item: any) => {
                                        return <option key={item.id} value={item.id}>{item.fullname}</option>
                                    })
                                }

                            </select></>
                    }

                </div>
                <div className='flex flex-col'>
                    <label>Points (Range 0-3650)</label>
                    <input max={3650} maxLength={4} min={0} type='number' placeholder='Initial Points' className='p-2 border border-primary' name='points' />
                </div>
                {error && <span className='text-red-500'>{error.msg}</span>}
                {
                    isloading ? <button className='font-black text-white p-4 rounded-md bg-gray-500' disabled>PLEASE WAIT</button> : <button type='submit' className='font-black text-white p-4 rounded-md bg-primary'>SUBMIT</button>
                }

            </form>
        </Navbar>
    )
}
