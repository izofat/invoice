<script setup>
if(!localStorage.getItem('positions')){
  localStorage.setItem('positions',JSON.stringify([]));
}
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
