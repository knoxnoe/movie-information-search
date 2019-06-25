<template>
  <div class="bookMark">
    <div style="margin-bottom: 20px;">
      <el-button type="primary" icon="el-icon-folder-add" @click="createCollection()">创建收藏夹</el-button>
    </div>
    <el-tabs v-model="collectionId" type="card" closable @tab-remove="removeCollection" @tab-click="checkCollection">
      <el-tab-pane
              v-for="(item, index) in collections"
              :key="item.id"
              :label="item.name"
              :name="item.id">
        <!-- {{item.content}} -->
        <div>
          <List :dataList="BookMarkEssaysList" :styles="listEssay"></List>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- 创建创建收藏夹dialog -->
    <el-dialog title="创建收藏夹" :visible.sync="dialogCollectionsVisible" center width="40%">
      <el-form :model="form">
        <el-form-item label="收藏夹名">
          <el-input class="collectionName" v-model="form.name" size="small"></el-input>
        </el-form-item>
        <el-form-item label="收藏夹种类">
          <el-select v-model="form.region" placeholder="请选择是否公开">
            <el-option label="私有" value="1"></el-option>
            <el-option label="公开" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCollectionsVisible = false">取 消</el-button>
        <el-button type="primary" @click="affirmCollection">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import List from '@/components/list.vue'

  export default {
    data() {
      return {
        collectionId: '',//当前激活状态
        collections: [],
        collectionsNum: 0,
        dialogCollectionsVisible: false,
        form: {
          name: '',
          region: '',
        },
        formLabelwidth: '120px',
        listEssay: '_listStyle3',
        BookMarkEssaysList: []
      }
    },
    components: {
      List
    },
    mounted() {
      this.getListOfBookMark()
    },
    methods: {
      getListOfBookMark() {//挂在组件将请求的数据初始化
        var PostUrl = this.$store.state.BaseConfig.httpsUrl + '/api/v1/collections/'
        this.api.get(PostUrl, {
          token: this.$store.state.UserState.token
        }).then(response => {
          console.log(response)
          if (response.status == 200) {
            if (response.data.length > 0) {
              this.collections = response.data
              this.collectionsNum = response.data.length
              this.collectionId = response.data[0].id
            } else {
              this.$message.warning('你还没有收藏夹，请先创建收藏夹！');
            }
          } else {
            this.$message.error(JSON.stringify(response.statusMessage));
          }
        })
      },

      affirmCollection() {//确认创建文件夹信息
        var numPrivate = new Number(this.form.region)
        var PostUrl = this.$store.state.BaseConfig.httpsUrl + '/api/v1/collection/'
        this.api.post(PostUrl, {
          token: this.$store.state.UserState.token,
          name: this.form.name,
          private: numPrivate
        }).then(response => {
          console.log(response)
          if (response.status == 200) {
            this.addCollection(response.data.name, response.data.id)
          } else {
            this.$message.error(JSON.stringify(response.statusMessage));
          }
        })
      },
      createCollection() { //创建收藏夹
        this.dialogCollectionsVisible = true
      },
      addCollection(targetName, targetId) {//将创建好的进行UI添加
        var newTabName = targetName;
        //++this.collectionsNum + '';
        this.collections.push({
          title: newTabName,
          name: newTabName,
          content: 'New Tab content'
        });
        this.collectionId = JSON.stringify(targetId)
        this.dialogCollectionsVisible = false
      },

      removeCollection(targetId) {
        var res = this.affirmRemove(targetId)
      },
      affirmRemove(targetId) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.remove(targetId)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
          return 0;
        });
      },
      remove(targetId) {
        var tabs = this.collections;
        var activeId = this.collectionId;
        if (activeId === targetId) {
          tabs.forEach((tab, index) => {
            if (tab.id === targetId) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeId = nextTab.Id;
              }
            }
          });
        }
        this.collectionId = activeId;
        this.collections = tabs.filter(tab => tab.id !== targetId);
      },

      checkCollection(item) {
        var PostUrl = this.$store.state.BaseConfig.httpsUrl + '/api/v1/collection/' + item.$options.propsData.name + '/'
        this.api.get(PostUrl, {
          token: this.$store.state.UserState.token,
          collection_id: item.$options.propsData.name,
          start: 0,
          end: 20
        }).then(response => {
          console.log(response)
          if (response.status == 200) {
            this.BookMarkEssaysList = response.data
          }
        })
      }
    }
  }
</script>
<style lang="stylus">
  body
    margin 0

  .bookMark
    padding 20px

  .collectionName
    width auto
</style>