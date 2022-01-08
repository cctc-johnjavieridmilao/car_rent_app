<template>
    <div class="q-pa-md bg-grey-3">
        <AdminSidebar />

       <p style="font-size: 17px;"><b>LIST OF BRAND</b></p>

       <q-btn color="primary" label="Add Item" icon-right="add" @click="AddBrand" /><br><br>

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
                            <span class="text-weight-medium">RecID</span> <span class="text-grey-8">: {{ props.row.RecID }}</span><br>
                            <span class="text-weight-medium">BrandName</span> <span class="text-grey-8">: {{ props.row.Brand_name }}</span><br>
  
                          </q-item-label>
                        </q-item-section>

                        <q-item-section top side>
                          <div class="text-grey-8 q-gutter-xs">
                            <q-btn size="12px" flat dense round icon="delete" @click="DeleteData(props)"/>
                            <q-btn size="12px" flat dense round icon="edit" @click="EditData(props)"/>

                          </div>
                        </q-item-section>
                      </q-item>
                         <q-separator />
                      </div>
                    </template>

          <template v-slot:top-right>
              <q-input dense debounce="300" placeholder="Search" style="width: 100%" color="primary" v-model="filter">
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



    <q-dialog v-model="AddDialog" full-width>
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Add Item</div>
        </q-card-section>

        <q-separator />
        <q-form class="q-gutter-sm" @submit.prevent="OnInsert" @reset="onReset">
        <q-card-section style="max-height: 50vh" class="scroll">
          
            <q-input filled v-model="brand_name" label="BrandName" lazy-rules
              :rules="[ val => val && val.length > 0 || 'BrandName is required']"
            />
           
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Close" type="reset" color="primary" v-close-popup />
          <q-btn flat type="submit" label="Submit" color="primary"/>
        </q-card-actions>

         </q-form>
      </q-card>
    </q-dialog>

     <q-dialog v-model="EditDialog" full-width>
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Edit Item</div>
        </q-card-section>

        <q-separator />
        <q-form class="q-gutter-sm" @submit.prevent="OnUpdate" @reset="onReset">
        <q-card-section style="max-height: 50vh" class="scroll">
          
            <q-input filled v-model="e_brand_name" label="BrandName" lazy-rules
              :rules="[ val => val && val.length > 0 || 'BrandName is required']"
            />
           
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Close" type="reset" color="primary" v-close-popup />
          <q-btn flat type="submit" label="Submit" color="primary"/>
        </q-card-actions>

         </q-form>
      </q-card>
    </q-dialog>

     <q-dialog v-model="ConfirmDeleteDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete" color="primary" text-color="white" />
          <span class="q-ml-sm">Are you sure you want to delete this item?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Delete" @click="ConfirmDelete" color="primary"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
      
  </div>
  <ChatSupport/>
</template>

<style scoped>
 .my-card {
     color: white;
 }
</style>

<script>
import { ref,onMounted,getCurrentInstance } from 'vue';
import AdminSidebar from '../../components/AdminSidebar.vue';
import axios from 'axios';
import ChatSupport from '../../components/ChatSupport.vue';
import { useQuasar } from 'quasar';


export default {
    components: {
        AdminSidebar,
        ChatSupport
    },
    setup() {
        const $q = useQuasar();
        const app = getCurrentInstance();
        const url = app.appContext.config.globalProperties.ApiUrl;

        const columns = [
            { name: 'RecID', align: 'left', label: 'RecID', field: 'RecID', sortable: true },
            { name: 'Brand_name', align: 'left', label: 'BrandName', field: 'Brand_name', sortable: true },
            { name: 'Created_at', align: 'left', label: 'Created_at', field: 'Created_at', sortable: true },
            { name: 'IsActive', align: 'left', label: 'IsActive', field: 'IsActive', sortable: true },
        ];
        const rows = ref([]);
        const filter = ref('');
        const bar = ref(null);
        const AddDialog = ref(false);
        const brand_name = ref(null);
        const EditDialog = ref(false);
        const e_brand_name = ref(null);
        const recid = ref(null);
        const ConfirmDeleteDialog = ref(false);

         function getBrandName() {
          const barRef = bar.value;
          barRef.start();

            axios({
                method: 'GET',
                url: url+'/GetBrand',
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

        function AddBrand() {
           AddDialog.value = true;
        }

        function OnInsert() {
         const formdata = new FormData();
         const barRef = bar.value;

         formdata.append('brand_name', brand_name.value);

         barRef.start();

           axios({
                method: 'POST',
                url: url+'/RegisterBrand',
                data: formdata,
                headers: { "Content-Type": "application/json" },
            })
            .then(response => {

              if(response.data.msg == 'success') {
                $q.notify({
                  color: 'green-4',
                  textColor: 'white',
                  message: 'Sucessfully Created!'
                });
              }

            })
            .catch(err =>  {
                console.log(err);
            }).finally(() => {
               barRef.stop();
               AddDialog.value = false;
               brand_name.value = '';
               getBrandName();
            })

        }

        function EditData(data) {
            recid.value = data.row.RecID;
            e_brand_name.value = data.row.Brand_name;
            EditDialog.value = true;
        }

        function DeleteData(data) {
            recid.value = data.row.RecID;
            ConfirmDeleteDialog.value = true;
        }

        function OnUpdate() {
        const formdata = new FormData();
         const barRef = bar.value;
         
         formdata.append('id', recid.value);
         formdata.append('brand_name', e_brand_name.value);

         barRef.start();

           axios({
                method: 'POST',
                url: url+'/UpdateBrand',
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
               EditDialog.value = false;
               getBrandName();
            })
        }

        function ConfirmDelete() {
           const formdata = new FormData();
         const barRef = bar.value;
         
         formdata.append('id', recid.value);

         barRef.start();

           axios({
                method: 'POST',
                url: url+'/DeleteBrand',
                data: formdata,
                headers: { "Content-Type": "application/json" },
            })
            .then(response => {

              if(response.data.msg == 'success') {
                $q.notify({
                  color: 'green-4',
                  textColor: 'white',
                  message: 'Sucessfully Deleted!'
                });
              }

            })
            .catch(err =>  {
                console.log(err);
            }).finally(() => {
               barRef.stop();
               ConfirmDeleteDialog.value = false;
               getBrandName();
            })
        }

        onMounted(() => {
            getBrandName();
        });

        return {
           columns,
           rows,
           filter,
           AddBrand,
           bar,
           AddDialog,
           OnInsert,
           brand_name,
           EditDialog,
           e_brand_name,
           recid,
           OnUpdate,
           EditData,
           ConfirmDeleteDialog,
           DeleteData,
           ConfirmDelete
        }
    }
}
</script>
