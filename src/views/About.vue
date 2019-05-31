<template>
  <div class="about">
    <h1>圈子里的那点事</h1>
    <List></List>
  </div>
</template>
<script>
import List from '@/components/list.vue'
export default {
  components:{
    List
  }
}
</script>
<style lang="stylus">
body
  margin 0px
.about
  padding 20px 40px
</style>