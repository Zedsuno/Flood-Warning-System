<template>
    <div class="water-resource">
        <div class="grid-container">
            <nav class="breadcrumb" role="navigation" aria-labelledby="system-breadcrumb">
                <h2 id="system-breadcrumb" class="visually-hidden">Breadcrumb</h2>
                <ol>
                    <li>
                        <a href="/" previewlistener="true">หน้าแรก</a>
                    </li>
                    <li>
                        แผนที่น้ำ
                    </li>
                </ol>
            </nav>
        </div>
    </div>
    <div class="top-box">
        <p>
            แผนที่น้ำ
        </p>
    </div>
    <div class="container">
        <!--รูปที่จะใส่เป็นพื้นหลัง -->
        <img src="../assets/Picture/WaterResource.png" width="100%">

        <!--สถานีน้ำที่ STK05-->
        <div id="STK05" class="block" v-on:click="toggleShow($event)">
            <p>STK05</p>
            <p>ศรีดอนมูล</p>
            <p>N/A ม.</p>
            <p>N/A ม.ทรก</p>
        </div>
        <div id="STK05S" class="spec" v-if="show">
            <div v-for="data in filteredData" :key="data.id">
                <div v-if="'STK05' === searchData">
                    <p>{{ data.id }}</p>
                    <p>{{ data.station_name }}</p>
                    <p>{{ data.water_lavel }} ม.</p>
                    <p>{{ data.mean_sea_level }} ม.ทรก</p>
                </div>
            </div>
        </div>


        <!--สถานีน้ำที่ STK04-->
        <div id="STK04" class="block" v-on:click="toggleShow($event)">
            <p>STK04</p>
            <p>บ้านด้าย</p>
            <p>N/A ม.</p>
            <p>N/A ม.ทรก</p>
        </div>
        <div id="STK04S" class="spec" v-if="show">
            <div v-for="data in filteredData" :key="data.id">
                <div v-if="'STK04' === searchData">
                    <p>{{ data.id }}</p>
                    <p>{{ data.station_name }}</p>
                    <p>{{ data.water_lavel }} ม.</p>
                    <p>{{ data.mean_sea_level }} ม.ทรก</p>
                </div>
            </div>
        </div>

        <!--สถานีน้ำที่ STK03-->
        <div id="STK03" class="block" v-on:click="toggleShow($event)">
            <p>STK03</p>
            <p>บ้านฝั่งหมิน</p>
            <p>N/A ม.</p>
            <p>N/A ม.ทรก</p>
        </div>
        <div id="STK03S" class="spec" v-if="show">
            <div v-for="data in filteredData" :key="data.id">
                <div v-if="'STK03' === searchData">
                    <p>{{ data.id }}</p>
                    <p>{{ data.station_name }}</p>
                    <p>{{ data.water_lavel }} ม.</p>
                    <p>{{ data.mean_sea_level }} ม.ทรก</p>
                </div>
            </div>
        </div>

        <!--สถานีน้ำที่ STK02-->
        <div id="STK02" class="block" v-on:click="toggleShow($event)">
            <p>STK02</p>
            <p>ศรีค้ำ</p>
            <p>N/A ม.</p>
            <p>N/A ม.ทรก</p>
        </div>
        <div id="STK02S" class="spec" v-if="show">
            <div v-for="data in filteredData" :key="data.id">
                <div v-if="'STK02' === searchData">
                    <p>{{ data.id }}</p>
                    <p>{{ data.station_name }}</p>
                    <p>{{ data.water_lavel }} ม.</p>
                    <p>{{ data.mean_sea_level }} ม.ทรก</p>
                </div>
            </div>
        </div>

        <!--สถานีน้ำที่ STK01-->
        <div id="STK01" class="block" v-on:click="toggleShow($event)">
            <p>STK01</p>
            <p>บ้านผาม้า</p>
            <p>N/A ม.</p>
            <p>N/A ม.ทรก</p>
        </div>
        <div id="STK01S" class="spec" v-if="show">
            <div v-for="data in filteredData" :key="data.id">
                <div v-if="'STK01' === searchData">
                    <p>{{ data.id }}</p>
                    <p>{{ data.station_name }}</p>
                    <p>{{ data.water_lavel }} ม.</p>
                    <p>{{ data.mean_sea_level }} ม.ทรก</p>
                </div>
            </div>
        </div>

        <!--สถานีน้ำที่ STK06-->
        <div id="STK06" class="block" v-on:click="toggleShow($event)">
            <p>STK06</p>
            <p>ลานทอง</p>
            <p>N/A ม.</p>
            <p>N/A ม.ทรก</p>
        </div>
        <div id="STK06S" class="spec" v-if="show">
            <div v-for="data in filteredData" :key="data.id">
                <div v-if="'STK06' === searchData">
                    <p>{{ data.id }}</p>
                    <p>{{ data.station_name }}</p>
                    <p>{{ data.water_lavel }} ม.</p>
                    <p>{{ data.mean_sea_level }} ม.ทรก</p>
                </div>
            </div>
        </div>

        <!--สถานีน้ำที่ STK07-->
        <div id="STK07" class="block" v-on:click="toggleShow($event)">
            <p>STK07</p>
            <p>บ้านป่าตึง</p>
            <p>N/A ม.</p>
            <p>N/A ม.ทรก</p>
        </div>
        <div id="STK07S" class="spec" v-if="show">
            <div v-for="data in filteredData" :key="data.id">
                <div v-if="'STK07' === searchData">
                    <p>{{ data.id }}</p>
                    <p>{{ data.station_name }}</p>
                    <p>{{ data.water_lavel }} ม.</p>
                    <p>{{ data.mean_sea_level }} ม.ทรก</p>
                </div>
            </div>
        </div>

        <!--สถานีน้ำที่ STG04-->
        <div id="STG04" class="block" v-on:click="toggleShow($event)">
            <p>STG04</p>
            <p>แม่ข้าวต้ม</p>
            <p>N/A ม.</p>
            <p>N/A ม.ทรก</p>
        </div>
        <div id="STG04S" class="spec" v-if="show">
            <div v-for="data in filteredData" :key="data.id">
                <div v-if="'STG04' === searchData">
                    <p>{{ data.id }}</p>
                    <p>{{ data.station_name }}</p>
                    <p>{{ data.water_lavel }} ม.</p>
                    <p>{{ data.mean_sea_level }} ม.ทรก</p>
                </div>
            </div>
        </div>

        <!--สถานีน้ำที่ STG05-->
        <div id="STG05" class="block" v-on:click="toggleShow($event)">
            <p>STG05</p>
            <p>นางแลใน</p>
            <p>N/A ม.</p>
            <p>N/A ม.ทรก</p>
        </div>
        <div id="STG05S" class="spec" v-if="show">
            <div v-for="data in filteredData" :key="data.id">
                <div v-if="'STG05' === searchData">
                    <p>{{ data.id }}</p>
                    <p>{{ data.station_name }}</p>
                    <p>{{ data.water_lavel }} ม.</p>
                    <p>{{ data.mean_sea_level }} ม.ทรก</p>
                </div>
            </div>
        </div>

        <!--สถานีน้ำที่ STG06-->
        <div id="STG06" class="block" v-on:click="toggleShow($event)">
            <p>STG06</p>
            <p>โป่งพระบาท</p>
            <p>N/A ม.</p>
            <p>N/A ม.ทรก</p>
        </div>
        <div id="STG06S" class="spec" v-if="show">
            <div v-for="data in filteredData" :key="data.id">
                <div v-if="'STG06' === searchData">
                    <p>{{ data.id }}</p>
                    <p>{{ data.station_name }}</p>
                    <p>{{ data.water_lavel }} ม.</p>
                    <p>{{ data.mean_sea_level }} ม.ทรก</p>
                </div>
            </div>
        </div>

        <!--สถานีน้ำที่ STK12-->
        <div id="STK12" class="block" v-on:click="toggleShow($event)">
            <p>STK12</p>
            <p>หนองป่าก่อ</p>
            <p>N/A ม.</p>
            <p>N/A ม.ทรก</p>
        </div>
        <div id="STK12S" class="spec" v-if="show">
            <div v-for="data in filteredData" :key="data.id">
                <div v-if="'STK12' === searchData">
                    <p>{{ data.id }}</p>
                    <p>{{ data.station_name }}</p>
                    <p>{{ data.water_lavel }} ม.</p>
                    <p>{{ data.mean_sea_level }} ม.ทรก</p>
                </div>
            </div>
        </div>

        <!--สถานีน้ำที่ STK11-->
        <div id="STK11" class="block" v-on:click="toggleShow($event)">
            <p>STK11</p>
            <p>บ้านห้วยไร่</p>
            <p>N/A ม.</p>
            <p>N/A ม.ทรก</p>
        </div>
        <div id="STK11S" class="spec" v-if="show">
            <div v-for="data in filteredData" :key="data.id">
                <div v-if="'STK11' === searchData">
                    <p>{{ data.id }}</p>
                    <p>{{ data.station_name }}</p>
                    <p>{{ data.water_lavel }} ม.</p>
                    <p>{{ data.mean_sea_level }} ม.ทรก</p>
                </div>
            </div>
        </div>

        <!--สถานีน้ำที่ STK10-->
        <div id="STK10" class="block" v-on:click="toggleShow($event)">
            <p>STK10</p>
            <p>บ้านแม่บง</p>
            <p>N/A ม.</p>
            <p>N/A ม.ทรก</p>
        </div>
        <div id="STK10S" class="spec" v-if="show">
            <div v-for="data in filteredData" :key="data.id">
                <div v-if="'STK10' === searchData">
                    <p>{{ data.id }}</p>
                    <p>{{ data.station_name }}</p>
                    <p>{{ data.water_lavel }} ม.</p>
                    <p>{{ data.mean_sea_level }} ม.ทรก</p>
                </div>
            </div>
        </div>

        <!--สถานีน้ำที่ STG03-->
        <div id="STG03" class="block" v-on:click="toggleShow($event)">
            <p>STG03</p>
            <p>บ้านแม่เผื่อ</p>
            <p>N/A ม.</p>
            <p>N/A ม.ทรก</p>
        </div>
        <div id="STG03S" class="spec" v-if="show">
            <div v-for="data in filteredData" :key="data.id">
                <div v-if="'STG03' === searchData">
                    <p>{{ data.id }}</p>
                    <p>{{ data.station_name }}</p>
                    <p>{{ data.water_lavel }} ม.</p>
                    <p>{{ data.mean_sea_level }} ม.ทรก</p>
                </div>
            </div>
        </div>

        <!--สถานีน้ำที่ STG02-->
        <div id="STG02" class="block" v-on:click="toggleShow($event)">
            <p>STG02</p>
            <p>บ้านเหล่า</p>
            <p>N/A ม.</p>
            <p>N/A ม.ทรก</p>
        </div>
        <div id="STG02S" class="spec" v-if="show">
            <div v-for="data in filteredData" :key="data.id">
                <div v-if="'STG02' === searchData">
                    <p>{{ data.id }}</p>
                    <p>{{ data.station_name }}</p>
                    <p>{{ data.water_lavel }} ม.</p>
                    <p>{{ data.mean_sea_level }} ม.ทรก</p>
                </div>
            </div>
        </div>

        <!--สถานีน้ำที่ STG01-->
        <div id="STG01" class="block" v-on:click="toggleShow($event)">
            <p>STG01</p>
            <p>ห้วยหมากเอียก</p>
            <p>N/A ม.</p>
            <p>N/A ม.ทรก</p>
        </div>
        <div id="STG01S" class="spec" v-if="show">
            <div v-for="data in filteredData" :key="data.id">
                <div v-if="'STG01' === searchData">
                    <p>{{ data.id }}</p>
                    <p>{{ data.station_name }}</p>
                    <p>{{ data.water_lavel }} ม.</p>
                    <p>{{ data.mean_sea_level }} ม.ทรก</p>
                </div>
            </div>
        </div>

        <!--สถานีน้ำที่ STK09-->
        <div id="STK09" class="block" v-on:click="toggleShow($event)">
            <p>STK09</p>
            <p>วัดบ้านหลวง</p>
            <p>N/A ม.</p>
            <p>N/A ม.ทรก</p>
        </div>
        <div id="STK09S" class="spec" v-if="show">
            <div v-for="data in filteredData" :key="data.id">
                <div v-if="'STK09' === searchData">
                    <p>{{ data.id }}</p>
                    <p>{{ data.station_name }}</p>
                    <p>{{ data.water_lavel }} ม.</p>
                    <p>{{ data.mean_sea_level }} ม.ทรก</p>
                </div>
            </div>
        </div>

        <!--สถานีน้ำที่ STK08-->
        <div id="STK08" class="block" v-on:click="toggleShow($event)">
            <p>STK08</p>
            <p>เวียงเชียงของ</p>
            <p>N/A ม.</p>
            <p>N/A ม.ทรก</p>
        </div>
        <div id="STK08S" class="spec" v-if="show">
            <div v-for="data in filteredData" :key="data.id">
                <div v-if="'STK08' === searchData">
                    <p>{{ data.id }}</p>
                    <p>{{ data.station_name }}</p>
                    <p>{{ data.water_lavel }} ม.</p>
                    <p>{{ data.mean_sea_level }} ม.ทรก</p>
                </div>
            </div>
        </div>

        <!--สถานีน้ำที่ STK13-->
        <div id="STK13" class="block" v-on:click="toggleShow($event)">
            <p>STK13</p>
            <p>บ้านผาแล</p>
            <p>N/A ม.</p>
            <p>N/A ม.ทรก</p>
        </div>
        <div id="STK13S" class="spec" v-if="show">
            <div v-for="data in filteredData" :key="data.id">
                <div v-if="'STK13' === searchData">
                    <p>{{ data.id }}</p>
                    <p>{{ data.station_name }}</p>
                    <p>{{ data.water_lavel }} ม.</p>
                    <p>{{ data.mean_sea_level }} ม.ทรก</p>
                </div>
            </div>
        </div>

        <!--สถานีน้ำที่ STK14-->
        <div id="STK14" class="block" v-on:click="toggleShow($event)">
            <p>STK14</p>
            <p>บ้านท่าข้าม</p>
            <p>N/A ม.</p>
            <p>N/A ม.ทรก</p>
        </div>
        <div id="STK14S" class="spec" v-if="show">
            <div v-for="data in filteredData" :key="data.id">
                <div v-if="'STK14' === searchData">
                    <p>{{ data.id }}</p>
                    <p>{{ data.station_name }}</p>
                    <p>{{ data.water_lavel }} ม.</p>
                    <p>{{ data.mean_sea_level }} ม.ทรก</p>
                </div>
            </div>
        </div>

        <!--สถานีน้ำที่ STK15-->
        <div id="STK15" class="block" v-on:click="toggleShow($event)">
            <p>STK15</p>
            <p>บ้านหล่ายงาว</p>
            <p>N/A ม.</p>
            <p>N/A ม.ทรก</p>
        </div>
        <div id="STK15S" class="spec" v-if="show">
            <div v-for="data in filteredData" :key="data.id">
                <div v-if="'STK15' === searchData">
                    <p>{{ data.id }}</p>
                    <p>{{ data.station_name }}</p>
                    <p>{{ data.water_lavel }} ม.</p>
                    <p>{{ data.mean_sea_level }} ม.ทรก</p>
                </div>
            </div>
        </div>

        <!--สถานีน้ำที่ STI06-->
        <div id="STI06" class="block" v-on:click="toggleShow($event)">
            <p>STI06</p>
            <p>แม่น้ำอิง</p>
            <p>N/A ม.</p>
            <p>N/A ม.ทรก</p>
        </div>
        <div id="STI06S" class="spec" v-if="show">
            <div v-for="data in filteredData" :key="data.id">
                <div v-if="'STI06' === searchData">
                    <p>{{ data.id }}</p>
                    <p>{{ data.station_name }}</p>
                    <p>{{ data.water_lavel }} ม.</p>
                    <p>{{ data.mean_sea_level }} ม.ทรก</p>
                </div>
            </div>
        </div>

        <!--สถานีน้ำที่ STI03-->
        <div id="STI03" class="block" v-on:click="toggleShow($event)">
            <p>STI03</p>
            <p>บ้านสันเจริญ</p>
            <p>N/A ม.</p>
            <p>N/A ม.ทรก</p>
        </div>
        <div id="STI03S" class="spec" v-if="show">
            <div v-for="data in filteredData" :key="data.id">
                <div v-if="'STI03' === searchData">
                    <p>{{ data.id }}</p>
                    <p>{{ data.station_name }}</p>
                    <p>{{ data.water_lavel }} ม.</p>
                    <p>{{ data.mean_sea_level }} ม.ทรก</p>
                </div>
            </div>
        </div>

        <!--สถานีน้ำที่ STI04-->
        <div id="STI04" class="block" v-on:click="toggleShow($event)">
            <p>STI04</p>
            <p>บ้านสบเปา</p>
            <p>N/A ม.</p>
            <p>N/A ม.ทรก</p>
        </div>
        <div id="STI04S" class="spec" v-if="show">
            <div v-for="data in filteredData" :key="data.id">
                <div v-if="'STI04' === searchData">
                    <p>{{ data.id }}</p>
                    <p>{{ data.station_name }}</p>
                    <p>{{ data.water_lavel }} ม.</p>
                    <p>{{ data.mean_sea_level }} ม.ทรก</p>
                </div>
            </div>
        </div>

        <!--สถานีน้ำที่ STI05-->
        <div id="STI05" class="block" v-on:click="toggleShow($event)">
            <p>STI05</p>
            <p>บ้านทุ่งจ้าว</p>
            <p>N/A ม.</p>
            <p>N/A ม.ทรก</p>
        </div>
        <div id="STI05S" class="spec" v-if="show">
            <div v-for="data in filteredData" :key="data.id">
                <div v-if="'STI05' === searchData">
                    <p>{{ data.id }}</p>
                    <p>{{ data.station_name }}</p>
                    <p>{{ data.water_lavel }} ม.</p>
                    <p>{{ data.mean_sea_level }} ม.ทรก</p>
                </div>
            </div>
        </div>

        <!--สถานีน้ำที่ STI07-->
        <div id="STI07" class="block" v-on:click="toggleShow($event)">
            <p>STI07</p>
            <p>บ้านปางคำ</p>
            <p>N/A ม.</p>
            <p>N/A ม.ทรก</p>
        </div>
        <div id="STI07S" class="spec" v-if="show">
            <div v-for="data in filteredData" :key="data.id">
                <div v-if="'STI07' === searchData">
                    <p>{{ data.id }}</p>
                    <p>{{ data.station_name }}</p>
                    <p>{{ data.water_lavel }} ม.</p>
                    <p>{{ data.mean_sea_level }} ม.ทรก</p>
                </div>
            </div>
        </div>

        <!--สถานีน้ำที่ STI08-->
        <div id="STI08" class="block" v-on:click="toggleShow($event)">
            <p>STI08</p>
            <p>บ้านเอียน</p>
            <p>N/A ม.</p>
            <p>N/A ม.ทรก</p>
        </div>
        <div id="STI08S" class="spec" v-if="show">
            <div v-for="data in filteredData" :key="data.id">
                <div v-if="'STI08' === searchData">
                    <p>{{ data.id }}</p>
                    <p>{{ data.station_name }}</p>
                    <p>{{ data.water_lavel }} ม.</p>
                    <p>{{ data.mean_sea_level }} ม.ทรก</p>
                </div>
            </div>
        </div>

        <!--สถานีน้ำที่ STI01-->
        <div id="STI01" class="block" v-on:click="toggleShow($event)">
            <p>STI01</p>
            <p>พระธาตุสามดวง</p>
            <p>N/A ม.</p>
            <p>N/A ม.ทรก</p>
        </div>
        <div id="STI01S" class="spec" v-if="show">
            <div v-for="data in filteredData" :key="data.id">
                <div v-if="'STI01' === searchData">
                    <p>{{ data.id }}</p>
                    <p>{{ data.station_name }}</p>
                    <p>{{ data.water_lavel }} ม.</p>
                    <p>{{ data.mean_sea_level }} ม.ทรก</p>
                </div>
            </div>
        </div>

        <!--สถานีน้ำที่ STI02-->
        <div id="STI02" class="block" v-on:click="toggleShow($event)">
            <p>STI02</p>
            <p>เทศบาลเมืองพาน</p>
            <p>N/A ม.</p>
            <p>N/A ม.ทรก</p>
        </div>
        <div id="STI02S" class="spec" v-if="show">
            <div v-for="data in filteredData" :key="data.id">
                <div v-if="'STI02' === searchData">
                    <p>{{ data.id }}</p>
                    <p>{{ data.station_name }}</p>
                    <p>{{ data.water_lavel }} ม.</p>
                    <p>{{ data.mean_sea_level }} ม.ทรก</p>
                </div>
            </div>
        </div>


    </div>

</template>

<script>


// Import your components


export default {
    name: 'WaterResource',
    props: {
        riverData: {
            type: Array,
            default: () => [{
                id: "STK05",
                station_name: "สถานีศรีดอนมูล",
                water_lavel: "10",
                mean_sea_level: "500"
            }, {
                id: "STK04",
                station_name: "สถานีบ้านด้าย",
                water_lavel: "7",
                mean_sea_level: "458"
            }, {
                id: "STK03",
                station_name: "สถานีบ้านฝั่งหมิน",
                water_lavel: "5",
                mean_sea_level: "499"
            }
                , {
                id: "STK02",
                station_name: "สถานีศรีค้ำ",
                water_lavel: "1",
                mean_sea_level: "422"
            }
                , {
                id: "STK01",
                station_name: "สถานีบ้านผาม้า",
                water_lavel: "1",
                mean_sea_level: "422"
            }
                , {
                id: "STK07",
                station_name: "สถานีบ้านป่าตึง",
                water_lavel: "1",
                mean_sea_level: "422"
            }
                , {
                id: "STK06",
                station_name: "สถานีลานทอง",
                water_lavel: "1",
                mean_sea_level: "422"
            }
                , {
                id: "STG04",
                station_name: "สถานีแม่ข้าวต้ม",
                water_lavel: "1",
                mean_sea_level: "422"
            }
                , {
                id: "STG05",
                station_name: "สถานีนางแลใน",
                water_lavel: "1",
                mean_sea_level: "422"
            }
                , {
                id: "STG06",
                station_name: "สถานีโป่งพระบาท",
                water_lavel: "1",
                mean_sea_level: "422"
            }
                , {
                id: "STG03",
                station_name: "สถานีบ้านแม่เผื่อ",
                water_lavel: "1",
                mean_sea_level: "422"
            }
                , {
                id: "STG02",
                station_name: "สถานีบ้านเหล่า",
                water_lavel: "1",
                mean_sea_level: "422"
            }
                , {
                id: "STG01",
                station_name: "สถานีห้วยหมากเอียก",
                water_lavel: "1",
                mean_sea_level: "422"
            }
                , {
                id: "STK12",
                station_name: "สถานีหนองป่าก่อ",
                water_lavel: "1",
                mean_sea_level: "422"
            }
                , {
                id: "STK11",
                station_name: "สถานีบ้านห้วยไร่",
                water_lavel: "1",
                mean_sea_level: "422"
            }
                , {
                id: "STK10",
                station_name: "สถานีบ้านแม่บง",
                water_lavel: "1",
                mean_sea_level: "422"
            }
                , {
                id: "STK09",
                station_name: "สถานีวัดบ้านหลวง",
                water_lavel: "1",
                mean_sea_level: "422"
            }
                , {
                id: "STK08",
                station_name: "สถานีเวียงเชียงของ",
                water_lavel: "1",
                mean_sea_level: "422"
            }
                , {
                id: "STI06",
                station_name: "สถานีแม่น้ำอิง",
                water_lavel: "1",
                mean_sea_level: "422"
            }
                , {
                id: "STI03",
                station_name: "สถานีบ้านสันเจริญ",
                water_lavel: "1",
                mean_sea_level: "422"
            }
                , {
                id: "STI04",
                station_name: "สถานีบ้านสบเปา",
                water_lavel: "1",
                mean_sea_level: "422"
            }
                , {
                id: "STI05",
                station_name: "สถานีบ้านทุ่งจ้าว",
                water_lavel: "1",
                mean_sea_level: "422"
            }
                , {
                id: "STI01",
                station_name: "สถานีพระธาตุสามดวง",
                water_lavel: "1",
                mean_sea_level: "422"
            }
                , {
                id: "STI02",
                station_name: "สถานีเทศบาลเมืองพาน",
                water_lavel: "1",
                mean_sea_level: "422"
            }
                , {
                id: "STK13",
                station_name: "สถานีบ้านผาแล",
                water_lavel: "1",
                mean_sea_level: "422"
            }
                , {
                id: "STK14",
                station_name: "สถานีบ้านท่าข้าม",
                water_lavel: "1",
                mean_sea_level: "422"
            }
                , {
                id: "STK15",
                station_name: "สถานีบ้านหล่ายงาว",
                water_lavel: "1",
                mean_sea_level: "422"
            }
                , {
                id: "STI07",
                station_name: "สถานีบ้านปางคำ",
                water_lavel: "1",
                mean_sea_level: "422"
            }
                , {
                id: "STI08",
                station_name: "สถานีบ้านเอียน",
                water_lavel: "1",
                mean_sea_level: "422"
            }
            ]
        },

    },

    data() {
        return {
            show: false,
            searchData: ''
        };
    },
    computed: {
        filteredData() {
            console.log(this.searchData)
            if (this.searchData) {
                return this.riverData.filter(data => data.id == this.searchData);
            } else {
                return this.riverData;
            }
        }

    },
    methods: {
        toggleShow: function (event) {

            console.log(event.currentTarget.id); // returns 'foo'
            this.show = !this.show
            this.searchData = event.currentTarget.id.toString();

        }
    }


};
</script>

<style scoped>
/* You might want to add global styles or specific styles for this view */
.block {
    z-index: 1;
    position: absolute;
    border-radius: 15px;
    color: rgb(0, 0, 0);
    padding-left: 10px;
    padding-right: 10px;
    border-color: #1e9bc1;
    border-style: solid;
}

.spec {
    z-index: 2;
    position: absolute;
    border-radius: 15px;
    background-color: #60acc3;
    color: rgb(255, 255, 255);
    padding-left: 10px;
    padding-right: 10px;
    border-color: #1e9bc1;
    border-style: solid;
    border: 1px;
}

#STI02 {
    bottom: 12.8%;
    right: 28%;
}
#STI02S {
    bottom: 19%;
    right: 22%;
}

#STI01 {
    bottom: 20%;
    right: 39.4%;  
}
#STI01S {
    bottom: 26%;
    right: 33%;  
}

#STI08 {
    bottom: 37%;
    right: 7.5%; 
}
#STI08S {
    bottom: 43%;
    right: 2.8%; 
}

#STI07 {
    bottom: 47%;
    right: 7.5%;
}
#STI07S {
    bottom: 53%;
    right: 2.6%;
}

#STI05 {
    bottom: 41.2%;
    right: 20%;  
}
#STI05S {
    bottom: 47%;
    right: 15.5%;  
}

#STI04 {
    bottom: 41.2%;
    right: 26.5%;   
}
#STI04S {
    bottom: 47%;
    right: 22.4%;   
}

#STI03 {
    bottom: 55%;
    right: 34.3%;  
}
#STI03S {
    bottom: 61%;
    right: 29%;  
}

#STI06 {
    bottom: 63%;
    right: 21.1%; 
}
#STI06S {
    bottom: 69%;
    right: 17.3%; 
}

#STK15 {
    bottom: 61%;
    right: 9%;
}
#STK15S {
    bottom: 67%;
    right: 3.8%;
}

#STK14 {
    bottom: 71.5%;
    right: 9%; 
}
#STK14S {
    bottom: 77.3%;
    right: 4.3%; 
}

#STK13 {
    bottom: 82%;
    right: 9%;  
}
#STK13S {
    bottom: 88%;
    right: 5%;  
}

#STK08 {
    bottom: 75.3%;
    right: 22.1%; 
}
#STK08S {
    bottom: 81%;
    right: 17%; 
}

#STK09 {
    bottom: 75.3%;
    right: 30%; 
}
#STK09S {
    bottom: 81%;
    right: 25%; 
}

#STG01 {
    bottom: 38.3%;
    right: 43.5%;
}
#STG01S {
    bottom: 44%;
    right: 38%;
}

#STG02 {
    bottom: 29.8%;
    right: 51.1%; 
}
#STG02S {
    bottom: 35%;
    right: 47%; 
}

#STG03 {
    bottom: 38.3%;
    right: 57.2%;  
}
#STG03S {
    bottom: 44%;
    right: 53%;  
}

#STK10 {
    bottom: 70.6%;
    right: 38.5%;   
}
#STK10S {
    bottom: 76%;
    right: 34%;   
}

#STK11 {
    bottom: 67%;
    right: 46.5%;   
}
#STK11S {
    bottom: 73%;
    right: 42%;   
}

#STK12 {
    bottom: 82%;
    right: 51.1%;   
}
#STK12S {
    bottom: 88%;
    right: 46%;   
}

#STG06 {
    bottom: 62%;
    right: 69%;  
}
#STG06S {
    bottom: 68%;
    right: 65%;  
}

#STG05 {
    bottom: 72%;
    right: 69%; 
}
#STG05S {
    bottom: 78%;
    right: 65%; 
}

#STG04 {
    bottom: 82%;
    right: 69%;   
}
#STG04S {
    bottom: 88%;
    right: 65%;   
}

#STK07 {
    bottom: 46%;
    right: 74.7%;
}
#STK07S {
    bottom: 51.5%;
    right: 70%;
}

#STK06 {
    bottom: 32%;
    right: 74.7%;
}
#STK06S {
    bottom: 37%;
    right: 70%;
}

#STK01 {
    bottom: 8%;
    right: 87%; 
}
#STK01S {
    bottom: 13%;
    right: 82%; 
}

#STK02 {
    bottom: 19%;
    right: 87%;
}
#STK02S {
    bottom: 24%;
    right: 83.5%;
}

#STK03 {
    bottom: 30%;
    right: 87%;
}
#STK03S {
    bottom: 35.5%;
    right: 81.5%;
}

#STK04 {
    bottom: 41%;
    right: 87%;

}

#STK04S {
    bottom: 46%;
    right: 82.5%;

}

#STK05 {
    bottom: 52%;
    right: 87%;
}

#STK05S {
    bottom: 58%;
    right: 82%;
}

.container {
    position: relative;
    /* font-family: Arial; */
}

.breadcrumb li:not(:last-child)::after {
    content: '>';
    /* Add > between the items */
    margin: 0 10px;
    /* Add some horizontal space around the > */
    color: #333;
    /* Set the color of the > */
}

.breadcrumb li:last-child {
    color: #666;
    /* Set the color of the last item */
}

.breadcrumb {
    font-size: 16px;
    /* Set the font size */
    color: #333;
    /* Set the font color */
}

.breadcrumb a {
    color: #0066cc;
    /* Set the link color */
    text-decoration: none;
    /* Remove underline from links */
}

.breadcrumb ol {
    list-style: none;
    /* Remove default list styling */
    padding: 0;
    /* Remove default padding */
    display: flex;
    /* Use flexbox for layout */
    align-items: center;
    /* Align items vertically */
}

.grid-container {
    max-width: 64rem;
    /* Maximum width of the container */
    margin: auto;
    /* Center the container */

    padding: 1rem;
    /* Padding inside the container */
}

.water-resource {
    background-color: #f4f4f4;
    /* Light grey background */
    padding: 2rem;
    /* Padding around the content */
}

p {
    margin: 0;
    font-size: 10px;
}

.top-box p {
    font-size: 24px;
}
</style>