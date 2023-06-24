"use client"
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'


const Sidebar = () => {
    const {data: session}=useSession()
    // useEffect(() => {


    // }, [])
    // console.log(value)


    return (

        <div className="form-select text-warning bg-gray-800">
            <div className="flex flex-row items-center h-8 px-6">
                <div className="text-md ">จัดการ</div>
            </div>
            <div>
                <Link href="admin/manage" className="relative flex flex-row items-center h-11 hover:bg-violet-100  hover:text-yello-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                    <span className="inline-flex justify-center items-center ml-4">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                    </span>
                    <span className="ml-2 text-sm truncate">Users</span>
                </Link>
            </div>
            <div>
                <Link href="admin/ticket" className="relative flex flex-row items-center h-11 hover:bg-violet-100  hover:text-yello-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                    <span className="inline-flex justify-center items-center ml-4">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path></svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">Tickets</span>
                </Link>
            </div>
            <div>
                <Link href="admin/payment" className="relative flex flex-row items-center h-11 hover:bg-violet-100  hover:text-yello-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                    <span className="inline-flex justify-center items-center ml-4">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">Payments</span>
                </Link>
            </div>
            <div>
                <Link href="admin/review" className="relative flex flex-row items-center h-11 hover:bg-violet-100  hover:text-yello-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                    <span className="inline-flex justify-center items-center ml-4">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">Review</span>
                </Link>
            </div>
            <div className="px-5">
            </div>
            <div>
                <Link href={"profile/" + session?.user.userid} className="relative flex flex-row items-center h-11 hover:bg-violet-100  hover:text-yello-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                    <span className="inline-flex justify-center items-center ml-4">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">Profile</span>
                </Link>
            </div>
            <div>
                <Link href="#" className="relative flex flex-row items-center h-11 hover:bg-violet-100  hover:text-yello-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                    <span className="inline-flex justify-center items-center ml-4">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">Settings</span>
                </Link>
            </div>
            <div>
                <a href="#" className="relative flex flex-row items-center h-11 hover:bg-violet-100  hover:text-yello-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                    <span className="inline-flex justify-center items-center ml-4">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate" onClick={() => signOut({ callbackUrl: '/', redirect: true })}>Logout </span>
                </a>
            </div>
        </div>
    )
}

export default Sidebar