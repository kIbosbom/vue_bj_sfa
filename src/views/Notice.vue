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
          <li v-for="item in NoticeList" :key="item.id" class="notice-item">
            <router-link :to="`/notice/${item.id}`">
              <div class="notice-wrap">
                <i class="icon iconfont icon-dian" :class="{readed: item.isRead}"></i>
                <div class="notice-bd">
                  <h3 class="notice-title">{{ item.title }}</h3>
                  <p class="notice-date">{{ item.SubDate | dateFormat }}</p>
                </div>
              </div>
            </router-link>
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
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'Notice',
  data() {
    return {
      // NoticeList: [],
      // 是否全部加载完成了数据
      allLoaded: false,
      // 加载数据的开始日期
      startDate: null,
      // 加载数据的结束日期
      endDate: null
    };
  },
  computed: {
    ...mapState(['NoticeList'])
  },
  filters: {
    dateFormat(val) {
      let d = new Date(val);
      return `${d.getFullYear()}年 ${d.getMonth() + 1}月 ${d.getDate()}日`;
    }
  },
  methods: {
    ...mapMutations(['initNoticeList', 'unshiftMoreNotice', 'pushMoreNotice']),
    loadTop() {
      Service.getNotices(this.startDate, 10, false).then(res => {
        // this.NoticeList.unshift(...res.data.data.messages);
        this.unshiftMoreNotice(res.data.data.messages);
        this.startDate = new Date(this.NoticeList[0].SubDate);
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
        // this.NoticeList.push(...res.data.data.messages);
        this.pushMoreNotice(res.data.data.messages);
        this.endDate = new Date(
          this.NoticeList[this.NoticeList.length - 1].SubDate
        );
        // 加载完数据后，必须重新计算列表的高度。
        this.$refs.loadmore.onBottomLoaded();
      });
    }
  },
  created() {
    this.startDate = new Date();
    Service.getNotices(new Date(), 10, true).then(res => {
      // this.NoticeList.push(...res.data.data.messages); //本地组件的状态维护notice
      this.initNoticeList(res.data.data.messages); // vuex触发突变，修改vuex中的NoticeList
      this.endDate = this.NoticeList[this.NoticeList.length - 1].SubDate;
    });
  },
  components: {
    TopHead,
    Loadmore
  }
};
</script>

<style lang="scss" scoped>
.notice-list {
  background: #fff;
  .notice-item {
    // line-height: px2rem(125);
    height: px2rem(125-32);
    padding: px2rem(32) 0 0 px2rem(40);
    border-bottom: px2rem(1) solid #ccc;
    .notice-title {
      font-size: px2rem(28);
      color: #000;
      line-height: px2rem(28);
    }
    .notice-date {
      font-size: px2rem(16);
      color: #666;
      line-height: px2rem(16+34);
    }
    .notice-wrap {
      display: flex;
      i {
        flex: 0 0 px2rem(43);
        color: red;
        line-height: px2rem(20);
        font-size: px2rem(50);
      }
      i.readed {
        color: #ccc;
      }
    }
  }
}
</style>
