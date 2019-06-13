<template>
  <div class="about">
    <h1>圈子里的那点事</h1>
    <List ></List>
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
    this.getFeedsList()
  },
  methods: {
    getFeedsList(){
      var PostUrl = this.$store.state.BaseConfig.httpsUrl + '/api/v1/feeds'
			this.axios.get(PostUrl, {
				params: {
				token: this.$store.state.UserState.token,
				start: 0,
				end: 20
				}
			}).then(response => {
				console.log(response)
				response = response.data
				if (response.status === 200) {
					
				} else {
					this.$message.error(JSON.stringify(response.statusMessage));
				}
			}) 
    }
  }
}
</script>
<style lang="stylus">
body
  margin 0px
.about
  padding 20px 40px
</style>