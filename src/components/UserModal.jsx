import React from 'react'
import moment from 'moment';
import 'moment/min/locales';

const UserModal = ({ isOpen, onClose, user }) => {
    if (!isOpen) return null;
    return (
        <div className='fixed top-0 left-0 w-screen h-screen bg-black/50 bg-opacity-25 flex justify-center items-center backdrop-blur-sm'>
            <div className="w-[40%] h-[50%]  rounded-lg flex flex-col">
                <button className='px-5 py-2.5 mr-5 justify-center items-center place-self-end text-white' onClick={() => onClose()}>ปิด X</button>
                <div className="bg-white p-2 rounded-lg">
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
                            <p>สถานะ: {user.status === true ? "อนุมัติแล้ว" : "ปิดใช้งาน"}</p>
                            <p>วันที่สมัคร: {moment(user.createddate).locale('th').format('lll' + ' น.')}</p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default UserModal
