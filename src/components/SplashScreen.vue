<template>
  <div class="splash-screen">
    <div class="splash-content">
      <h1>Welcome to Task Management System</h1>
      <p>Your tasks, managed efficiently.</p>
      <button class="btn btn-primary" @click="navigateToTasks">Get Started</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    navigateToTasks() {
      this.$router.push({ name: 'TaskList' });
    },
  },
};
</script>

<style scoped>
.splash-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url('/public/bc11.jpg');
  background-size: cover;
  background-position: center;
}

.splash-content {
  text-align: center;
  color: white;
}

.splash-content h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.splash-content p {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

.splash-content button {
  padding: 0.75rem 1.5rem;
  font-size: 1.25rem;
}
</style>
