"use client"
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useParams } from 'next/navigation'


const Sidebar = () => {
    const {data: session}=useSession()
    const { userid } = useParams()
    // useEffect(() => {


    // }, [])
    // console.log(value)


    return (

        <div className="form-select text-warning bg-gray-800">
            <div className="flex flex-row items-center h-8 px-6">
                <div className="text-md ">จัดการ</div>
            </div>
            <div>
                <Link href={"employee/manage/"+session?.user.userid} className="relative flex flex-row items-center h-11 hover:bg-yello-50  hover:text-yello-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                    <span className="inline-flex justify-center items-center ml-4">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path></svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">Tickets</span>
                </Link>
            </div>
            <div>
                <Link href={"employee/payments/"+ session?.user.userid} className="relative flex flex-row items-center h-11 hover:bg-yello-50  hover:text-yello-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                    <span className="inline-flex justify-center items-center ml-4">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">Payments</span>
                </Link>
            </div>
            <div className="px-5">
            </div>
            <div>
                <Link href={"profile/" + session?.user.userid} className="relative flex flex-row items-center h-11 hover:bg-yello-50  hover:text-yello-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                    <span className="inline-flex justify-center items-center ml-4">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">Profile</span>
                </Link>
            </div>
            <div>
                <a href="#" className="relative flex flex-row items-center h-11 hover:bg-yello-50  hover:text-yello-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
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