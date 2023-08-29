"use client"
import React, { Fragment } from 'react'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import moment from 'moment';
import 'moment/min/locales';
import axios from 'axios';
import { BsBoomboxFill, BsFillGridFill, BsGlobe, BsPerson } from "react-icons/bs";
import ProductDetailModal from '@/components/ProductDetailModal';

export default function Activity() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [query, setQuery] = useState("");
    const [type, setType] = useState("");
    const [showModal, setShowModal] = useState(false);
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
            <Fragment>
                <div>
                    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">

                        <div className='grid grid-cols-2 gap-2'>
                            <h2 className="ml-10 xl:text-2xl font-bold tracking-tight dark:text-white xs:text-sm xs:font-medium">รายการที่เปิดขาย</h2>
                            <form className="flex items-center">
                                <label htmlFor="simple-search" className="sr-only">ค้นหารายการ</label>
                                <div className="relative w-full">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none">
                                        <svg aria-hidden="true" className="w-4 h-4 text-gray-500 dark:text-gray-400" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                                    </div>
                                    <input type="text" id="simple-search" onChange={handleSearch} value={query} className="bg-gray-50 border border-gray-300 text-gray-900 xl:text-base text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-8 p-2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ค้นหารายการ" />
                                </div>
                                <button type="submit" onClick={() => setType("")} className="p-2 ml-2 xl:text-base text-xs font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    รีเฟรช
                                </button>
                            </form>

                        </div>
                        <div className="border-b border-gray-200 dark:border-gray-700">
                            <ul className="flex text-sm font-medium text-center text-gray-500 dark:text-gray-400 whitespace-nowrap overflow-x-auto xl:overflow-x-scroll-hidden">
                                <li className="inline-block px-3 py-2">
                                    <button onClick={() => setType("")} className="inline-flex border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group">
                                        <BsFillGridFill className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-500" />
                                        ทั้งหมด
                                    </button>
                                </li>
                                <li className="inline-block px-3 py-2">
                                    <button onClick={() => setType("หมอลำ")} className="inline-flex border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group" aria-current="page">
                                        <BsBoomboxFill className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-500" />
                                        หมอลำ
                                    </button>
                                </li>
                                <li className="inline-block px-3 py-2">
                                    <button onClick={() => setType("นักร้องเดี่ยว")} className="inline-flex border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group">
                                        <BsPerson className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-500" />
                                        นักร้องเดี่ยว
                                    </button>
                                </li>
                                <li className="inline-block px-3 py-2">
                                    <button onClick={() => setType("ทั่วไป")} className="inline-flex border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group">
                                        <BsGlobe className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-500" />
                                        ทั่วไป
                                    </button>
                                </li>
                                <li className="inline-block px-3 py-2">
                                    <a className="cursor-not-allowed dark:text-gray-500">เร็วๆ นี้</a>
                                </li>
                            </ul>
                        </div>


                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                            {items.map((item, idx) => (

                                item.sellstatus === true && item.tickettype.toLowerCase().includes(type.toLowerCase()) &&
                                <div className="group relative rounded-3xl stroke-orange-500" key={idx}>
                                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-transparent lg:aspect-none group-hover:opacity-75 lg:h-64">
                                        <img src={item.ticketimage} alt={item.ticketname} className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
                                    </div>
                                    <div className="mt-4 flex justify-between">
                                        <div>
                                            <h3 className="text-sm dark:text-white ml-3">
                                                <Link href={'/user/payment/' + item.ticketid}>

                                                    <span className="absolute inset-0 font-bold"></span>
                                                    {item.ticketname}
                                                </Link>
                                            </h3>
                                            <p className="mt-1 ml-2 text-sm dark:text-white">{item.tickettype}  {item.ticketdesc}</p>
                                            <p className="mt-1 ml-2 text-sm text-gray-500">{moment(item.createddate).locale('th').format('lll' + ' น.')}</p>
                                        </div>
                                        <br />
                                        <p className="text-sm mr-2 font-medium text-sky-500">{item.ticketprice} บาท</p>
                                    </div>
                                    <Link
                                        href={'/user/payment/' + item.ticketid}
                                        className="mt-2 flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                                    // onClick={e => {
                                    // e.preventDefault(item.ticketid);
                                    // console.log(item.ticketid);
                                    // setShowModal(true);
                                    // }}
                                    >
                                        <i className="bi bi-cart4 text-sm font-semibold mr-1" />
                                        เลือกรายการ
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <ProductDetailModal isOpen={showModal} onClose={() => setShowModal(false)} />
            </Fragment>
        </>
    );
    // }
}
