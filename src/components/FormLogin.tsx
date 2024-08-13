"use client"
import { AdminSubmit } from '@/app/actions/AdminLoginSubmit';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function FormLogin() {
    const [loading, setloading] = useState(false)
    const router = useRouter()
    const [error, setError] = useState<{ msg: string | undefined } | null>(null);
    async function formSubmit(data: FormData) {
        setloading(true)
        if (!data.get('email') || !data.get('pass')) {
            setError({ msg: "Please enter both fields" })
            setloading(false)
            return
        }
        const response = await AdminSubmit(data)
        setloading(false)
        if (!response.success) {
            setError({ msg: response.msg })
            return
        } else {
            router.push(response.redirectUrl)
        }
    }
    useEffect(() => { console.log('setloading ',loading );
    }, [loading])
    return (
        <form className="flex flex-col gap-y-8 min-w-[280px] md:min-w-[400px]" action={formSubmit}>
            <div className="flex flex-col justify-center items-center">
                <Image src={'/logo-dump.jpg'} alt="Darebox Logo" width={110} height={80} />
                <h1 className="font-bold">ADMIN LOGIN</h1>
            </div>

            <div className="flex flex-col">
                <label className="font-bold">Username</label>
                <input type="text" className="border border-primary rounded-md p-2" placeholder="Username" name='email' />
            </div>
            <div className="flex flex-col">
                <label className="font-bold">Password</label>
                <input type="password" className="border border-primary rounded-md p-2" placeholder="Password" name='pass' />
            </div>
            {error && <p className='text-red-500'>{error.msg}</p>}
            <div>
                {
                    loading ? <p>PLEASE WAIT...</p> :
                        <button disabled={loading} type="submit" className="bg-primary text-white w-full rounded-md p-2">LOGIN</button>

                }
            </div>


        </form>
    )
}
