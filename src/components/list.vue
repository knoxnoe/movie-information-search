<template>
    <div class="list-noe">
      <div v-if="listStyle">
        <el-card v-for="(item,index) in list" v-bind:key="index" class="list-card"  shadow="hover">
            <div slot="header" class="clearfix">
                <span class="text">{{ item.created_date.substr(0,10)}}</span>
                <span class="text" @click="goSubUser(item.user)">{{'  |  '+item.user+'  |  '}}</span>
                <span v-if="item.movie == null" class="text">{{'无电影文章'}}</span>
                <span v-else class="text">{{'电影：'+item.movie.title}}</span>
                <el-button style="float: right; padding: 3px 0" type="text">收藏文章</el-button>
            </div>
            <div class="text item">
              <img v-if="item.movie != null" :src="'http://editme.top:7000/movie/'+(item.movie.id%109)+'/'+(item.movie.id)+'.jpg'" alt="">
              <div class="movieDetail">
                <div v-if="item.movie != null">
                  <p>{{'电影名：'+item.movie.title}}</p>
                  <p>{{'标签：'+item.movie.genres}}</p>
                  <p>{{'年份：'+item.movie.year}}</p>
                  <p>{{'评分：'+ item.movie.rating}}</p>
                  <p>{{'概述：'+item.movie.summary}}</p>
                </div>
                <p>{{'内容 ' + item.content }}<span>阅读全文</span></p>
              </div>
            </div>
        </el-card>
      </div>
      <div v-else>
         <el-card v-for="(item,index) in list" v-bind:key="index" class="list-card"  shadow="hover">
            <div slot="header" class="clearfix">
                <span v-if="item.movie == null" class="text">{{'无电影文章'}}</span>
                <span v-else class="text">{{'电影：'+item.movie.title}}</span>
                <el-button style="float: right; padding: 3px 0" type="text">收藏文章</el-button>
            </div>
            <div v-if="item.movie != null" >
              <img :src="'http://editme.top:7000/movie/'+(item.movie.id%109)+'/'+(item.movie.id)+'.jpg'" alt="">
              <div class="text item">
                  <p>{{'标签：'+item.movie.genres}}</p>
                  <p>{{'评分 ' + item.movie.rating }}</p>
                  <p>{{'概述 ' + item.movie.summary }}</p>
              </div>
              <div class="movie_person">
                <span v-for="(userItem,index) in item.users" v-bind:key="index" class="users">{{userItem.username }}</span>
              </div>
            </div>
        </el-card>
      </div>
        <div class="loadmore">
          <span>已经没了</span>
        </div>
    </div>
</template>
<script>
export default {
  name: 'List',
  props:{
    dataList: '',
    styles:{
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      listStyle: true
    }
  },
  computed:{
    list: {
      get:function(){
        return this.dataList
      },
      set:function(val){
        console.log(val)
      }
    }
  },
  mounted(){
    this.list = this.dataList
    this.listStyle = this.styles
  },
  methods:{
    goSubUser(user){
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
.list-noe
  height 68vh
  overflow scroll
  &::-webkit-scrollbar
    display: none;
  .list-card
    margin-top 20px
    .el-card__header
      cursor pointer
      .clearfix
        .text
          color: #666666
          &:hover
            color: blue
    .el-card__body
      overflow hidden
      img
        float left
        margin-right 20px
  .loadmore
    text-align center
    height 50px
</style>
