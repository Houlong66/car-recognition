<template>
  <div class="container">
    <div class="api-button">
      <el-button type="primary">api文档</el-button>
    </div>
    <el-row class="title-row" type="flex">车辆车牌识别系统</el-row>
    <el-row class="main-row">
      <el-col :span="12">
        <el-upload
          drag
          action="http://houlong66.cn:9091/mock/13/testupload"
          :on-success="handleUpload"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    handleUpload(res, file) {
      console.log(res)
      console.log(file)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 10px;
}
.title-row {
  font-size: 25px;
  line-height: 36px;
  -webkit-font-smoothing: antialiased;
  font-stretch: normal;
  font-weight: 600;
  color: rgb(33, 33, 33);
}
.api-button {
  position: fixed;
  top: 15px;
  right: 30px;
  z-index: 1;
}
.main-row {
  margin-top: 20px;
  border-top: 1px solid #999999;
}
</style>