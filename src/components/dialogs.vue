<template>
  <div class="dialogs-noe">
       <!-- 弹出窗口进行登录 -->
    <!-- <el-dialog title='登陆' :visible.sync='dialogFormVisiblesignin' center>
      <el-form :model='formsignin' ref="formsignin" status-icon :rules="rulessignin">
        <el-form-item :label-width='formLabelWidth' prop="user">
          <el-input v-model='formsignin.user' autocomplete='off' placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item :label-width='formLabelWidth' prop="pwd" >
          <el-input v-model='formsignin.pwd' type="password" autocomplete='off' placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item :label-width='formLabelWidth'>
          <el-button class="signin" @click="signin('formsignin')">登陆</el-button>
        </el-form-item><span class="forgetPwd" @click="forgetPwd">忘记密码</span>
      </el-form>
      <div slot='footer' class='dialog-footer thirdpartys'>
        <span>使用第三方登陆账号</span>
        <img class="thirdparty" src="/static/QQ.png" alt="#">
        <img class="thirdparty" src="/static/weixin.png" alt="#">
        <img class="thirdparty" src="/static/weibo.png" alt="#">
      </div>
    </el-dialog> -->
    <!-- 弹出窗口进行注册 -->
    <!-- <el-dialog title='注册' :visible.sync='dialogFormVisiblesignup' center>
       <el-form :model='formsignup' ref="formsignup" status-icon :rules="rulessignup">
        <el-form-item :label-width='formLabelWidth' prop="user">
          <el-input v-model='formsignup.user' autocomplete='off' placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item :label-width='formLabelWidth' prop="pwd">
          <el-input v-model='formsignup.pwd' autocomplete='off' placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item :label-width='formLabelWidth'>
          <el-button class="signin" @click='dialogFormVisiblesignin = false'>注册</el-button>
        </el-form-item>
      </el-form>
      <div slot='footer' class='dialog-footer thirdpartys'>
        <span>使用第三方注册账号</span>
        <img class="thirdparty" src="/static/QQ.png" alt="#">
        <img class="thirdparty" src="/static/weixin.png" alt="#">
        <img class="thirdparty" src="/static/weibo.png" alt="#">
      </div>
    </el-dialog> -->
    <!-- 忘记密码 -->
    <!-- <el-dialog title='找回密码' :visible.sync='dialogFormVisibleforgetpwd' center>
       <el-form :model='formsignup' ref="formsignup" status-icon :rules="rulessignup">
        <el-form-item :label-width='formLabelWidth' prop="user">
          <el-input v-model='formsignup.user' autocomplete='off' placeholder="请输入手机号">
            <template slot="prepend">+86</template>
          </el-input>
        </el-form-item>
        <el-form-item :label-width='formLabelWidth' prop="pwd">
          <el-input class="checkpas" v-model='formsignup.pwd' autocomplete='off' placeholder="请输入验证码"></el-input>
          <el-button class="" @click='dialogFormVisibleforgetpwd = false'>发送验证码</el-button>
        </el-form-item>
        <el-form-item :label-width='formLabelWidth'>
          <el-button class="signin" @click='dialogFormVisibleforgetpwd = false'>找回</el-button>
        </el-form-item>
      </el-form>
    </el-dialog> -->
    <el-dialog
      title="提示"
      :visible.sync="isOpen"
      width="30%"
      center>
      <span>需要注意的是内容是默认不居中的</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isOpen = false">取 消</el-button>
        <el-button type="primary" @click="isOpen = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      centerDialogVisible: false
    }  
  },
  props: {
    isOpen: Boolean
  },
  watch:{
    isOpen: function(){
      this.centerDialogVisible = !this.centerDialogVisible
    }
  },
  mounted(){
    console.log(this.isOpen)
  }
}
</script>
<style lang="stylus" scoped>
.signin
  width 100%
  background-color #010101
  color rgb(251, 251, 251)
.forgetPwd
  cursor pointer
.checkpas
  width 40%
.thirdpartys
  text-align center
  span
    display block
  .thirdparty
    width 18px
    height 18px
    margin 10px 10px
</style>

