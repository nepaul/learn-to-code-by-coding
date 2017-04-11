<template>
  <div>
    <router-link to="login" class="el-button">Log In</router-link>
    <router-link class="el-button" type="primary" to="signup">Create Account</router-link>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
