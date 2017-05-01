<template>
<el-row :gutter="20">
  <el-col :span="8" :offset="8">
    <el-form ref="form" :model="form">
      <el-form-item>
        <el-input v-model="form.email" placeholder="Email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="password" v-model="form.password" placeholder="Password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Log In</el-button>
      </el-form-item>
    </el-form>
  </el-col>
</el-row>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('login', this.form)
        .then(() => {}, err => this.$message.error(`Login Fail: ${err.error}`));
    },
  },
};
</script>
