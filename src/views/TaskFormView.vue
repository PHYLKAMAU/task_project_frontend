<template>
  <div class="task-form-view container mt-5">
    <h2>{{ isEdit ? 'Edit Task' : 'Create New Task' }}</h2>
    <TaskForm :task="task" @submit-task="handleSubmit" @fetch-task="fetchTask" />
  </div>
</template>

<script>
import TaskForm from '../components/TaskForm.vue';
import apiClient from '../axios';

export default {
  components: {
    TaskForm,
  },
  data() {
    return {
      task: {
        title: '',
        description: '',
        is_completed: false,
      },
      isEdit: false,
    };
  },
  methods: {
    handleSubmit() {
      this.$router.push({name: 'TaskList'});
    },
    fetchTask() {
      const id = this.$route.params.id;
      if (id) {
        this.isEdit = true;
        apiClient.get(`/tasks/${id}`)
            .then(response => {
              this.task = response.data.data;
            })
            .catch(error => {
              alert('Error fetching task: ' + (error.response?.data?.message || error.message));
              console.error('Error fetching task:', error);
            });
      }
    },
  },
  created() {
    this.fetchTask();
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
