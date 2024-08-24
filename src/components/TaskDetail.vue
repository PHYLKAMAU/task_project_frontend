<template>
  <div class="task-detail card">
    <div class="card-body">
      <h5 class="card-title">{{ task.title }}</h5>
      <p class="card-text">{{ task.description }}</p>
      <button @click="markAsCompleted" class="btn btn-success">
        {{ task.is_completed ? 'Mark as Incomplete' : 'Mark as Completed' }}
      </button>
      <router-link to="/tasks" class="btn btn-secondary ms-2">Back to List</router-link>
    </div>
  </div>
</template>

<script>
import apiClient from '../axios';

export default {
  props: {
    task: Object,
  },
  methods: {
    markAsCompleted() {
      apiClient.patch(`/tasks/${this.task.id}/complete`)
        .then(() => {
          this.$emit('task-updated');
        })
        .catch(error => {
          console.error('Error updating task status:', error);
        });
    },
  },
};
</script>

<style scoped>
.task-detail {
  background-image: url('/public/bc11.jpg');
  background-size: cover;
  background-position: center;
  padding: 20px;
  border-radius: 8px;
}
</style>
