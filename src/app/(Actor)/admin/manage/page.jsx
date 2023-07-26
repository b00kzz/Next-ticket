"use client"
import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios';
import moment from 'moment';
import 'moment/min/locales';
import Swal from 'sweetalert2';
import { FaTrashAlt, FaSearch } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import Link from 'next/link';
import UserModal from '@/components/UserModal';
import ExportPdf from '@/components/ExportPdf';
import ExportExel from '@/components/ExportExel';





const manage = () => {
  // const totalSales = item.reduce((total, currentItem) => total + currentItem.ticketprice, 0);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState([]);
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const employeeCount = item.filter(user => user.roleid === "Employee").length;
  const banned = item.filter(user => user.status === false).length;
  const [user, setUser] = useState({});
  const api = process.env.API_ENDPOINT;

  useEffect(() => {
    loadData();
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [])

  const loadData = async () => {
    const response = await axios.get(api + "users")
      .then(
        (result) => {
          setIsLoaded(true);
          setItem(result.data.user);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        })
  }



  async function handleChangesRole(e, userid) {
    const roleid = e.target.value;

    console.log({ roleid }, userid);
    axios.put(api + "user/role/" + userid, { roleid })
      .then(res => {
        // console.log(res);
        loadData();
      })
  }

  async function handleChangesStatus(e, userid) {
    const status = e.target.checked;

    // console.log({ status }, userid);
    axios.put(api + "user/status/" + userid, { status })
      .then(res => {
        // console.log(res);
        loadData();
      })

  }

  async function handleDelete(userid) {
    Swal.fire({
      title: 'ต้องการลบผู้ใช้หรือไม่',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes Delete!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        axios.delete(api + "user/" + userid)
          .then(res => {
            // console.log(res);
            loadData();
          })
        Swal.fire(
          'Deleted!',
          'You clicked the button!',
          'success'
        )
      }
    })
  }

  const handleSearch = async (e) => {
    const prop = e.target.value;
    // console.log(prop);
    setQuery(prop);
  };


  const roles = [
    { value: "Admin", label: 'Admin' },
    { value: "Employee", label: 'Employee' },
    { value: "User", label: 'User' }
  ]

  return (
    <Fragment>
      <section>
        <div className="stats shadow flex-center">
          <div className="stat place-items-center">
            <div className="stat-title">จำนวนผู้ใช้ทั้งหมด</div>
            <div className="stat-value">{item.length}</div>
            <div className="stat-desc">วันที่อ้างอิง: {currentTime.toLocaleDateString()}</div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">จำนวนผู้ใช้ที่ถูกแบน</div>
            <div className="stat-value text-secondary">{banned}</div>
            <div className="stat-desc text-secondary">คน</div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">พนักงาน</div>
            <div className="stat-value">{employeeCount}</div>
            <div className="stat-desc">จำนวนพนักงานที่ลงทะเบียน</div>
          </div>
        </div>
        <div className='grid grid-cols-2 gap-2 mt-6'>
          <div className='flex space-x-2'>
            <h2 className="text-2xl mr-6 lg:font-bold tracking-tight dark:text-white xs:text-md xs:font-medium">จัดการผู้ใช้</h2>
            <ExportPdf
              name={"ผู้ใช้ในระบบ"}
              headers={["ไอดีผู้ใช้", "ชื่อผู้ใช้", "ชื่อเล่น", "อีเมล์", "บทบาท", "วันที่สมัคร"]}
              data={item.map(({ userid, username, nickname, email, roleid, createddate }) => {
                return [userid, username, nickname, email, roleid, createddate]
              })}
            />
            <ExportExel
              name={"ผู้ใช้ในระบบ"}
              data={item}
            />
          </div>
          <form className="flex items-center">
            <label htmlFor="simple-search" className="sr-only">ค้นหารายการ</label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
              </div>
              <input type="text" id="simple-search" onChange={handleSearch} value={query} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ค้นหาผู้ใช้" />
            </div>
            <button type="submit" onClick={() => setQuery("")} className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <label>รีเฟรช</label>
            </button>
          </form>
        </div>
        <div className='mt-2 relative overflow-x-auto'>
          <table className="table col-3 table-hover mt-2">
            <thead>
              <tr className='bg-gray-800 text-white border-1'>
                <th scope="col">ลำดับ</th>
                <th scope="col">ชื่อผู้ใช้</th>
                <th scope="col">ชื่อเล่น</th>
                <th scope="col">บทบาท</th>
                <th scope="col">สถานะ</th>
                <th scope="col">วันที่สมัคร</th>
                <th scope="col">เพิ่มโดย</th>
                <th scope="col">จัดการ
                  <button>
                    <Link
                      href={'/register'}
                      className="ml-4 btn-sm btn-success rounded-sm"
                    >
                      + เพิ่มสมาชิก
                    </Link>
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {item.map((res, index) => {
                const isMatch = res.username.toLowerCase().includes(query.toLowerCase()) ||
                  res.nickname.toLowerCase().includes(query.toLowerCase()) ||
                  res.roleid.toLowerCase().includes(query.toLowerCase())
                // กรองเฉพาะรายการที่ตรงกับการค้นหา
                if (!isMatch) {
                  return null;
                }
                return (
                  <tr key={index} className='dark:text-white whitespace-nowrap bg-slate-300/30 hover:bg-violet-100'>
                    <th scope="row">{index + 1}</th>
                    <td>{res.username}</td>
                    <td>{res.nickname}</td>
                    <td>
                      <select className="form-select text-warning bg-gray-800 rounded-xl"
                        value={res.roleid}
                        key={index}
                        onChange={(e) => handleChangesRole(e, res.userid)}
                      >
                        {roles.map((role, index) =>

                          <option key={index} value={role.value}>{role.label}</option>
                        )}
                      </select>
                    </td>
                    <td>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox" value={res.status}
                          className="sr-only peer" checked={res.status}
                          onChange={(e) => handleChangesStatus(e, res.userid)}

                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
                      </label>
                    </td>
                    <td>
                      {moment(res.createddate).locale('th').format('lll' + ' น.')}
                    </td>
                    <td>
                      {res.createdby}
                    </td>
                    <td>

                      <button>
                        <a href={'/profile/' + res.userid}>
                          <FiEdit className="ml-4 text-yellow-400"></FiEdit>
                        </a>
                      </button>
                      {/* <a href={'/detail/' + res.userid}>
                  </a> */}
                      <button
                        onClick={() => { setUser(res), setShowModal(true)}}

                      >
                        <FaSearch className="ml-4 text-sky-600"></FaSearch>
                      </button>
                      <button onClick={() => handleDelete(res.userid)}>
                        <FaTrashAlt className="ml-4 text-danger"></FaTrashAlt>
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
      <UserModal isOpen={showModal} onClose={() => setShowModal(false)} user={user} userid={user.userid} />
    </Fragment>
  )
}

export default manage