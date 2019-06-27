<template>
    <div class="list-noe-find" ref="container">
      <div class="list" ref="inner">
        <el-card v-for="(item,index) in list" v-bind:key="index" class="list-card"  shadow="hover">
            <div slot="header" class="clearfix">
                <span v-if="item.movie == null" class="text">{{'无电影文章'}}</span>
                <span v-else class="text">{{'电影：'+item.movie.title}}</span>
                <!-- <el-button style="float: right; padding: 3px 0" type="text" @click="collect">收藏电影</el-button> -->
            </div>
            <div v-if="item.movie != null" >
              <img :src="'http://movie.sqy.xyz/image/movie/'+(item.movie.id%109)+'/'+(item.movie.id)+'.jpg'" alt="">
              <div class="text item">
                  <p>{{'标签：'+item.movie.genres}}</p>
                  <p>{{'评分 ' + item.movie.rating }}</p>
                  <p>{{'概述 ' + item.movie.summary }}</p>
              </div>
              <div class="movie_person">
                <span v-for="(userItem,index) in item.users" v-bind:key="index" class="users" @click="goSubUser(userItem.username)">{{userItem.username}}</span>
              </div>
            </div>
        </el-card>
        <div class="loadmore" ref="loading">
          <span>已经没了</span>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  name: 'findList',
  props:{
    dataList: ''
  },
  data () {
    return {
      listStyle: true,
      start: 5
    }
  },
  computed:{
    list: {
      get:function(){
        return this.dataList
      },
      set:function(){
        
      }
    }
  },
  mounted(){
    this.list = this.dataList
    this.$refs.container.addEventListener('scroll', this.scroll)
  },
  methods:{
    scroll() {
      let top = this.$refs.container.scrollTop
      let vh = this.$refs.inner.clientHeight
      let height = this.$refs.loading.offsetTop
      let dis = height - vh - top
      if(-20 < dis && dis < 20){
        var PostUrl = this.$store.state.BaseConfig.httpsUrl + '/api/v1/recommend/movie/'
        this.api.get(PostUrl,{
            token: this.$store.state.UserState.token,
            start: this.start,
            end: this.start+5
        }).then(response => {
            if(response.status == 200){
              for(var i in response.data){
                this.list.push(response.data[i])
              }
            }
            this.start+=5
        })
      }
    },

    goSubUser(user){//去个人首页
      this.$router.push({name: 'subBookMark', params: {targetName: user}})
      this.$cookie.set('subName', user, 1)
    }
  }
}
</script>
<style lang="stylus">
body
  margin 0
.users
  margin-left 20px
.list-noe-find
    height 100%
    overflow scroll
    &::-webkit-scrollbar
        display none
		.list
  		height 100%
			.list-card
				margin-top 20px
				height 520px
				.el-card__header
					cursor pointer
					.clearfix
						.text
							color: #666666
							&:hover
								color: blue
				.el-card__body
					overflow hidden
					.movie_person
						cursor pointer
					img
						float left
						margin-right 20px
			.loadmore
				text-align center
				height 150px

</style>
