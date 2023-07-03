"use client"

import axios from 'axios';
import moment from 'moment';
import 'moment/min/locales';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';

const ticket = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { data: session } = useSession()
  const [item, setItem] = useState([])
  const [item1, setItem1] = useState([])
  const { userid } = useParams();
  const [query, setQuery] = useState("");
  const [count, setCount] = useState(1);
  const token = process.env.LINE_TOKEN;
  const api = process.env.API_ENDPOINT;


  useEffect(() => {
    if (userid === undefined) {
      loadData()
    } else {
      loadDataByid(userid)
    }
  }, [])

  const loadData = async () => {
    const res = await axios.get(api + 'tickets')
    setItem(res.data)
    setIsLoaded(true)
    if (userid !== undefined) {
      loadDataByid(userid)
    }
  }

  const loadDataByid = async (userid) => {
    const response = await axios.get(api + "ticketid/" + userid)
      .then(res => {
        setItem(res.data)
        setIsLoaded(true)

      }).catch(err => {
        setError(err)
        // console.log(err);
      })
  }

  async function handleChangesType(e, ticketid) {
    const tickettype = e.target.value;

    console.log({ tickettype }, ticketid);
    axios.put(api + "ticket/" + ticketid, { tickettype })
      .then(res => {
        // console.log(res);
        if (userid === undefined) {
          loadData()
        } else {
          loadDataByid(userid)
        }
      })
  }

  const handleSearch = async (e) => {
    const prop = e.target.value;
    // console.log(prop);
    setQuery(prop);
  };

  // const LineNotify = async (token, message) => {
  //   try {
  //     const res = await axios({
  //       method: "POST",
  //       url: "https://notify-api.line.me/api/notify",
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         "Authorization": `Bearer ${token}`,
  //         "Access-Control-Allow-Origin": "*",
  //         "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  //       },
  //       data: "message=" + message
  //     })
  //   } catch (error) {
  //   }
  // }

  async function handleChangesStatus(e, ticketid) {
    const status = e.target.checked;

    // console.log({ status }, userid);
    axios.put(api + "ticket/status/" + ticketid, { status })
      .then(res => {
        // console.log(res);
        if (userid === undefined) {
          loadData()
        } else {
          loadDataByid(userid)
        }
      })
  }

  



  async function handleChangeStatus(e, ticketid) {
    const sellstatus = e.target.checked;
    // console.log({ status }, userid);
    axios.put(api + "ticket/status/sell/" + ticketid, { sellstatus })
      .then(res => {
        // console.log(res);
        if (userid === undefined) {
          // LineNotify(token, message)
          loadData()
        } else {
          // LineNotify(token, message)
          loadDataByid(userid)
        }
      })
  }

  async function handleDelete(ticketid) {
    Swal.fire({
      title: 'ต้องการลบรายการ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes Delete!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        axios.delete(api + "ticket/" + ticketid)
          .then(res => {
            // console.log(res);
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


  const type = [{ value: "หมอลำ" }, { value: "นักร้องลูกทุ่ง" }, { value: "นักร้องเดี่ยว" }, { value: "ออนไลน์" }, { value: "ทั่วไป" }]

  return (
    <>
      <div className='grid grid-cols-2 gap-2 mt-6'>
        <h2 className="text-2xl lg:font-bold tracking-tight dark:text-white xs:text-md xs:font-medium">Manage Product</h2>
        <form className="flex items-center">
          <label htmlFor="simple-search" className="sr-only">ค้นหารายการ</label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
            </div>
            <input type="text" id="simple-search" onChange={handleSearch} value={query} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ค้นหารายการ" required />
          </div>
          <button type="submit" onClick={loadData} className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <label>รีเฟรช</label>
          </button>
        </form>
      </div>
      <div className='mt-2 relative overflow-x-auto'>
        <Link
          href={session?.user.roleid === 'Admin' ? 'addticket' : '/' && session?.user.roleid === 'Employee' ? 'addticket' : '/'}
          className="col-4 btn btn-success w-26 h-7 col-12 rounded-full"
        >
          เพิ่มรายการ
        </Link>
        <table className=" mt-2 table col-3 table-hover">
          <thead>
            <tr className='bg-gray-800 text-white'>
              <th scope="col">No
              </th>
              <th scope="col">ชื่อการแสดง</th>
              <th scope="col">ราคา</th>
              <th scope="col">หมวดหมู่</th>
              <th scope="col">รายละเอียด</th>
              <th scope="col">วันที่</th>
              <th scope="col">ยอดขาย</th>
              <th scope="col">โดย</th>
              <th scope="col">แสดง</th>
              <th scope="col">ขาย</th>
              <th scope="col">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {item.map((res, index) => (
              res.ticketname.toLowerCase().includes(query.toLowerCase()) &&
              <tr key={index} className='dark:text-white whitespace-nowrap bg-slate-300/30 hover:bg-violet-100'>
                <th scope="row">{index + 1}</th>
                <td>{res.ticketname}</td>
                <td>{res.ticketprice}</td>
                <td>
                  <select className="form-select text-warning bg-slate-800"
                    onChange={(e) => handleChangesType(e, res.ticketid)}
                    value={res.tickettype}
                    key={index}
                    readOnly
                  >
                    {type.map((type, index) =>

                      <option readOnly key={index} value={type.value}>{type.value}</option>
                    )}
                  </select>
                </td>
                <td>
                  {res.ticketdesc}
                </td>
                <td>
                  {moment(res.createddate).locale('th').format('lll' + ' น.')}
                </td>
                <td>
                  {res.count}
                </td>
                <td>
                  {res.createdby}
                </td>
                <td>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox" value={res.status}
                      className="sr-only peer" checked={res.status}
                      onChange={(e) => handleChangesStatus(e, res.ticketid)}

                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
                  </label>
                </td>
                <td>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox" value={res.sellstatus}
                      className="sr-only peer" checked={res.sellstatus}
                      onChange={(e) => handleChangeStatus(e, res.ticketid)}
                      // onClick={(e) => setMessage(`${res.ticketname} ได้ทำการเปิดขายแล้วในขณะนี้สามารถทำการสั่งซื้อได้แล้ววันนี้`)}
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
                  </label>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(res.ticketid)}
                    type="button"
                    className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">ลบ</button>


                  {/* <Link
                    className="col-6"
                    href={"Employee/editticket/" + res.ticketid}
                    >
                    <i className="bi bi-pencil-square text-warning"></i>
                  </Link> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default ticket