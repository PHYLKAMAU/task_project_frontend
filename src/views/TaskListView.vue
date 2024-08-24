
<script setup>
import {ref} from "vue";
import axios from "axios";

const title = ref('')
const description = ref('')

const submitForm =async () => {
  const formData = new FormData();
  formData.append('title', title.value)
  formData.append('description', description.value)
  const res = await axios.post('tasks', formData)
  if (res.status === 200) {
    if (res.data.status === 'success') {

    }
  }
}

</script>

<template>
  <div class="task-list container mt-5">
    <h2>Your Tasks  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
      Add Task
    </button>    </h2>
    <ul>
      <li class="">Go wash <i class="bi bi-trash-fill"></i>
      </li>
      <li>Go cook </li>
      <li>Go play </li>
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
                  class="form-control"
                  required
              />
            </div>
            <div class="mb-3">
              <label for="description" class="form-label">Description</label>
              <textarea
                  id="description"
                  class="form-control"
                  required
              ></textarea>
            </div>
            <button  type="submit" class="btn btn-primary">
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