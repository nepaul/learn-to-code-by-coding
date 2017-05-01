<template>
  <el-row :gutter="20">
    <el-col :span="12" :offset="6">
      <template v-if="!isAuthenticated">
        <el-button v-on:click="login">Log In</el-button>
        <el-button type="primary" v-on:click="signup">Sign Up</el-button>
      </template>
      <template v-else>
        <el-button v-on:click="goDashboard">Go Dashboard</el-button>
        <el-button type="primary" v-on:click="logout">Sign Out</el-button>
      </template>
    </el-col>
  </el-row>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'home',
  components: {},
  data() {
    return {
    };
  },
  computed: {
    ...mapState([
      'isAuthenticated',
    ]),
  },
  methods: {
    login() {
      this.$router.push('login');
    },
    signup() {
      this.$router.push('signup');
    },
    goDashboard() {
      this.$router.push('dashboard');
    },
    ...mapActions([
      'logout',
    ]),
  },
};
</script>
