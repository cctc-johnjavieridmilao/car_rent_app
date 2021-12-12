<template>
    <div>
        
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
          <q-btn fab icon="chat" color="teal" @click="ChatDialog = true" size="50px"/>
      </q-page-sticky>


          <q-dialog
      v-model="ChatDialog"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="">
        <q-bar>
          <q-space />

          <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
            <q-tooltip v-if="maximizedToggle" class="bg-white text-primary">Minimize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
            <q-tooltip v-if="!maximizedToggle" class="bg-white text-primary">Maximize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="text-h6">Chat To:</div>

          <q-select filled v-model="users_model" @update:model-value="loadChat()" :options="users" label="Select Users" />
        </q-card-section>

        <q-card-section>
           <div class="q-pa-md row justify-center">
            <div style="width: 100%; max-width: 100%;height: 400px;overflow-y: scroll;overflow-x:hidden" id="chat_div">
              
              <q-chat-message
                v-for="(msg) in messages" :key="msg.RecID"
                :name="msg.send_by == userid ? msg.send_by_name : msg.send_to_name"
                :text="[msg.message]"
                :sent="msg.send_by == userid ? true : false"
                :stamp="msg.date"
              />
              
            </div>
          </div>
        </q-card-section>

         <q-footer class="bg-white">
           <div class="row q-pa-md">
              <div class="col-md-10 col-xs-9">
                <q-input filled v-model="text_msg" label="Enter message here.." />
              </div>
              <div class="col-md-2 col-xs-3">
               <q-btn color="primary" label="Send" @click="SendMessage" style="height: 55px;margin-left: 15px;" icon-right="send" />
              </div>
           </div>
        </q-footer>
      </q-card>
    </q-dialog>
    </div>
</template>


<script>
import { ref,onMounted, getCurrentInstance } from 'vue';
import axios from 'axios';
import { useQuasar } from 'quasar';

export default {
    setup() {

        const app = getCurrentInstance();
        const url = app.appContext.config.globalProperties.ApiUrl;

        const ChatDialog = ref(false);
        const maximizedToggle = ref(true);
        const users = ref([]);
        const users_model = ref(null);
        const text_msg = ref(null);
        const messages = ref([]);
        const $q = useQuasar();

       function getUsers() {
        const formdata = new FormData();
        formdata.append('uid', $q.sessionStorage.getItem('u_id'));

         axios({
            method: 'POST',
            url: url+'/GetChatUsers',
            data: formdata,
            headers: { "Content-Type": "application/json" },
        })
        .then(response => {
           users.value = response.data;
           console.log(users.value);
        })
        .catch(err =>  {
            console.log(err);
        });
      }

      function loadChat() {
        const value = users_model.value.value;
        const formdata = new FormData();

        formdata.append('send_by', $q.sessionStorage.getItem('u_id'));
        formdata.append('send_to', value);

        axios({
            method: 'POST',
            url: url+'/GetChatMessage',
            data: formdata,
            headers: { "Content-Type": "application/json" },
        })
        .then(response => {
           messages.value = response.data;
        })
        .catch(err =>  {
            console.log(err);
        });

        setTimeout(() => {
          document.querySelector('#chat_div').scrollTop = document.querySelector('#chat_div').scrollHeight;
        },500)

      }

      function SendMessage() {
       const formdata = new FormData();
       
        if(text_msg.value == null) {
            $q.notify({
                    color: 'red',
                    textColor: 'white',
                    message: 'Message is required'
            });
            return false;
        }

        if(users_model.value == null) {
             $q.notify({
                    color: 'red',
                    textColor: 'white',
                    message: 'Please select user'
            });
            return false;
        }

        formdata.append('send_by', $q.sessionStorage.getItem('u_id'));
        formdata.append('send_to', users_model.value.value);
        formdata.append('text_msg', text_msg.value);

        axios({
            method: 'POST',
            url: url+'/SaveChat',
            data: formdata,
            headers: { "Content-Type": "application/json" },
        })
        .then(response => {
           if(response.data.msg == 'success') {
             loadChat();
           }
           text_msg.value = '';
        })
        .catch(err =>  {
            console.log(err);
        });
         
      }

        onMounted(() => {
          getUsers();
        });

        return {
            ChatDialog,
            maximizedToggle,
            users,
            users_model,
            loadChat,
            text_msg,
            SendMessage,
            messages,
            userid: $q.sessionStorage.getItem('u_id')
        }
    },
}
</script>
