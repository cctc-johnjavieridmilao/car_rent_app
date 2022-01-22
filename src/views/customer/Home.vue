<template>
    <div class="q-pa-md bg-grey-3">
       <CustomerSidebar />

       <p style="font-size: 17px;"><b>LIST OF VEHICLES</b></p>
      
      <div class="row q-col-gutter-sm">
        <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12">
            <q-input
            v-model="search"
            filled
            placeholder="Search"
            @blur="SearchVehicle"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>

         <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12">
             <q-select filled v-model="vtype" :options="vehiclesType" @update:model-value="loadVehicles()" label="Vehicle Type" />
        </div>
        <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12">
             <q-select filled v-model="vbrand" :options="BrandName" @update:model-value="loadVehiclesByBrand()" label="Brand" />
        </div>
        <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12">
          <label>Price Range ({{ price_range.min }} to {{ price_range.max }})</label>
             <q-range v-model="price_range" @change="loadVehiclesByPrize()" :min="0" :max="1000" snap label />
        </div>
         <div class="col-md-4 col-lg-4 col-sm-12 col-xs-12" v-for="(item) in vehicle_list" :key="item.RecID">

            <RentCard
              @RentVehicle="ClickRent" 
              @Viewmap="Onviewmap"
              :Owner="item.fullname" 
              :VehicleType="item.vehicle_type" 
              :RecID="item.RecID" 
              :ImgesID="item.images_id" 
              :title="item.title" 
              :price="item.price" 
              :Description="item.specification" 
              location="Dadap luna"
              :pickupAddress="item.pick_up_address"
              :lat="item.lat"
              :lang="item.lang"
              :status="item.vehicleStatus"
              :brand="item.brand"
            />
            
         </div>
      </div>

      <q-ajax-bar
        ref="bar"
        position="top"
        color="accent"
        size="10px" 
        skip-hijack
      />

      <ChatSupport />

     <q-dialog v-model="PrevieVehicleDialog" full-width>
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">VEHICLE DETAILS:</div>
        </q-card-section>

        <q-separator />

        <!-- <q-card-section>
          <div class="text-h6" style="font-size: 16px;">VEHICLE DETAILS: </div>
        </q-card-section> -->

        <q-card-section style="max-height: 50vh; margin-top: -12px;" class="scroll">

           <div class="row q-gutter-sm" style="margin-top: 10px;">
             <div class="col-md-12 col-sm-12 col-xs-12">
                  <label>Owner: </label>
                  <q-input filled v-model="owner" readonly/>
              </div>
              <div class="col-md-12 col-sm-12 col-xs-12">
                  <label>Address: </label>
                  <q-input filled v-model="address" readonly />
              </div>
              <div class="col-md-12 col-sm-12 col-xs-12">
                  <label>Vehicle Name: </label>
                  <q-input filled v-model="v_name" readonly />
              </div>
              <div class="col-md-12 col-sm-12 col-xs-12">
                  <label>Vehicle Type: </label>
                  <q-input filled v-model="v_type" readonly />
              </div>
              <div class="col-md-12 col-sm-12 col-xs-12">
                  <label>Brand: </label>
                  <q-input filled v-model="v_brand_name" readonly />
              </div>
               <div class="col-md-12 col-sm-12 col-xs-12">
                  <label>Price: </label>
                  <q-input filled v-model="v_price" readonly />
              </div>
              <div class="col-md-12 col-sm-12 col-xs-12">
                  <label>Vehicle Specification: </label>
                  <q-input type="textarea" filled v-model="v_specs" readonly />
              </div>
           </div>
           
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Close" type="reset" color="primary" v-close-popup />
          <q-btn flat type="button" @click="ProceedToRent" label="Proceed" color="primary"/>
        </q-card-actions>

      </q-card>
    </q-dialog>


    <q-dialog v-model="RentDialog" full-width>
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">RENT DETAILS</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 50vh; margin-top: -12px;" class="scroll">

          <div class="row q-gutter-sm">
              <div class="col-md-12 col-sm-12 col-xs-12">
                 <q-input filled v-model="pick_date" mask="date" :rules="['date']" label="Pickup date">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="pick_date">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>

              <div class="col-md-12 col-sm-12 col-xs-12">
                 <q-input filled v-model="pick_time" mask="time" :rules="['time']" label="Pickup time">
                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                         <!-- <q-time v-model="pick_time" mask="YYYY-MM-DD HH:mm" format24h> -->
                           <q-time v-model="pick_time" with-seconds>
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>

              <div class="col-md-12 col-sm-12 col-xs-12">
                  <q-select filled v-model="payment_type" :options="Payment" label="Payment Method"/>
              </div>

              <div class="col-md-12 col-sm-12 col-xs-12">
                   <q-file
                    v-model="customer_valid_id"
                    label="Upload Valid ID"
                    filled
                    style="width: 100%"
                  />
              </div>
          </div>
           
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Close" type="reset" color="primary" v-close-popup />
          <q-btn flat type="button" @click="Proceed" :disable="isDisabled" label="Submit Application" color="primary"/>
        </q-card-actions>

      </q-card>
    </q-dialog>


    <q-dialog v-model="ViewMapDialogs" full-width>
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">VIEW LOCATION</div>
        </q-card-section>

        <q-separator />

        <q-card-section>
            <div ref="mapDiv" style="width: 100%; height: 50vh"></div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Close" type="reset" color="primary" v-close-popup />
        </q-card-actions>

      </q-card>
    </q-dialog>
      
    </div>
</template>

<script>
/* eslint-disable no-undef */

import { ref, onMounted, getCurrentInstance } from 'vue'
import CustomerSidebar from '../../components/CustomerSidebar.vue';
import RentCard from '../../components/RentCard.vue';
import ChatSupport from '../../components/ChatSupport.vue';
import axios from 'axios';
import { useQuasar } from 'quasar';
import router from '../../router';
import {Loader} from '@googlemaps/js-api-loader';

//const GOOGE_MAPS_API_KEY = 'AIzaSyBnWBlqxn09y1gQCSf0mCrGgtvkExTIyJY';
const GOOGE_MAPS_API_KEY = 'AIzaSyDiKmRh2vEg2hiV1ZIVeyNlxPjVegpChvE&amp';

const PrevieVehicleDialog = ref(false);
const owner = ref(null);
const address = ref(null);
const v_name = ref(null);
const v_type = ref(null);
const v_specs = ref(null);
const vehicle_id = ref(null);
const v_price = ref(null);

const pick_date = ref(null);
const pick_time = ref(null);
const payment_type = ref(null);
const customer_valid_id = ref(null);

const mapDiv = ref(null);
const ViewMapDialogs = ref(false);
const current_pos = ref({
        lat: 0,
        lng: 0
      });
const loader = new Loader({apiKey: GOOGE_MAPS_API_KEY, libraries: ['places','geometry']});
const search = ref(null);
const vtype = ref(null);
const vbrand = ref(null);
const RentDialog =  ref(false);
const vehicleTypeArry = ref([]);
const BrandNameArry = ref([]);
const v_brand_name = ref(null);
const price_range = ref({min: 0,max:0})


export default {
  components: {
    CustomerSidebar,
    RentCard,
    ChatSupport
  },
  watch: {
    messages: {
      handler(val, oldVal) {
        console.log('messages updated')
        console.log(val);
        console.log(oldVal);
      },
      deep: true
    },
},
  methods: {
    ClickRent(value) {

       owner.value = value.Owner;
       address.value = value.pickupAddress;
       v_name.value = value.name;
       v_type.value = value.VehicleType;
       v_specs.value = value.Description;
       vehicle_id.value = value.RecID;
       v_price.value = value.Price;
       v_brand_name.value = value.brand;

       PrevieVehicleDialog.value = true;
    },
    async loadmap(address, lat, lang) {
       await loader.load();

       const lat_lang = {lat: lat, lng: lang};

        const map = new google.maps.Map(mapDiv.value, {
          center: lat_lang,
          zoom: 7
        })

         const marker = new google.maps.Marker({
              animation: google.maps.Animation.DROP,
              position: lat_lang,
              map: map,
              icon: '',
          })

          const infoWindow = new google.maps.InfoWindow({
              content: '<span>'+address+'</span>'
          })

          marker.addListener('click', function() {
              infoWindow.open(map, marker);
          })
    },
    Onviewmap(value) {
      const address = value.pickupAddress;
      const lat = parseFloat(value.lat);
      const lang = parseFloat(value.lang);

      setTimeout(() => {
         this.loadmap(address,lat,lang);
      },500)

       ViewMapDialogs.value = true;
        
    }
  },
  setup() {
    const app = getCurrentInstance();
    const vehicle_list = ref([]);
    const url = app.appContext.config.globalProperties.ApiUrl;
    const bar = ref(null);
    const $q = useQuasar();
    const isDisabled = ref(false);
    
    function getVehicles() {
      const barRef = bar.value;

      barRef.start();
     

       axios({
            method: 'GET',
            url: url+'/GetApprovedVehicles',
            headers: { "Content-Type": "application/json" },
        })
        .then(response => {
          vehicle_list.value = response.data;
          console.log(response.data)
        })
        .catch(err =>  {
            console.log(err);
        }).finally(() => {
           barRef.stop();
        })
    }

    function ProceedToRent() {
        PrevieVehicleDialog.value = false;
        RentDialog.value = true;
    }

    function Proceed() {
      const formdata = new FormData();
      const barRef = bar.value;

      if(pick_date.value == null || pick_time.value == null || payment_type.value == null || customer_valid_id.value == null) {
        $q.notify({
                color: 'red',
                textColor: 'white',
                message: 'All fields are required!'
        });
        return false;
      }

      formdata.append('vehicle_id', vehicle_id.value);
      formdata.append('customer_id', $q.sessionStorage.getItem('u_id'));
      formdata.append('owner_name', owner.value);
      formdata.append('vehicle_name', v_name.value);
      formdata.append('vehicle_type', v_type.value);
      formdata.append('pickup_address', address.value);
      formdata.append('vehicle_specs', v_specs.value);
      formdata.append('price', v_price.value);

      formdata.append('pick_date', pick_date.value);
      formdata.append('pick_time', pick_time.value);
      formdata.append('payment_type', payment_type.value);
      formdata.append('customer_valid_id', customer_valid_id.value);
      

       barRef.start();
       isDisabled.value = true;

      axios({
            method: 'POST',
            url: url+'/RentVehicle',
            data: formdata,
            headers: { "Content-Type": "multipart/form-data" },
        })
        .then(response => {
            if(response.data.msg == 'success') {

                $q.notify({
                        color: 'green-4',
                        textColor: 'white',
                        message: 'Transaction Success, please wait for owners approval!'
                });

                setTimeout(() => {
                    router.push({ path: '/customer/rentvehicles' })
                },1500);

            }

            barRef.stop();
            isDisabled.value = false;
            RentDialog.value = false;
            
        })
        .catch(err =>  {
            console.log(err);
        });
        
    }

     function getVehicleType() {

          axios({
              method: 'GET',
              url: url+'/GetVehicleType',
              headers: { "Content-Type": "application/json" },
          })
          .then(response => {
              response.data.forEach(function(row) {
                 vehicleTypeArry.value.push(row.VehicleType)
              });
          })
          .catch(err =>  {
              console.log(err);
          }).finally(() => {
              //barRef.stop();
          })
      }

        function getBrandName() {

            axios({
                method: 'GET',
                url: url+'/GetBrand',
                headers: { "Content-Type": "application/json" },
            })
            .then(response => {
                response.data.forEach(function(row) {
                 BrandNameArry.value.push(row.Brand_name)
              });
            })
            .catch(err =>  {
                console.log(err);
            }).finally(() => {
                //barRef.stop();
            })
        }

     function showPosition(position) {
         current_pos.value.lat = position.coords.latitude;
         current_pos.value.lng = position.coords.longitude;
      }


    onMounted(() => {
      if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
          } else { 
            alert('Geolocation is not supported by this browser.');
          }

      getVehicles();
      getVehicleType();
      getBrandName();
      
    });

    function SearchVehicle() {
        const barRef = bar.value;
        const formdata = new FormData();
        formdata.append('key', search.value);

        barRef.start();

        vehicle_list.value.length = 0;
     
       axios({
            method: 'POST',
            url: url+'/SearchVehicles',
            data: formdata,
            headers: { "Content-Type": "application/json" },
        })
        .then(response => {
          vehicle_list.value = response.data;
        })
        .catch(err =>  {
            console.log(err);
        }).finally(() => {
           barRef.stop();
        })
    }

    function loadVehicles() {
        const barRef = bar.value;
        const formdata = new FormData();
        formdata.append('key', vtype.value);

        barRef.start();

        vehicle_list.value.length = 0;
     
       axios({
            method: 'POST',
            url: url+'/SearchVehicles',
            data: formdata,
            headers: { "Content-Type": "application/json" },
        })
        .then(response => {
          vehicle_list.value = response.data;
        })
        .catch(err =>  {
            console.log(err);
        }).finally(() => {
           barRef.stop();
        })
    }

    function loadVehiclesByBrand() {
        const barRef = bar.value;
        const formdata = new FormData();
        formdata.append('key', vbrand.value);

        barRef.start();

        vehicle_list.value.length = 0;
     
       axios({
            method: 'POST',
            url: url+'/SearchVehicles',
            data: formdata,
            headers: { "Content-Type": "application/json" },
        })
        .then(response => {
          vehicle_list.value = response.data;
        })
        .catch(err =>  {
            console.log(err);
        }).finally(() => {
           barRef.stop();
        })
    }

    function loadVehiclesByPrize() {

       const barRef = bar.value;
        const formdata = new FormData();
        formdata.append('from_price', price_range.value.min);
        formdata.append('to_price', price_range.value.max);

        barRef.start();

        vehicle_list.value.length = 0;
     
       axios({
            method: 'POST',
            url: url+'/SearchVehiclesByPrice',
            data: formdata,
            headers: { "Content-Type": "application/json" },
        })
        .then(response => {
          vehicle_list.value = response.data;
        })
        .catch(err =>  {
            console.log(err);
        }).finally(() => {
           barRef.stop();
        })
    }

    return {
      vehicle_list,
      bar,
      isDisabled,
      PrevieVehicleDialog,
      owner,
      address,
      v_name,
      v_type,
      v_specs,
      vehicle_id,
      customer_valid_id,
      v_price,
      Proceed,
      mapDiv,
      ViewMapDialogs,
      SearchVehicle,
      search,
      loadVehicles,
      loadVehiclesByBrand,
      loadVehiclesByPrize,
      vtype,
      pick_date,
      pick_time,
      payment_type,
      RentDialog,
      ProceedToRent,
      Payment: ['PAYMENT UPON PICK-UP','PAYMENT UPON DROP OFF'],
      vehiclesType: vehicleTypeArry,
      BrandName: BrandNameArry,
      vbrand,
      v_brand_name,
      price_range
    }
                
   }
}
</script>
