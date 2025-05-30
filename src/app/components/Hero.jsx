"use client"
import React, { useState } from 'react'
import { ReactTyped } from 'react-typed'

const Hero = () => {

    const [review, setReview] = useState("")
    const [data, setData] = useState("")

    const getReview = async() => {

        const response = await fetch(`https://short-review.vercel.app/api?data=${data}`)

        const dataAPI = await response.json()

        setReview(dataAPI.review)
    }

    const handleCopy = () => {
        if (navigator.clipboard && review) {
            navigator.clipboard.writeText(review).then(() => alert("Copied!"))
        }
    }

    return (
        <div className='h-screen'>
            <div className='m-20 sm:m-20 flex flex-col justify-center items-center text-center'>
                <div className='flex flex-col justify-center bg-amber-300 w-[350px] sm:w-[500px] rounded-2xl'>
                    <div className='p-8 sm:p-10 flex justify-center'>
                        <input type='text' value={data} onChange={(e) => setData(e.target.value)} className='bg-white flex text-sm sm:text-lg font-bold w-[350px] sm:w-[400px] p-2 rounded-2xl' placeholder='Write one thing you loved about the book'/>
                    </div>
                    <div className='pb-8 sm:pb-10'>
                        <button onClick={() => {getReview()}} className='bg-white active:translate-y-2 hover:translate-y-1 transition duration-300 text-black font-extrabold text-md sm:text-2xl rounded-2xl pt-2 pb-2 pl-5 pr-5'>Generate</button>
                    </div>
                </div>
                <div className='flex flex-col mt-12 sm:mt-20'>
                    <h1 className='text-black text-2xl sm:text-4xl font-extrabold underline'>Your Review Shows Up Below</h1>
                    <div className='bg-amber-300 italic text-black p-3 rounded-2xl mt-10 w-[350px] sm:w-[800px] text-md sm:text-lg font-bold'>
                        <ReactTyped strings={[JSON.stringify(review)]} typeSpeed={40}/>
                    </div>
                    <div>
                        <button onClick={() => {handleCopy()}}className='mt-5 bg-amber-300 active:translate-y-2 hover:translate-y-1 transition duration-300 text-black font-bold text-md sm:text-lg rounded-2xl pt-2 pb-2 pl-5 pr-5 italic'>Copy</button>
                    </div>
                    <div className='text-black mt-5 italic'>
                        <h1>Note : After copying the review you can directly paste it on Amazon!</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero