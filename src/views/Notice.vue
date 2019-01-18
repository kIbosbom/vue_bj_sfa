<template>
  <div class="notice">
    <TopHead title="公司公告"> <div slot="r"></div></TopHead>
    <div class="notice-wrap">
      <Loadmore
        :top-method="loadTop"
        :bottom-method="loadBottom"
        :bottom-all-loaded="allLoaded"
        :auto-fill="true"
        ref="loadmore"
      >
        <ul class="notice-list">
          <li v-for="item in NoticeList" :key="item.id">
            <a href="#">{{ item.title }}</a>
          </li>
        </ul>
      </Loadmore>
    </div>
  </div>
</template>

<script>
import TopHead from '../components/TopHead';
import Service from '../service/index.js';
import { Loadmore } from 'mint-ui';

export default {
  name: 'Notice',
  data() {
    return {
      NoticeList: [],
      // 是否全部加载完成了数据
      allLoaded: false,
      // 加载数据的开始日期
      startDate: null,
      // 加载数据的结束日期
      endDate: null
    };
  },
  methods: {
    loadTop() {
      Service.getNotices(this.startDate, 10, false).then(res => {
        this.NoticeList.unshift(...res.data.data.messages);
        this.startDate = this.NoticeList[0].SubDate;
        // 加载完数据后，必须重新计算列表的高度。
        this.$refs.loadmore.onTopLoaded();
      });
    },
    loadBottom() {
      Service.getNotices(this.endDate, 10, true).then(res => {
        if (res.data.data.messages.length <= 0) {
          this.allLoaded = true;
          return;
        }
        this.NoticeList.push(...res.data.data.messages);
        this.endDate = this.NoticeList[this.NoticeList.length - 1].SubDate;
        // 加载完数据后，必须重新计算列表的高度。
        this.$refs.loadmore.onBottomLoaded();
      });
    }
  },
  created() {
    var now = Date.now();
    this.startDate = now;
    Service.getNotices(now, 10, true).then(res => {
      this.NoticeList.push(...res.data.data.messages);
      this.endDate = this.NoticeList[this.NoticeList.length - 1].SubDate;
    });
  },
  components: {
    TopHead,
    Loadmore
  }
};
</script>

<style lang="scss" scoped></style>
