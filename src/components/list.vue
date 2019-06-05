<template>
    <div class="list-noe">
       <el-card v-for="item in list" v-bind:key="item.id" class="list-card"  shadow="hover">
            <div slot="header" class="clearfix">
                <span class="text">{{item.name}}</span>
                <el-button style="float: right; padding: 3px 0" type="text">操作</el-button>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
                {{'列表内容 ' + o }}
            </div>
        </el-card>
        <div class="loadmore">
          <span>加载更多</span>
        </div>
    </div>
</template>
<script>
export default {
  name: 'List',
  data () {
    return {
      list: [{
        name: 'hantiaotiao',
        id: '0'
      },{
        name: 'Lucien',
        id: '1'
      },{
        name: 'noe',
        id: '3'
      },
      {
        name: 'noe',
        id: '4'
      }]
    }
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
