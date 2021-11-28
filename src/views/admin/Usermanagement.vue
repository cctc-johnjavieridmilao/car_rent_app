<template>
    <div class="q-pa-md">
        <AdminSidebar />

       <p style="font-size: 17px;">User management</p>

      <q-table
        title="Users"
        :rows="rows"
        :columns="columns"
        row-key="recid"
        :filter="filter"
        :loading="loading"
        :dense="$q.screen.lt.md"
      >

       <template v-slot:top-left>
        <q-btn color="primary" label="Add User" icon-right="add" @click="AddUser" />
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="recid" :props="props">
            {{ props.row.recid }}
          </q-td>
          <q-td key="username" :props="props">
             {{ props.row.username }}
          </q-td>
          <q-td key="firstname" :props="props">
           {{ props.row.firstname }}
          </q-td>
          <q-td key="middlename" :props="props">
             {{ props.row.middlename }}
          </q-td>
          <q-td key="lastname" :props="props">
            {{ props.row.lastname }}
          </q-td>
          <q-td key="email" :props="props">
            {{ props.row.email }}
          </q-td>
          <q-td key="phonenumber" :props="props">
            {{ props.row.phonenumber }}
          </q-td>
          <q-td key="usertype" :props="props">
            {{ props.row.usertype }}
          </q-td>
          <q-td key="action" :props="props" class="q-gutter-xs">
             <q-btn push  color="primary" rounded  label="" icon-right="mode" size="sm" 
             @click="UpdateItems(props.row.recid)"
             />
             <q-btn push  color="red" rounded  label="" icon-right="delete" size="sm" @click="DeleteItems(props.row.recid)"/>
          </q-td>
        </q-tr>
      </template>

     <template v-slot:top-right>
        <q-input dense debounce="300" placeholder="Search" color="primary" v-model="filter">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

    </q-table>

    <q-dialog v-model="editDataDialog">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Update User</div>
        </q-card-section>

        <q-separator />
        <q-form class="q-gutter-sm" @submit.prevent="Onupdate" @reset="onReset">
        <q-card-section style="max-height: 50vh" class="scroll">
          
            <q-input filled v-model="username" label="Username" lazy-rules
              :rules="[ val => val && val.length > 0 || 'Username is required']"
            />

            <q-input filled v-model="fname" label="Firstname" lazy-rules
              :rules="[ val => val && val.length > 0 || 'Firstname is required']"
            />

            <q-input filled v-model="mname" label="Middlename" lazy-rules
              :rules="[ val => val && val.length > 0 || 'Middlename is required']"
            />

            <q-input filled v-model="lname" label="Lastname" lazy-rules
              :rules="[ val => val && val.length > 0 || 'Lastname is required']"
            />

            <q-input filled type="email" v-model="email" label="Email" lazy-rules
              :rules="[ val => val && val.length > 0 || 'Email is required']"
            />

            <q-input filled type="number" v-model="phonenumber" label="Phone Number" lazy-rules
              :rules="[ val => val && val.length > 0 || 'PhoneNumber is required']"
            />

            <q-select filled v-model="userType" :options="options" label="User Type" lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please select usertype']" />
           
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Close" type="reset" color="primary" v-close-popup />
          <q-btn flat type="submit" label="Submit" color="primary"/>
        </q-card-actions>

         </q-form>
      </q-card>
    </q-dialog>


       <q-dialog v-model="AddUserDialog">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Add User</div>
        </q-card-section>

        <q-separator />
        <q-form class="q-gutter-sm" @submit.prevent="OnInsert" @reset="onReset">
        <q-card-section style="max-height: 50vh" class="scroll">
          
            <q-input filled v-model="a_username" label="Username" lazy-rules
              :rules="[ val => val && val.length > 0 || 'Username is required']"
            />

            <q-input filled v-model="a_fname" label="Firstname" lazy-rules
              :rules="[ val => val && val.length > 0 || 'Firstname is required']"
            />

            <q-input filled v-model="a_mname" label="Middlename" lazy-rules
              :rules="[ val => val && val.length > 0 || 'Middlename is required']"
            />

            <q-input filled v-model="a_lname" label="Lastname" lazy-rules
              :rules="[ val => val && val.length > 0 || 'Lastname is required']"
            />

            <q-input filled type="email" v-model="a_email" label="Email" lazy-rules
              :rules="[ val => val && val.length > 0 || 'Email is required']"
            />

            <q-input filled type="number" v-model="a_phonenumber" label="Phone Number" lazy-rules
              :rules="[ val => val && val.length > 0 || 'PhoneNumber is required', 
               val => val.length <= 11 || 'Invalid phone number']"
            />

            <q-select filled v-model="a_userType" :options="options" label="User Type" lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please select usertype']" />

            <q-input filled type="password" v-model="a_password" label="Password" lazy-rules
              :rules="[ val => val && val.length > 0 || 'Password is required']"
            />

            <q-input filled type="password" v-model="a_confirm_password" label="Confirm password" lazy-rules
              :rules="[ val => val && val.length > 0 || 'Confirm password is required']"
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
          <span class="q-ml-sm">Are you sure you want to delete this user?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Delete" @click="ConfirmDelete" color="primary"/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-ajax-bar
        ref="bar"
        position="top"
        color="accent"
        size="10px"
        skip-hijack
      />
  </div>
</template>

<script>
import { ref, onMounted, getCurrentInstance } from 'vue'
import AdminSidebar from '../../components/AdminSidebar.vue';
import axios from 'axios'; 
import { useQuasar } from 'quasar'

export default {
    components: {
        AdminSidebar
    },
    setup() {
        const filter = ref('');
        const $q = useQuasar();
        const bar = ref(null);
        const app = getCurrentInstance();

        const columns = [
            { name: 'recid', align: 'left', label: 'RecID', field: 'recid', sortable: true },
            { name: 'username', align: 'left', label: 'Username', field: 'username', sortable: true },
            { name: 'firstname', align: 'left', label: 'Firstname', field: 'firstname', sortable: true },
            { name: 'middlename', align: 'left', label: 'Middlename', field: 'middlename', sortable: true },
            { name: 'lastname', align: 'left', label: 'Lastname', field: 'lastname', sortable: true },
            { name: 'email', align: 'left', label: 'Email', field: 'email', sortable: true },
            { name: 'phonenumber', align: 'left', label: 'PhoneNumber', field: 'phonenumber', sortable: true },
            { name: 'usertype', align: 'left', label: 'Usertype', field: 'usertype', sortable: true },
            { name: 'action', align: 'left', label: 'Action', field: 'action', sortable: false },
        ];
         const rows = ref([]);
        
         const url = app.appContext.config.globalProperties.ApiUrl;
         const loading = ref(true);
         const editDataDialog = ref(false);
         const ConfirmDeleteDialog = ref(false);
         const AddUserDialog = ref(false);

         const  username = ref(null);
         const  fname = ref(null);
         const  lname = ref(null);
         const  mname = ref(null);
         const  email = ref(null);
         const  phonenumber = ref(null);
         const  userType = ref(null);
         const  userid = ref(null);

         const  a_username = ref(null);
         const  a_fname = ref(null);
         const  a_lname = ref(null);
         const  a_mname = ref(null);
         const  a_email = ref(null);
         const  a_phonenumber = ref(null);
         const  a_userType = ref(null);
         const a_password = ref(null);
         const a_confirm_password = ref(null);

         function getUsers() {
           
           axios({
                method: 'GET',
                url: url+'/GetUsers',
                headers: { "Content-Type": "application/json" },
            })
            .then(response => {
              rows.value = response.data;
            })
            .catch(err =>  {
                console.log(err);
            }).finally(() => {
              loading.value = false;
            })
         }

         function DeleteItems(id) {
            ConfirmDeleteDialog.value = true;
            userid.value = id;
         }

         function ConfirmDelete() {
           const formdata = new FormData();
           const barRef = bar.value;
           formdata.append('uid', userid.value);

           barRef.start();

            axios({
                method: 'POST',
                url: url+'/DeleteUser',
                data: formdata,
                headers: {"Content-Type": "application/json" },
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
               getUsers();
               ConfirmDeleteDialog.value = false;
            })
         }

         function UpdateItems(id) {
           const formdata = new FormData();
           const barRef = bar.value;
           formdata.append('uid', id);

           barRef.start();
            axios({
                method: 'POST',
                url: url+'/GetProfile',
                data: formdata,
                headers: {"Content-Type": "application/json" },
            })
            .then(response => {
               const data = response.data[0];
               username.value = data.username;
               fname.value = data.firtname;
               mname.value = data.middlename;
               lname.value = data.lastname;
               email.value = data.email;
               phonenumber.value = data.phone_number;
               userType.value = data.user_type;

            })
            .catch(err =>  {
                console.log(err);
            }).finally(() => {
              barRef.stop();
            })

            userid.value = id;
            editDataDialog.value = true;
         }

         function Onupdate() {
            const formdata = new FormData();
            const barRef = bar.value;
            
            formdata.append('uid', userid.value);
            formdata.append('username', username.value);
            formdata.append('fname', fname.value);
            formdata.append('mname', mname.value);
            formdata.append('lname', lname.value);
            formdata.append('email', email.value);
            formdata.append('phonenumber', phonenumber.value);
            formdata.append('userType', userType.value);

            barRef.start();

            axios({
                method: 'POST',
                url: url+'/UpdateProfile',
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
               editDataDialog.value = false;
               getUsers();
            })
            
         }

         function AddUser() {
            AddUserDialog.value = true;
         }

         function OnInsert() {
           const formdata = new FormData();
           const barRef = bar.value;
            
            formdata.append('username', a_username.value);
            formdata.append('fname', a_fname.value);
            formdata.append('mname', a_mname.value);
            formdata.append('lname', a_lname.value);
            formdata.append('email', a_email.value);
            formdata.append('phone_number', a_phonenumber.value);
            formdata.append('usertype', a_userType.value);
            formdata.append('password', a_password.value);
            formdata.append('lat', '');
            formdata.append('lang', '');

            if(a_password.value != a_confirm_password.value) {
                $q.notify({
                    color: 'green-4',
                    textColor: 'red',
                    message: 'Password and Confirm password do not match!'
                });
                return false;
            }

            barRef.start();

            axios({
                method: 'POST',
                url: url+'/RegisterAccount',
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
               AddUserDialog.value = false;
               getUsers();
               onReset();
            })
         }

         function onReset() {
           a_username.value = '';
           a_fname.value = '';
           a_mname.value = '';
           a_lname.value = '';
           a_email.value = '';
           a_phonenumber.value = '';
           a_password.value = '';
           a_confirm_password.value = '';
           a_userType.value = '';
         }

        onMounted(() => {
           getUsers();
        });

        return {
            username,
            fname,
            lname,
            mname,
            email,
            phonenumber,
            userType,
            a_username,
            a_fname,
            a_lname,
            a_mname,
            a_email,
            a_phonenumber,
            a_userType,
            a_password,
            a_confirm_password,
            options: ['Owner','Customer'],
            columns,
            rows,
            filter,
            loading,
            DeleteItems,
            UpdateItems,
            editDataDialog,
            Onupdate,
            bar,
            ConfirmDelete,
            ConfirmDeleteDialog,
            AddUserDialog,
            AddUser,
            OnInsert,
            onReset
        }
    }
}
</script>
