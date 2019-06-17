<template>
    <div class="subUser">
        <h1>{{currentName+ '个人主页'}}</h1>
	    <List :dataList="essaysList" :styles="listEssay"></List>
    </div>
</template>
<script>
const List = () => import('@/components/list.vue')
export default { 
    data(){
        return {
            currentName: '',
            essaysList: '',
            listEssay: true,
        }
    },
    components:{
    	List
	},
    mounted(){
        this.currentName = this.$route.params.targetName || this.$store.state.UserState.subName
        this.getArticles()
    },
    methods:{
        getArticles(){
			var PostUrl = this.$store.state.BaseConfig.httpsUrl + '/api/v1/user/'+ this.currentName + '/articles/'
			this.axios.get(PostUrl, {
				params: {
				username: this.currentName,
				start: 0,
				end: 20
				}
			}).then(response => {
				response = response.data
				if (response.status === 200) {
					this.essaysList = response.data
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
.subUser
  padding 20px 40px
</style>
