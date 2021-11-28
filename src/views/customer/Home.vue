<template>
    <div class="q-pa-md">
       <CustomerSidebar />

       <p style="font-size: 17px;">Customer dashboard</p>
      
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

     <q-dialog v-model="PrevieVehicleDialog">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">FOR PICKUP</div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <div class="text-h6" style="font-size: 16px;">VEHICLE DETAILS: </div>
        </q-card-section>

        <q-card-section style="max-height: 50vh; margin-top: -12px;" class="scroll">
           <div class="row q-gutter-sm">
             <div class="col-md-12 col-sm-12 col-xs-12">
                  <label>Owner: </label>
                  <q-input filled v-model="owner" readonly/>
              </div>
              <div class="col-md-12 col-sm-12 col-xs-12">
                  <label>Pickup Address: </label>
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
          <q-btn flat type="button" @click="Proceed" :disable="isDisabled" label="Proceed" color="primary"/>
        </q-card-actions>

      </q-card>
    </q-dialog>


    <q-dialog v-model="ViewMapDialogs">
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
const mapDiv = ref(null);
const ViewMapDialogs = ref(false);
const current_pos = ref({
        lat: 0,
        lng: 0
      });
const loader = new Loader({apiKey: GOOGE_MAPS_API_KEY, libraries: ['places','geometry']});
const search = ref(null);

export default {
  components: {
    CustomerSidebar,
    RentCard
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

    function Proceed() {
      const formdata = new FormData();
      const barRef = bar.value;

      formdata.append('vehicle_id', vehicle_id.value);
      formdata.append('customer_id', $q.sessionStorage.getItem('u_id'));
      formdata.append('owner_name', owner.value);
      formdata.append('vehicle_name', v_name.value);
      formdata.append('vehicle_type', v_type.value);
      formdata.append('pickup_address', address.value);
      formdata.append('vehicle_specs', v_specs.value);
      formdata.append('price', v_price.value);

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
            PrevieVehicleDialog.value = false;
            
        })
        .catch(err =>  {
            console.log(err);
        });
        
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
      v_price,
      Proceed,
      mapDiv,
      ViewMapDialogs,
      SearchVehicle,
      search
    }
                
   }
}
</script>
