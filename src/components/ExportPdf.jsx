import React from 'react';
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Font } from './Sarabun-Regular-normal';
import { BsFillFileEarmarkPdfFill } from 'react-icons/bs';

export default function ExportPdf({ headers, data, name }) {
  const generatePDF = () => {
    const doc = new jsPDF('l', 'pt');
    let width = doc.internal.pageSize.getWidth();
    let hight = doc.internal.pageSize.getHeight();
    doc.addFileToVFS("MyFont.ttf", Font);
    doc.addFont("MyFont.ttf", "MyFont", "normal");
    doc.setFont("MyFont");

    // กำหนดข้อความ "ตารางรายงาน" และ "ขายบัตรคอนเสิร์ต..."
    doc.text("ตารางรายงาน " + name, width / 2, hight / 15, { align: 'center' });
    doc.text("ขายบัตรคอนเสิร์ตหมอลำออนไลน์ชำระเงินผ่าน QR-Code", width / 2, hight / 10, { align: 'center' });

    // กำหนดข้อมูลราคารวม
    const totalRow = ['รวม', '', '', '', '', ''];
    let totalPrice = 0;
    data.forEach(row => {
      const price = parseFloat(row[5]); // สมมติว่าราคาอยู่ในคอลัมน์ที่ 6
      if (!isNaN(price)) {
        totalPrice += price;
      }
    });
    totalRow[6] = totalPrice.toFixed(2);

    // กำหนดตำแหน่งข้อความ "ยอดรวม"
    const totalText = "ยอดรวม " + name + " " + totalRow[6] + " บาท";
    const totalTextHeight = hight / 5;

    // สร้างแถวราคารวมก่อนการสร้างตาราง
    const dataWithTotal = [...data, totalRow];

    // เพิ่มตารางลงในเอกสาร PDF
    doc.autoTable({
      head: [headers],
      body: dataWithTotal,
      startY: totalTextHeight + 5, // กำหนดตำแหน่งเริ่มต้นของตาราง
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

    doc.text(totalText, width / 2, totalTextHeight, { align: 'center' }); // แสดงข้อความ "ยอดรวม"

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
