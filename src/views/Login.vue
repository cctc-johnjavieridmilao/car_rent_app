<template>
<div class="window-height window-width row justify-center items-center" style="background: linear-gradient(0deg, rgba(2,0,36,1) 5%, rgba(38,38,112,1) 47%, rgba(0,212,255,1) 100%);">
     <div class="row justify-center align-items-center">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
         

        <q-card>
        
        <q-card-section class="text-white" >
            <!-- <div class="text-h6">Carku: Rental Vehicle</div> !-->
             <q-img
                src="../assets/car_rent_logo_new.jpg"
                loading="lazy"
                height="200px"
                style="max-width: 150px;margin-left: 110px"
              />
            <div class="text-subtitle2">Sign-in your account here..</div>

          
        </q-card-section>
        <!-- <q-separator inset /> -->
        <q-card-section>
            <q-form class="q-gutter-sm" @submit.prevent="onLogin" @reset="onReset">
                <q-input
                    filled
                    v-model="username"
                    label="Username"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type your username']"
                />

                <q-input
                    filled
                    type="password"
                    v-model="password"
                    label="Password"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type your password']"
                />

                <div>
                    <q-btn label="Sign-in" type="submit" size="md" :disable="isDisbaled" icon-right="login" class="full-width text-white" color="secondary"/>
                    <q-btn label="Reset" type="reset" color="primary" icon-right="restart_alt" class="q-ml-sm full-width bg-indigo-10 text-white"  style="margin-top: 10px;"/>
                    <q-btn label="Register" type="button" size="md" color="primary" :to="{ name: 'register' }" icon-right="app_registration" style="margin-top: 10px;" class="full-width text-white" />
                </div>
                </q-form>
        </q-card-section>

        </q-card>
        </div>
  </div>

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

</style>

<script>

import { ref, getCurrentInstance } from 'vue'
import { useQuasar } from 'quasar'
import axios from 'axios';
import router from '../router';

export default {
  name: 'Login',
  setup () {
    const app = getCurrentInstance();
    const $q = useQuasar();
    const username = ref(null);
    const password = ref(null);
    const url = app.appContext.config.globalProperties.ApiUrl;
    const bar = ref(null)
    const isDisbaled = ref(false);
    
     return {
      username,
      password,
      bar,
      isDisbaled,

      onLogin () {

        const formdata = new FormData();
        const barRef = bar.value;
       
        formdata.append('username', username.value);
        formdata.append('password', password.value);

         barRef.start();

         isDisbaled.value = true;

        axios({
                method: 'POST',
                url: url+'/Login',
                data: formdata,
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then(response => {
                if(response.data.msg == 'success') {

                    $q.notify({
                      color: 'green-4',
                      textColor: 'white',
                      message: 'Welcome ' + response.data.fullname,
                      icon: 'done'
                    })

                    setTimeout(() => {
                       if(response.data.user_type == 'Admin') {
                         router.push({ path: '/admin' })
                       } else if(response.data.user_type == 'Owner') {
                          router.push({ path: '/owner' })
                       } else if(response.data.user_type == 'Customer') {
                          router.push({ path: '/customer' })
                       }
                    },1500);

                    $q.sessionStorage.set('u_id', response.data.user_id);
                    $q.sessionStorage.set('usertype', response.data.user_type);
                    $q.sessionStorage.set('fullname', response.data.fullname);

                } else {
                    $q.notify({
                      color: 'negative',
                      textColor: 'white',
                      message: response.data.msg,
                      icon: 'error'
                    })
                }

                barRef.stop();
                isDisbaled.value = false;
               
            })
            .catch(err =>  {
                console.log(err);
            });
        
      },

      onReset () {
        username.value = null
        password.value = null
      }
    }
  }
}
</script>
