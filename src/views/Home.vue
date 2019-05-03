<template>
  <div style="height:100%;background:#f0f2f5;">
    <el-row class="title-row" type="flex" justify="space-between" align="middle">
      <el-col :span="6">车辆车牌识别系统</el-col>
      <el-col :span="3" style="text-align:end">
        <el-button type="primary" @click="showDialog=true" size="medium">api文档</el-button>
      </el-col>
    </el-row>
    <div class="container">
      <el-row class="main-row">
        <el-col :span="12" class="upload-col">
          <el-row class="subtitle-row">原始车辆图片</el-row>
          <el-upload
            class="avatar-uploader"
            action="http://houlong66.cn:9091/mock/13/testupload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            drag
            v-loading="uploading"
          >
            <img v-if="rawImg" :src="rawImg">
            <el-row v-else class="icon-row">
              <el-row>
                <i class="el-icon-plus avatar-uploader-icon"></i>
              </el-row>
              <el-row>请上传车辆图片</el-row>
            </el-row>
          </el-upload>
        </el-col>
        <el-col :span="12" class="upload-col">
          <el-row class="subtitle-row">处理后的图片</el-row>
          <el-row class="process-row">
            <img v-if="processImg" :src="processImg">
          </el-row>
        </el-col>
      </el-row>
      <div style="height:40px"></div>
      <el-row class="table-row">
        <el-row class="subtitle-row" type="flex" justify="space-between">
          <el-col :span="2">识别结果</el-col>
          <el-col :span="2" style="text-align:center">
            <el-button type="success" size="small">导出csv</el-button>
          </el-col>
        </el-row>
        <el-table :data="tableData">
          <el-table-column align="center" label="编号" width="200" prop="id"></el-table-column>
          <el-table-column align="center" label="车牌图片" width="800">
            <template slot-scope="scope">
              <img :src="scope.row.img">
            </template>
          </el-table-column>
          <el-table-column align="center" label="车牌号" prop="car"></el-table-column>
        </el-table>
      </el-row>
      <el-dialog :visible.sync="showDialog" title="api文档" width="80%">
        <div v-for="(item,index) in apiData" :key="index">
          <el-row class="subtitle-row" style="font-size:18px">{{item.url}}：->{{item.method}}</el-row>
          <el-row class="subsubtitle-row">输入</el-row>
          <el-table :data="item.input" border>
            <el-table-column label="参数名称" prop="name"></el-table-column>
            <el-table-column label="参数类型" prop="type"></el-table-column>
            <el-table-column label="是否必须" prop="isNeed"></el-table-column>
            <el-table-column label="示例" prop="example"></el-table-column>
            <el-table-column label="备注" prop="description"></el-table-column>
          </el-table>
          <el-row class="subsubtitle-row">输出</el-row>
          <el-table :data="item.output" border>
            <el-table-column label="参数名称" prop="name"></el-table-column>
            <el-table-column label="参数类型" prop="type"></el-table-column>
            <el-table-column label="是否必须" prop="isNeed"></el-table-column>
            <el-table-column label="默认值" prop="default"></el-table-column>
            <el-table-column label="备注" prop="description"></el-table-column>
          </el-table>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import apiData from '@/mock/api.json'
export default {
  data() {
    return {
      rawImg: '',
      processImg: '',
      uploading: false,
      tableData: [],
      showDialog: false,
      apiData: apiData
    }
  },
  methods: {
    beforeAvatarUpload(file) {
      const isIMG = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isIMG) {
        this.$message.error('只能上传JPG或PNG格式')
        this.uploading = false
        return false
      }
      this.uploading = true
      return true
    },
    handleAvatarSuccess(res, file) {
      this.tableData = []
      this.rawImg = URL.createObjectURL(file.raw)
      this.processImg = this.rawImg
      this.uploading = false
      this.tableData.push({
        id: 1,
        img: this.rawImg,
        car: '粤A132156'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 15px 10px;
  background: #f0f2f5;
}
.title-row {
  background: #fff;
  font-size: 18px;
  padding: 0 10px;
  height: 7%;
  -webkit-font-smoothing: antialiased;
  font-stretch: normal;
  font-weight: 600;
  border-bottom: 1px solid #999999;
  color: #333333;
}
.api-button {
  position: absolute;
  top: 5px;
  right: 30px;
  z-index: 1;
}
.subtitle-row {
  text-align: start;
  padding: 10px;
  padding-left: 15px;
  font-weight: bold;
  color: #444444;
}
.subsubtitle-row {
  text-align: start;
  padding: 10px;
  font-size: 14px;
  padding-left: 25px;
  font-weight: bold;
  color: #444444;
}
.table-row {
  position: relative;
  background: #fff;
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
  border-color: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  padding: 20px 10px;
  img {
    width: 60%;
    height: auto;
    max-height: 200px;
  }
}
.main-row {
  height: auto;
  min-height: 200px;
  max-height: 380px;
  background: #fff;
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
  border-color: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  padding: 10px;
  padding-bottom: 20px;
  box-sizing: content-box;
  .upload-col:nth-of-type(1) {
    border-right: 1px solid #999999;
  }
  .upload-col {
    font-weight: bold;
    color: #444444;
    text-align: center;
    /deep/ .avatar-uploader .el-upload {
      border-radius: 6px;
      cursor: pointer;
      overflow: hidden;
      width: 80%;
      .avatar-uploader-icon {
        height: 40px;
        font-size: 28px;
        color: #8c939d;
        text-align: center;
      }
      .icon-row {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      /deep/ .el-upload-dragger {
        width: 100%;
        height: auto;
        min-height: 178px;
        max-height: 350px;
        position: relative;
      }
    }
    .process-row {
      display: inline-block;
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      overflow: hidden;
      width: 80%;
      height: auto;
      min-height: 178px;
      max-height: 350px;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
  }
}
img {
  width: 100%;
  height: auto;
  min-height: 178px;
  max-height: 350px;
}
/deep/ .el-dialog {
  overflow: auto;
  max-height: 650px;
  margin-top: 3vh !important;
}
</style>