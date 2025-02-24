<script setup>
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="header">
    <h1>{{ title }}</h1>
  </div>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 50px;
  background-color: #4dd866;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

h1 {
  font-size: 18px;
  margin: 0;
}
</style> 