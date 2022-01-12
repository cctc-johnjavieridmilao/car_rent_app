<template>
    <div class="q-pa-md">
       <OwnerSidebar />

       <p style="font-size: 17px;"><b>LIST OF VEHICLES</b></p>

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
                       :rules="[ val => val && val.length > 0 || 'Please Select Vehicle type']" />
                </div>

                <div class="col-lg-4 col-md-4 col-xs-12">

                    <q-select filled v-model="vbrand" :options="BrandName" label="Brand" lazy-rules
                       :rules="[ val => val && val.length > 0 || 'Please Select Brand']" />
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

                 <div class="col-lg-6 col-md-6 col-xs-12">
                    <q-file
                      v-model="or_image"
                      label="Official Receipt (OR)"
                      filled
                      style="width: 100%"
                  />
                </div>

                 <div class="col-lg-6 col-md-6 col-xs-12">
                     <q-file
                      v-model="cr_image"
                      label="Certificate of Registration (CR)"
                      filled
                      style="width: 100%"
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
                        label="Upload Images"
                        multiple
                        batch
                        square
                        style="width: 100%"
                        :filter="checkFileType"
                        @uploaded="IsUploaded"
                        ref="uploader"
                        use-chips
                        outlined
                        :factory="factoryFn"
                        auto-upload
                        clearable
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
                  grid
                  hide-header
                >

                 <template v-slot:item="props">
                      <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
                        :style="props.selected ? 'transform: scale(0.95);' : ''"
                      >

                      <q-item>

                        <q-item-section top>
                          <q-item-label lines="1">
                            <span class="text-weight-medium">RecordID</span> <span class="text-grey-8">: {{ props.row.RecID }}</span><br>
                            <span class="text-weight-medium">VehicleType</span> <span class="text-grey-8">: {{ props.row.vehicle_type }}</span><br>
                            <span class="text-weight-medium">VehicleName</span> <span class="text-grey-8">: {{ props.row.vehicle_name }}</span><br>
  
                          </q-item-label>
                        </q-item-section>

                        <q-item-section top side>
                          <div class="text-grey-8 q-gutter-xs">
                            <q-btn size="13px" flat dense round icon="pageview" @click="ViewData(props)"/>
                            <!-- <q-btn size="13px" flat dense round icon="image" @click="ViewImages(`${props.row.images_id}`)"/> -->

                          </div>
                        </q-item-section>
                      </q-item>
                         <q-separator />
                      </div>
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
                  grid
                  hide-header
                >

             <template v-slot:item="props">
                      <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
                        :style="props.selected ? 'transform: scale(0.95);' : ''"
                      >

                      <q-item>

                        <q-item-section top>
                          <q-item-label lines="1">
                            <span class="text-weight-medium">RecordID</span> <span class="text-grey-8">: {{ props.row.RecID }}</span><br>
                            <span class="text-weight-medium">VehicleType</span> <span class="text-grey-8">: {{ props.row.vehicle_type }}</span><br>
                            <span class="text-weight-medium">VehicleName</span> <span class="text-grey-8">: {{ props.row.vehicle_name }}</span><br>
  
                          </q-item-label>
                        </q-item-section>

                        <q-item-section top side>
                          <div class="text-grey-8 q-gutter-xs">
                            <q-btn size="13px" flat dense round icon="pageview" @click="ViewData(props)"/>
                            <!-- <q-btn size="13px" flat dense round icon="image" @click="ViewImages(`${props.row.images_id}`)"/> -->

                          </div>
                        </q-item-section>
                      </q-item>
                         <q-separator />
                      </div>
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


           <q-dialog v-model="ViewVehicleDialog" full-width>
      <q-card style="width: 700px; max-width: 80vw;">

        <q-card-section>
          <div class="text-h6" style="font-size: 16px;">VEHICLE DETAILS: </div>
        </q-card-section>

        <q-card-section style="max-height: 50vh; margin-top: -12px;" class="scroll">
           <div class="row q-gutter-sm">
             <!-- <div class="col-md-12 col-sm-12 col-xs-12">
                  <label>Owner: </label>
                  <q-input filled v-model="v_owner" readonly/>
              </div> -->
              <!-- <div class="col-md-12 col-sm-12 col-xs-12">
                  <label>Pickup Address: </label>
                  <q-input filled v-model="v_address" readonly />
              </div> -->
              <div class="col-md-12 col-sm-12 col-xs-12">
                  <label>Vehicle Name: </label>
                  <q-input filled v-model="v_name" readonly />
              </div>
               <div class="col-md-12 col-sm-12 col-xs-12">
                  <label>Brand: </label>
                  <q-input filled v-model="v_brand_name" readonly />
              </div>
              <div class="col-md-12 col-sm-12 col-xs-12">
                  <label>Vehicle Type: </label>
                  <q-input filled v-model="v_type" readonly />
              </div>
               <div class="col-md-12 col-sm-12 col-xs-12">
                  <label>Vehicle Status: </label>
                  <q-input filled v-model="v_status" readonly />
              </div>
               <div class="col-md-12 col-sm-12 col-xs-12">
                  <label>Price: </label>
                  <q-input filled v-model="v_price" readonly />
              </div>
              <div class="col-md-12 col-sm-12 col-xs-12">
                  <label>Vehicle Specification: </label>
                  <q-input type="textarea" filled v-model="v_specs" readonly />
              </div>
               <div class="col-md-12 col-sm-12 col-xs-12">
                   <label>Official Receipt (OR): </label>

                   <!-- <image-zoom 
                      :regular="upload_url + or_uploaded" 
                      :zoom="upload_url + or_uploaded">				
                    </image-zoom> -->
                  <q-img
                        :src="upload_url + or_uploaded"
                        spinner-color="white"
                        style="height: 250px; width: 100%"
                        img-class="my-custom-image"
                        class="rounded-borders"
                        @click="showImage"
                    >
                    <div class="absolute-bottom text-subtitle1 text-center">
                        Official Receipt (OR)
                    </div>
                    </q-img>
                  
              </div>

                <div class="col-md-12 col-sm-12 col-xs-12">
                   <label>Certificate of Registration (CR): </label>
                   <q-img
                        :src="upload_url + cr_uploaded"
                        spinner-color="white"
                        style="height: 250px; width: 100%"
                        img-class="my-custom-image"
                        class="rounded-borders"
                    >
                    <div class="absolute-bottom text-subtitle1 text-center">
                        Certificate of Registration (CR)
                    </div>
                    </q-img>
              </div>
               <div class="col-md-12 col-sm-12 col-xs-12">
                  <label>Images: </label>
                  <ImageCarousel :ImgesID="imagesID"/>
              </div>
              
           </div>
           
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Close" color="red" v-close-popup />
          <!-- <q-btn flat label="Approved" :disable="v_status == 'APPROVED' ? true : false" @click="Approved" color="primary"/>
          <q-btn flat label="Disapproved" :disable="v_status == 'APPROVED' ? true : false" @click="DisApproved" color="secondary"/> -->
        </q-card-actions>

      </q-card>
    </q-dialog>

    </div>

    <ChatSupport />
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
import { useQuasar, Notify } from 'quasar';
import {Loader} from '@googlemaps/js-api-loader';
import ChatSupport from '../../components/ChatSupport.vue';
import ImageCarousel from '../../components/ImageCarousel.vue';

//const GOOGE_MAPS_API_KEY = 'AIzaSyBnWBlqxn09y1gQCSf0mCrGgtvkExTIyJY';
const GOOGE_MAPS_API_KEY = 'AIzaSyDiKmRh2vEg2hiV1ZIVeyNlxPjVegpChvE&amp';

const uploaded_ids = ref([]);

const bar = ref(null)

export default {
  components: {
    OwnerSidebar,
    ChatSupport,
    ImageCarousel
  },
  methods: {
    factoryFn (files) {

      const formdata = new FormData();

      const barRef = bar.value;
      barRef.start();

         for(let i = 0; i < files.length; i++) {

             formdata.append('file[]', files[i]);

         }

         //https://rent-app-api.online/Home/UploadFile
         //http://localhost:8080/CAR_RENT/api/Home/UploadFile

        axios({
              method: 'POST',
              url: 'https://rent-app-api.online/Home/UploadFile',
              data: formdata,
              headers: { "Content-Type": "multipart/form-data" },
          })
          .then(response => {
              if(response.data.msg == 'success') {

                Notify.create({
                  type: 'positive',
                  color: 'positive',
                  timeout: 1000,
                  position: 'center',
                  message: 'Successfully Uploaded'
                })

                barRef.stop();

                 uploaded_ids.value.push(response.data.ids);
                 
              }
          })
          .catch(err =>  {
              console.log(err);
          });
     
    }
  },
    setup() {
    const app = getCurrentInstance();
    const $q = useQuasar();
    
    const vname = ref(null);
    const vtype = ref(null);
    const price = ref(null);
    const vspecs = ref(null);
    
    const url = app.appContext.config.globalProperties.ApiUrl;
    const isDisabled = ref(false);
    const uploader = ref(null);
    const filter_pending = ref('');
    const filter_approved = ref('');
    const tab = ref('enroll_vehicles');

    const imagesID = ref([]);

      const ViewVehicleDialog = ref(false);
      const v_owner = ref(null);
      const v_address = ref(null);
      const v_name = ref(null);
      const v_type = ref(null);
      const v_price = ref(null);
      const v_specs = ref(null);
      const v_status = ref(null);
      const vehicle_id = ref(null);
      const or_image = ref(null);
      const cr_image = ref(null);
      const or_uploaded = ref(null);
      const cr_uploaded = ref(null);
      const vbrand = ref(null);
      const v_brand_name = ref(null);
      const vehicleTypeArry = ref([]);
      const BrandNameArry = ref([]);

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
      const prices = parseFloat(price.value);
      let final_price = 0.00;
      let percentage = 0.00;

      if(prices <= 1000) {
        percentage = (prices * 0.20);
        final_price = (prices + percentage);
      }
       else if(prices <= 2499) {
         percentage = (prices * 0.30);
         final_price = (prices + percentage);
       }
       else if(prices <= 4000) {
         percentage = (prices * 0.40);
         final_price = (prices + percentage);
       } 
       else if(prices <= 10000 || prices > 10000) {
         percentage = (prices * 0.50);
         final_price = (prices + percentage);
       }

        formdata.append('upload_id', uploaded_ids.value.join(','));
        formdata.append('vname', vname.value);
        formdata.append('vtype', vtype.value);
        formdata.append('price', parseFloat(final_price));
        formdata.append('vspecs', vspecs.value);
        formdata.append('ownerid', $q.sessionStorage.getItem('u_id'));
        formdata.append('pick_up_address', document.getElementById('location').value);
        formdata.append('lat', current_pos.value.lat);
        formdata.append('lang', current_pos.value.lng);
        formdata.append('cr_image', cr_image.value);
        formdata.append('or_image', or_image.value);
        formdata.append('vbrand', vbrand.value);
        
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

      //uploaded_ids.value.push(response.ids);

      console.log(response)
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

    function ViewData(data) {
           const img = data.row.images_id.split(',');

            vehicle_id.value = data.row.RecID;
            v_owner.value = data.row.fullname;
            v_name.value = data.row.vehicle_name;
            v_type.value = data.row.vehicle_type;
            v_specs.value = data.row.specification;
            v_status.value = data.row.status;
            v_price.value = data.row.price;
            or_uploaded.value = data.row.or_image;
            cr_uploaded.value = data.row.cr_image;
            v_brand_name.value = data.row.brand;

            imagesID.value = []; //reset
            imagesID.value.push(img);
            //ConfirmDialog.value = true;
            ViewVehicleDialog.value = true;
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

    onMounted(() => {

          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
          } else { 
            alert('Geolocation is not supported by this browser.');
          }

           LoadMap();
           getPendingVechicles();
           getApprovedVechicles();
           getBrandName();
           getVehicleType();
     });

    return {
      tab,
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
      vehiclesType: vehicleTypeArry,
      BrandName: BrandNameArry,
      rows_for_pparoval,
      columns_for_pparoval,
      filter_pending,
      columns_for_approved,
      rows_for_approved,
      filter_approved,
      mapDiv,
      loadMapOnClick,
      imagesID,
      ViewVehicleDialog,
      v_specs,
      v_owner,
      v_address,
      v_type,
      v_price,
      v_name,
      v_status,
      ViewData,
      vehicle_id,
      or_image,
      cr_image,
      upload_url: app.appContext.config.globalProperties.UploadUrl,
      or_uploaded,
      cr_uploaded,
      vbrand,
      v_brand_name
    }
                
   }
}
</script>
