<template>
  <div class="task-form container mt-5">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{ isEdit ? 'Edit Task' : 'New Task' }}</h5>
        <form @submit.prevent="submitForm">
          <div class="mb-3">
            <label for="title" class="form-label">Title</label>
            <input
              type="text"
              id="title"
              v-model="localTask.title"
              class="form-control"
              required
            />
          </div>
          <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <textarea
              id="description"
              v-model="localTask.description"
              class="form-control"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            class="btn btn-primary"
          >
            {{ isEdit ? 'Update' : 'Create' }}
          </button>
          <router-link to="/tasks" class="btn btn-secondary ms-2">Cancel</router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from '../axios';

export default {
  data() {
    return {
      localTask: {
        title: '',
        description: '',
        is_completed: false,
      },
    };
  },
  computed: {
    isEdit() {
      return !!this.$route.params.id;
    },
  },
  methods: {
    submitForm() {
      if (this.isEdit) {
        apiClient.put(`/tasks/${this.$route.params.id}`, this.localTask)
          .then(() => {
            alert('Task updated successfully!');
            this.$router.push({ name: 'TaskList' });
          })
          .catch(error => {
            alert('Error updating task: ' + error.message);
            console.error('Error updating task:', error);
          });
      } else {
        apiClient.post('/tasks', this.localTask)
          .then(() => {
            alert('Task created successfully!');
            this.$router.push({ name: 'TaskList' });
          })
          .catch(error => {
            alert('Error creating task: ' + error.message);
            console.error('Error creating task:', error);
          });
      }
    },
    fetchTask() {
      const id = this.$route.params.id;
      if (id) {
        apiClient.get(`/tasks/${id}`)
          .then(response => {
            this.localTask = response.data.data;
          })
          .catch(error => {
            alert('Error fetching task: ' + error.message);
            console.error('Error fetching task:', error);
          });
      }
    },
  },
  created() {
    if (this.isEdit) {
      this.fetchTask();
    }
  },
};
</script>


<style scoped>
.task-form {
  background-image: url('/public/bc11.jpg');
  background-size: cover;
  background-position: center;
  padding: 20px;
  border-radius: 8px;
}
</style>
