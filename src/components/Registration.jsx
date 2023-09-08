"use client"
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { Fragment, useEffect, useState } from 'react'
import { render } from 'react-dom';
import { PacmanLoader } from 'react-spinners';
import Swal from 'sweetalert2';

const Registration = ({ userdetail }) => {
    const { data: session } = useSession()
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [item, setItem] = useState({})
    const [formData, setFormData] = useState([])
    const [imageFile, setImageFile] = useState([])
    const [imageUrl, setImageUrl] = useState([])
    const [usernameExists, setUsernameExists] = useState(false);
    // const [lastnameExists, setLastnameExists] = useState(false);
    const [userList, setUserList] = useState([]);
    const api = process.env.API_ENDPOINT;


    useEffect(() => {
        // ดึงข้อมูลผู้ใช้จาก API และอัพเดต state
        const fetchUserList = async () => {
            try {
                const response = await axios.get(api + "userdetails");
                setUserList(response.data); // สมมุติว่า API ส่งข้อมูลเป็น array ของผู้ใช้
            } catch (error) {
                console.error("Error fetching user list:", error);
            }
        };
        fetchUserList();
    }, []);
    const handleChange = (e) => {

        if (e.target.name === "file") {
            const urlImg = URL.createObjectURL(e.target.files[0]);
            setImageUrl(urlImg);
            setImageFile({
                file: e.target.files[0],
            })
        }
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
            userid: session?.user.userid,
        })
    }

    const handleUsernameChange = async (e) => {
        const newUsername = e.target.value;

        if (newUsername) {
            const usernamesInSystem = userList.map(user => user.firstname); // ดึงชื่อผู้ใช้จากข้อมูลผู้ใช้ในระบบ
            setUsernameExists(usernamesInSystem.includes(newUsername));
        } else {
            setUsernameExists(false);
        }
    };
    // const handleLnameChange = async (e) => {
    //     const newUsername = e.target.value;

    //     if (newUsername) {
    //         const usernamesInSystem = userList.map(user => user.lastname); // ดึงชื่อผู้ใช้จากข้อมูลผู้ใช้ในระบบ
    //         setLastnameExists(usernamesInSystem.includes(newUsername));
    //     } else {
    //         setLastnameExists(false);
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // ตรวจสอบว่า username มีในระบบแล้วหรือไม่
        if (usernameExists) {
            Swal.fire({
                icon: "error",
                title: "Username นี้ถูกใช้แล้ว",
                confirmButtonColor: "red",
            });
            return;
        }
        // if (lastnameExists) {
        //     Swal.fire({
        //         icon: "error",
        //         title: "lastnameExists นี้ถูกใช้แล้ว",
        //         confirmButtonColor: "red",
        //     });
        //     return;
        // }
        Swal.fire({
            title: "กำลังอัพโหลดข้อมูล",
            html: '<div class="flex-center overflow-y-hidden" id="loading-spinner"></div>',
            showConfirmButton: false,
            allowOutsideClick: false,
            didOpen: () => {
                render(
                    <PacmanLoader color="#326bc2" size={60} loading={true} />,
                    document.getElementById("loading-spinner")
                );
            },
        });
        e.preventDefault();
        const response = await axios.post(api + "image", imageFile, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(async resp => {
            e.preventDefault();
            const postData = await fetch(api + "userdetail", {
                method: 'POST',
                body: JSON.stringify({
                    userid: session?.user.userid,
                    firstname: formData.firstname,
                    lastname: formData.lastname,
                    phone: formData.phone,
                    bankname: formData.bankname,
                    bankid: formData.bankid,
                    personcard: resp.data.data.data,
                }),
                headers: { "content-type": "application/json" }
            }).then(res => res.json())
                .then(res => {

                    if (res !== null) {
                        Swal.fire({
                            title: 'ลงทะเบียนสำเร็จ',
                            text: 'กรุณารออนุมัติจากแอดมิน',
                            icon: 'success',
                            confirmButtonColor: '#3085d6',
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.replace("/")
                            }
                        })
                    }
                })
        })
    }
    return (
        <>
            <Fragment>
                <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8 w-[100%] h-[30%]">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight dark:text-white">
                            แบบฟอร์มลงทะเบียนเป็นผู้ขาย
                        </h2>
                    </div>

                    <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-4" action="#" method="POST"
                            encType='multipart/form-data'
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
                                        defaultValue={userdetail.firstname}
                                        placeholder='กรุณากรอกชื่อให้ตรงกับบัตร'
                                        onChange={(e) => {
                                            handleUsernameChange(e);
                                            handleChange(e); // เรียกใช้ฟังก์ชัน handleChange เหมือนเดิม
                                        }}
                                        className={`block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ${usernameExists ? "ring-red-500" : "ring-gray-300"
                                            } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:${usernameExists ? "ring-red-600" : "ring-indigo-600"} sm:text-sm sm:leading-6`}
                                    />
                                </div>
                                {usernameExists && (
                                    <p className="text-xs mt-1 text-red-600">ชื่อนี้ได้ทำการลงทะเบียนไปแล้ว</p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="lastname" className="block text-sm font-medium leading-6 dark:text-white">
                                    นามสกุล
                                </label>
                                <div className="mt-1">
                                    <input
                                        type='text'
                                        name='lastname'
                                        defaultValue={userdetail.lastname}
                                        placeholder='กรุณากรอกนามสกุลให้ตรงกับบัตร'
                                        onChange={(e) => {
                                            handleChange(e); // เรียกใช้ฟังก์ชัน handleChange เหมือนเดิม
                                        }}
                                        className={`block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300
                                             placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`} />
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
                                        defaultValue={userdetail.phone}
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
                                        defaultValue={userdetail.bankname}
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
                                        defaultValue={userdetail.bankid}
                                        required
                                        onChange={(e) => handleChange(e)}
                                        className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                </div>
                                <div className="mt-0">
                                    <label htmlFor="persioncard" className="block text-sm font-medium leading-6 dark:text-white">
                                        ภาพถ่ายบัตรประชาชน
                                    </label>
                                    <input
                                        name='file'
                                        accept='image/*'
                                        onChange={(e) => handleChange(e)}
                                        required
                                        multiple
                                        className="block w-full rounded-md border-0 py-0.5 dark:text-white shadow-sm ring-1 ring-inset ring-white-300 placeholder:dark:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" aria-describedby="file_input_help" id="file_input" type="file" />

                                </div>
                            </div>
                            <div>
                                <button
                                    disabled={usernameExists} // กำหนดให้ปุ่มไม่สามารถกดได้เมื่อ username ซ
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    ลงทะเบียนเป็นผู้ขาย
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Fragment>
        </>
    )
}

export default Registration