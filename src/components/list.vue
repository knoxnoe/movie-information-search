<template>
    <div class="list-noe">
      <div v-if="listStyle">
        <el-card v-for="item in list" v-bind:key="item.id" class="list-card"  shadow="hover">
            <div slot="header" class="clearfix">
                <span class="text">{{item.name}}</span>
                <el-button style="float: right; padding: 3px 0" type="text">操作</el-button>
            </div>
            <div class="text item">
                {{'内容 ' + item.content }}
                {{'作者 ' + item.user }}
                {{'时间 ' + item.created_date }}
            </div>
        </el-card>
      </div>
      <div v-else>
         <el-card v-for="(item,index) in list" v-bind:key="index" class="list-card"  shadow="hover">
            <div slot="header" class="clearfix">
                <span class="text">{{item.name}}</span>
                <el-button style="float: right; padding: 3px 0" type="text">操作</el-button>
            </div>
            <div class="text item">
                <p>{{'标题 ' + item.movie.title }}</p>
                <p>{{'概述 ' + item.movie.summary }}</p>
                <p>{{'评分 ' + item.movie.rating }}</p>
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
  }
}
</script>
<style lang="stylus">
body
  margin 0
.list-noe
  height 68vh
  overflow scroll
  &::-webkit-scrollbar
    display: none;
  .list-card
    margin-top 20px
    .clearfix
      .text
        color: red
  .loadmore
    text-align center
    height 50px
</style>
