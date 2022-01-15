<template>
    <div>
        <q-card class="my-card">
         <q-carousel swipeable animated v-model="slide" thumbnails infinite>
            <q-carousel-slide v-for="(image, index) in images_array" :key="image.RecID" :name="index"  @click="ViewImage(upload_url + image.image_name)" :img-src="upload_url + image.image_name" />
      </q-carousel>

      <q-card-section>
        <q-btn
          fab
          color="primary"
          icon="place"
          class="absolute"
          style="top: 0; right: 12px; transform: translateY(-50%);"
          @click="$emit('Viewmap', {RecID: RecID, pickupAddress: pickupAddress, lat: lat, lang: lang})"
        />
        
        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">
            {{ title }}
          </div>
          <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
            <q-icon name="place" />
            {{ pickupAddress.substring(0, 15) + '...' }}
          </div>
        </div>
        <div class="text-subtitle1">
          <q-badge color="green" :label="'BRAND: ' + brand" />
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-subtitle1">
          
        </div>
        <div class="text-subtitle1">
          Price: &#8369; {{ price }}
        </div>
        <br>
        <div class="text-subtitle1">
          <q-badge :color="status == 'AVAILABLE' ? 'primary' : 'red' " :label="status" />
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions>
        <q-btn flat round icon="event" />
        <q-btn flat color="primary"
         :disable="status == 'AVAILABLE' ? false : true"  
         @click="$emit('RentVehicle', {RecID: RecID, name: title, Description: Description, VehicleType: VehicleType, Owner: Owner, Price: price,pickupAddress: pickupAddress,brand: brand})">
          RENT VEHICLE
        </q-btn>

        <q-space />

        <!-- <q-btn flat round color="grey" icon="favorite" /> -->

        <q-btn
          color="grey"
          round
          flat
          dense
          :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          @click="expanded = !expanded"
        />

      </q-card-actions>

       <q-slide-transition>
        <div v-show="expanded">
          <q-separator />
          <q-card-section class="text-subitle2">
            {{ Description }}
          </q-card-section>
        </div>
      </q-slide-transition>
    </q-card>


    <q-dialog v-model="image_viewer" full-width>
      <q-card class="my-card">
        <q-img :src="image_data" />
      </q-card>
    </q-dialog>
    </div>
</template>


<script>
import { ref,onMounted, getCurrentInstance } from 'vue';
import axios from 'axios';

export default {
    props: {
        RecID: String,
        title: String,
        price: String,
        Description: String,
        location: String,
        ImgesID: String,
        Owner: String,
        VehicleType: String,
        pickupAddress: String,
        lat: String,
        lang: String,
        status: String,
        brand: String
    },
    emits: ['RentVehicle','Viewmap'],
    setup(props) {

        const images_array = ref([]);
        const app = getCurrentInstance();
        const url = app.appContext.config.globalProperties.ApiUrl;
        const image_data = ref(null);
        const image_viewer = ref(false);

        function getImages() {
            const formdata = new FormData();
            formdata.append('ids', props.ImgesID);
            axios({
                method: 'POST',
                url: url+'/GetUploadImages',
                data: formdata,
                headers: { "Content-Type": "application/json" },
            })
            .then(response => {
               images_array.value = response.data;
            })
            .catch(err =>  {
                console.log(err);
            });
        }

        function ViewImage(image) {
           image_data.value = image;
           image_viewer.value = true;

        }

        onMounted(() => {
           getImages();
        });

        return {
            slide: ref(0),
            expanded: ref(false),
            images_array,
            upload_url: app.appContext.config.globalProperties.UploadUrl,
            image_data,
            image_viewer,
            ViewImage
        }
    },
}
</script>
