"use client"
import { FaEye } from 'react-icons/fa';
import axios from 'axios';
import moment from 'moment';
import 'moment/min/locales';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';

const payment = () => {
  const { data: session } = useSession();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState([]);
  // var [count, setCount] = useState();
  const totalSales = item.reduce((total, currentItem) => total + currentItem.ticketprice, 0);
  const [query, setQuery] = useState("");
  const api = process.env.API_ENDPOINT;
  const { userid } = useParams();
  // const currentTime = moment().format('HH:mm:ss');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    if (userid === undefined) {
      loadData()
    } else {
      loadDataByid(userid)
    }
    return () => {
      clearInterval(timer);
    };

  }, [])

  const loadData = async () => {
    const response = await axios.get(api + "payments")
      .then(res => {
        setItem(res.data)
        setCount(res.data.length)
        setIsLoaded(true)

      }).catch(err => {
        setError(err)
      })
  }

  const loadDataByid = async (userid) => {
    const response = await axios.get(api + "payments/" + userid)
      .then(res => {
        setItem(res.data)
        setCount(res.data.length)
        setIsLoaded(true)

      }).catch(err => {
        setError(err)
      })
  }

  async function handleChangesST(e, payid) {
    const paymentstatus = e.target.value;

    console.log({ paymentstatus }, payid);
    axios.put(api + "payment/" + payid, { paymentstatus })
      .then(res => {
        if (userid === undefined) {
          loadData()
        } else {
          loadDataByid(userid)
        }
      })

  }


  async function handleDelete(payid) {
    Swal.fire({
      title: 'ต้องการลบรายการ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes Delete!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        axios.delete(api + "payment/" + payid)
          .then(res => {
            if (userid === undefined) {
              loadData()
            } else {
              loadDataByid(userid)
            }
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
    setQuery(prop);
  };

  const status = [{ value: "กำลังดำเนินการ", color: "bg-info text-white" },
  { value: "กำลังตรวจสอบ", color: "bg-primary text-white" },
  { value: "ทำรายการสำเร็จ", color: "bg-success  text-white" },
  { value: "เกิดข้อผิดพลาด", color: "bg-danger text-white" },
  ]

  return (
    <>
      <div className="stats shadow flex-center">
        <div className="stat place-items-center">
          <div className="stat-title">จำนวนคำสั่งซื้อ</div>
          <div className="stat-value">{item.length}</div>
          <div className="stat-desc">เวลาอ้างอิง: {currentTime.toLocaleTimeString()}</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">ยอดรวมการขาย (ราคา)</div>
          <div className="stat-value text-secondary">{totalSales}</div>
          <div className="stat-desc text-secondary">บาท</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">เงินที่ได้</div>
          {session?.user.roleid === "Admin" &&
            <div className="stat-value">{totalSales * 7 / 100}</div>
          }
          {session?.user.roleid === "Employee" &&
            <div className="stat-value">{(totalSales) - totalSales * 7 / 100}</div>
          }
          <div className="stat-desc">รายได้จาก vat 7% จากยอดขายทั้งหมด</div>
        </div>
      </div>
      <div className='grid grid-cols-2 gap-2 mt-6'>
        <h2 className="text-2xl lg:font-bold tracking-tight dark:text-white xs:text-md xs:font-medium">Manage Payments</h2>
        <form className="flex items-center">
          <label htmlFor="simple-search" className="sr-only">ค้นหารายการ</label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
            </div>
            <input type="text" id="simple-search" onChange={handleSearch} value={query} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ค้นหาชื่อรายการ" required />
          </div>
          <button type="submit" onClick={loadData} className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <label>รีเฟรช</label>
          </button>
        </form>
      </div>
      <div className='mt-2 relative overflow-x-auto'>
        <table className="table col-3 table-hover">
          <thead>
            <tr className='bg-gray-800 text-white'>
              <th scope="col">No
              </th>
              <th scope="col">ชื่อการแสดง</th>
              <th scope="col">ราคา</th>
              <th scope="col">ผู้ซื้อ</th>
              <th scope="col">รายละเอียด</th>
              <th scope="col">วันที่ซื้อ</th>
              <th scope="col">สถานะ</th>
              <th scope="col">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {item.map((res, index) => (
              res.ticketname.toLowerCase().includes(query.toLowerCase()) &&
              <tr key={index + 1} className='dark:text-white whitespace-nowrap bg-slate-300/30 hover:bg-violet-100'>
                <th scope="row">{index + 1}</th>
                <td>{res.ticketname}</td>
                <td>{res.ticketprice}</td>
                <td>
                  {res.createdby}
                </td>
                <td>
                  {res.ticketdesc}
                </td>
                <td>
                  {moment(res.createddate).locale('th').format('lll' + ' น.')}
                </td>
                <td>
                  <select className="form-select text-warning bg-slate-800"
                    onChange={(e) => handleChangesST(e, res.payid)}
                    value={res.paymentstatus}
                    key={index}
                    readOnly
                  >
                    {status.map((st, index) => (

                      <option readOnly key={index} value={st.value}>{st.value}</option>
                    ))}
                  </select>
                </td>
                <td>
                  {session?.user.roleid === "Admin"
                    ? (<Link
                      className="col-6"
                      href={"checkslip/" + res.payid}
                    >
                      <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">ตรวจสอบ</button></Link>)
                    : (<Link
                      className="col-6"
                      href={"/employee/checkslip/" + res.payid}
                    >
                      <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">ตรวจสอบ</button></Link>)
                  }

                  <button
                    onClick={() => handleDelete(res.payid)}
                    type="button"
                    className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">ลบ</button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default payment