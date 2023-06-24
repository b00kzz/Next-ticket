"use client"
import React, { useEffect, useState } from 'react'
import moment from 'moment';
import 'moment/min/locales';
import axios from 'axios';


const HomePage = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [query, setQuery] = useState("");
    console.log("🚀 ~ file: Homepage.jsxx:12 ~ HomePage ~ items:", items)

    const api = process.env.API_ENDPOINT;

    // const blackground = useRef(null);


    useEffect(() => {
        if (query === "") {
            loadData()
        } else {
            handleSearch("")
        }
    }, [])

    const loadData = async () => {
        fetch(api + "tickets")
            .then(res => res.json())
            .then(
                (result) => {
                    // console.log(result);
                    setIsLoaded(true);
                    setItems(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }

    const handleSearch = async (e) => {
        const prop = e.target.value;
        // console.log(prop);
        setQuery(e.target.value);
        if (prop === "") {
            loadData()
        }
        const res = await axios.get(api + "search/" + prop).then(res => res.data)
            .then(resp => {
                setItems(resp)
                setIsLoaded(true);
            }, (error) => {
                setIsLoaded(true);
                setError(error);
                loadData()
            }
            )

    };

    return (
        <>
            {/* <Backgroud/> */}
            <section className="mt-2 relative container rounded-full lg:px-8 mx-auto bg-white/50">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className='grid grid-cols-2 gap-2'>
                        <h1 className="py-6 lg:text-2xl font-bold dark:text-white xs:text-xs">รายการการแสดงที่จะมาเร็วๆนี้</h1>
                        {/* <h2 className="text-2xl font-bold tracking-tight text-white">รายการที่เปิดขาย</h2> */}
                        <form className="mt-3 flex items-center">
                            <label htmlFor="simple-search" className="sr-only xs:text-xs">ค้นหาชื่อรายการ</label>
                            <div className="relative w-full">
                                <div className="p-1.5 absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg aria-hidden="true" className="w-5 h-5 xs:w-4 xs:h-4 text-gray-500 dark:text-gray-400" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                                </div>
                                <input type="text" id="simple-search" onChange={handleSearch} value={query} className="lg:h-10 xs:plassholder-xs xs:h-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ค้นหาชื่อรายการ" required />
                            </div>
                            <button type="submit" onClick={loadData} className="lg:p-2.5 xs:p-0.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">

                                <label>รีเฟรช</label>
                            </button>
                        </form>
                    </div>
                    <div className="max-w-2xl py-2 lg:max-w-none justify-center">
                        <div className="space-y-12 lg:grid lg:grid-cols-4 lg:gap-x-6 lg:space-y-0">
                            {items.map((item, index) => (
                                item.status === true &&
                                <div className="group relative justify-between" key={index}>
                                    <>
                                        <div className="text-xs">
                                            <time dateTime={item.timdate} className="dark:text-white">
                                                {moment(item.createddate).locale('th').format("เพิ่มเมื่อ" + 'LLLL')}
                                            </time>
                                        </div>
                                        <div className="relative mt-2 h-80 md:h-96 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-96">
                                            <img src={item.ticketimage} alt={item.ticketname} className="h-full w-full object-cover object-center" />
                                        </div>
                                        <div className='grid grid-cols-2 gap-2 mt-6'>
                                            <div className="p-1 items-center leading-none lg:rounded-full flex lg:inline-flex" role="alert">
                                                <span className="flex rounded-full bg-red-900 uppercase text-indigo-100 px-2 py-1 text-xs font-bold mr-1">New</span>
                                                <span className="font-semibold mr-2 text-left text-emerald-500 flex-auto">{item.ticketname}</span>
                                            </div>
                                            <h3 className="text-sm text-gray-500 text-end">
                                                <a href="/product" className='dark:text-white'>
                                                    <span className="absolute inset-0"></span>
                                                    {item.ticketprice} บาท (THB)
                                                </a>
                                            </h3>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-500">ประเภท{item.tickettype} {item.ticketdesc}</p>
                                        {/* <div className="relative mt-6 flex items-center gap-x-4">
                                                    <img src={item.ticketimage} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                                                    <div className="text-sm leading-6">
                                                        <p className="font-semibold text-emerald-500 hover:text-emerald-100">
                                                            <a href="#">
                                                                <span className="absolute inset-0 "></span>
                                                                {item.createdby}
                                                            </a>
                                                        </p>
                                                        <p className="text-gray-400">{moment(item.updateddate).locale('th').format('ll' + '        ')}</p>
                                                    </div>
                                                </div> */}
                                        <br />
                                        <br />
                                    </>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )


}

export default HomePage
