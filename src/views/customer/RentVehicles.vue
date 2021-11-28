<template>
    <div class="q-pa-md">
       <CustomerSidebar />

       <p style="font-size: 17px;">Rent Vehicles</p>

       <q-tabs
          v-model="tab"
          dense
          align="left"
          class="bg-info text-white shadow-2"
          :breakpoint="0">
        
        <q-tab name="pending_pickup" label="PENDING FOR PICKUP" />
        <q-tab name="sched_for_pickup" label="SCHEDULED FOR PICKUP" />
        <q-tab name="done_transactions" label="COMPLETED" />
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
                >

              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td key="recid" :props="props">
                    {{ props.row.RecID }}
                  </q-td>
                  <q-td key="owner_name" :props="props">
                    {{ props.row.owner_name }}
                  </q-td>
                  <q-td key="vehicle_name" :props="props">
                    {{ props.row.vehicle_name }}
                  </q-td>

                    <q-td key="vehicle_type" :props="props">
                    {{ props.row.vehicle_type }}
                  </q-td>
                  
                  <q-td key="pickup_address" :props="props">
                    {{ props.row.pickup_address }}
                  </q-td>
                   <q-td key="vehicle_specs" :props="props">
                     {{ props.row.vehicle_specs.length > 35 ? props.row.vehicle_specs.substring(0,35) + '...' : props.row.vehicle_specs }}
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
                   <q-td key="action" :props="props">
                    <q-btn push  color="primary" rounded  label="" @click="CancelTransaction(props.row.RecID)" icon-right="cancel" size="sm"/>
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

        <q-tab-panel name="sched_for_pickup">

           <q-table
                  title="Approved Transactions"
                  :rows="rows_approved"
                  :columns="columns_approved"
                  row-key="recid"
                  :filter="filter_approved"
                  :dense="$q.screen.lt.md"
                >

              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td key="recid" :props="props">
                    {{ props.row.RecID }}
                  </q-td>
                  <q-td key="owner_name" :props="props">
                    {{ props.row.owner_name }}
                  </q-td>
                  <q-td key="vehicle_name" :props="props">
                    {{ props.row.vehicle_name }}
                  </q-td>

                    <q-td key="vehicle_type" :props="props">
                    {{ props.row.vehicle_type }}
                  </q-td>
                
                  <q-td key="pickup_address" :props="props">
                    {{ props.row.pickup_address }}
                  </q-td>
                    
                  <q-td key="pickup_date" :props="props">
                    {{ props.row.pickup_date }}
                  </q-td>

                  <q-td key="pickup_time" :props="props">
                    {{ props.row.pickup_time }}
                  </q-td>

                   <q-td key="vehicle_specs" :props="props">
                     {{ props.row.vehicle_specs.length > 35 ? props.row.vehicle_specs.substring(0,35) + '...' : props.row.vehicle_specs }}
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
                  <q-td key="action" :props="props">
                    <q-btn push  color="primary" rounded  label="" @click="DonePickup(props.row.RecID)" icon-right="update" size="sm"/>
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

         <q-tab-panel name="done_transactions">
           
                  <q-table
                  title="Completed Transactions"
                  :rows="rows_completed"
                  :columns="columns_completed"
                  row-key="recid"
                  :filter="filter_completed"
                  :dense="$q.screen.lt.md"
                >

              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td key="recid" :props="props">
                    {{ props.row.RecID }}
                  </q-td>
                  <q-td key="owner_name" :props="props">
                    {{ props.row.owner_name }}
                  </q-td>
                  <q-td key="vehicle_name" :props="props">
                    {{ props.row.vehicle_name }}
                  </q-td>

                    <q-td key="vehicle_type" :props="props">
                    {{ props.row.vehicle_type }}
                  </q-td>
                
                  <q-td key="pickup_address" :props="props">
                    {{ props.row.pickup_address }}
                  </q-td>
                    
                  <q-td key="pickup_date" :props="props">
                    {{ props.row.pickup_date }}
                  </q-td>

                  <q-td key="pickup_time" :props="props">
                    {{ props.row.pickup_time }}
                  </q-td>

                   <q-td key="vehicle_specs" :props="props">
                     {{ props.row.vehicle_specs.length > 35 ? props.row.vehicle_specs.substring(0,35) + '...' : props.row.vehicle_specs }}
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
                  <q-td key="updated_at" :props="props">
                    {{ props.row.is_pickup_date }}
                  </q-td>
                </q-tr>
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
                  :rows="rows_cancel"
                  :columns="columns_cancel"
                  row-key="recid"
                  :filter="filter_cancel"
                  :dense="$q.screen.lt.md"
                >

              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td key="recid" :props="props">
                    {{ props.row.RecID }}
                  </q-td>
                  <q-td key="owner_name" :props="props">
                    {{ props.row.owner_name }}
                  </q-td>
                  <q-td key="vehicle_name" :props="props">
                    {{ props.row.vehicle_name }}
                  </q-td>

                    <q-td key="vehicle_type" :props="props">
                    {{ props.row.vehicle_type }}
                  </q-td>
                  
                  <q-td key="pickup_address" :props="props">
                    {{ props.row.pickup_address }}
                  </q-td>
                   <q-td key="vehicle_specs" :props="props">
                     {{ props.row.vehicle_specs.length > 35 ? props.row.vehicle_specs.substring(0,35) + '...' : props.row.vehicle_specs }}
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
                   <q-td key="cancel_at" :props="props">
                    {{ props.row.cancel_date }}
                  </q-td>
                </q-tr>
              </template>

            <template v-slot:top-right>
              <q-input dense debounce="300" placeholder="Search" color="primary" v-model="filter_cancel">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>
            </q-table>
           
                 
        </q-tab-panel>
      </q-tab-panels>


      <q-ajax-bar ref="bar" position="top" color="accent" size="10px" skip-hijack/>

       <q-dialog v-model="ConfirmPickupDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="check_circle" color="primary" text-color="white" />
          <span class="q-ml-sm">Already pickup this vehicle?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Yes, already pickup" :disable="isDisabled" @click="ConfirmPickup" color="primary"/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="CancelTransactionDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="cancel" color="primary" text-color="white" />
          <span class="q-ml-sm">Are you sure you want to cancel this transaction?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Close" color="primary" v-close-popup />
          <q-btn flat label="Yes, Cancel it" :disable="isDisabled" @click="Cancel" color="primary"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    </div>
</template>

<script>
import { ref, onMounted, getCurrentInstance } from 'vue'
import CustomerSidebar from '../../components/CustomerSidebar.vue';
import axios from 'axios';
import { useQuasar } from 'quasar';

export default {
  components: {
    CustomerSidebar
  },
    setup() {
       const app = getCurrentInstance();
       const $q = useQuasar();
       const filter_pending = ref('');
       const bar = ref(null)
       const url = app.appContext.config.globalProperties.ApiUrl;
       const ConfirmPickupDialog = ref(false);
       const tran_id = ref(0);
       const isDisabled = ref(false);
       const CancelTransactionDialog = ref(false);

       const columns_pending = [
            { name: 'recid', align: 'left', label: 'RecID', field: 'recid', sortable: true },
            { name: 'owner_name', align: 'left', label: 'Owner', field: 'owner_name', sortable: true },
            { name: 'vehicle_name', align: 'left', label: 'VehicleName', field: 'vehicle_name', sortable: true },
            { name: 'vehicle_type', align: 'left', label: 'Vehicle Type', field: 'vehicle_type', sortable: true },
            { name: 'pickup_address', align: 'left', label: 'Pickup Address', field: 'pickup_address', sortable: true },
            { name: 'vehicle_specs', align: 'left', label: 'Specification', field: 'vehicle_specs', sortable: true },
            { name: 'price', align: 'left', label: 'Price', field: 'price', sortable: true },
            { name: 'status', align: 'left', label: 'Status', field: 'status', sortable: true },
            { name: 'created_at', align: 'left', label: 'Created At', field: 'created_at', sortable: true },
            { name: 'action', align: 'left', label: 'Action', field: 'action', sortable: false },
        ];

       const rows_pending = ref([]);

       const columns_approved = [
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
            { name: 'action', align: 'left', label: 'Action', field: 'action', sortable: false }
        ];

        const rows_approved = ref([]);
        const filter_approved = ref('');


         const columns_completed = [
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

        const rows_completed = ref([]);
        const filter_completed = ref('');

      const columns_cancel = [
            { name: 'recid', align: 'left', label: 'RecID', field: 'recid', sortable: true },
            { name: 'owner_name', align: 'left', label: 'Owner', field: 'owner_name', sortable: true },
            { name: 'vehicle_name', align: 'left', label: 'VehicleName', field: 'vehicle_name', sortable: true },
            { name: 'vehicle_type', align: 'left', label: 'Vehicle Type', field: 'vehicle_type', sortable: true },
            { name: 'pickup_address', align: 'left', label: 'Pickup Address', field: 'pickup_address', sortable: true },
            { name: 'vehicle_specs', align: 'left', label: 'Specification', field: 'vehicle_specs', sortable: true },
            { name: 'price', align: 'left', label: 'Price', field: 'price', sortable: true },
            { name: 'status', align: 'left', label: 'Status', field: 'status', sortable: true },
            { name: 'created_at', align: 'left', label: 'Created At', field: 'created_at', sortable: true },
            { name: 'cancel_at', align: 'left', label: 'Cancel At', field: 'cancel_at', sortable: false },
        ];

       const rows_cancel = ref([]);
       const filter_cancel = ref('');


      function getCancelledTransactions() {
        const formdata = new FormData();
        const barRef = bar.value;
        barRef.start();

        formdata.append('u_id', $q.sessionStorage.getItem('u_id'));
        formdata.append('status', 'CANCELLED');
            
          axios({
                method: 'POST',
                url: url+'/GetTransactions',
                data: formdata,
                headers: { "Content-Type": "application/json" },
            })
            .then(response => {
              rows_cancel.value = response.data;
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

        formdata.append('u_id', $q.sessionStorage.getItem('u_id'));
        formdata.append('status', 'PENDING');
            
          axios({
                method: 'POST',
                url: url+'/GetTransactions',
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

        formdata.append('u_id', $q.sessionStorage.getItem('u_id'));
        formdata.append('status', 'FOR PICKUP');
            
          axios({
                method: 'POST',
                url: url+'/GetTransactions',
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

      function getCompletedTransactions() {
        const formdata = new FormData();
        const barRef = bar.value;
        barRef.start();

        formdata.append('u_id', $q.sessionStorage.getItem('u_id'));
        formdata.append('status', 'COMPLETED');
            
          axios({
                method: 'POST',
                url: url+'/GetTransactions',
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

      function DonePickup(id) {
        tran_id.value = id;
        ConfirmPickupDialog.value = true;
      }

      function ConfirmPickup() {
        
        const formdata = new FormData();
        const barRef = bar.value;
    
        formdata.append('id', tran_id.value);

        isDisabled.value = true;
        barRef.start();
            
          axios({
                method: 'POST',
                url: url+'/UpdateCompletedTransaction',
                data: formdata,
                headers: { "Content-Type": "application/json" },
            })
            .then(response => {
                
              if(response.data.msg == 'success') {
                $q.notify({
                  color: 'green-4',
                  textColor: 'white',
                  message: 'Sucessfully Updated!'
                });
              }
            })
            .catch(err =>  {
                console.log(err);
            }).finally(() => {
              barRef.stop();
              isDisabled.value = false;
              ConfirmPickupDialog.value = false;
              getApprovedTransactions();
            })
      }

      function CancelTransaction(id) {
        tran_id.value = id;
        CancelTransactionDialog.value = true;
      }

      function Cancel() {
        const formdata = new FormData();
        const barRef = bar.value;
    
        formdata.append('id', tran_id.value);

        isDisabled.value = true;
        barRef.start();
            
          axios({
                method: 'POST',
                url: url+'/CancelTransaction',
                data: formdata,
                headers: { "Content-Type": "application/json" },
            })
            .then(response => {
                
              if(response.data.msg == 'success') {
                $q.notify({
                  color: 'green-4',
                  textColor: 'white',
                  message: 'Sucessfully Cancelled!'
                });
              }
            })
            .catch(err =>  {
                console.log(err);
            }).finally(() => {
              barRef.stop();
              isDisabled.value = false;
              CancelTransactionDialog.value = false;
              getPendingTransactions();
              getCancelledTransactions();
            })
      }

      onMounted(() => {
        getPendingTransactions();
        getApprovedTransactions();
        getCompletedTransactions();
        getCancelledTransactions();
      });

    return {
      tab: ref('pending_pickup'),
      filter_pending,
      bar,
      columns_pending,
      rows_pending,
      rows_approved,
      filter_approved,
      columns_approved,
      DonePickup,
      ConfirmPickupDialog,
      ConfirmPickup,
      isDisabled,
      filter_completed,
      rows_completed,
      columns_completed,
      getCompletedTransactions,
      CancelTransaction,
      CancelTransactionDialog,
      Cancel,
      rows_cancel,
      columns_cancel,
      filter_cancel
    }
                
   }
}
</script>
