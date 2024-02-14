<template>
    <div class="His-page">
        <p>ประวัติเหตุการณ์น้ำท่วม</p>
    </div>

    <body>
        <div class="container">
            <div class="top-box">
                <p>สถานการณ์เฝ้าระวังระดับสีเหลือง</p>
                <p1>เฝ้าระวังน้ำท่วมฉับพลัน เนื่องจากกรมอุตุฯ แจ้งเตือนจะมีฝนตกหนักในช่วง 17 -19 พค 2560</p1>
            </div>
            <div class="bottom-box">
                <p>สถานการณ์วิกฤติระดับสีแดง @ อ.เวียงเชียงรุ้ง</p>
                <p1>เวลา 12:15 24 สิงหาคม 59 น STG02 สะพานบ้านเหล่า ต.ทุ่งก่อ อ.เวียงเชียงรุ้ง เกิดน้ำท่วมบริเวณม.6 และ ม.11 ต.ทุ่งก่อ ขอประชาชนในพื้นที่เสี่ยงภัยเตรียมพร้อมรับสถานการณ์น้ำท่วม และติดตามสถานการณ์ใกล้ชิด</p1>
            </div>
        </div>
    </body>
</template>

<script>
export default {
    name: 'HisPage',
}
</script>

<style scoped>
.His-page p {
    font-size: 28px;
    font-weight: bold;
    margin: 0;
    padding: 40px;
    /* เพิ่ม padding เพื่อให้ข้อความอยู่ในกรอบ */


}

body,
html {
    height: 100%;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
  display: flex;
  flex-direction: column; /* เรียงตามแนวดิ่ง */
  align-items: center; /* จัดกล่องให้อยู่ตรงกลางของหน้าจอ */
}

.top-box, .bottom-box {
  width: 698px;
  height: 177px;
  background-color: #FFFFFF;
  border: 1px solid #2388FF;
  border-radius: 8px;
  padding: 20px;
  margin: 20px;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.5); /* เพิ่มเงา */
}


.top-box p {
    font-size: 24px;
    color: #F6C002;

}

.top-box p1 {
    color: #000000;
    text-align: center;
    font-size: 15px;
}
.bottom-box p {
    font-size: 24px;
    color: #FF0000;
}
.bottom-box p1{
    color: #000000;
    text-align: center;
    font-size: 15px;
}
</style>