<template>
  <div class="task-detail-view container mt-5">
    <TaskDetail :task="task" />
  </div>
</template>

<script>
import TaskDetail from '../components/TaskDetail.vue';
import apiClient from '../axios';

export default {
  components: {
    TaskDetail,
  },
  data() {
    return {
      task: null,
    };
  },
  methods: {
    fetchTask() {
      const id = this.$route.params.id;
      apiClient.get(`/tasks/${id}`)
        .then(response => {
          this.task = response.data.data;
        })
        .catch(error => {
          console.error('Error fetching task details:', error);
        });
    },
  },
  created() {
    this.fetchTask();
  },
};
</script>

<style scoped>
.task-detail-view {
  background-image: url('/public/bc11.jpg');
  background-size: cover;
  background-position: center;
  padding: 20px;
  border-radius: 8px;
}
</style>