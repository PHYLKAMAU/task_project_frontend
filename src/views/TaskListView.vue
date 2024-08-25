<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";

const title = ref('');
const description = ref('');
const status = ref('');
const id = ref('');
const tasks = ref([]);

const is_edit = ref(false);
function editTask(task) {
  title.value = task.title;
  description.value = task.description;
  id.value = task.id;
  is_edit.value = true;
}
const  deleteTask= async ($id) =>{
  const res = await axios.delete('http://localhost:8000/api/v1/tasks/delete/'+$id);

  if(res.data.status ==='success'){
    status.value = res.data.message;
    getTasks();
  }

}
const  markTaskcomplete= async ($id) =>{
  const res = await axios.patch('http://localhost:8000/api/v1/tasks/complete/'+$id);

  if(res.data.status ==='success'){
    status.value = res.data.message;
    getTasks();
  }

}

const submitForm = async () => {
  const formData = new FormData();
  formData.append('title', title.value);
  formData.append('description', description.value);

  try {
    if (is_edit.value === true) {
      const res = await axios.post(`http://localhost:8000/api/v1/tasks/update/${id.value}`, formData);

      if(res.data.status ==='success'){
        status.value = res.data.message;
        clearTask();
        getTasks();

      }

    } else {
      const res = await axios.post('http://localhost:8000/api/v1/tasks', formData);
      if(res.data.status ==='success'){
        status.value = res.data.message;
        clearTask();
        getTasks();
      }
    }

  } catch (error) {
    console.error('Error during API request:', error);
  }
};


function clearTask() {
  title.value = '';
  description.value = '';
  id.value = '';
  is_edit.value = false;
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
  <div style="width: 600px; background: #ddd;" class="task-list container mt-4 pb-4">
    <h2 class="d-flex justify-content-between p-2">
      Your Tasks
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        Add Task
      </button>
    </h2>
    <hr>
    <div v-if="status" class="">
      <div class="p-2 bg-info text-uppercase text-center text-white">{{ status }}</div>
    </div>
    <ul class="list-unstyled" v-for="task in tasks" :key="task.id">
      <li :class="['d-flex', 'flex-row', 'justify-content-between', { 'text-decoration-line-through': task.is_completed }]">        {{ task.title }}
        <div class="icons">
          <i @click="markTaskcomplete(task.id)" class="bi bi-check-circle-fill"></i>
          <i @click="editTask(task)" data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="bi bi-pen-fill ms-3"></i>
          <i @click="deleteTask(task.id)" class="bi mx-3 bi-trash-fill" ></i>
          <router-link :to="/tasks/+task.id">view</router-link>
        </div>
      </li>
    </ul>

    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content p-4">
          <div class="modal-header">
            <h1 class="modal-title fs-5" :id="is_edit ? 'edit-task-label' : 'create-task-label'">
              {{ is_edit ? 'Edit Task' : 'Create Task' }}
            </h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" @click="clearTask" aria-label="Close"></button>
          </div>

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
            <button
                type="submit"
                class="btn btn-primary"
                data-bs-dismiss="modal"
            >
              {{ is_edit ? 'Edit Task' : 'Create Task' }}
            </button>
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
ul li {
  font-size: 30px;
}
ul li:hover {
  background: cornflowerblue;
}
.icons i {
  font-size: 30px;
}
.icons i:nth-child(1) {
  color: blue;
}
.icons i:nth-child(2) {
  color: green;
}
.icons i:nth-child(3) {
  color: red;
}
</style>
