<template>
  <div class="header">
    <!-- <svg xmlns="http://www.w3.org/2000/svg" width="40" height="50" style="">
      <path d="M0 0 L20 25 L40 0 L40 50 L35 50 L35 15 L20 34 L0 9 Z"></path>
    </svg> -->
    <div class="header-title">
      {{ headerTitle }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      titles: {
        Home: "connect",
        AddTask: "add task",
        AllTasks: "all tasks",
        SingleTask: "single task",
      },
    };
  },
  computed: {
    headerTitle() {
      return this.titles[this.$route.name];
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/main.scss";

.header {
  width: 100%;
  height: 100px;
  position: fixed;
  top: 0;
  left: 0;
  // display: flex;
  // align-items: center;
  // gap: 30px; // 40px;
  //  padding: 0 50px;
  z-index: 3000;
  &-title {
    color: #fff;
    font-size: 70px;
    font-weight: 100;
    text-align: center;
    padding: 30px;
    opacity: 0.1;
  }
}
</style>