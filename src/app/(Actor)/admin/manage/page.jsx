"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import moment from 'moment';
import 'moment/min/locales';
import Swal from 'sweetalert2';
import { FaTrashAlt } from 'react-icons/fa';






const manage = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState([])
  const [query, setQuery] = useState("");
  const api = process.env.API_ENDPOINT;

  useEffect(() => {
    loadData()
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
    <section>
      <div className='grid grid-cols-2 gap-2 mt-6'>
        <h2 className="text-2xl lg:font-bold tracking-tight dark:text-white xs:text-md xs:font-medium">Manage User</h2>
        <form className="flex items-center">
          <label htmlFor="simple-search" className="sr-only">ค้นหารายการ</label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
            </div>
            <input type="text" id="simple-search" onChange={handleSearch} value={query} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ค้นหาผู้ใช้" required />
          </div>
          <button type="submit" onClick={loadData} className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <label>รีเฟรช</label>
          </button>
        </form>
      </div>
      <div className='mt-2 relative overflow-x-auto'>
        <table className="table col-3 table-hover mt-2">
          <thead>
            <tr className='bg-gray-800 text-white border-1'>
              <th scope="col">No</th>
              <th scope="col">Username</th>
              <th scope="col">ชื่อเล่น</th>
              <th scope="col">Role</th>
              <th scope="col">สถานะ</th>
              <th scope="col">วันที่สมัคร</th>
              <th scope="col">เพิ่มโดย</th>
              <th scope="col">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {item.map((res, index) => (
              res.username.toLowerCase().includes(query.toLowerCase()) &&
              <tr key={index} className='dark:text-white whitespace-nowrap bg-slate-300/30 hover:bg-violet-100'>
                <th scope="row">{index + 1}</th>
                <td>{res.username}</td>
                <td>{res.nickname}</td>
                <td>
                  <select className="form-select text-warning bg-gray-800 rounded-md"
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
                  <button onClick={() => handleDelete(res.userid)}>
                    <FaTrashAlt className="text-danger"></FaTrashAlt>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default manage