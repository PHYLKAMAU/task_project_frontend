
<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";

const title = ref('')
const description = ref('')
const status = ref('')
const tasks = ref(  [])


const submitForm =async () => {
  const formData = new FormData();
  formData.append('title', title.value)
  formData.append('description', description.value)
  const res = await axios.post('http://localhost:8000/api/v1/tasks', formData)
  if (res.status === 200) {
      tasks.value =res.data;
  }
  status.value =res.data.message
  getTasks()
}
const getTasks = async () => {
  try {
    const res = await axios.get('http://localhost:8000/api/v1/tasks', {
      withCredentials: true // If you need to send cookies or other credentials
    });
    tasks.value = res.data.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    // Handle error, e.g., display an error message to the user
  }
};



onMounted(() => {
  getTasks();
});

</script>

<template>
<!--  {{tasks}}-->
  <div style="width: 600px; background: #ddd;" class="task-list container mt-4 pb-4 ">
    <h2 class="d-flex justify-content-between p-2">Your Tasks  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
      Add Task
    </button>    </h2>
    <hr>
    <div v-if="status" class="">
      <div class="p-2 bg-danger text-white">{{status}}</div>
    </div>
    <table>
        <tr>
          <th></th>
        </tr>
    </table>
    <ul class="list-unstyled" v-for="task in tasks" :task>
      <li class="d-flex flex-row justify-content-between"> {{ task.title }} <div class="">
        <i class="bi bi-check-circle-fill"></i><i class="bi bi-pen-fill  ms-3 "></i><i class="bi mx-3 bi-trash-fill"></i></div>
      </li>
    </ul>
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">


        <div class="modal-content p-4">
          <h5 class="card-title"> Create task</h5>
          <form @submit.prevent="submitForm">
            <div class="mb-3">
              <label for="title" class="form-label">Title</label>
              <input
                  type="text"
                  id="title"
                  v-model="title"
                  class="form-control"
                  required
              />
            </div>
            <div class="mb-3">
              <label for="description" class="form-label">Description</label>
              <textarea
                  id="description"
                  v-model="description"
                  class="form-control"
                  required
              ></textarea>
            </div>
            <button  type="submit" class="btn btn-primary" data-bs-dismiss="modal">
              Create Task
            </button>
            <!--          <router-link to="/tasks" class="btn btn-secondary ms-2">Cancel</router-link>-->
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.task-form {
  background-image: url('/public/bc11.jpg');
  background-size: cover;
  background-position: center;
  padding: 20px;
  border-radius: 8px;
}
</style>