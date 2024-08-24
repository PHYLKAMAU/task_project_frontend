<template>
  <div class="task-list container mt-5">
    <h2>Your Tasks</h2>
    <div v-if="tasks.length">
      <TaskItem v-for="task in tasks" :key="task.id" :task="task" />
    </div>
    <div v-else>
      <p>No tasks available.</p>
    </div>
    <router-link to="/tasks/new" class="btn btn-primary mt-3">Add New Task</router-link>
  </div>
</template>

<script>
import TaskItem from '../components/TaskItem.vue';
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
      apiClient.get('/tasks')
        .then(response => {
          this.tasks = response.data.data;
        })
        .catch(error => {
          console.error('Error fetching tasks:', error);
        });
    },
  },
  created() {
    this.fetchTasks();
  },
};
</script>


<style scoped>
.task-form {
  background-image: url('/public/bc11.jpg');
  background-size: cover;
  background-position: cover;
  padding: 20px;
  border-radius: 8px;
}
</style>