import axios from 'axios';
import React, { useEffect, useState } from 'react'

const EmployeeModal = ({ isOpen, onClose, employee, userid }) => {
  const [userDetail, setUserDetail] = useState({});
  const [user, setUser] = useState(null);
  const api = process.env.API_ENDPOINT;

  useEffect(() => {
    // ฟังก์ชันสำหรับดึงข้อมูลผู้ใช้ด้วย userid
    const fetchUserData = async () => {
      try {
        const response = await axios.get(api + `user/${userid}`);
        setUser(response.data);
      } catch (error) {
        // กรณีเกิดข้อผิดพลาดในการดึงข้อมูล
        console.error('Error fetching user data:', error);
        setUser(null);
      }
    };

    if (userid && isOpen) {
      fetchUserData();
    }
  }, [userid, isOpen]);

  if (!isOpen) return null;
  return (
    <div className='modal-portal fixed top-0 left-0 w-screen h-screen bg-black/50 bg-opacity-25 flex justify-center items-center backdrop-blur-sm'>
      <div className="relative w-[30%] h-[60%]  rounded-lg flex flex-col">
        <div className="bg-white p-2 rounded-lg">
          <h1 className='text-center text-2xl'>รายละเอียดผู้ใช้</h1>
          <hr />
          <p className='text-center text-lg mt-3'>ภาพบัตรประชาชน</p>
          <div className='flex-center mt-2'>
            <img
              className="h-52 rounded-lg flex-center shadow-md"
              src={employee.personcard}
              alt="รูปบัตรประชาชน"
            />
          </div>
          <div className="text-center mt-2">
            {user ?
              <>
                <p>ชื่อผู้ใช้: {user.username}</p>
                <p>ชื่อเล่น: {user.nickname}</p>
                <p>บทบาท: {user.roleid}</p>

              </>
              : <h1> ไม่พบข้อมูลผู้ใช้ </h1>
            }
          </div>
          <hr />
          <div className="flex-center mt-2">
            <button className='black_btn' onClick={() => onClose()}>ปิดหน้าต่าง</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeModal