<template>
    <div class="Flood-page">
        <p>การบริหารจัดการน้ำท่วม</p>
    </div>

    <body>
        <div class="container">
            <div class="top-box">
                <p>มาตรการบริหารจัดการภัยน้ำท่วม</p>
                <p1>
                    <ol>
                        <li>การลดอัตราการไหลของน้ำโดยการใช้วิธีต่างๆเพื่อชะลอการไหลของน้ำ</li>
                        <li>การควบคุมปริมาณการไหลโดยกักน้ำไว้ในอ่างเก็บน้ำหรือแหล่งเก็บกักน้ำเพื่อควบคุมปริมาณน้ำไม่ให้ไหลมากเกินไปโดยเฉพาะในช่วงน้ำท่วม</li>
                        <li>การจำกัดเส้นทางการไหลของลำน้ำโดยการสร้างพนังกั้นน้ำหรือคลอง</li>
                        <li>การปรับปรุงสภาพลำน้ำและสภาพการไหล เช่น การสร้างทางระบายน้ำอ้อมตัวเมืองเพื่อลดระดับความสูงของน้ำในลำน้ำสายหลัก</li>
                        <li>การระบายน้ำออกจากลำน้ำที่มีสภาพวิกฤต เช่น การใช้เครื่องสูบน้ำ</li>
                    </ol>
                </p1>
            </div>
        </div>
    </body>
</template>

<script>
export default {
    name: 'FloodPage',
}
</script>

<style scoped>
.Flood-page p {
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

.top-box {
    width: 900px;
    height: 300px;
    background-color: #FFFFFF;
    border: 1px solid #2388FF;
    border-radius: 8px;
    padding: 20px;
    margin: 10px;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.5); /* เพิ่มเงา */
}

.top-box p {
    font-size: 24px;
    color: #000000;
}

.top-box p1 {
    text-align: left;
    color: #6D758F;
    font-size: 15px;
    margin-left: 0;
}
</style>