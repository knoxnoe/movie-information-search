<template>
    <div class="essay">
      <div style="margin-bottom: 20px;">
      	<el-button type="primary" icon="el-icon-edit-outline" @click="EditingArticlesDialogVisible = true">发表文章</el-button>
    	</div>
			<keep-alive>
				<List></List>
			</keep-alive>
			<el-dialog
				title="编辑文章"
				:visible.sync="EditingArticlesDialogVisible"
				width="80%"
				center>

				<el-input
					class="editContent"
					type="textarea"
					:rows="2"
					placeholder="saying something..."
					v-model="textarea">
				</el-input>

				<el-upload
					action="https://jsonplaceholder.typicode.com/posts/"
					list-type="picture-card"
					ref="upload"
					:on-preview="handlePictureCardPreview"
					:on-remove="handleRemove"
					:on-success="submit"
					:auto-upload="false"
					:file-list="fileList">
					<i class="el-icon-plus"></i>
					<el-button style="margin-top: 10px;display:block;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
				</el-upload>
				<!-- <el-upload
					class="upload-demo"
					ref="upload"
					action="https://jsonplaceholder.typicode.com/posts/"
					:on-preview="handlePictureCardPreview"
					:on-remove="handleRemove"
					:file-list="picture-card"
					:auto-upload="false">
					<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
					<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
					<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
				</el-upload> -->

				<span slot="footer" class="dialog-footer">
					<el-button @click="EditingArticlesDialogVisible = false">取 消</el-button>
					<el-button type="primary" @click="EditingArticlesDialogVisible = false">发表</el-button>
				</span>
			</el-dialog>
			<!-- 查看图片详情 -->
			<el-dialog :visible.sync="dialogVisible">
				<img width="100%" :src="dialogImageUrl" alt="">
			</el-dialog>
    </div>
</template>
<script>
import List from '@/components/list.vue'
export default {
  components:{
    List
	},
	data () {
    return {
			EditingArticlesDialogVisible: false,
			dialogImageUrl: '',
			dialogVisible: false,
			textarea: '',
			fileList: []
    }
	},
	methods: {
		submitUpload() {//提交上传文章
			this.$refs.upload.submit();
		},
		submit(response, file, fileList){
			console.log(response)
		},
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
			this.dialogVisible = true;
			console.log(fileList)
    }
  }
}
</script>
<style lang="stylus">
.essay
  padding 20px 40px
	.editContent
		margin-bottom 20px
</style>
