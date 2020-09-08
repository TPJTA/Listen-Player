<template>
  <div class="header">
      <input type="text" class="search-box">
  </div>
</template>

<script>
export default {
  name: "Header"
}
</script>

<style scoped>
.search-box {
    padding: 2px 10px;
    height: 20px;
    width: 250px;
    border: none;
    outline: none;
    background: #bbb;
    border-radius: 10px;
    font: 12px;
}
</style>