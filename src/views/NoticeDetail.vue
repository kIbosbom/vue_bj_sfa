<template>
  <div class="NoticeDetial">
   <TopHead title="公告信息"> <div slot="r"></div></TopHead>
   <h3>{{Notice.title}}</h3>
   <p class="to">{{Notice.to}}</p>
   <div>
    {{Notice.text}}
   </div>
   <p class="date">{{Notice.date}}</p>
   <p class="address">{{Notice.address}}</p>
  </div>
</template>

<script>
import TopHead from '../components/TopHead';
import { mapState } from 'vuex';
export default {
  name: 'NoticeDetial',
  data() {
    return {
      Notice: null
    };
  },
  computed: {
    ...mapState(['NoticeList'])
  },
  created() {
    this.Notice = this.NoticeList.find(
      item => item.id == this.$route.params.id
    );
  },
  components: {
    TopHead
  }
};
</script>

<style lang="scss" scoped>
.NoticeDetial {
  color: #000;
  font-size: px2rem(28);
  line-height: 1.5;
  padding: px2rem(15);
  h3 {
    font-size: px2rem(30);
    padding: px2rem(20) 0;
  }
  .to {
    padding-bottom: px2rem(30);
  }
  .date {
    padding-top: px2rem(50);
  }
}
</style>
