import React from 'react'

const LineNotifyModal = ({ isOpen, onClose, user }) => {
    if (!isOpen) return null;
    return (
        <div className='modal-portal fixed top-0 left-0 w-screen h-screen bg-black/50 bg-opacity-25 flex justify-center items-center backdrop-blur-sm'>
            <div className="relative w-[30%] h-[60%]  rounded-lg flex flex-col">
                <div className="bg-white p-2 rounded-lg">
                    <h1 className='text-center text-2xl'>รับการแจ้งเตือนผ่าน Line Notify</h1>
                    <hr/>
                    <div className='flex-center mt-2'>
                        <img
                            className="h-52 rounded-lg flex-center shadow-md"
                            src={"https://res.cloudinary.com/dxbbaikj5/image/upload/v1688806598/Morlam/xarhfs4ik9fy7kpx3u8o.jpg"}
                            alt=""
                        />
                    </div>
                    <div className="flex-center mt-2">
                        <p>แสกนคิวอาร์โค้ดเพื่อเข้ากลุ่มรับการแจ้งเตือนผ่านทาง Line Notify</p>
                    </div>
                    <hr/>
                    <div className="flex-center mt-2">
                        <button className='black_btn' onClick={() => onClose()}>ปิดหน้าต่าง</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LineNotifyModal