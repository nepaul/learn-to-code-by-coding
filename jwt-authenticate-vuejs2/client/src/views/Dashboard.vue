<template>
<el-row :gutter="20">
  <el-col :span="8" :offset="8">
    <router-link :to="'/'">Home</router-link>
    <h1>Hello! {{username}}</h1>
  </el-col>
</el-row>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'dashboard',
  computed: {
    ...mapGetters([
      'username',
    ]),
  },
  beforeMount() {
    this.$store.dispatch('fetchProfile');
  },
};
</script>
