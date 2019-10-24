<template>
  <div class="User">
    <el-table
    :data="userList"
    stripe
    border
    style="width: 100%">
      <el-table-column
        prop="id"
        label="id"
        width="300">
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
        width="150">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="150">
      </el-table-column>
      <el-table-column
        prop="userType"
        label="身份"
        width="130">
        <template slot-scope="scope">
          <span>{{ scope.row.userType === 1 ? '普通用户' : '管理员' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="230">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话"
        width="130">
      </el-table-column>
      <el-table-column
        prop="createDate"
        label="创建时间"
        width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.createDate | dateFormat }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="lastLoginDate"
        label="上次登录时间"
        width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.lastLoginDate | dateFormat }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="allowLogin"
        label="账号状态">
        <template slot-scope="scope">
          <el-switch
            v-model="userList[scope.$index].allowLogin"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      background
      layout="prev, pager, next"
      :total="total"
      :page-count="pages"
      :current-page="current">
    </el-pagination>
  </div>
</template>

<script>
export default {

  name: 'User',

  data () {
    return {
      userList: [], // 用户列表
      current: 1, // 当前页数
      pages: 1, // 总页数
      size: 10, // 每页的数目
      total: 0 // 总数目
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    getUserList () { // 获取用户列表
      this.$axios.get(this.$url('GET_USER_LIST'), { // methods 1:手机号 2邮箱
        params: {
          pageNo: String(this.current),
          pageSize: String(this.size)
        }
      }).then(res => {
        if (res.code === '200') {
          let records = res.data.records
          for (let i = 0; i < records.length; i++) {
            records[i].allowLogin = records[i].allowLogin === 1
          }
          this.userList = records
          this.current = res.data.current
          this.pages = res.data.pages
          this.size = res.data.size
          this.total = res.data.total
        } else { // 失败
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .User
    width 100%
    height 100%
    position relative
    .pagination
      margin-top 20px
      margin-right 50px
      float right
</style>
