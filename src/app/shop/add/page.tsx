"use client"
import { Addlifeskillsaction } from '@/app/actions/AddLifeSkillsAction';
import { AddShopAction } from '@/app/actions/AddShopAction';
import Navbar from '@/components/Navbar'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function ShopAdd() {
    const [error, setError] = useState<{ msg: string | undefined } | null>(null);
    const [loading, isloading] = useState(false)
    const router = useRouter()
    async function handleSubmit(data: FormData) {
        setError({msg:""})
        const name = data.get('name') as string
        const description = data.get('description') as string
        const price = data.get('price') as string
        const imgurl = data.get('imgurl') as string
        const producturl = data.get('producturl') as string
        const plan = data.get('plan')
        console.log(name,description,price,imgurl,producturl,plan);
        
        if (!name || !description || !price || !imgurl || !producturl || !plan) {
            setError({ msg: "Invalid form Fields" })
            return
        }
        const response = await AddShopAction(data)
        if (!response.success) {
            setError({ msg: response.msg })
            return
        }
        else router.replace(response.redirectUrl)
    }
    return (
        <Navbar>
            <div className='font-black text-md p-4'>
                <h3>Add ShopItem</h3>
            </div>
            <form action={handleSubmit} className='flex flex-col gap-y-4 max-w-[50%] m-4 font-bold'>
                <div className='flex flex-col'>
                    <label>Product Name</label>
                    <input type='text' placeholder='Product Name' className='p-2 border border-primary' name='name' required/>
                </div>
                <div className='flex flex-col'>
                    <label>Description</label>
                    <input type='text' placeholder='Description' className='p-2 border border-primary' name='description' required/>
                </div>
                <div className='flex flex-col'>
                    <label>PRICE</label>
                    <input type='text' placeholder='Price' className='p-2 border border-primary' name='price' required/>
                </div>
                <div className='flex flex-col'>
                    <label>Image URL</label>
                    <input type='text' placeholder='Image URL' className='p-2 border border-primary' name='imgurl' required/>
                </div>
                <div className='flex flex-col'>
                    <label>Product Url</label>
                    <input type='text' placeholder='Product URL' className='p-2 border border-primary' name='producturl' required/>
                </div>
                <div className='flex flex-col'>
                    <label>Plan Type</label>
                    <select name='plan' defaultValue={''} className='p-2' required>
                        <option value={''} disabled>Choose Plan</option>
                        <option value={'FOUNDATION'}>FOUNDATION</option>
                        <option value={'TOP'}>TOP</option>
                        <option value={'PRO'}>PRO</option>
                    </select>
                </div>
                {error && <span>{error.msg}</span>}
                <button type='submit' className='font-black text-white p-4 rounded-md bg-primary'>
                    {loading ? 'PLEASE WAIT...' : 'SUBMIT'}
                </button>
            </form>
        </Navbar >
    )
}
