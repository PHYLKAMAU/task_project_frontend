<template>
  <div class="task-list container mt-5">
    <h2>Your Tasks</h2>
    <div v-if="tasks.length">
      <TaskItem v-for="task in tasks" :key="task.id" :task="task" @delete-task="deleteTask" />
    </div>
    <div v-else>
      <p>No tasks available.</p>
    </div>
    <router-link to="/tasks/new" class="btn btn-primary mt-3">Create New Task</router-link>
  </div>
</template>

<script>
import TaskItem from './TaskItem.vue';
import apiClient from '../axios';

export default {
  components: {
    TaskItem,
  },
  data() {
    return {
      tasks: [],
    };
  },
  methods: {
    fetchTasks() {
      apiClient.get('/tasks').then(response => {
        this.tasks = response.data.data;
      }).catch(error => {
        console.error('Error fetching tasks:', error);
      });
    },
    deleteTask(id) {
      apiClient.delete(`/tasks/${id}`).then(() => {
        this.fetchTasks();
      }).catch(error => {
        console.error('Error deleting task:', error);
      });
    },
  },
  created() {
    this.fetchTasks();
  },
};
</script>
<style scoped>
.task-list {
  background-image: url('/public/bc11.jpg');
  background-size: cover;
  background-position: cover;
  padding: 20px;
  border-radius: 8px;
}
</>
