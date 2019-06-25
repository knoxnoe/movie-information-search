<template>
  <div class="find">
    <h1>发现别人家的事</h1>
    <keep-alive>
      <List :dataList="findLists" :styles="listFind"></List>
    </keep-alive>
  </div>
</template>
<script>
  import List from '@/components/list.vue'

  export default {
    components: {
      List
    },
    data() {
      return {
        findLists: [],
        listFind: '_listStyle2',
        start: 0
      }
    },
    mounted() {
      this.getFindList()
    },
    methods: {
      getFindList() {
        var PostUrl = this.$store.state.BaseConfig.httpsUrl + '/api/v1/recommend/movie/'
        this.api.get(PostUrl, {
          token: this.$store.state.UserState.token,
          start: this.start,
          end: this.start + 5
        }).then(response => {
          console.log(response)
          if (response.status == 200) {
            for (var i in response.data) {
              this.findLists.push(response.data[i])
            }
          }
          this.start += 5
        })
      }
    }
  }
</script>
<style lang="stylus">
  body
    margin 0px

  .find
    padding 0 40px
    height 92vh
    overflow hidden
</style>