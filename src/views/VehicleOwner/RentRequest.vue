<template>
    <div class="q-pa-md bg-grey-3">
       <OwnerSidebar />

       <p style="font-size: 17px;"><b>RENT REQUEST</b></p>

       <q-tabs
          v-model="tab"
          dense
          align="left"
          class="bg-info text-white shadow-2"
          :breakpoint="0">
        
        <q-tab name="pending_pickup" label="PENDING FOR PICKUP" />
        <q-tab name="sched_for_pickup" label="SCHEDULED FOR PICKUP" />
        <q-tab name="on_progress" label="ON PROGRESS" />
        <q-tab name="returned" label="RETURNED VEHICLES" />
        <q-tab name="done_transactions" label="DONE TRANSACTION" />
        <q-tab name="cancelled_transactions" label="CANCELLED" />
      </q-tabs>

    <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="pending_pickup">
               <q-table
                  title="Pending Transactions"
                  :rows="rows_pending"
                  :columns="columns_pending"
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
                            <span class="text-weight-medium">CustomerName</span> <span class="text-grey-8">: {{ props.row.customer_name }}</span><br>
                            <span class="text-weight-medium">VehicleName</span> <span class="text-grey-8">: {{ props.row.vehicle_name }}</span>
                          </q-item-label>
                        </q-item-section>

                         <q-item-section top side>
                          <div class="text-grey-8 q-gutter-xs">
                            <q-btn size="15px" flat dense round icon="pageview" @click="ViewData(props)"/>

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

         <q-tab-panel name="sched_for_pickup">
               <q-table
                  title="Approved Transactions"
                  :rows="rows_approved"
                  :columns="columns_approved"
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
                            <span class="text-weight-medium">CustomerName</span> <span class="text-grey-8">: {{ props.row.customer_name }}</span><br>
                            <span class="text-weight-medium">VehicleName</span> <span class="text-grey-8">: {{ props.row.vehicle_name }}</span>
                          </q-item-label>
                        </q-item-section>

                         <q-item-section top side>
                          <div class="text-grey-8 q-gutter-xs">
                            <q-btn size="15px" flat dense round icon="pageview" @click="ViewData(props)"/>

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


         <q-tab-panel name="on_progress">
               <q-table
                  title="OnProgress Transactions"
                  :rows="rows_onprogress"
                  :columns="columns_onprogress"
                  row-key="recid"
                  :filter="filter_onprogress"
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
                            <span class="text-weight-medium">CustomerName</span> <span class="text-grey-8">: {{ props.row.customer_name }}</span><br>
                            <span class="text-weight-medium">VehicleName</span> <span class="text-grey-8">: {{ props.row.vehicle_name }}</span>
                          </q-item-label>
                        </q-item-section>

                         <q-item-section top side>
                          <div class="text-grey-8 q-gutter-xs">
                            <q-btn size="15px" flat dense round icon="pageview" @click="ViewData(props)"/>

                          </div>
                        </q-item-section>
                      </q-item>
                         <q-separator />
                      </div>
                    </template>

            <template v-slot:top-right>
              <q-input dense debounce="300" placeholder="Search" color="primary" v-model="filter_onprogress">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>
            </q-table>
                
        </q-tab-panel>



        <q-tab-panel name="returned">
               <q-table
                  title="For Return"
                  :rows="rows_return"
                  :columns="columns_return"
                  row-key="recid"
                  :filter="filter_return"
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
                            <span class="text-weight-medium">CustomerName</span> <span class="text-grey-8">: {{ props.row.customer_name }}</span><br>
                            <span class="text-weight-medium">VehicleName</span> <span class="text-grey-8">: {{ props.row.vehicle_name }}</span>
                          </q-item-label>
                        </q-item-section>

                         <q-item-section top side>
                          <div class="text-grey-8 q-gutter-xs">
                            <q-btn size="15px" flat dense round icon="pageview" @click="ViewData(props)"/>

                          </div>
                        </q-item-section>
                      </q-item>
                         <q-separator />
                      </div>
                    </template>

            <template v-slot:top-right>
              <q-input dense debounce="300" placeholder="Search" color="primary" v-model="filter_return">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>
            </q-table>
                
        </q-tab-panel>


         <q-tab-panel name="done_transactions">
               <q-table
                  title="Completed Transactions"
                  :rows="rows_completed"
                  :columns="columns_completed"
                  row-key="recid"
                  :filter="filter_completed"
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
                            <span class="text-weight-medium">CustomerName</span> <span class="text-grey-8">: {{ props.row.customer_name }}</span><br>
                            <span class="text-weight-medium">VehicleName</span> <span class="text-grey-8">: {{ props.row.vehicle_name }}</span>
                          </q-item-label>
                        </q-item-section>

                         <q-item-section top side>
                          <div class="text-grey-8 q-gutter-xs">
                            <q-btn size="15px" flat dense round icon="pageview" @click="ViewData(props)"/>

                          </div>
                        </q-item-section>
                      </q-item>
                         <q-separator />
                      </div>
                    </template>

            <template v-slot:top-right>
              <q-input dense debounce="300" placeholder="Search" color="primary" v-model="filter_completed">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>
            </q-table>
           
                
        </q-tab-panel>

        <q-tab-panel name="cancelled_transactions">
           
                 <q-table
                  title="Cancelled Transactions"
                  :rows="rows_cancelled"
                  :columns="columns_cancelled"
                  row-key="recid"
                  :filter="filter_cancelled"
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
                          <span class="text-weight-medium">CustomerName</span> <span class="text-grey-8">: {{ props.row.customer_name }}</span><br>
                          <span class="text-weight-medium">VehicleName</span> <span class="text-grey-8">: {{ props.row.vehicle_name }}</span>
                        </q-item-label>
                      </q-item-section>

                        <q-item-section top side>
                        <div class="text-grey-8 q-gutter-xs">
                          <q-btn size="15px" flat dense round icon="pageview" @click="ViewData(props)"/>

                        </div>
                      </q-item-section>
                    </q-item>
                        <q-separator />
                    </div>
                  </template>

            <template v-slot:top-right>
              <q-input dense debounce="300" placeholder="Search" color="primary" v-model="filter_cancelled">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>
           </q-table>
        </q-tab-panel>
     </q-tab-panels>
    

      <q-ajax-bar ref="bar" position="top" color="accent" size="10px" skip-hijack/>

      <q-dialog v-model="PickUpDialog">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">FOR PICKUP</div>
        </q-card-section>

        <q-separator />
       <q-form @submit.prevent="OnScheduled">

         <q-card-section style="max-height: 70vh;" class="scroll">
         
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
                         <q-time v-model="pick_time" mask="YYYY-MM-DD HH:mm" format24h>
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
                  <q-input filled v-model="address" lazy-rules :rules="[ val => val && val.length > 0 || 'Please type your address']" label="Address"/>
              </div>
              <div class="col-md-12 col-sm-12 col-xs-12">
                  <q-input type="textarea" filled v-model="remarks" lazy-rules :rules="[ val => val && val.length > 0 || 'Please eneter your remarks']" label="Remarks"/>
              </div>
              
           </div>
           
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Close" type="reset" color="primary" v-close-popup />
          <q-btn flat type="submit" :disable="isDisabled" label="Proceed" color="primary"/>
        </q-card-actions>

       </q-form>
        

      </q-card>
    </q-dialog>


         <q-dialog v-model="ViewVehicleDialog" full-width>
      <q-card style="width: 700px; max-width: 80vw;">

        <q-card-section>
          <div class="text-h6" style="font-size: 16px;">VEHICLE DETAILS: </div>
        </q-card-section>

        <q-card-section style="max-height: 50vh; margin-top: -12px;" class="scroll">
           <div class="row q-gutter-sm">
             <div class="col-md-12 col-sm-12 col-xs-12">
                  <label>Owner: </label>
                    <q-input filled v-model="v_owner_name" readonly />
              </div>

             <div class="col-md-12 col-sm-12 col-xs-12">
                  <label>Customer: </label>
                    <q-input filled v-model="v_customer" readonly />
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
                  <label>PaymentMethod: </label>
                  <q-input filled v-model="v_paymenttype" readonly />
              </div>
              <div class="col-md-12 col-sm-12 col-xs-12">
                  <label> Address: </label>
                  <q-input filled v-model="v_address" readonly />
              </div>
                <div class="col-md-12 col-sm-12 col-xs-12">
                  <label>Drop-off Address: </label>
                  <q-input filled v-model="v_dropoff_address" readonly />
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
                  <q-input filled v-model="v_brand" readonly />
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
           </div>
           
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
           <q-btn flat label="Close" type="reset" color="primary" v-close-popup />
           <q-btn flat type="button" v-if="btn_action" :disable="isDisabled" @click="OnApproved" label="Approved" color="primary"/>
           <q-btn flat type="button" v-if="btn_action" :disable="isDisabled" @click="OnCancel" label="Cancel" color="primary"/>
        </q-card-actions>

      </q-card>
    </q-dialog>
    </div>

    <ChatSupport/>
</template>

<script>
import { ref, onMounted, getCurrentInstance } from 'vue'
import OwnerSidebar from '../../components/OwnerSidebar.vue';
import axios from 'axios';
import { useQuasar } from 'quasar';
import ChatSupport from '../../components/ChatSupport.vue';

export default {
  components: {
    OwnerSidebar,
    ChatSupport
  },
    setup() {

      const $q = useQuasar();
      const app = getCurrentInstance();
      const bar = ref(null)
      const url = app.appContext.config.globalProperties.ApiUrl;
      const isDisabled = ref(false);
      const PickUpDialog = ref(false);
      const tran_id = ref(0);
      const pick_date = ref(null);
      const pick_time = ref(null);
      const address = ref(null);
      const remarks = ref(null);
      const tab = ref('pending_pickup');

      const ViewVehicleDialog = ref(false);
      const v_owner = ref(null);
      const v_address = ref(null);
      const v_dropoff_address = ref(null);
      const v_name = ref(null);
      const v_type = ref(null);
      const v_price = ref(null);
      const v_specs = ref(null);
      const v_pickup_date = ref(null);
      const v_pickup_time = ref(null);
      const v_paymenttype = ref(null);
      const customer_valid_id = ref(null);
      const v_customer = ref(null);
      const v_owner_name = ref(null);
      const v_brand = ref(null);

      const btn_action = ref(true);

       const columns_pending = [
            { name: 'recid', align: 'left', label: 'RecID', field: 'recid', sortable: true },
            { name: 'customer_name', align: 'left', label: 'Customer', field: 'customer_name', sortable: true },
            { name: 'vehicle_name', align: 'left', label: 'VehicleName', field: 'vehicle_name', sortable: true },
            { name: 'vehicle_type', align: 'left', label: 'Vehicle Type', field: 'vehicle_type', sortable: true },
            { name: 'pickup_address', align: 'left', label: 'Pickup Address', field: 'pickup_address', sortable: true },
            { name: 'vehicle_specs', align: 'left', label: 'Specification', field: 'vehicle_specs', sortable: true },
            { name: 'price', align: 'left', label: 'Price', field: 'price', sortable: true },
            { name: 'status', align: 'left', label: 'Status', field: 'status', sortable: true },
            { name: 'created_at', align: 'left', label: 'Created At', field: 'created_at', sortable: true },
            { name: 'action', align: 'left', label: 'Action', field: 'Action', sortable: false }
        ];

      const rows_pending = ref([]);
      const filter_pending = ref('');

       const columns_approved = [
            { name: 'recid', align: 'left', label: 'RecID', field: 'recid', sortable: true },
            { name: 'customer_name', align: 'left', label: 'Customer', field: 'customer_name', sortable: true },
            { name: 'vehicle_name', align: 'left', label: 'VehicleName', field: 'vehicle_name', sortable: true },
            { name: 'vehicle_type', align: 'left', label: 'Vehicle Type', field: 'vehicle_type', sortable: true },
            { name: 'pickup_address', align: 'left', label: 'Pickup Address', field: 'pickup_address', sortable: true },
            { name: 'pickup_date', align: 'left', label: 'Pickup Date', field: 'pickup_date', sortable: true },
            { name: 'pickup_time', align: 'left', label: 'Pickup Time', field: 'pickup_time', sortable: true },
            { name: 'vehicle_specs', align: 'left', label: 'Specification', field: 'vehicle_specs', sortable: true },
            { name: 'price', align: 'left', label: 'Price', field: 'price', sortable: true },
            { name: 'status', align: 'left', label: 'Status', field: 'status', sortable: true },
            { name: 'created_at', align: 'left', label: 'Created At', field: 'created_at', sortable: true }
        ];

        const rows_approved = ref([]);
        const filter_approved = ref('');

         const columns_completed = [
            { name: 'recid', align: 'left', label: 'RecID', field: 'recid', sortable: true },
            { name: 'customer_name', align: 'left', label: 'Customer', field: 'customer_name', sortable: true },
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

        const rows_completed = ref([]);
        const filter_completed = ref('');


        const columns_cancelled = [
            { name: 'recid', align: 'left', label: 'RecID', field: 'recid', sortable: true },
            { name: 'customer_name', align: 'left', label: 'Customer', field: 'customer_name', sortable: true },
            { name: 'vehicle_name', align: 'left', label: 'VehicleName', field: 'vehicle_name', sortable: true },
            { name: 'vehicle_type', align: 'left', label: 'Vehicle Type', field: 'vehicle_type', sortable: true },
            { name: 'pickup_address', align: 'left', label: 'Pickup Address', field: 'pickup_address', sortable: true },
            { name: 'vehicle_specs', align: 'left', label: 'Specification', field: 'vehicle_specs', sortable: true },
            { name: 'price', align: 'left', label: 'Price', field: 'price', sortable: true },
            { name: 'status', align: 'left', label: 'Status', field: 'status', sortable: true },
            { name: 'created_at', align: 'left', label: 'Created At', field: 'created_at', sortable: true },
            { name: 'cancelled_at', align: 'left', label: 'Cancelled at', field: 'cancelled_at', sortable: false }
        ];

      const rows_cancelled = ref([]);
      const filter_cancelled = ref('');

         const columns_onprogress = [ { name: 'recid', align: 'left', label: 'RecID', field: 'recid', sortable: true },
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
            { name: 'action', align: 'left', label: 'Action', field: 'action', sortable: false }];


       const rows_onprogress = ref([]);
       const filter_onprogress = ref('');


        const columns_return = [ { name: 'recid', align: 'left', label: 'RecID', field: 'recid', sortable: true },
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
            { name: 'action', align: 'left', label: 'Action', field: 'action', sortable: false }];

       const rows_return = ref([]);
       const filter_return = ref('');


      function getCancelledTransactions() {
        const formdata = new FormData();
        const barRef = bar.value;
        barRef.start();

        formdata.append('ownerid', $q.sessionStorage.getItem('u_id'));
        formdata.append('status', 'CANCELLED');
            
            axios({
                  method: 'POST',
                  url: url+'/GetOwnerTransaction',
                  data: formdata,
                  headers: { "Content-Type": "application/json" },
              })
              .then(response => {
                rows_cancelled.value = response.data;
              })
              .catch(err =>  {
                  console.log(err);
              }).finally(() => {
                barRef.stop();
              })
      }


      function getCompletedTransactions() {
        const formdata = new FormData();
        const barRef = bar.value;
        barRef.start();

        formdata.append('ownerid', $q.sessionStorage.getItem('u_id'));
        formdata.append('status', 'COMPLETED');
            
            axios({
                  method: 'POST',
                  url: url+'/GetOwnerTransaction',
                  data: formdata,
                  headers: { "Content-Type": "application/json" },
              })
              .then(response => {
                rows_completed.value = response.data;
              })
              .catch(err =>  {
                  console.log(err);
              }).finally(() => {
                barRef.stop();
              })
      }

       function getPendingTransactions() {
        const formdata = new FormData();
        const barRef = bar.value;
        barRef.start();

        formdata.append('ownerid', $q.sessionStorage.getItem('u_id'));
        formdata.append('status', 'PENDING');
            
            axios({
                  method: 'POST',
                  url: url+'/GetOwnerTransaction',
                  data: formdata,
                  headers: { "Content-Type": "application/json" },
              })
              .then(response => {
                rows_pending.value = response.data;
              })
              .catch(err =>  {
                  console.log(err);
              }).finally(() => {
                barRef.stop();
              })
      }

      function getApprovedTransactions() {
        const formdata = new FormData();
        const barRef = bar.value;
        barRef.start();

        formdata.append('ownerid', $q.sessionStorage.getItem('u_id'));
        formdata.append('status', 'FOR PICKUP');
            
            axios({
                  method: 'POST',
                  url: url+'/GetOwnerTransaction',
                  data: formdata,
                  headers: { "Content-Type": "application/json" },
              })
              .then(response => {
                rows_approved.value = response.data;
              })
              .catch(err =>  {
                  console.log(err);
              }).finally(() => {
                barRef.stop();
              })
      }

       function getOnProgress() {
        const formdata = new FormData();
        const barRef = bar.value;
        barRef.start();

        formdata.append('ownerid', $q.sessionStorage.getItem('u_id'));
        formdata.append('status', 'ON-PROGRESS');
            
          axios({
                method: 'POST',
                url: url+'/GetOwnerTransaction',
                data: formdata,
                headers: { "Content-Type": "application/json" },
            })
            .then(response => {
              rows_onprogress.value = response.data;
            })
            .catch(err =>  {
                console.log(err);
            }).finally(() => {
              barRef.stop();
            })
      }

       function getReturnVehicles() {
        const formdata = new FormData();
        const barRef = bar.value;
        barRef.start();

        formdata.append('ownerid', $q.sessionStorage.getItem('u_id'));
        formdata.append('status', 'FOR RETURN');
            
          axios({
                method: 'POST',
                url: url+'/GetOwnerTransaction',
                data: formdata,
                headers: { "Content-Type": "application/json" },
            })
            .then(response => {
              rows_return.value = response.data;
            })
            .catch(err =>  {
                console.log(err);
            }).finally(() => {
              barRef.stop();
            })
      }

      function OnScheduled() {

        const formdata = new FormData();
        formdata.append('id', tran_id.value);
        formdata.append('pickup_date', pick_date.value);
        formdata.append('time', pick_time.value);
        formdata.append('remarks', remarks.value);
        formdata.append('address', address.value);

        isDisabled.value = true;

         axios({
                method: 'POST',
                url: url+'/UpdateTransaction',
                data: formdata,
                headers: {"Content-Type": "application/json" },
            })
            .then(response => {

              if(response.data.msg == 'success') {
                $q.notify({
                  color: 'green-4',
                  textColor: 'white',
                  message: 'Transaction Success!'
                });
              }

              isDisabled.value = false;
              PickUpDialog.value = false;
              getPendingTransactions();

            })
            .catch(err =>  {
                console.log(err);
            });

      }

      function OnApproved() {

        const formdata = new FormData();
        formdata.append('id', tran_id.value);
        formdata.append('status', 'FOR PICKUP');
        // formdata.append('pickup_date', pick_date.value);
        // formdata.append('time', pick_time.value);
        // formdata.append('remarks', remarks.value);
        // formdata.append('address', address.value);

        isDisabled.value = true;

         axios({
                method: 'POST',
                url: url+'/UpdateTransaction',
                data: formdata,
                headers: {"Content-Type": "application/json" },
            })
            .then(response => {

              if(response.data.msg == 'success') {
                $q.notify({
                  color: 'green-4',
                  textColor: 'white',
                  message: 'Transaction Successfully Approved!'
                });
              }

              isDisabled.value = false;
              ViewVehicleDialog.value = false;
              getPendingTransactions();
              getApprovedTransactions();

            })
            .catch(err =>  {
                console.log(err);
            });

      }

      function OnCancel() {
        const formdata = new FormData();
        formdata.append('id', tran_id.value);
        formdata.append('status', 'CANCELLED');
        // formdata.append('pickup_date', pick_date.value);
        // formdata.append('time', pick_time.value);
        // formdata.append('remarks', remarks.value);
        // formdata.append('address', address.value);

        isDisabled.value = true;

         axios({
                method: 'POST',
                url: url+'/UpdateTransaction',
                data: formdata,
                headers: {"Content-Type": "application/json" },
            })
            .then(response => {

              if(response.data.msg == 'success') {
                $q.notify({
                  color: 'green-4',
                  textColor: 'white',
                  message: 'Transaction Successfully Cancelled!'
                });
              }

              isDisabled.value = false;
              ViewVehicleDialog.value = false;
              getPendingTransactions();
              getApprovedTransactions();

            })
            .catch(err =>  {
                console.log(err);
            });
      }

      function ScheduleForPickup(id) {
        PickUpDialog.value = true;
        tran_id.value = id;
      }

       function ViewData(data) {

         if(data.row.status == 'PENDING') {
            btn_action.value = true;
         } else {
            btn_action.value = false;
         }

          tran_id.value = data.row.RecID;
          v_specs.value = data.row.vehicle_specs;
          v_owner.value = data.row.owner_name;
          v_address.value = data.row.pickup_address;
          v_name.value = data.row.vehicle_name;
          v_type.value = data.row.vehicle_type;
          v_price.value = data.row.price;
          v_pickup_date.value = data.row.pickup_date;
          v_pickup_time.value = data.row.pickup_time;
          v_paymenttype.value = data.row.payment_type;
          customer_valid_id.value = data.row.client_id;
          v_customer.value = data.row.customer_name;
          v_owner_name.value = data.row.owner_name;
          v_brand.value = data.row.brand;
          v_dropoff_address.value = data.row.client_dropoff_address;
          ViewVehicleDialog.value = true;
      }

      onMounted(() => {
        getPendingTransactions();
        getApprovedTransactions();
        getCompletedTransactions();
        getCancelledTransactions();
        getOnProgress();
        getReturnVehicles();
      });

    return {
      tab,
      bar,
      filter_pending,
      columns_pending,
      rows_pending,
      isDisabled,
      PickUpDialog,
      OnScheduled,
      ScheduleForPickup,
      tran_id,
      pick_date,
      pick_time,
      address,
      remarks,
      columns_approved,
      rows_approved,
      filter_approved,
      columns_completed,
      rows_completed,
      filter_completed,
      columns_cancelled,
      filter_cancelled,
      rows_cancelled,
      ViewVehicleDialog,
      ViewData,
      v_specs,
      v_owner,
      v_address,
      v_type,
      v_price,
      v_name,
      v_pickup_date,
      v_pickup_time,
      v_paymenttype,
      OnApproved,
      OnCancel,
      btn_action,
      rows_onprogress,
      filter_onprogress,
      columns_onprogress,
      columns_return,
      rows_return,
      filter_return,
      upload_url: app.appContext.config.globalProperties.UploadUrl,
      customer_valid_id,
      v_customer,
      v_owner_name,
      v_brand,
      v_dropoff_address
    }
                
   }
}
</script>
