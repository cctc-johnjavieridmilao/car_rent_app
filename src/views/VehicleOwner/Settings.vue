<template>
    <div class="q-pa-md bg-grey-3">
        <OwnerSidebar />

     <p style="font-size: 17px;"> Settings</p>

     <q-tabs
        v-model="tab"
        dense
        align="left"
        class="bg-info text-white shadow-2"
        :breakpoint="0"
      >
        <q-tab name="account" label="Account details" />
        <q-tab name="changepass" label="Change password" />
      </q-tabs>

      <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="account">
            <div class="text-h6">Account Details</div>
               <q-form class="row q-col-gutter-md" @submit.prevent="OnSubmit">
                <div class="col-md-4 col-sm-12 col-xs-12">
                  <q-input
                    filled
                    v-model="fname"
                    label="Firstname"

                />
                </div>

                <div class="col-md-4 col-sm-12 col-xs-12">
                  <q-input
                    filled
                    v-model="mname"
                    label="Middlename"
 
                />
                </div>

                <div class="col-md-4 col-sm-12 col-xs-12">
                  <q-input
                    filled
                    v-model="lname"
                    label="Lastname"
  
                />
                </div>

                <div class="col-md-4 col-sm-12 col-xs-12">
                  <q-input
                    filled
                    v-model="username"
                    label="Username"
                />
                </div>

                <div class="col-md-4 col-sm-12 col-xs-12">
                  <q-input
                    type="email"
                    filled
                    v-model="email"
                    label="Email"
                />
                </div>

                <div class="col-md-4 col-sm-12 col-xs-12">
                  <q-input
                    type="number"
                    filled
                    v-model="phoneNumber"
                    label="Phone number"
                />
                </div>

                <div>
                    <q-btn label="Save changes" type="submit" class="float-right" icon-right="login"  color="primary"/>
                    
                </div>
                </q-form>
    
          </q-tab-panel>

          <q-tab-panel name="changepass">
            <div class="text-h6">Change password</div>
           <q-form class="row q-col-gutter-md" @submit.prevent="OnchangePass">
                <div class="col-md-4 col-sm-12 col-xs-12">
                  <q-input
                    type="password"
                    filled
                    v-model="currentPass"
                    label="Current password"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type your current password']"
                />
                </div>

                <div class="col-md-4 col-sm-12 col-xs-12">
                  <q-input
                   type="password"
                    filled
                    v-model="newpass"
                    label="New Password"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type your new password']"
                />
                </div>

                <div class="col-md-4 col-sm-12 col-xs-12">
                  <q-input
                   type="password"
                    filled
                    v-model="confirmPassword"
                    label="Confirm password"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type your confirm password']"
                />
                </div>


                <div>
                    <q-btn label="Reset password" type="submit" class="float-right" icon-right="login" color="primary"/>
                    
                </div>
                </q-form>
          </q-tab-panel>
        </q-tab-panels>
  </div>
  <ChatSupport/>
</template>

<script>
import { ref, getCurrentInstance } from 'vue';
import OwnerSidebar from '../../components/OwnerSidebar.vue';
import axios from 'axios';
import { useQuasar } from 'quasar';
import { onMounted } from 'vue';
import ChatSupport from '../../components/ChatSupport.vue';

export default {
    components: {
        OwnerSidebar,
        ChatSupport
    },
    setup () {
     const app = getCurrentInstance();
     const url = app.appContext.config.globalProperties.ApiUrl;
     const fname = ref(null);
     const mname = ref(null);
     const lname = ref(null);
     const email = ref(null);
     const phoneNumber = ref(null);
     const username = ref(null);
     const currentPass = ref(null);
     const newpass = ref(null);
     const confirmPassword = ref(null);
     const $q = useQuasar();

      onMounted(() => {
        const formdata = new FormData();
          formdata.append('uid', $q.sessionStorage.getItem('u_id'));
            axios({
                method: 'POST',
                url: url+'/GetProfile',
                data: formdata,
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then(response => {
              const res = response.data[0];
              fname.value = res.firtname;
              mname.value = res.middlename;
              lname.value = res.lastname;
              email.value = res.email;
              phoneNumber.value = res.phone_number;
              username.value = res.username;
            })
            .catch(err =>  {
                console.log(err);
            });
      });

      return {
        fname,
        mname,
        lname,
        email,
        phoneNumber,
        username,
        currentPass,
        newpass,
        confirmPassword,
        tab: ref('account'),
         OnSubmit() {
           const formdata = new FormData();
           formdata.append('uid', $q.sessionStorage.getItem('u_id'));
           formdata.append('fname', fname.value);
           formdata.append('mname', mname.value);
           formdata.append('lname', lname.value);
           formdata.append('email', email.value);
           formdata.append('username', username.value);
           formdata.append('phoneNumber', phoneNumber.value);

           axios({
                method: 'POST',
                url: url+'/UpdateProfile',
                data: formdata,
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then(response => {
               if(response.data.msg == 'success') {
                    $q.notify({
                      color: 'green-4',
                      textColor: 'white',
                      message: 'Successfully Updated'
                    })
               } else {
                  $q.notify({
                    color: 'negative',
                    textColor: 'white',
                    message: response.data.msg
                  })
               }
            })
            .catch(err =>  {
                console.log(err);
            });
        },
        OnchangePass() {
           const formdata = new FormData();
           formdata.append('uid', $q.sessionStorage.getItem('u_id'));
           formdata.append('current_pass', currentPass.value);
           formdata.append('new_pass', newpass.value);

           if(newpass.value != confirmPassword.value) {
             $q.notify({
                color: 'negative',
                textColor: 'white',
                message: 'New password and Confirm password not match!'
              });
              return false;
           }

          axios({
                method: 'POST',
                url: url+'/UpdatePassword',
                data: formdata,
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then(response => {
               if(response.data.msg == 'success') {
                    $q.notify({
                      color: 'green-4',
                      textColor: 'white',
                      message: 'Successfully Changed!'
                    })
               } else {
                  $q.notify({
                    color: 'negative',
                    textColor: 'white',
                    message: response.data.msg
                  })
               }
            })
            .catch(err =>  {
                console.log(err);
            });

        }
      }
   }
  
}
</script>
