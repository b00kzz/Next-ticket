"use client"
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/min/locales';
import axios from 'axios';

const UserModal = ({ isOpen, onClose, user, userid }) => {
    const [userData, setUserData] = useState(null);
    const api = process.env.API_ENDPOINT;

    useEffect(() => {
        // ฟังก์ชันสำหรับดึงข้อมูลผู้ใช้ด้วย userid
        const fetchUserData = async () => {
            try {
                const response = await axios.get(api + `userdetail/${userid}`);
                setUserData(response.data);
            } catch (error) {
                // กรณีเกิดข้อผิดพลาดในการดึงข้อมูล
                console.error('Error fetching user data:', error);
                setUserData(null);
            }
        };

        if (userid && isOpen) {
            fetchUserData();
        }
    }, [userid, isOpen]);

    if (!isOpen) return null;

    return (
        <div className='fixed top-0 left-0 w-screen h-screen bg-black/50 bg-opacity-25 flex justify-center items-center backdrop-blur-sm'>
            <div className="w-[60%] h-[50%]  rounded-lg flex flex-col">
                <button className='px-5 py-2.5 mr-5 justify-center items-center place-self-end text-white' onClick={() => onClose()}>ปิด X</button>
                <div className="bg-white p-2 rounded-lg">
                    {userData ? (
                        <>
                            <h1 className='text-center text-2xl'>รายละเอียดผู้ใช้</h1>
                            <hr />
                            <div className='flex-center space-x-10 mt-4 mb-4'>
                                <div>
                                    <img
                                        className="h-56 rounded-lg"
                                        src={user.avatar}
                                        alt=""
                                    />
                                    <p className='text-center mt-2'>(รูปโปรไฟล์)</p>
                                </div>
                                {userData.personcard !== "" &&
                                    <div>
                                        <img
                                            className="h-56 rounded-lg"
                                            src={userData.personcard}
                                            alt=""
                                        />
                                        <p className='text-center mt-2'>(รูปบัตรประจำตัวประชาชน)</p>
                                    </div>
                                }
                                <div>
                                    <p>รหัสผู้ใช้: {user.userid}</p>
                                    <p>บทบาท: {user.roleid}</p>
                                    <p>ชื่อผู้ใช้: {user.username}</p>
                                    <p>ชื่อ: {userData.firstname}</p>
                                    <p>นามสกุล: {userData.lastname}</p>
                                    <p>ชื่อเล่น: {user.nickname}</p>
                                    <p>ธนาคาร: {userData.bankname}</p>
                                    <p>เลขบัญชี: {userData.bankid}</p>
                                    <p>อีเมล: {user.email}</p>
                                    <p>สถานะ: {user.status === true ? "เปิดใช้งาน" : "ปิดใช้งาน"}</p>
                                    <p>วันที่สมัคร: {moment(user.createddate).locale('th').format('lll' + ' น.')}</p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <h1 className='text-center text-2xl'>รายละเอียดผู้ใช้</h1>
                            <hr />
                            <div className='flex-center space-x-10 mt-4 mb-4'>
                                <img
                                    className="h-40 rounded-lg flex-center"
                                    src={user.avatar}
                                    alt=""
                                />
                                <div>
                                    <p>รหัสผู้ใช้: {user.userid}</p>
                                    <p>บทบาท: {user.roleid}</p>
                                    <p>ชื่อผู้ใช้: {user.username}</p>
                                    <p>ชื่อ: {user.nickname}</p>
                                    <p>อีเมล: {user.email}</p>
                                    <p>สถานะ: {user.status === true ? "เปิดใช้งาน" : "ปิดใช้งาน"}</p>
                                    <p>วันที่สมัคร: {moment(user.createddate).locale('th').format('lll' + ' น.')}</p>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserModal;
