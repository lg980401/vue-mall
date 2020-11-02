<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>

    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8">

          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>

        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-table ref="UserListTable" :data="tableData" highlight-current-row border
            style="width: 100%;margin-top: 20px;">
            <el-table-column type="index" width="50">
            </el-table-column>
            <el-table-column property="username" label="姓名" width="120">
            </el-table-column>
            <el-table-column property="email" label="邮箱" width="170">
            </el-table-column>
            <el-table-column property="mobile" label="电话" width="170">
            </el-table-column>
            <el-table-column property="role_name" label="角色">
            </el-table-column>
            <el-table-column property="mg_state" label="状态" width="70">
              <template slot-scope="scope">
                <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949">
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column property="operator" label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="block">

            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
              :current-page="currentPage" :page-sizes="[5, 10, 15, 20]" :page-size="size"
              layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
  export default {
    components: {},
    data() {
      return {
        currentPage: 1, //当前页面
        size: 2,
        tableData: []
      };
    },
    computed: {},
    watch: {},
    methods: {
      getUserList(pagenums = 1, pagesizes = 5) {
        this.$store.dispatch('getUserList', {
          pagenum: pagenums,
          pagesize: pagesizes
        }).then(res => {
          this.tableData = res.data.users
        })
      },


      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.size = val
      },


      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.currentPage = val
      },


      // next(val) {
      //   if (this.currentPage < tableData.length) {
      //     const page = this.currentPage
      //     page + 1;
      //     getUserList(page, 5);
      //     this.currentPage++
      //   } else {
      //     this.$message({
      //       message: '已经最后一页了',
      //       type: 'error'
      //     })
      //   }
      // },


      // prev(val) {
      //   if (this.currentPage >= 1) {
      //     this.$message({
      //       message: '已经第一页了',
      //       type: 'error'
      //     })
      //   } else {

      //     const page = this.currentPage
      //     page - 1;
      //     getUserList(page, 5);
      //     this.currentPage--
      //   }
      // },







    },
    created() {
      this.getUserList()
    },
    mounted() {

    },
    beforeCreate() {}, //生命周期 - 创建之前
    beforeMount() {}, //生命周期 - 挂载之前
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {}, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
  }

</script>
<style scoped>
  .box-card {

    margin-top: 15px;
  }

  #ei,
  #eb {
    vertical-align: top；
  }

</style>
