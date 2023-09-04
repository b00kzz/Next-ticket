import HomePage from "@/components/Homepage";

export default function Home() {
  //logic
  return (
    <>
      <section className="home_section">
        <h1  className="head_text text-center">
          ซื้อบัตรเข้าชมคอนเสิร์ตออนไลน์ง่ายๆ
          <br />
          <span className="colorChange bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">Morlam Ticket</span>
        </h1>
        </section>
        <HomePage/>
    </>
  );
}
