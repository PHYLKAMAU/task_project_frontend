<template>
  <div class="list-group-item list-group-item-action">
    <h5 @click="viewTask">{{ task.title }}</h5>
  </div>
</template>

<script>
export default {
  props: {
    task: Object,
  },
  methods: {
    viewTask() {
      this.$emit('view-task', this.task.id);
    },
  },
};
</script>

<style scoped>
h5 {
  cursor: pointer;
}
</style>
