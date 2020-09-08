<template>
  <div class="home">
  <button @click="add">添加</button>
  <button @click="remove">删除</button>
  <transition-group tag="ul" name="fade">
    <li v-for="item in items" :key="item">
      {{ item }}
    </li>
  </transition-group>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data(){
    return({
      items: [0, 1]
    })
  },
  methods:{
    add() {
      this.items.push(this.items.length)
    },
    remove() {
      this.items.pop()
    }
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
	transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
	opacity: 0;
}
</style>
