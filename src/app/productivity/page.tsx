"use client"
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { getProductivity } from '../actions/ui/fetchactions'
import { Add10Productivity } from '../actions/Add10Productivity'
import { useRouter } from 'next/navigation'

type ProdType = {
  user: {
    fullname: string;
    role: string
  };
} & {
  id: string;
  points: number;
  createdAt: Date;
  userId: string;
}


export default function Productivity() {
  const [prodata, setProddata] = useState<ProdType[]>()
  const [loading, setisloading] = useState(false)
  const handleAdd10 = async (userid: string) => {
    const userConfirmed = window.confirm("Are you sure you want to add 10points to this user?");
    if (userConfirmed) {
      if (userid) {
        setisloading(true)
        const add10 = await Add10Productivity(userid);
        if (add10.success) {
          window.location.reload()
        }else{
          alert(add10.msg)
        }
        setisloading(false)
      }
    }
  }
  useEffect(() => {
    async function fetchProd() {
      setisloading(true)
      const prodata: ProdType[] = await getProductivity()
      setisloading(false)
      setProddata(prodata)
    }
    fetchProd()
  }, [])

  return (
    <Navbar>
      <div className='flex flex-row items-center justify-between p-4'>
        <h3 className='font-black'>Productivity</h3>
        <Link href={'/productivity/add'} className='text-white p-2 text-sm rounded-md bg-primary'>+ New Productivity</Link>
      </div>

      <div className='grid grid-cols-4 m-4 p-4 font-bold text-sm'>
        <div>ID</div>
        <div>User</div>
        <div>Points</div>
        <div>Action</div>
      </div>
      {
        loading ? <h4 className='font-black p-2'>LOADING....</h4> : prodata && prodata.length > 0 ? prodata.map(item => {
          return <div key={item.id} className='grid grid-cols-4 p-4 m-2 font-medium text-sm overflow-hidden break-words bg-white shadow-md'>
            <p>{item.id}</p>
            <p>{item.user.fullname}({item.user.role})</p>
            <p>{item.points}</p>
            <button onClick={() => handleAdd10(item.userId)} className='flex bg-primary p-2 text-white rounded-md justify-center items-center w-[140px]'>
              ADD 10 POINTS
            </button>
          </div>
        }) : <h4 className='font-black p-2'>NO DATA PRESENT</h4>
      }
    </Navbar>
  )
}
