<template>
  <div class="find">
    <h1>发现别人家的事</h1>
    <keep-alive>
      <List></List>
    </keep-alive>
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
.find
  padding 20px 40px
</style>