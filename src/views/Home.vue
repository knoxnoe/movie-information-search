<template>
  <div class='page-main'>
    <div style="margin-top: 15px;">
      <el-autocomplete 
        size="large" 
        clearable 
        placeholder="请输入内容" 
        v-model="input" 
        class="input-with-select"
        :fetch-suggestions="querySearch"
        :trigger-on-focus="false"
        @select="handleSelect">
        <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option label="知识图谱" value="1"></el-option>
          <el-option label="知识问答" value="2"></el-option>
        </el-select>
        <el-button type="primary" slot="append" icon="el-icon-search" class="noe-search">搜索</el-button>
        <!-- <el-button  icon="el-icon-search" type="primary"></el-button> -->
      </el-autocomplete>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      input: '',
      select: '',
      restaurants: [],
    }
  },
  methods: {
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    loadAll() {
      return [
        { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
        { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
        { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
        { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
        { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
        { "value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13" }
      ];
    },
    handleSelect(item) {
      console.log(item);
    }
  },
  mounted() {
    this.restaurants = this.loadAll();
  }
}
</script>
<style lang="stylus">
body
  margin 0
.page-main
  text-align center
  padding-top 200px
  .el-input__inner
    width 500px
  .el-input-group__prepend
    .el-input__inner
      width 110px
  .noe-search
    background-color rgb(84, 92, 100) !important
    color #ffffff !important
</style>