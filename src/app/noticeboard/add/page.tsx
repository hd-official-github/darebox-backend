"use client"
import { AddNoticeboardAction } from '@/app/actions/AddNoticeBoardAction'
import { GetUserbyRole } from '@/app/actions/GetUserAction'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
type UserData = {
    id: string,
    fullname: string,
    role: string
}
export default function NBadd() {
    const router =useRouter()
    const [loading,setisloading] = useState(false)
    const [error, seterror] = useState<{ msg: string | undefined } | null>(null);
    const [users, setusers] = useState<UserData[]>()
    async function handleformSubmit(data:FormData) {
       
        
        seterror({ msg: "" })
        const plan = data.get('plan')
        const type = data.get('type')
        const rank = data.get('rank')
        const name = data.get('name')
        const points = data.get('points')
        if(plan && type && rank && name && points){
            const postnb = await AddNoticeboardAction(data)
            console.log("HERE 2 ",postnb);

            if(postnb.success){
                router.replace(postnb.redirectUrl)
            }else{
                seterror({ msg: postnb.msg })
                return
            }
        }else{
            seterror({msg:"Invalid Form Fields"})
        }
    }
    const fetchByRole = async (e: React.FormEvent<HTMLSelectElement>) => {
        if (e.currentTarget.value == 'FOUNDATION' || e.currentTarget.value == 'TOP' || e.currentTarget.value == 'PRO') {
            const users: UserData[] = await GetUserbyRole(e.currentTarget.value)
            if (users.length==0) setusers([])
            if (users.length > 0) {
                setusers(users)
                console.log('usrs ', users);
            }
        } else
            alert('Please select a valid plan')


    }
    return (
        <Navbar>
            <div className='flex flex-row items-center justify-between p-4'>
                <h3 className='font-black'>Add Result for Notice board</h3>
            </div>
            <form action={handleformSubmit} className='p-4'>
                <div className='flex flex-col max-w-[300px] gap-y-4 mb-4'>
                    <label>Select Plan</label>
                    <select name='plan' defaultValue={''} className='p-2' onChange={fetchByRole} required>
                        <option value={''} disabled>Choose Plan</option>
                        <option value={'FOUNDATION'}>FOUNDATION</option>
                        <option value={'TOP'}>TOP</option>
                        <option value={'PRO'}>PRO</option>
                    </select>
                </div>
                <div className='flex flex-col max-w-[300px] gap-y-4 mb-4' >
                    <label>Select Quiz type</label>
                    <select name='type' defaultValue={''} className='p-2' required>
                        <option value={''} disabled>Choose Plan</option>
                        <option value={'DAILY'}>DAILY</option>
                        <option value={'WEEKLY'}>WEEKLY</option>
                        <option value={'MONTHLY'}>MONTHLY</option>
                    </select>
                </div>
                <div className='flex flex-col max-w-[300px] gap-y-4 mb-4'>
                    <label>Select User</label>
                    <select name='name' defaultValue={''} className='p-2' required>
                        <option value={''} disabled>Select User</option>
                        {
                            users && users.map(item => {
                                return <option key={item.id} value={item.fullname}>{item.fullname}</option>
                            })
                        }
                    </select>
                </div>
                <div className='flex flex-col max-w-[300px] gap-y-4 mb-4'>
                    <label>Points</label>
                    <input type='number' name='points' min={1} required placeholder='Points' className='p-2 border-primary'/>
                </div>
                <div className='flex flex-col max-w-[300px] gap-y-4 mb-4'>
                    <label>Rank</label>
                    <input type='number' name='rank' min={1} required className='p-2 border-primary' placeholder='Rank'/>
                </div>
                {
                    error && <div><span className='text-red-500'>{error?.msg}</span></div>
                }
                {
                    
                }
                <button type='submit' className='font-black text-white p-4 rounded-md bg-primary' disabled={loading}>
                    {loading ? 'LOADING...':'SUBMIT'}</button>

            </form>
        </Navbar>
    )
}
