<template>
  <div class="list-noe" ref="container">
    <div v-if="listStyle=='_listStyle1'" class="list list1" ref="inner1">
      <div>
        <el-card v-for="(item,index) in list" v-bind:key="index" class="list-card list-card1" shadow="hover">
          <div slot="header" class="clearfix">
            <span class="text">{{ item.created_date.substr(0,10)}}</span>
            <span class="text" @click="goSubUser(item.user)">{{'  |  '+item.user+'  |  '}}</span>
            <span v-if="item.movie == null" class="text">{{'无电影文章'}}</span>
            <span v-else class="text">{{'电影：'+item.movie.title}}</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="collect(item.article_id)">收藏文章
            </el-button>
          </div>
          <div class="text item">
            <img v-if="item.movie != null"
                 :src="'https://movie.sqy.xyz/image/movie/'+(item.movie.id%109)+'/'+(item.movie.id)+'.jpg'" alt="">
            <div class="movieDetail">
              <div v-if="item.movie != null">
                <p>{{'电影名：'+item.movie.title}}</p>
                <p>{{'标签：'+item.movie.genres}}</p>
                <p>{{'年份：'+item.movie.year}}</p>
                <p>{{'评分：'+ item.movie.rating}}</p>
                <p>{{'概述：'+item.movie.summary}}</p>
              </div>
              <p>{{'内容 ' + item.content }}</p>
              <el-link @click="goArticle(item.article_id)">查看全文<i class="el-icon-view el-icon--right"></i></el-link>
            </div>
          </div>
        </el-card>
      </div>
      <div class="loadmore" ref="loading">
        <span>已经没了</span>
      </div>
    </div>
    <div v-if="listStyle=='_listStyle2'" class="list list2" ref="inner2">
      <div>
        <el-card v-for="(item,index) in list" v-bind:key="index" class="list-card list-card2" shadow="hover">
          <div slot="header" class="clearfix">
            <span v-if="item.movie == null" class="text">{{'无电影文章'}}</span>
            <span v-else class="text">{{'电影：'+item.movie.title}}</span>
            <!-- <el-button style="float: right; padding: 3px 0" type="text" @click="collect">收藏电影</el-button> -->
          </div>
          <div v-if="item.movie != null">
            <img :src="'https://movie.sqy.xyz/image/movie/'+(item.movie.id%109)+'/'+(item.movie.id)+'.jpg'" alt="">
            <div class="text item">
              <p>{{'标签：'+item.movie.genres}}</p>
              <p>{{'评分 ' + item.movie.rating }}</p>
              <p>{{'概述 ' + item.movie.summary }}</p>
            </div>
            <div class="movie_person">
              <span v-for="(userItem,index) in item.users" v-bind:key="index"
                    class="users">{{userItem.username }}</span>
            </div>
          </div>
        </el-card>
      </div>
      <div class="loadmore" ref="loading">
        <span>已经没了</span>
      </div>
    </div>
    <div v-if="listStyle=='_listStyle3'" class="list list3" ref="inner3">
      <div>
        <el-card v-for="(item,index) in list" v-bind:key="index" class="list-card list-card3" shadow="hover">
          <div slot="header" class="clearfix">
            <span class="text">{{ item.created_date.substr(0,10)}}</span>
            <span class="text" @click="goSubUser(item.user)">{{'  |  '+item.user+'  |  '}}</span>
            <span v-if="item.movie == null" class="text">{{'无电影文章'}}</span>
            <span v-else class="text">{{'电影：'+item.movie.title}}</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="collect(item.article_id)">收藏文章
            </el-button>
          </div>
          <div class="text item">
            <img v-if="item.movie != null"
                 :src="'https://movie.sqy.xyz/image/movie/'+(item.movie.id%109)+'/'+(item.movie.id)+'.jpg'" alt="">
            <div class="movieDetail">
              <div v-if="item.movie != null">
                <p>{{'电影名：'+item.movie.title}}</p>
                <p>{{'标签：'+item.movie.genres}}</p>
                <p>{{'年份：'+item.movie.year}}</p>
                <p>{{'评分：'+ item.movie.rating}}</p>
                <p>{{'概述：'+item.movie.summary}}</p>
              </div>
              <p>{{'内容 ' + item.content }}</p>
              <div @click="goArticle(item.article_id)">
                <el-link>查看全文<i class="el-icon-view el-icon--right"></i></el-link>
              </div>
            </div>
          </div>
        </el-card>
      </div>
      <div class="loadmore" ref="loading">
        <span>已经没了</span>
      </div>
    </div>
    <el-dialog
            title="添加收藏夹"
            :visible.sync="collectDialogVisible"
            width="70%"
            center>
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
        <el-checkbox v-for="city in cities" :label="city.id" :key="city.id">{{city.name}}</el-checkbox>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
          <el-button @click="collectDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmCollect">确认收藏</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name: 'List',
    props: {
      dataList: '',
      styles: {
        type: String,
        default: '_listStyle1'
      }
    },
    data() {
      return {
        listStyle: true,
        collectDialogVisible: false,
        collectId: null,
        collections: '',
        checkAll: false,
        checkedCities: [],
        cities: '',
        isIndeterminate: true,
        start: 5
      }
    },
    computed: {
      list: {
        get: function () {
          return this.dataList
        },
        set: function () {

        }
      },
      collection: {
        get: function () {
          return this.collections
        },
        set: function () {

        }
      }
    },
    mounted() {
      this.list = this.dataList
      this.listStyle = this.styles
      if (this.listStyle == '_listStyle1') {
        console.log('f1')
        this.$refs.inner1.addEventListener('scroll1', this.scroll)
      } else if (this.listStyle == '_listStyle2') {
        console.log('f2')
        this.$refs.inner2.addEventListener('scroll2', this.scroll)
      } else {
        console.log('f3')
        this.$refs.inner3.addEventListener('scroll3', this.scroll)
      }
    },
    methods: {
      scroll2() {
        let top = this.$refs.container.scrollTop
        let vh = this.$refs.inner2.clientHeight
        let height = this.$refs.loading.offsetTop
        let dis = height - vh - top
        if (-20 < dis && dis < 20) {
          console.log('bao')
          var PostUrl = this.$store.state.BaseConfig.httpsUrl + '/api/v1/recommend/movie/'
          this.api.get(PostUrl, {
            token: this.$store.state.UserState.token,
            start: this.start,
            end: this.start + 5
          }).then(response => {
            console.log(response)
            if (response.status == 200) {
              for (var i in response.data) {
                this.list.push(response.data[i])
              }
            }
            this.start += 5
          })
        }
        console.log(top, vh, height)
      },
      goArticle(articleId) {//去正文
        console.log(articleId)
        var PostUrl = this.$store.state.BaseConfig.httpsUrl + '/api/v1/read/' + articleId + '/'
        this.api.post(PostUrl, {
          token: this.$store.state.UserState.token,
          article_id: articleId
        }).then(response => {
          console.log(response)
          response = response.data;
          if (response.status == 200) {

          } else {
            this.$message.error(JSON.stringify(response.statusMessage));
          }
        })
        this.$router.push({name: 'article'})
      },
      handleCheckAllChange(val) {
        var array = []
        for (var item in this.cities) {
          array.push(this.cities[item].id)
        }
        this.checkedCities = val ? array : []
        this.isIndeterminate = false
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length
        this.checkAll = checkedCount === this.cities.length
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
      },

      goSubUser(user) {//去个人首页
        this.$router.push({name: 'subBookMark', params: {targetName: user}})
        this.$cookie.set('subName', user, 1)
      },
      collect(article_id) {
        this.collectId = article_id
        this.collectDialogVisible = true
        this.getListOfBookMark()
      },
      confirmCollect() {
        for (var i = 0; i < this.checkedCities.length; i++) {
          var current = this.checkedCities[i]
          var PostUrl = this.$store.state.BaseConfig.httpsUrl + '/api/v1/collection/' + current + '/collect/'
          this.api.post(PostUrl, {
            token: this.$store.state.UserState.token,
            object_id: this.collectId,
            collection_id: current,
            type: 'article'
          }).then(response => {
            console.log(response)
            if (response.status == 200) {
              this.collectDialogVisible = false
              this.$message({
                message: '收藏成功！',
                type: 'success'
              });
            } else {
              this.$message.error(JSON.stringify(response.statusMessage));
            }
          })
        }
      },
      getListOfBookMark() {//挂在组件将请求的数据初始化
        var PostUrl = this.$store.state.BaseConfig.httpsUrl + '/api/v1/collections/'
        this.api.get(PostUrl, {
          token: this.$store.state.UserState.token
        }).then(response => {
          console.log(response)
          if (response.status == 200) {
            if (response.data.length > 0) {
              this.cities = response.data
            } else {
              this.$message.warning('你还没有收藏夹，请先创建收藏夹！');
            }
          } else {
            this.$message.error(JSON.stringify(response.statusMessage));
          }
        })
      },
    }
  }
</script>
<style lang="stylus">
  body
    margin 0

  .users
    margin-left 20px

  .list-noe
    height 100%
    overflow scroll

    &::-webkit-scrollbar
      display: none;

    .list-card
      margin-top 20px

    .list-card2
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

        img
          float left
          margin-right 20px

    .loadmore
      text-align center
      height 150px

  .list
    height 100%
</style>
