<template>
    <div>
        <q-card class="my-card">
         <q-carousel swipeable animated v-model="slide" thumbnails infinite style="width: 100%;">
            <q-carousel-slide v-for="(image, index) in images_array" :key="image.RecID" :name="index" @click="ViewImage(upload_url + image.image_name)" :img-src="upload_url + image.image_name" />
         </q-carousel>
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
        ImgesID: String
    },
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
