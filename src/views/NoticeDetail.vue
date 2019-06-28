<template>
  <div class="NoticeDetial">
   <TopHead title="公告信息"> <div slot="r"></div></TopHead>
  {{ $route.params.id }}
  </div>
</template>

<script>
import TopHead from '../components/TopHead';
export default {
  name: 'NoticeDetial',
  data() {
    return {};
  },
  components: {
    TopHead
  }
};
</script>

<style scoped>
</style>
