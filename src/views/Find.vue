<template>
  <div class="find">
    <h1>发现别人家的事</h1>
    <keep-alive>
      <List :dataList="findLists" :styles="listFind"></List>
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
      findLists: [],
      listFind: '_listStyle2'
    }
  },
  mounted(){
    this.getFindList()
  },
  methods:{
    getFindList(){
      var PostUrl = this.$store.state.BaseConfig.httpsUrl + '/api/v1/recommend/movie/'
      this.axios.get(PostUrl,{
        params: {
          'token': this.$store.state.UserState.token,
          start: 0,
          end: 20
        }
      }).then(response => {
          console.log(response)
          response = response.data;
          if(response.status == 200){
            this.findLists = response.data
          }
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