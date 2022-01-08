<template>
    <div class="q-pa-md bg-grey-3">
        <AdminSidebar />

       <p style="font-size: 17px;"><b>VEHICLE MANAGEMENT</b></p>


            <q-table
                  title="Vehicle Lists"
                  :rows="rows"
                  :columns="columns"
                  row-key="recid"
                  :filter="filter"
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
                            <span class="text-weight-medium">OwnerName</span> <span class="text-grey-8">: {{ props.row.fullname }}</span><br>
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
              <q-input dense debounce="300" placeholder="Search" color="primary" v-model="filter">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>
            </q-table>


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
             <div class="col-md-12 col-sm-12 col-xs-12">
                  <label>Owner: </label>
                  <q-input filled v-model="v_owner" readonly/>
              </div>
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
                  <q-input filled v-model="v_brand" readonly />
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
                   <q-img
                        :src="upload_url + or_uploaded"
                        spinner-color="white"
                        style="height: 250px; width: 100%"
                        img-class="my-custom-image"
                        class="rounded-borders"
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
          <q-btn flat label="Approved" :disable="v_status == 'APPROVED' ? true : false" @click="Approved" color="primary"/>
          <q-btn flat label="Disapproved" :disable="v_status == 'APPROVED' ? true : false" @click="DisApproved" color="secondary"/>
        </q-card-actions>

      </q-card>
    </q-dialog>

    <q-dialog v-model="ConfirmDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="thumbs_up_down" color="primary" text-color="white" />
          <span class="q-ml-sm">Are you sure you want to approved this vehicle?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Close" color="red" v-close-popup />
          <q-btn flat label="Approved" @click="Approved" color="primary"/>
          <q-btn flat label="Disapproved" @click="DisApproved" color="secondary"/>
        </q-card-actions>
      </q-card>
    </q-dialog>

     <q-dialog v-model="CarouselDialog">

        <ImageCarousel :ImgesID="imagesID"/>
      
    </q-dialog>
  </div>
  <ChatSupport/>
</template>

<script>
import { ref, onMounted, getCurrentInstance } from 'vue';
import AdminSidebar from '../../components/AdminSidebar.vue';
import ImageCarousel from '../../components/ImageCarousel.vue';
import axios from 'axios';
import { useQuasar } from 'quasar';
import ChatSupport from '../../components/ChatSupport.vue';

export default {
    components: {
        AdminSidebar,
        ImageCarousel,
        ChatSupport
    },
    setup() {
        const $q = useQuasar();
        const filter = ref('');
        const app = getCurrentInstance();
        const url = app.appContext.config.globalProperties.ApiUrl;
        const columns = [
            { name: 'recid', align: 'left', label: 'RecID', field: 'recid', sortable: true },
            { name: 'owner_name', align: 'left', label: 'OwnerName', field: 'owner_name', sortable: true },
            { name: 'vehicle_name', align: 'left', label: 'VehicleName', field: 'vehicle_name', sortable: true },
            { name: 'vehicle_type', align: 'left', label: 'VehicleType', field: 'vehicle_type', sortable: true },
            { name: 'specification', align: 'left', label: 'Specs', field: 'specification', sortable: true },
            { name: 'price', align: 'left', label: 'Price', field: 'price', sortable: true },
            { name: 'status', align: 'left', label: 'Status', field: 'status', sortable: true },
            { name: 'created_at', align: 'left', label: 'Created At', field: 'created_at', sortable: true },
            { name: 'approved_date', align: 'left', label: 'Approved At', field: 'approved_date', sortable: true },
             { name: 'action', align: 'left', label: 'Action', field: 'action', sortable: false },
        ];
        const rows = ref([]);
        const bar = ref(null);
        const ConfirmDialog = ref(false);
        const CarouselDialog = ref(false);
        const vehicle_id = ref(null);
        const imagesID = ref([]);

        const ViewVehicleDialog = ref(false);
        const v_owner = ref(null);
        const v_address = ref(null);
        const v_name = ref(null);
        const v_type = ref(null);
        const v_price = ref(null);
        const v_specs = ref(null);
        const v_status = ref(null);
        const or_uploaded = ref(null);
        const cr_uploaded = ref(null);
        const v_brand = ref(null);

        function getVehicles() {
          const barRef = bar.value;
          barRef.start();

            axios({
                method: 'GET',
                url: url+'/GetVehicles',
                headers: { "Content-Type": "application/json" },
            })
            .then(response => {
                rows.value = response.data;
            })
            .catch(err =>  {
                console.log(err);
            }).finally(() => {
                barRef.stop();
            })
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
            v_brand.value = data.row.brand;

            imagesID.value = []; //reset
            imagesID.value.push(img);
            //ConfirmDialog.value = true;
            ViewVehicleDialog.value = true;
        }

        function ViewImages(images) {
          const img = images.split(',');
          imagesID.value = []; //reset
          imagesID.value.push(img);

          CarouselDialog.value = true;

        }

        function Approved() {
            const formdata = new FormData();
            const barRef = bar.value;
            barRef.start();

            formdata.append('vehicle_id', vehicle_id.value);
           
           axios({
                method: 'POST',
                url: url+'/ApprovedVehicle',
                data: formdata,
                headers: { "Content-Type": "application/json" },
            })
            .then(response => {
               if(response.data.msg == 'success') {

                $q.notify({
                  color: 'green-4',
                  textColor: 'white',
                  message: 'Sucessfully Approved!'
                });

                   getVehicles();
                   ConfirmDialog.value = false;
               }
               barRef.stop();
            })
            .catch(err =>  {
                console.log(err);
            });
        }

        function DisApproved() {
             const formdata = new FormData();
            const barRef = bar.value;
            barRef.start();

            formdata.append('vehicle_id', vehicle_id.value);
           
           axios({
                method: 'POST',
                url: url+'/DisApprovedVehicle',
                data: formdata,
                headers: { "Content-Type": "application/json" },
            })
            .then(response => {
               if(response.data.msg == 'success') {

                $q.notify({
                  color: 'green-4',
                  textColor: 'white',
                  message: 'Sucessfully Disapproved!'
                });

                   getVehicles();
                   ConfirmDialog.value = false;
               }
               barRef.stop();
            })
            .catch(err =>  {
                console.log(err);
            });
        }

        onMounted(() => {
            getVehicles();
        });
        
        return {
            filter,
            columns,
            rows,
            bar,
            ViewData,
            ConfirmDialog,
            CarouselDialog,
            Approved,
            DisApproved,
            ViewImages,
            imagesID,
            ViewVehicleDialog,
            v_specs,
            v_owner,
            v_address,
            v_type,
            v_price,
            v_name,
            v_status,
            v_brand,
            upload_url: app.appContext.config.globalProperties.UploadUrl,
            or_uploaded,
            cr_uploaded
        }
    }
}
</script>
