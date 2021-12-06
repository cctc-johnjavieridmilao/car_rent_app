<template>
    <div class="q-pa-md">
       <OwnerSidebar />

       <p style="font-size: 17px;">Lists of Vehicles</p>

       <q-tabs
          v-model="tab"
          dense
          align="left"
          class="bg-info text-white shadow-2"
          :breakpoint="0">
        
        <q-tab name="enroll_vehicles" @click="loadMapOnClick" label="REGISTER VEHICLE" />
        <q-tab name="pending_vehicle" label="FOR APPROVAL VEHICLE" />
        <q-tab name="approved_vehicle" label="APPROVED VEHICLE" />
      </q-tabs>

      <q-tab-panels v-model="tab" animated>
         <q-tab-panel name="enroll_vehicles">
            <div class="text-h6">Register vehicles</div>
            <q-form class="q-gutter-sm" @submit.prevent="OnVehiclerRegister">
            <div class="row q-col-gutter-sm">
                <div class="col-lg-6 col-md-6 col-xs-12">
                    <q-input filled v-model="vname" label="Vehicle name" lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type your Vehicle name']"/>
                </div>
                <div class="col-lg-4 col-md-4 col-xs-12">

                    <q-select filled v-model="vtype" :options="vehiclesType" label="Vehicle Type" lazy-rules
                       :rules="[ val => val && val.length > 0 || 'Please select your Vehicle type']" />
                </div>

                <div class="col-lg-2 col-md-2 col-xs-12">
                   <q-input
                      filled
                      v-model="price"
                      label="Price"
                      mask="#.##"
                      fill-mask="0"
                      reverse-fill-mask
                      input-class="text-right"
                      lazy-rules :rules="[ val => val && val.length > 0 || 'Please type your Vehicle Price']"
                    />
                </div>

                 <div class="col-lg-12 col-md-12 col-xs-12">
                    <input type="text" placeholder="Pickup Address" id="location"/>
                </div>

                <div class="col-lg-12 col-md-12 col-xs-12">
                   <div ref="mapDiv" style="width: 100%; height: 50vh"></div>
                </div>

                 <div class="col-lg-12 col-md-12 col-xs-12">
                    <q-input type="textarea" filled v-model="vspecs" label="Specification" lazy-rules :rules="[ val => val && val.length > 0 || 'Please type Vehicle specification']"/>
                </div>
                 <div class="col-lg-12 col-md-12 col-xs-12">
                    <q-uploader
                        :url="uploadurl"
                        label="Upload Images"
                        multiple
                        batch
                        style="width: 100%"
                        :filter="checkFileType"
                        @uploaded="IsUploaded"
                        ref="uploader"
                        auto-upload
                      />
                </div>
            </div>
            <br>
            
           <q-btn label="Submit" type="submit" :disable="isDisabled" class="float-right" icon="save_as" color="primary"/>

           <q-btn label="Reset" type="button" class="float-right" @click="reset" icon="restart_alt" color="primary"/>
           </q-form>
          </q-tab-panel>

        <q-tab-panel name="pending_vehicle">
           
                <q-table
                  title="For Approval Vehicles"
                  :rows="rows_for_pparoval"
                  :columns="columns_for_pparoval"
                  row-key="recid"
                  :filter="filter_pending"
                  :dense="$q.screen.lt.md"
                >

              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td key="recid" :props="props">
                    {{ props.row.RecID }}
                  </q-td>
                  <q-td key="vehicle_name" :props="props">
                    {{ props.row.vehicle_name }}
                  </q-td>
                  <q-td key="vehicle_type" :props="props">
                  {{ props.row.vehicle_type }}
                  </q-td>
                  <q-td key="specification" :props="props">
                    {{ props.row.specification.length > 35 ? props.row.specification.substring(0,35) + '...' : props.row.specification }}
                  </q-td>
                    <q-td key="pick_up_address" :props="props">
                    {{ props.row.pick_up_address }}
                  </q-td>
                  <q-td key="price" :props="props">
                    {{ props.row.price }}
                  </q-td>
                  <q-td key="status" :props="props">
                    {{ props.row.status }}
                  </q-td>
                  <q-td key="created_at" :props="props">
                    {{ props.row.created_at }}
                  </q-td>
                </q-tr>
              </template>

          <template v-slot:top-right>
              <q-input dense debounce="300" placeholder="Search" color="primary" v-model="filter_pending">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>
            </q-table>
       </q-tab-panel>

        <q-tab-panel name="approved_vehicle">

                    <q-table
                  title="Approved Vehicles"
                  :rows="rows_for_approved"
                  :columns="columns_for_approved"
                  row-key="recid"
                  :filter="filter_approved"
                  :dense="$q.screen.lt.md"
                >

              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td key="recid" :props="props">
                    {{ props.row.RecID }}
                  </q-td>
                  <q-td key="vehicle_name" :props="props">
                    {{ props.row.vehicle_name }}
                  </q-td>
                  <q-td key="vehicle_type" :props="props">
                  {{ props.row.vehicle_type }}
                  </q-td>
                  <q-td key="specification" :props="props">
                    {{ props.row.specification.length > 35 ? props.row.specification.substring(0,35) + '...' : props.row.specification }}
                  </q-td>
                   <q-td key="pick_up_address" :props="props">
                    {{ props.row.pick_up_address }}
                  </q-td>
                  <q-td key="price" :props="props">
                    {{ props.row.price }}
                  </q-td>
                  <q-td key="status" :props="props">
                    {{ props.row.status }}
                  </q-td>
                  <q-td key="created_at" :props="props">
                    {{ props.row.created_at }}
                  </q-td>
                  <q-td key="approved_date" :props="props">
                    {{ props.row.approved_date }}
                  </q-td>
                </q-tr>
              </template>

          <template v-slot:top-right>
              <q-input dense debounce="300" placeholder="Search" color="primary" v-model="filter_approved">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>
            </q-table>
          
          </q-tab-panel>
        </q-tab-panels>

         <q-ajax-bar
        ref="bar"
        position="top"
        color="accent"
        size="10px"
        skip-hijack
      />
    </div>
</template>

<style scoped>
      #location {
        height: 50px;
        width: 100%;
      }

      #location {
        border: 0;
        border-bottom: 1px solid black;
        font-size: 14px;
        font-family: Roboto, sans-serif;
        font-style: normal;
        font-weight: normal;
      }

      #location:focus::placeholder {
        color: white;
      }
</style>

<script>
/* eslint-disable no-undef */
import { ref, onMounted, getCurrentInstance } from 'vue'
import OwnerSidebar from '../../components/OwnerSidebar.vue';
import axios from 'axios';
import { useQuasar } from 'quasar';
import {Loader} from '@googlemaps/js-api-loader';

//const GOOGE_MAPS_API_KEY = 'AIzaSyBnWBlqxn09y1gQCSf0mCrGgtvkExTIyJY';
const GOOGE_MAPS_API_KEY = 'AIzaSyDiKmRh2vEg2hiV1ZIVeyNlxPjVegpChvE&amp';

export default {
  components: {
    OwnerSidebar
  },
    setup() {
    const app = getCurrentInstance();
    const $q = useQuasar();
    const uploaded_ids = ref(null);
    const vname = ref(null);
    const vtype = ref(null);
    const price = ref(null);
    const vspecs = ref(null);
    const bar = ref(null)
    const url = app.appContext.config.globalProperties.ApiUrl;
    const isDisabled = ref(false);
    const uploader = ref(null);
    const filter_pending = ref('');
    const filter_approved = ref('');
    const tab = ref('enroll_vehicles');

    const current_pos = ref({
        lat: 0,
        lng: 0
      });
      const loader = new Loader({apiKey: GOOGE_MAPS_API_KEY, libraries: ['places','geometry']});
      const mapDiv = ref(null);

    const columns_for_pparoval = [
            { name: 'recid', align: 'left', label: 'RecID', field: 'recid', sortable: true },
            { name: 'vehicle_name', align: 'left', label: 'VehicleName', field: 'vehicle_name', sortable: true },
            { name: 'vehicle_type', align: 'left', label: 'VehicleType', field: 'vehicle_type', sortable: true },
            { name: 'specification', align: 'left', label: 'Specs', field: 'specification', sortable: true },
            { name: 'pick_up_address', align: 'left', label: 'Pickup address', field: 'pick_up_address', sortable: true },
            { name: 'price', align: 'left', label: 'Price', field: 'price', sortable: true },
            { name: 'status', align: 'left', label: 'Status', field: 'status', sortable: true },
            { name: 'created_at', align: 'left', label: 'Created At', field: 'created_at', sortable: true },
        ];
    const columns_for_approved = [
        { name: 'recid', align: 'left', label: 'RecID', field: 'recid', sortable: true },
        { name: 'vehicle_name', align: 'left', label: 'VehicleName', field: 'vehicle_name', sortable: true },
        { name: 'vehicle_type', align: 'left', label: 'VehicleType', field: 'vehicle_type', sortable: true },
        { name: 'specification', align: 'left', label: 'Specs', field: 'specification', sortable: true },
        { name: 'pick_up_address', align: 'left', label: 'Pickup address', field: 'pick_up_address', sortable: true },
        { name: 'price', align: 'left', label: 'Price', field: 'price', sortable: true },
        { name: 'status', align: 'left', label: 'Status', field: 'status', sortable: true },
        { name: 'created_at', align: 'left', label: 'Created At', field: 'created_at', sortable: true },
        { name: 'approved_date', align: 'left', label: 'Approved At', field: 'approved_date', sortable: true },
    ];
   const rows_for_pparoval = ref([]);
   const rows_for_approved = ref([]);

    function checkFileType (files) {

      return files.filter(file => file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg');

    }

    function reset() {
        vname.value = ' ';
        vtype.value = ' ';
        price.value = '';
        vspecs.value = ' ';
        uploader.value.reset();
    }

    function OnVehiclerRegister() {
      const formdata = new FormData();
      const barRef = bar.value;

      formdata.append('upload_id', uploaded_ids.value);
      formdata.append('vname', vname.value);
      formdata.append('vtype', vtype.value);
      formdata.append('price', price.value);
      formdata.append('vspecs', vspecs.value);
      formdata.append('ownerid', $q.sessionStorage.getItem('u_id'));
      formdata.append('pick_up_address', document.getElementById('location').value);
      formdata.append('lat', current_pos.value.lat);
      formdata.append('lang', current_pos.value.lng);

      isDisabled.value = true;
      barRef.start();

        axios({
                method: 'POST',
                url: url+'/RegisterVehicles',
                data: formdata,
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then(response => {
                if(response.data.msg == 'success') {

                    $q.notify({
                            color: 'green-4',
                            textColor: 'white',
                            message: 'Successfully Registered'
                    });

                }

                barRef.stop();
                isDisabled.value = false;
                reset();
                tab.value = 'pending_vehicle';
                getPendingVechicles();
               
            })
            .catch(err =>  {
                console.log(err);
            });
    }

    function IsUploaded(info) {
      const response = JSON.parse(info.xhr.response);

      uploaded_ids.value = response.ids.join(',');
    }

     function getPendingVechicles() {
       const formdata = new FormData();
       const barRef = bar.value;
       barRef.start();

       formdata.append('ownerid', $q.sessionStorage.getItem('u_id'));
           
           axios({
                method: 'POST',
                url: url+'/GetOwnerVehiclesPending',
                data: formdata,
                headers: { "Content-Type": "application/json" },
            })
            .then(response => {
              rows_for_pparoval.value = response.data;
            })
            .catch(err =>  {
                console.log(err);
            }).finally(() => {
              barRef.stop();
            })
    }
    
     function getApprovedVechicles() {
       const formdata = new FormData();
       const barRef = bar.value;
       barRef.start();

       formdata.append('ownerid', $q.sessionStorage.getItem('u_id'));
           
           axios({
                method: 'POST',
                url: url+'/GetOwnerVehiclesApproved',
                data: formdata,
                headers: { "Content-Type": "application/json" },
            })
            .then(response => {
              rows_for_approved.value = response.data;
            })
            .catch(err =>  {
                console.log(err);
            }).finally(() => {
              barRef.stop();
            })
    }

     function showPosition(position) {
         current_pos.value.lat = position.coords.latitude;
         current_pos.value.lng = position.coords.longitude;
      }

      async function LoadMap() {

          await loader.load();
          const map = new google.maps.Map(mapDiv.value, {
            center: current_pos.value,
            zoom: 7
          })

          const marker = new google.maps.Marker({
              animation: google.maps.Animation.DROP,
              position: current_pos.value,
              map: map,
              icon: '',
          })

          const infoWindow = new google.maps.InfoWindow({
              content: '<span>latitude: '+current_pos.value.lat+'</span> | <span>longtitude: '+current_pos.value.lng+'</span>'
          })

          marker.addListener('click', function() {
              infoWindow.open(map, marker);
          })

          const autocompleteInput = document.getElementById('location');
          const autocomplete = new google.maps.places.Autocomplete(autocompleteInput, {
            fields: ["address_components", "geometry", "name"],
            types: ["address"],
          });

          autocomplete.addListener('place_changed', function () {
            marker.setVisible(false);
            const place = autocomplete.getPlace();
            current_pos.value.lat = place.geometry.location.lat();
            current_pos.value.lng = place.geometry.location.lng();

            if (!place.geometry) {
              // User entered the name of a Place that was not suggested and
              // pressed the Enter key, or the Place Details request failed.
              window.alert('No details available for input: \'' + place.name + '\'');
              return;
            }

            renderAddress(place);
          });

          function renderAddress(place) {
            map.setCenter(place.geometry.location);
            marker.setPosition(place.geometry.location);
            marker.setVisible(true);
          }

      }

    function loadMapOnClick() {
      setTimeout(() => {
        LoadMap();
      },500)
    }

    onMounted(() => {

          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
          } else { 
            alert('Geolocation is not supported by this browser.');
          }

           LoadMap();
           getPendingVechicles();
           getApprovedVechicles();
     });

    return {
      tab,
      uploadurl: 'https://rent-app-api.online/Home/UploadFile',
      checkFileType,
      OnVehiclerRegister,
      IsUploaded,
      uploaded_ids,
      vname,
      vtype,
      price,
      vspecs,
      bar,
      isDisabled,
      uploader,
      reset,
      vehiclesType: ['SEDAN','COUPE','SPORTS CAR','STATION WAGON','HATCHBACK','CONVERTIBLE','SUV','MINIVAN','PICKUP TRUCK','VAN'],
      rows_for_pparoval,
      columns_for_pparoval,
      filter_pending,
      columns_for_approved,
      rows_for_approved,
      filter_approved,
      mapDiv,
      loadMapOnClick
    }
                
   }
}
</script>
