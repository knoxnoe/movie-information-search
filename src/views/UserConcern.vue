<template>
    <div class="concern">
        <el-row>
            <el-col class="noe_card" :span="4" v-for="(o, index) in followee" :key="index" :offset="index%4 == 0 ? 0 : 2">
                <el-card shadow="hover" :body-style="{ padding: '0px' }">
                  <div class="avatar">
                    <div class="avatar_img">
                      <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
                    </div>
                  </div>
                  <div class="op" style="padding: 14px;">
                      <span>{{o.username}}</span>
                      <div class="bottom clearfix">
                      <time class="time"></time>
                      <!-- {{ currentDate }} -->
                      <el-button type="text" class="get_followee" @click="getOtherFollowee">他的关注</el-button>
                      <el-button type="text" class="get_article" @click="getOtherArticles">他的文章</el-button>
                      <el-button type="text" class="unfollow" @click="unFollow(o.username)">取消关注</el-button>
                      </div>
                  </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
  data() {
    return {
      currentDate: new Date(),
      followee: []
    };
  },
  mounted() {
    this.getFollowees()
  },
  methods: {
    getFollowees(){//获取关注人列表
      var PostUrl = this.$store.state.BaseConfig.httpsUrl + '/api/v1/user/'+ this.$store.state.UserState.username + '/followee/'
      this.axios.get(PostUrl, {
        params: {
          username: this.$store.state.UserState.username,
          start: 0,
          end: 20
        }
      }).then(response => {
          response = response.data
          if (response.status === 200) {
            this.followee = response.data
          } else {
            this.$message.error(JSON.stringify(response.statusMessage));
          }
      })  
    },
    getOtherArticles(){//获取某人文章
      var PostUrl = this.$store.state.BaseConfig.httpsUrl + '/api/v1/user/'+ this.$store.state.UserState.username + '/articles/'
      this.axios.get(PostUrl, {
        params: {
          username: this.$store.state.UserState.username,
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
    },
    getOtherFollowee(){//获取某人关注
    
    },
    unFollow(targetName){
      this.$confirm('确认是否取消关注此人, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '取消关注成功!'
        });
        var PostUrl = this.$store.state.BaseConfig.httpsUrl + '/api/v1/unfollow/'+ targetName + '/'
        this.axios.post(PostUrl, {
            followee_name: targetName,
            token: this.$store.state.UserState.token
        }).then(response => {
            console.log(response)
            response = response.data
            if (response.status === 200) {
            } else {
              this.$message.error(JSON.stringify(response.statusMessage));
            }
        }) 
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });          
      });
    },

  }
}
</script>
<style lang="stylus">
.concern
  padding-left 8%
  .noe_card
    margin-top 20px
    .avatar
      width 100%
      .image 
        width 50%
        border-radius 50%
        margin 30px auto
        display block
    .op
      text-align center
</style>
