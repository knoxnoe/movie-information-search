<template>
    <div class="nav">
        <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            router = true
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item index="#" disabled>电影采撷狮</el-menu-item>
            <el-menu-item index="/">知识图谱</el-menu-item>
            <el-menu-item index="/about">圈子</el-menu-item>
            <el-menu-item index="/find">
                <el-badge :value="3" class="bdgeitem"> 发现 </el-badge>
            </el-menu-item>
            <el-menu-item class="login">
                <span @click='dialogFormVisiblesignin = true'>登陆 </span>
                <i>|</i>
                <span @click='dialogFormVisiblesignup = true'> 注册</span>
            </el-menu-item>
        </el-menu>
        <el-dialog title='登陆' :visible.sync='dialogFormVisiblesignin' center>
            <el-form :model='formsignin' ref="formsignin" status-icon :rules="rulessignin">
                <el-form-item :label-width='formLabelWidth' prop="user">
                    <el-input v-model='formsignin.user' placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item :label-width='formLabelWidth' prop="pwd" >
                    <el-input v-model='formsignin.pwd' type="password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item :label-width='formLabelWidth'>
                    <el-button class="signin" @click="signin('formsignin')">登录</el-button>
                </el-form-item><span class="forgetPwd" @click="forgetPwd">忘记密码</span>
            </el-form>
            <div slot='footer' class='dialog-footer thirdpartys' >
                <span>使用第三方登陆账号</span>
                <img class="thirdparty" src="../assets/QQ.png" alt="#">
                <img class="thirdparty" src="../assets/weixin.png" alt="#">
                <img class="thirdparty" src="../assets/weibo.png" alt="#">
            </div>
        </el-dialog>
    <!-- 弹出窗口进行注册 -->
        <el-dialog title='注册' v-loading="loading" :visible.sync='dialogFormVisiblesignup' center>
            <el-form :model='formsignup' ref="formsignup" status-icon :rules="rulessignup">
                <el-form-item :label-width='formLabelWidth' prop="user">
                    <el-input v-model='formsignup.user' placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item :label-width='formLabelWidth' prop="pwd">
                    <el-input v-model='formsignup.pwd' placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item :label-width='formLabelWidth'>
                    <el-button class="signup" @click="signup('formsignup')">注册</el-button>
                </el-form-item>
            </el-form>
            <div slot='footer' class='dialog-footer thirdpartys'>
                <span>使用第三方注册账号</span>
                <img class="thirdparty" src="../assets/QQ.png" alt="#">
                <img class="thirdparty" src="../assets/weixin.png" alt="#">
                <img class="thirdparty" src="../assets/weibo.png" alt="#">
            </div>
        </el-dialog>
    <!-- 忘记密码 -->
        <el-dialog title='找回密码' :visible.sync='dialogFormVisibleforgetpwd' center>
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
        </el-dialog>
    </div>
</template>
<script>
// import Dialogs from '@/components/dialogs.vue'
export default {
    name: 'Nav',
    data () {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请输入密码'));
            } else {
            if (this.formsignin.user !== '') {
                this.$refs.formsignin.validateField('user');
            }
            callback();
            }
        };
        var validateUser = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请输入用户'));
            } else {
            callback();
            }
        };
        return {
            activeIndex: '/',
            dialogFormVisiblesignin: false,
            dialogFormVisiblesignup: false,
            dialogFormVisibleforgetpwd: false,
            formsignin: {
                user: '',
                pwd: ''
            },
            formsignup: {
                user: '',
                pwd: ''
            },
            rulessignin:{
                user: [
                {validator: validateUser, trigger: 'blur'}
                ],
                pwd: [
                {validator: validatePass, trigger: 'blur'}
                ]
            },
            rulessignup:{
                user: [
                {validator: validateUser, trigger: 'blur'}
                ],
                pwd: [
                {validator: validatePass, trigger: 'blur'}
                ]
            },
            formLabelWidth: '10px',
            loading: false
        }  
    },
    methods: {
        opendialog(){
            this.isOpen = true;
        },
        handleSelect(){
            console.log(this.$store.state.BaseConfig.httpsurl)
        },
        signin (formName) {//登陆
            this.$refs[formName].validate((valid) => {//验证表单是否合规
                if (valid) {
                    this.loading = true
                    // this.dialogFormVisiblesignin = false
                    // var PostUrl = this.$store.state.httpsurl + '/api/v1/login/'
                    // this.axios.post(PostUrl, {
                    //     username: this.formsignin.user,
                    //     nickname: this.form.nickname,
                    //     password: this.formsignin.user,
                    // }).then(response => {
                    //     response = response.data;
                    //     if (response.status === 201) {
                    //         alert("Register success")
                    //     } else {
                    //         alert(JSON.stringify(response.statusMessage));
                    //     }
                    // })
                    this.$router.push({name: 'user'})//, params: {searchtext: this.state}
                } else {
                    return false
                }
            });
        },
        signup (formName) {//注册
            this.$refs[formName].validate((valid) => {//验证表单是否合规
                if (valid) {
                    this.loading = true
                    // this.dialogFormVisiblesignin = false
                    var PostUrl = this.$store.state.BaseConfig.httpsurl + '/api/v1/join/'
                    this.axios.post(PostUrl, {
                        username: this.formsignup.user,
                        nickname: 'noe',
                        password: this.formsignup.pwd,
                    }).then(response => {
                        response = response.data;
                        
                        if (response.status === 200) {
                            // this.loading = true
                            this.$router.push({name: 'user'})
                        } else {
                            alert(JSON.stringify(response.statusMessage));
                        }
                    })
                } else {
                    return false
                }
            });
        },
        forgetPwd () {//找回密码
            this.dialogFormVisiblesignin = false
            this.dialogFormVisibleforgetpwd = true
        }
    }
}
</script>

<style lang="stylus">
body
  margin 0px
.nav
    .login
        position absolute
        right 20px
    .bdgeitem
        .el-badge__content.is-fixed
            top 10px
            height 15px
            line-height 15px
            padding 0 4px
    .el-form
        padding: 0 160px;
        .signin,.signup
            width 100%
            background-color rgb(84, 92, 100)
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
