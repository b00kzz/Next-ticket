'use client';
import React from 'react';
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Font } from './Sarabun-Regular-normal';
import { BsFillFileEarmarkPdfFill } from 'react-icons/bs';

export default function ExportPdf({ headers, data, name }) {
  // console.log("🚀 ~ file: ExportPdf.jsx:9 ~ BtnPdf ~ headers:", headers)
  const generatePDF = () => {
    const doc = new jsPDF('l', 'pt');
    let width = doc.internal.pageSize.getWidth();
    let hight = doc.internal.pageSize.getHeight();
    // add the font to jsPDF
    doc.addFileToVFS("MyFont.ttf", Font);
    doc.addFont("MyFont.ttf", "MyFont", "normal");
    doc.setFont("MyFont");
    doc.text("ตารางรายงาน" + name, width / 2, hight / 15, { align: 'center' });
    doc.text("ขายบัตรคอนเสิร์ตหมอลำออนไลน์ชำระเงินผ่าน QR-Code", width / 2, hight / 10, { align: 'center' });


    // เพิ่มตารางลงในเอกสาร PDF
    doc.autoTable({
      head: [headers],
      body: data,
      startY: 65, // ตำแหน่งเริ่มต้นของตาราง
      styles: {
        font: "MyFont",
        fontSize: 8,
        lineWidth: 1,
        cellWidth: 'auto',
        collumnWidth: 'auto',
        halign: 'center',
        valign: 'middle',
      },
    });

    // บันทึกเอกสาร PDF
    doc.save(name + '.pdf');
  };

  return (
    <div>
      <button className='red_btn flex-center' type='button' onClick={generatePDF}>
        สร้าง PDF <BsFillFileEarmarkPdfFill size={18} />
      </button>
    </div>
  );
}
