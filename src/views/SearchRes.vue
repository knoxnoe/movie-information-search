<template>
  <div class='page-res'>
    <div class="reschart">
      <!-- <keep-alive> -->
        <chart :rdf="rdfdata" v-if="flag"></chart>
        <!-- v-on:childmessage="changesummary" :centersearch="search" -->
      <!-- </keep-alive> -->
    </div>
    <!-- <div class="reslist">
      <p>{{summary}}</p>
      <div v-for="item in text" :key="item.index">
        <p>{{item}}</p>
      </div>
    </div> -->
  </div>
</template>

<script>
import vue from 'vue'
import { mapMutations } from 'vuex'
import chart from '@/components/chart.vue'
export default {
  data: () => ({
      rdfdata: [],
      flag: false,
      search: '',
  }),
  components: {
    chart
  },
  methods: {
    //changesummary(data) {
    //   console.log('father')
    //   if(data.click == true){
    //     vue.axios.get('http://editme.top:8001/api/v3/movie/', {
    //       params: {
    //         id: data.id
    //       }
    //     }).then(response => {
    //       this.summary1=response.data;
    //     }).catch(error => {
    //       console.log(error)
    //     })
    //   }else{
    //     vue.axios.get('http://editme.top:8001/api/v3/person/', {
    //       params: {
    //         id: data.id
    //       }
    //     }).then(response => {
    //       this.summary1=response.data;
    //     }).catch(error => {
    //       console.log(error)
    //     })
    //   }
    //}
  },
  computed : {
    // summary : function(){
    //   if(this.summary1!=undefined){
    //     return this.summary1.summary;
    //   }else{
    //     return ' ';
    //   }
    // }
  },
  mounted () {//根据home页面传来的值进行搜索
    this.search = this.$route.params.searchText || this.$store.state.UserState.currentSearchText
    if(this.search.length > 3){//智能搜索
      var PostUrl = this.$store.state.BaseConfig.httpsUrl + '/api/v1/subject/smart_search/'
      this.axios.get(PostUrl, {
        params: {
          query: this.search
        }
      }).then(response => {
        response = response.data
        if (response.status === 200) {
          this.rdfdata.push(response.data[0]);
          this.flag = true
        } else {
          this.$message.error(JSON.stringify(response.statusMessage));
        }
      })
    }else{//知识图谱
      var PostUrl = this.$store.state.BaseConfig.httpsUrl + '/api/v1/subject/search/'
      this.axios.get(PostUrl,{
        params: {
          name: this.search
        }
      }).then(response => {
          response = response.data
          if (response.status === 200) {
            this.rdfdata.push(response.data[0]);
            this.flag = true
          } else {
            this.$message.error(JSON.stringify(response.statusMessage));
          }
      })
    } 
  }
}

</script>

<style lang="stylus">
.page-res
  display flex
  flex-direction row
  .reschart
    width 100%

</style>
