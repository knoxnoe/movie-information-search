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
  },
  data () {
    return {

    }
  },
  mounted(){
    this.getFindList()
  },
  methods:{
    getFindList(){
      console.log(this.$store.state.UserState.token)
      var PostUrl = this.$store.state.BaseConfig.httpsUrl + '/api/v1/feeds/'
      this.axios.get(PostUrl,{
          'token': this.$store.state.UserState.token
      }).then(response => {
          console.log(response)
          response = response.data;
      })
    }
  }
}
</script>
<style lang="stylus">
body
  margin 0px
.find
  padding 20px 40px
</style>