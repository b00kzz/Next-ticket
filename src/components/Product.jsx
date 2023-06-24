"use client"
import React from 'react'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import moment from 'moment';
import 'moment/min/locales';
import axios from 'axios';

export default function Product() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [query, setQuery] = useState("");
    const [type, setType] = useState("");
    const api = process.env.API_ENDPOINT;

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

        const res = await axios.get(api + "search/" + prop).then(res => res.data)
            .then(resp => {
                setItems(resp)
                setIsLoaded(true);
            }, (error) => {
                setIsLoaded(true);
                setError(error);
                loadData()
            })
    };

    // if (error) {
    //     return <div>Error: {error.message}</div>;
    // } else if (!isLoaded) {
    //     return <div>Loading...</div>;
    // } else {
    return (
        <>
            <section>
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <div className='grid grid-cols-2 gap-2'>
                        <h2 className="text-2xl lg:font-bold tracking-tight dark:text-white xs:text-md xs:font-medium">รายการที่เปิดขาย</h2>
                        <form className="flex items-center">
                            <label htmlFor="simple-search" className="sr-only">ค้นหารายการ</label>
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                                </div>
                                <input type="text" id="simple-search" onChange={handleSearch} value={query} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ค้นหารายการ" required />
                            </div>
                            <button type="submit" onClick={loadData} className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <label>รีเฟรช</label>
                            </button>
                        </form>
                    </div>
                    <div class="border-b border-gray-200 dark:border-gray-700">
                        <ul class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                            <li class="mr-2">
                                <button onClick={() => setType("")} class="inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group" >
                                    <svg aria-hidden="true" class="w-5 h-5 mr-2 text-blue-600 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path></svg>ทั้งหมด
                                </button>
                            </li>
                            <li class="mr-2">
                                <button onClick={() => setType("หมอลำ")} class="inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group" aria-current="page">
                                    <svg aria-hidden="true" class="w-5 h-5 mr-2 text-blue-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>หมอลำ
                                </button>
                            </li>
                            <li class="mr-2">
                                <button onClick={() => setType("นักร้องเดี่ยว")} class="inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group">
                                    <svg aria-hidden="true" class="w-5 h-5 mr-2 text-blue-600 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"></path></svg>นักร้องเดี่ยว
                                </button>
                            </li>
                            <li class="mr-2">
                                <button onClick={() => setType("ทั่วไป")} class="inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group">
                                    <svg aria-hidden="true" class="w-5 h-5 mr-2 text-blue-600 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path><path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"></path></svg>ทั่วไป
                                </button>
                            </li>
                            <li>
                                <a class="inline-block p-4 text-blue-600 rounded-t-lg cursor-not-allowed dark:text-gray-500">Disabled</a>
                            </li>
                        </ul>
                    </div>
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {items.map(item => (
                            item.sellstatus === true && item.tickettype.toLowerCase().includes(type.toLowerCase()) &&
                            <div className="group relative" key={item.ticketid}>
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                    <img src={item.ticketimage} alt={item.ticketname} className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h3 className="text-sm text-white">
                                            <Link href={'/user/payment/' + item.ticketid}>

                                                <span aria-hidden="true" className="absolute inset-0 font-bold"></span>
                                                {item.ticketname}
                                            </Link>
                                        </h3>
                                        <p className="mt-1 text-sm text-white">{item.tickettype}  {item.ticketdesc}</p>
                                        <p className="mt-1 text-sm text-gray-500">เพิ่มเมื่อ {moment(item.createddate).locale('th').format('lll' + ' น.')}</p>
                                    </div>
                                    <br />
                                    <p className="text-sm font-medium text-sky-400">{item.ticketprice} บาท</p>
                                </div>
                                <Link
                                    href={'/user/payment/' + item.ticketid}
                                    className="mt-2 flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                                    onClick={e => {
                                        // e.preventDefault(item.ticketid);
                                        // console.log(item.ticketid);
                                        // setShowModal(true);
                                    }}
                                >
                                    <i className="bi bi-cart4 text-sm font-semibold mr-1" />
                                    เลือกรายการ
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
    // }
}
