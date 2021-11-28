<template>
 <div class="q-pa-md" style="background: linear-gradient(#8274C5, #5A4A9F);">
    <div class="row justify-center align-items-center">
        <div class="col-xs-12 col-sm-12 col-md-6">
        <q-card>
        <q-card-section class="bg-deep-purple-7 text-white">
            <div class="text-h6">CAR RENT APP</div>
            <div class="text-subtitle2">Sign-up account here..</div>
        </q-card-section>
        <q-separator inset />
        <q-card-section>
            <q-form class="q-gutter-xs" @submit.prevent="onRegister" @reset="onReset">

                <q-input
                    filled
                    v-model="fname"
                    label="Firstname"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type your firstname']"
                />

                  <q-input
                    filled
                    v-model="mname"
                    label="Middlename"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type your middlename']"
                />

                <q-input
                    filled
                    v-model="lname"
                    label="Lastname"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type your lastname']"
                />

                 <q-input
                    filled
                    type="email"
                    v-model="email"
                    label="Email"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type your email']"
                />

                <q-input
                    filled
                    type="number"
                    v-model="phoneNumber"
                    label="Phone number"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type your phone number']"
                />

                <q-select filled v-model="userType" :options="options" label="User Type" lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please select usertype']" />

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

                <q-input
                    filled
                    type="password"
                    v-model="cpassword"
                    label="Confirm password"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Confirm password is required']"
                />

                <div>
                    <q-btn label="Sign-up" type="submit" :disable="isDisabled" color="secondary" icon-right="login" class="full-width text-white" />
                    <q-btn label="Reset" type="reset" color="primary" icon-right="restart_alt" class="q-ml-sm full-width bg-indigo-10 text-white"  style="margin-top: 10px;"/>
                    <q-btn label="Goback" :to="{ name: 'login' }" type="button" color="primary" icon-right="undo" class="full-width text-white" style="margin-top: 10px;"/>
                    
                    <!-- <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" /> -->
                    
                    
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

import { ref, getCurrentInstance} from 'vue';
import { useQuasar } from 'quasar';
import axios from 'axios';
import router from '../router';

export default {
  name: 'Register',
  setup () {
    const $q = useQuasar();
    const app = getCurrentInstance();
    const fname = ref(null);
    const lname = ref(null);
    const email = ref(null);
    const phoneNumber = ref(null);
    const username = ref(null);
    const password = ref(null);
    const cpassword = ref(null);
    const lat = 0;
    const lang = 0;
    const userType = ref(null);
    const mname = ref(null);
    const url = app.appContext.config.globalProperties.ApiUrl;
    const bar = ref(null)
    const isDisabled = ref(false)

    return {
        fname,
        lname,
        email,
        phoneNumber,
        username,
        password,
        cpassword,
        lat,
        lang,
        userType,
        mname,
        options: ['Owner','Customer'],
        bar,
        isDisabled,

        onRegister() {
           const formdata = new FormData();
           const barRef = bar.value;
           formdata.append('fname', fname.value);
           formdata.append('lname', lname.value);
           formdata.append('username', username.value);
           formdata.append('email', email.value);
           formdata.append('phone_number', phoneNumber.value);
           formdata.append('mname', mname.value);
           formdata.append('password', password.value);
           formdata.append('usertype', userType.value);
           formdata.append('lat', lat);
           formdata.append('lang', lang);

           if(password.value != cpassword.value) {
               $q.notify({
                    color: 'negative',
                    textColor: 'white',
                    message: 'Password and confirm password do not match!'
              });
              return false;
           }

            barRef.start();
            isDisabled.value = true;

           axios({
                method: 'POST',
                url: url+'/RegisterAccount',
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

                    setTimeout(() => {
                        router.push({ path: '/' })
                    },1500);

                }

                barRef.stop();
                isDisabled.value = false;
               
            })
            .catch(err =>  {
                console.log(err);
            });

        },
        onReset() {
            fname.value = null;
            lname.value = null;
            email.value = null;
            phoneNumber.value = null;
            username.value = null;
            password.value = null;
            cpassword.value = null;
        }
    }

  }
}
</script>
