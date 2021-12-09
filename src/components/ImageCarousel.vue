<template>
    <div>
        <q-card class="my-card">
         <q-carousel swipeable animated v-model="slide" thumbnails infinite style="width: 550px;">
            <q-carousel-slide v-for="(image, index) in images_array" :key="image.RecID" :name="index" :img-src="upload_url + image.image_name" />
         </q-carousel>
    </q-card>
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

        onMounted(() => {
           getImages();
        });

        return {
            slide: ref(0),
            expanded: ref(false),
            images_array,
            upload_url: app.appContext.config.globalProperties.UploadUrl
        }
    },
}
</script>
