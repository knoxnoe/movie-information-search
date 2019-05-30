<template>
    <div class="nav">
        <el-menu
            :default-active="activeIndex2"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item index="#" disabled>电影采撷狮</el-menu-item>
            <el-menu-item index="/">知识图谱</el-menu-item>
            <el-menu-item index="/about">圈子</el-menu-item>
            <el-menu-item index="4">
                <el-badge :value="3" class="bdgeitem"> 发现 </el-badge>
            </el-menu-item>
            <el-menu-item class="login">
                <span @click='opendialog'>登陆 </span>
                <i>|</i>
                <span @click='dialogFormVisiblesignup = true'> 注册</span>
            </el-menu-item>
        </el-menu>
        <Dialogs :isOpen="isOpen"></Dialogs>
    </div>
</template>
<script>
import Dialogs from '@/components/dialogs.vue'
export default {
    name: 'Nav',
    data () {
        return {
            activeIndex: '1',
            activeIndex2: '/',
            isOpen: false
        }  
    },
    components: {
        Dialogs
    },
    methods: {
        opendialog(){
            console.log("open")
            this.isOpen = true;
        },
        handleSelect(){
            console.log("handle")
        }
    }
}
</script>

<style lang="stylus" scoped>
.login
    position absolute
    right 20px
.bdgeitem
    .el-badge__content.is-fixed
        top 10px
</style>
