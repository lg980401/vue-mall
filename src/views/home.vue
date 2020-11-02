<template>

  <el-container class="layout">
    <el-header>
      <h2 style="color:azure;">{{username}}</h2>

    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '50px' : '200px'">
        <div class="toggle-btn" @click="btn()">|||</div>
        <el-menu :default-active="activePath" router background-color="#333744" active-text-color="#409EFF"
          text-color="#fff" nique-opened :collapse="isCollapse" :collapse-transition="false"
          :width="isCollapse ? '50px' : '200px'">
          <el-submenu v-for="item in items" :key="item.id" :index="item.id +''">
            <template slot="title">

              <i :class="icon[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item v-for="subitem in item.children" :key="subitem.id" :index="'/'+subitem.path">
              <template slot="title">


                <i class="el-icon-menu"></i>
                <span>{{subitem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>

        </el-menu>
      </el-aside>

      <el-main>
        <router-view></router-view>
      </el-main>


    </el-container>
  </el-container>

</template>
<script>
  export default {
    name: 'home',
    components: {},
    data() {
      return {
        items: null,
        username: "",
        icon: {
          101: "el-icon-s-tools",
          102: "el-icon-shopping-cart-full",
          103: 'el-icon-s-marketing',
          125: 'el-icon-user-solid',
          145: 'el-icon-notebook-1',
        },
        isCollapse: false

      };
    },
    created() {
      //请求侧栏菜单数据
      this.getAsideItem()
      let name = this.$route.query.username;

      if (name != "") {
        this.username = name;
      }
    },
    mounted() {
      console.log(this.$route.path);
    },
    computed: {
      activePath() {
        return this.$route.path;
      }
    },
    watch: {},
    methods: {
      getAsideItem() {
        this.$store.dispatch('getAsideItem', {}).then(res => {
          if (res.meta.status == 200 && res.data != null) {
            this.items = res.data;
            console.log(res);
          } else {
            this.$message({
              message: res.meta.msg,
              type: 'error'
            })
          }
        })
      },

      btn() {
        this.isCollapse = !this.isCollapse;
      }





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
  .layout {
    height: 100%;
  }

  .el-header {
    background-color: #373d41
  }

  .el-aside {
    background-color: #333744
  }

  .el-main {
    background-color: #E9EEF3;


  }

  .toggle-btn {
    text-align: center;
    background-color: #4a5064;
    color: #fff;
    line-height: 24px;
    letter-spacing: .3em;
  }

</style>
