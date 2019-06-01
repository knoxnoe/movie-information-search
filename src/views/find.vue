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
  methods:{
    getFindList(){
      var PostUrl = this.$store.state.BaseConfig.httpsUrl + '/api/v1/join/'
      this.axios.post(PostUrl,{
          'username': this.formsignup.user,
          'nickname': 'noe',
          'password': this.formsignup.pwd,
      }).then(response => {
          response = response.data;
          if (response.status === 200) {
              this.dialogFormVisibleSignup = false //关闭注册dialog
              this.dialogFormVisibleSignin = true  //打开登陆dialog
          } else {
              alert(JSON.stringify(response.statusMessage))
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