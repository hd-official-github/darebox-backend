
import React from 'react'



// Define the props type
interface PropType {
    type: "FOUNDATION" | "PRO" | "TOP"
}
export default function SplitComponent({ type }: PropType) {
    return (
        <div className='grid grid-cols-3 gap-6'>
            <div className='bg-white p-2  rounded-md'>
                <h3 className='font-black mb-4'>DAILY QUIZ</h3>


                <div className='grid grid-cols-4 mb-4'>
                    <h4 className='font-bold text-xs'>RANK</h4>
                    <h4 className='font-bold text-xs'>NAME</h4>
                    <h4 className='font-bold text-xs'>POINTS</h4>
                    <h4 className='font-bold text-xs'>ACTION</h4>
                </div>
                <div className='grid grid-cols-4'>
                    <h4 className='font-bold text-xs'>1</h4>
                    <h4 className='font-bold text-xs'>Himanshu Dubey</h4>
                    <h4 className='font-bold text-xs'>400</h4>
                    <button className='flex items-start justify-start'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor" className="size-6 rounded-full text-red-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                    </button>
                </div>
            </div>
            <div className='bg-white p-2 rounded-md'>
                <h3 className='font-black mb-4'>WEEKLY QUIZ</h3>
                <div className='grid grid-cols-4 mb-4'>
                    <h4 className='font-bold text-xs'>RANK</h4>
                    <h4 className='font-bold text-xs'>NAME</h4>
                    <h4 className='font-bold text-xs'>POINTS</h4>
                    <h4 className='font-bold text-xs'>ACTION</h4>
                </div>
                <div className='grid grid-cols-4'>
                    <h4 className='font-bold text-xs'>1</h4>
                    <h4 className='font-bold text-xs'>Himanshu Dubey</h4>
                    <h4 className='font-bold text-xs'>400</h4>
                    <button className='flex items-start justify-start'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor" className="size-6 rounded-full text-red-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                    </button>
                </div>
            </div>
            <div className='bg-white p-2 rounded-md'>
                <h3 className='font-black mb-4'>MONTHLY QUIZ</h3>
                <div className='grid grid-cols-4 mb-4'>
                    <h4 className='font-bold text-xs'>RANK</h4>
                    <h4 className='font-bold text-xs'>NAME</h4>
                    <h4 className='font-bold text-xs'>POINTS</h4>
                    <h4 className='font-bold text-xs'>ACTION</h4>
                </div>
                <div className='grid grid-cols-4'>
                    <h4 className='font-bold text-xs'>1</h4>
                    <h4 className='font-bold text-xs'>Himanshu Dubey</h4>
                    <h4 className='font-bold text-xs'>400</h4>
                    <button className='flex items-start justify-start'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor" className="size-6 rounded-full text-red-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}
