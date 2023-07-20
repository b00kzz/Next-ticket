"use client"
import { data } from 'autoprefixer';
import React from 'react'
import * as XLSX from 'xlsx';
import { BsFiletypeXlsx } from 'react-icons/bs';


const ExportExel = ({ data, name }) => {

    const handleExport = () => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');
        XLSX.writeFile(workbook, name + '.xlsx');
    };
    return (
        <div>
            <button className='green_btn flex-center' onClick={handleExport} type='button'>สร้าง Excel<BsFiletypeXlsx size={18}/></button>
        </div>
    )
}

export default ExportExel