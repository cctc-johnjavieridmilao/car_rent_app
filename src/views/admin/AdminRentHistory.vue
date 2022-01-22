<template>
    <div class="q-pa-md bg-grey-3">
       <AdminSidebar />

       <p style="font-size: 17px;"><b>RENT HISTORY</b></p>

       <q-table
                  title=""
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
                            <span class="text-weight-medium">RecordID</span> <span class="text-grey-8">: {{ props.row.RecID }}</span><br>
                            <span class="text-weight-medium">OwnerName</span> <span class="text-grey-8">: {{ props.row.owner_name }}</span><br>
                            <span class="text-weight-medium">VehicleName</span> <span class="text-grey-8">: {{ props.row.vehicle_name }}</span>
                          </q-item-label>
                        </q-item-section>

                         <q-item-section top side>
                          <div class="text-grey-8 q-gutter-xs">
                            <q-btn size="15px" flat dense round icon="pageview" label="Check History" @click="ViewData(props)"/>

                          </div>
                        </q-item-section>
                      </q-item>
                         <q-separator />
                      </div>
                    </template>

            <template v-slot:top>
              <q-input dense debounce="300" placeholder="Search" style="width: 100%" color="primary" v-model="filter">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>
            </q-table>


    <q-dialog v-model="ViewVehicleDialog" full-width>
      <q-card style="width: 700px; max-width: 80vw;">

        <q-card-section>
          <div class="text-h6" style="font-size: 16px;">HISTORY </div>
        </q-card-section>

        <q-card-section style="max-height: 50vh; margin-top: -12px;" class="scroll">
           <div class="row q-gutter-sm">
             <div class="col-md-12 col-sm-12 col-xs-12">
                  <label>Owner: </label>
                  <q-input filled v-model="v_owner" readonly/>
              </div>
              <div class="col-md-12 col-sm-12 col-xs-12">
                  <label>Customer: </label>
                  <q-input filled v-model="v_customer" readonly/>
              </div>
              <div class="col-md-12 col-sm-12 col-xs-12">
                  <label>Address: </label>
                  <q-input filled v-model="v_address" readonly />
              </div>
              <div class="col-md-12 col-sm-12 col-xs-12">
                  <label>Pickup Date: </label>
                  <q-input filled v-model="v_pickup_date" readonly />
              </div>
              <div class="col-md-12 col-sm-12 col-xs-12">
                  <label>Pickup Time: </label>
                  <q-input filled v-model="v_pickup_time" readonly />
              </div>

              <div class="col-md-12 col-sm-12 col-xs-12">
                  <label>Status: </label>
                  <q-input filled v-model="v_status" readonly />
              </div>
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
                  <label>Price: </label>
                  <q-input filled v-model="v_price" readonly />
              </div>
              <div class="col-md-12 col-sm-12 col-xs-12">
                  <label>Vehicle Specification: </label>
                  <q-input type="textarea" filled v-model="v_specs" readonly />
              </div>
              <div class="col-md-12 col-sm-12 col-xs-12">
                   <label>Customer Uploaded ID: </label>
                   <q-img
                        :src="upload_url + customer_valid_id"
                        spinner-color="white"
                        style="height: 250px; width: 100%"
                        img-class="my-custom-image"
                        class="rounded-borders"
                    >
                    <div class="absolute-bottom text-subtitle1 text-center">
                        CUSTOMER VALID ID
                    </div>
                    </q-img>
              </div>
              <div class="col-md-12 col-sm-12 col-xs-12">
                  <label>Car Images: </label>
                  <ImageCarousel :ImgesID="imagesID"/>
              </div>
           </div>
           
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Close" type="reset" color="primary" v-close-popup />
        </q-card-actions>

      </q-card>
    </q-dialog>

    <q-ajax-bar ref="bar" position="top" color="accent" size="10px" skip-hijack/>

    <ChatSupport/>
    </div>
</template>

<script>
import { ref, getCurrentInstance,onMounted } from 'vue'
import AdminSidebar from '../../components/AdminSidebar.vue';
import ChatSupport from '../../components/ChatSupport.vue';
import axios from 'axios';
import ImageCarousel from '../../components/ImageCarousel.vue';
//import { useQuasar } from 'quasar';

export default {
  components: {
    AdminSidebar,
    ChatSupport,
    ImageCarousel
  },
    setup() {
       const app = getCurrentInstance();
       //const $q = useQuasar();
       const bar = ref(null)
       const url = app.appContext.config.globalProperties.ApiUrl;
       const ViewVehicleDialog = ref(false);
       const v_owner = ref(null);
       const v_address = ref(null);
       const v_name = ref(null);
       const v_type = ref(null);
       const v_price = ref(null);
       const v_specs = ref(null);
       const v_pickup_date = ref(null);
       const v_pickup_time = ref(null);
       const v_status = ref(null);
       const imagesID = ref([]);
       const customer_valid_id = ref(null);
       const v_customer = ref(null);
       const v_brand = ref(null);

       const columns = [
            { name: 'recid', align: 'left', label: 'RecID', field: 'recid', sortable: true },
            { name: 'owner_name', align: 'left', label: 'Owner', field: 'owner_name', sortable: true },
            { name: 'vehicle_name', align: 'left', label: 'VehicleName', field: 'vehicle_name', sortable: true },
            { name: 'vehicle_type', align: 'left', label: 'Vehicle Type', field: 'vehicle_type', sortable: true },
            { name: 'pickup_address', align: 'left', label: 'Pickup Address', field: 'pickup_address', sortable: true },
            { name: 'pickup_date', align: 'left', label: 'Pickup Date', field: 'pickup_date', sortable: true },
            { name: 'pickup_time', align: 'left', label: 'Pickup Time', field: 'pickup_time', sortable: true },
            { name: 'vehicle_specs', align: 'left', label: 'Specification', field: 'vehicle_specs', sortable: true },
            { name: 'price', align: 'left', label: 'Price', field: 'price', sortable: true },
            { name: 'status', align: 'left', label: 'Status', field: 'status', sortable: true },
            { name: 'created_at', align: 'left', label: 'Created At', field: 'created_at', sortable: true },
            { name: 'updated_at', align: 'left', label: 'Updated At', field: 'updated_at', sortable: true }
        ];

        const rows = ref([]);
        const filter = ref('');

    function getCompletedTransactions() {
        const formdata = new FormData();
        const barRef = bar.value;
        barRef.start();

        formdata.append('status', 'COMPLETED');
            
            axios({
                  method: 'POST',
                  url: url+'/GetTransactionsLists',
                  data: formdata,
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

        v_specs.value = data.row.vehicle_specs;
        v_owner.value = data.row.owner_name;
        v_address.value = data.row.pickup_address;
        v_name.value = data.row.vehicle_name;
        v_type.value = data.row.vehicle_type;
        v_price.value = data.row.price;
        v_pickup_date.value = data.row.pickup_date;
        v_pickup_time.value = data.row.pickup_time;
        v_status.value = data.row.status;
        customer_valid_id.value = data.row.client_id;
        v_customer.value = data.row.customer_name;
        v_brand.value = data.row.brand;

        imagesID.value = []; //reset
        imagesID.value.push(img);
        ViewVehicleDialog.value = true;
      }

      onMounted(() => {
          getCompletedTransactions();
      });
        
    return {
        columns,
        rows,
        filter,
        ViewVehicleDialog,
        ViewData,
        bar,
        v_specs,
        v_owner,
        v_address,
        v_name,
        v_type,
        v_price,
        v_pickup_date,
        v_pickup_time,
        v_status,
        imagesID,
        upload_url: app.appContext.config.globalProperties.UploadUrl,
        customer_valid_id,
        v_customer,
        v_brand
    }
                
   }
}
</script>
