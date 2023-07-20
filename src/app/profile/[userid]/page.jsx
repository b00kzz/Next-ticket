"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { PacmanLoader } from "react-spinners";
import { render } from "react-dom";


const profile = () => {
    const { data: session } = useSession();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [item, setItem] = useState({});
    // const [formData, setFormData] = useState({});
    const [imageFile, setImageFile] = useState([]);
    const [imageUrl, setImageUrl] = useState([]);

    // const [newImageUrl, setNewImageUrl] = useState([])

    const api = process.env.API_ENDPOINT;
    const { userid } = useParams();

    useEffect(() => {
        loadData(userid);
    }, []);

    const loadData = async (userid) => {
        const response = await axios
            .get(api + "user/" + userid)
            .then((res) => {
                setItem(res.data);
                setIsLoaded(true);
            })
            .catch((err) => {
                setError(err);
                // console.log(err);
            });
    };

    const handleChange = (e) => {
        // console.log(e.target.files[0]);

        // const urlImg = URL.createObjectURL(e.target.files[0]);
        if (e.target.name === "file") {
            const urlImg = URL.createObjectURL(e.target.files[0]);
            setImageFile({
                file: e.target.files[0],
            });
            setImageUrl(urlImg);
        }
        setItem({
            ...item,
            [e.target.name]: e.target.value,
            avatar: "",
        });
    };
    // console.log(item);
    // console.log(imageFile);
    // console.log("img",imageUrl);

    const handleSubmit = async (e) => {
        Swal.fire({
            title: "กำลังอัพเดตข้อมูล",
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
        if (imageUrl.length < 2) {
            const postData = await fetch(api + "user/" + userid, {
                method: "PUT",
                body: JSON.stringify({
                    // password: item.password,
                    nickname: item.nickname,
                    email: item.email,
                }),
                headers: { "content-type": "application/json" },
            }).then((res) => res.json())
                .then((res) => {
                    if (res !== null) {
                        Swal.fire({
                            title: "อัพเดตข้อมูลสำเร็จ",
                            text: "กลับไปยังหน้าหลัก",
                            icon: "success",
                            confirmButtonColor: "#3085d6",
                        }).then((result) => {
                            if (result.isConfirmed) {
                                loadData();
                                window.location.replace("/");
                            }
                        });
                    }
                });
        } else {
            const response = await axios
                .post(api + "image", imageFile, {
                    headers: { "Content-Type": "multipart/form-data" },
                })
                .then(async (resp) => {
                    e.preventDefault();
                    const postData = await fetch(api + "user/" + userid, {
                        method: "PUT",
                        body: JSON.stringify({
                            // password: item.password,
                            nickname: item.nickname,
                            email: item.email,
                            avatar: resp.data.data.data,
                        }),
                        headers: { "content-type": "application/json" },
                    })
                        .then((res) => res.json())
                        .then((res) => {
                            if (res !== null) {
                                Swal.fire({
                                    title: "อัพเดตข้อมูลสำเร็จ",
                                    text: "กลับไปยังหน้าหลัก",
                                    icon: "success",
                                    confirmButtonColor: "#3085d6",
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        loadData();
                                        window.location.replace("/");
                                    }
                                });
                            }
                        });
                });
        }
    };
    // console.clear()
    // window.console.clear()
    return (
        <>
            <div className="grid grid-cols-2 gap-2">
                <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form
                            className="space-y-6"
                            action="#"
                            method="POST"
                            onSubmit={handleSubmit}
                            encType="multipart/form-data"
                        >
                            <div>
                                <label className="block text-sm font-medium leading-6 dark:text-white">
                                    Username
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        value={item.username}
                                        readOnly
                                        onChange={(e) => handleChange(e)}
                                        className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            {/* <div>
                                <label className="block text-sm font-medium leading-6 dark:text-white">
                                    Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        required
                                        name='password'
                                        type='password'
                                        onChange={(e) => handleChange(e)}
                                        className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div> */}
                            <div>
                                <label className="block text-sm font-medium leading-6 dark:text-white">
                                    Nickname
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        value={item.nickname}
                                        name="nickname"
                                        onChange={(e) => handleChange(e)}
                                        className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label className="block text-sm font-medium leading-6 dark:text-white">
                                        Email
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        type="email"
                                        name="email"
                                        value={item.email}
                                        required
                                        onChange={(e) => handleChange(e)}
                                        className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label className="block text-sm font-medium leading-6 dark:text-white">
                                        เปลี่ยนโปรไฟล์
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        name="file"
                                        accept="image/*"
                                        onInput={(e) => handleChange(e)}
                                        multiple
                                        // required
                                        className="block w-full rounded-md border-0 py-0.5 dark:dark:text-white shadow-sm ring-1 ring-inset ring-white-300 placeholder:dark:dark:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        aria-describedby="file_input_help"
                                        id="file_input"
                                        type="file"
                                    />
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 dark:text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    อัพเดตข้อมูล
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        {imageUrl.length > 2 ? (
                            <>
                                <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight dark:text-white">
                                    ตัวอย่างรูปโปรไฟล์
                                </h1>
                                <img
                                    className="mt-2 mx-auto h-auto w-auto"
                                    src={imageUrl}
                                    alt="PromptPay"
                                />
                            </>
                        ) : (
                            <>
                                <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight dark:text-white">
                                    โปรไฟล์
                                </h1>
                                <img
                                    className="mt-2 mx-auto h-auto w-auto"
                                    src={session?.user.avatar}
                                    alt="PromptPay"
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default profile;
