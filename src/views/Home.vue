<template>
  <div class='page-main'>
    <el-button type='primary' icon='el-icon-search'>搜索</el-button>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="stylus">
</style>



// <script>
// // import vue from 'vue'
// export default {
//   data () {
//     var validatePass = (rule, value, callback) => {
//         if (value === '') {
//           callback(new Error('请输入密码'));
//         } else {
//           if (this.formsignin.user !== '') {
//             this.$refs.formsignin.validateField('user');
//           }
//           callback();
//         }
//     };
//     var validateUser = (rule, value, callback) => {
//         if (value === '') {
//           callback(new Error('请输入用户'));
//         } else {
//           callback();
//         }
//     };
//     return {
//       restaurants: [],
//       state: '',
//       dialogFormVisiblesignin: false,
//       dialogFormVisiblesignup: false,
//       dialogFormVisibleforgetpwd: false,
//       formsignin: {
//         user: '',
//         pwd: ''
//       },
//       formsignup: {
//         user: '',
//         pwd: ''
//       },
//       rulessignin:{
//         user: [
//           {validator: validateUser, trigger: 'blur'}
//         ],
//         pwd: [
//           {validator: validatePass, trigger: 'blur'}
//         ]
//       },
//       rulessignup:{
//         user: [
//           {validator: validateUser, trigger: 'blur'}
//         ],
//         pwd: [
//           {validator: validatePass, trigger: 'blur'}
//         ]
//       },
//       formLabelWidth: '10px'
//     }
//   },
//   methods: {
//     querySearch (queryString, cb) {
//       var restaurants = this.restaurants
//       var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
//       // 调用 callback 返回建议列表的数据
//       cb(results)
//     },
//     createFilter (queryString) {
//       return (restaurant) => {
//         return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
//       }
//     },
//     loadAll () {
//       return [
//         { 'value': '周润发演了什么电影', 'address': '长宁区新渔路144号' },
//         { 'value': '周润发', 'address': '上海市长宁区淞虹路661号' },
//         { 'value': '周星驰', 'address': '上海市普陀区真北路988号创邑金沙谷6号楼113' },
//         { 'value': '刘德华', 'address': '天山西路438号' },
//         { 'value': '黎明', 'address': '上海市长宁区金钟路968号1幢18号楼一层商铺18-101' },
//         { 'value': '赵敏', 'address': '上海市长宁区金钟路633号' }
//       ]
//     },
//     search () {//搜索
//       this.$router.push({name: 'res', params: {searchtext: this.state}})
//     },
//     signin (formName) {//登陆
//       this.$refs[formName].validate((valid) => {//验证表单是否合规
//           if (valid) {
//             this.dialogFormVisiblesignin = false
//             this.$router.push({name: 'user'})//, params: {searchtext: this.state}
//           } else {
//             // console.log('error submit!!')
//             return false
//           }
//         });
//     },
//     forgetPwd () {//找回密码
//       this.dialogFormVisiblesignin = false
//       this.dialogFormVisibleforgetpwd = true
//     }
//   },
//   mounted () {
//     this.restaurants = this.loadAll()
//   }
// }
// </script>