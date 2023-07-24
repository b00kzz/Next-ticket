"use client"
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';

const EmploeeDetail = () => {
    const { userid } = useParams()
    const [user, setUser] = useState({});
    const [formData, setFormData] = useState([])
    const api = process.env.API_ENDPOINT;

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        const res = await axios.get(api + `userdetail/${userid}`).then((res) => {
            setUser(res.data)
        }).catch((err) => {
            console.log("🚀 ~ file: page.jsx:19 ~ res ~ err:", err)
        })

    }
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    }
    const handleSubmit = async (e) => {
        const res = await axios.put(api + `userdetail/${userid}`, {
            firstname: user.firstname,
            lastname: user.lastname,
            phone: user.phone,
            bankname: user.bankname,
            bankid: user.bankid
        }).then(res => {
            Swal.fire({
                title: 'สำเร็จ',
                text: 'คลิกเพื่อกลับไปยังหน้าแรก',
                icon: 'success',
                confirmButtonColor: '#3085d6'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.replace("/")
                }
            })
        }).catch(err => {
            console.log("🚀 ~ file: page.jsx:47 ~ handleSubmit ~ err:", err)
        })

    }

    return (
        <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8 w-[100%] h-[30%]">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="text-center text-2xl font-bold leading-9 tracking-tight dark:text-white">
                    แก้ไขข้อมูลผู้ใช้
                </h2>
            </div>

            <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-4" action="#" method="POST"
                    onSubmit={handleSubmit}
                >
                    <div>
                        <label htmlFor="firstname" className="block text-sm font-medium leading-6 dark:text-white">
                            ชื่อ
                        </label>
                        <div className="mt-1">
                            <input
                                type='text'
                                name='firstname'
                                defaultValue={user.firstname}
                                placeholder='กรุณากรอกชื่อให้ตรงกับบัตร'
                                onChange={(e) => handleChange(e)}
                                className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="lastname" className="block text-sm font-medium leading-6 dark:text-white">
                            นามสกุล
                        </label>
                        <div className="mt-1">
                            <input
                                type='text'
                                name='lastname'
                                defaultValue={user.lastname}
                                placeholder='กรุณากรอกนามสกุลให้ตรงกับบัตร'
                                onChange={(e) => handleChange(e)}
                                className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium leading-6 dark:text-white">
                            เบอร์โทร
                        </label>
                        <div className="mt-1">
                            <input
                                type='text'
                                name='phone'
                                defaultValue={user.phone}
                                placeholder='กรุณากรอกเบอร์โทร'
                                onChange={(e) => handleChange(e)}
                                className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="bankname" className="block text-sm font-medium leading-6 dark:text-white">
                                ชื่อธนาคาร
                            </label>
                        </div>
                        <div className="mt-1">
                            <input
                                placeholder='กรุณากรอกชื่อธนาคาร'
                                type='text'
                                name='bankname'
                                defaultValue={user.bankname}
                                required
                                onChange={(e) => handleChange(e)}
                                className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="bankid" className="block text-sm font-medium leading-6 dark:text-white">
                                เลขบัญชี
                            </label>
                        </div>
                        <div className="mt-1">
                            <input
                                placeholder='กรุณากรอกเลขบัญชี'
                                type='text'
                                name='bankid'
                                defaultValue={user.bankid}
                                required
                                onChange={(e) => handleChange(e)}
                                className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            อัพเดต
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EmploeeDetail