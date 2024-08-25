<script setup>

import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import axios from "axios";

const id = ref('')
const tasks = ref([])
const route = useRoute()
id.value = route.params.id

const getTask = async () => {

    const res = await axios.get('http://localhost:8000/api/v1/tasks/'+id.value)
    tasks.value = res.data.data;

};
onMounted(() => {
  getTask();
});
</script>

<template>
  <div class="m-4">

    <router-link class="" to="/tasks">Go Back</router-link>
    <h2>Task details</h2>
    <h4>{{tasks.title}}</h4>
    <p>{{tasks.description}}</p>
  </div>
</template>

<style scoped>

</style>