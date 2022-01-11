<template>
  <div class="bottom-navbar">
    <div
      v-for="i in totalNavbarItems"
      :key="i"
      @click="swap(i)"
      class="bottom-navbar-item"
    >
      <div :class="activeNavbarItem === i ? 'active' : ''"></div>
    </div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="23.5"
      height="5"
      class="bottom-navbar-arrow"
      @click="swapArrow"
    >
      <path fill="none" stroke="#fff" d="M0 2.5h20"></path>
      <path d="M23.5 2.5l-4 2.5V0z" fill="#fff"></path>
    </svg>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      totalNavbarItems: 3,
      activeNavbarItem: null, // 1,
      paths: {
        Home: 1,
        AddTask: 2,
        AllTasks: 3,
      },
    };
  },
  methods: {
    swap(i) {
      this.activeNavbarItem = i;
      switch (i) {
        case 1:
          this.$router.push({ name: "Home" });
          break;
        case 2:
          this.$router.push({ name: "AddTask" });
          break;
        case 3:
          this.$router.push({ name: "AllTasks" });
          break;
      }
    },
    swapArrow() {
      if (this.activeNavbarItem < this.totalNavbarItems) {
        this.activeNavbarItem++;
        this.swap(this.activeNavbarItem);
      }
    },
  },
  watch: {
    "$route.name"(value) {
      if (value.includes("Single")) {
        this.activeNavbarItem = null;
      }
      this.activeNavbarItem = this.paths[value];
    },
  },
};
</script>

<style lang="scss" scoped>
.bottom-navbar {
  $size_20: 20px;
  $size_10: 10px;
  $size_4: 4px;

  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  // border: 1px solid blue;
  &-item {
    width: $size_20 * 2;
    height: $size_20;
    display: flex;
    justify-content: center;
    align-items: center;
    > div {
      width: $size_4;
      height: $size_4;
      border-radius: 100%;
      background: #fff;
      opacity: 0.5;
      transition: all 0.2s ease;
    }
    .active {
      width: $size_10;
      height: $size_10;
      background: #fff;
      opacity: 1;
    }
    &:hover {
      cursor: pointer;
      > div {
        opacity: 1;
        background: #fff;
      }
    }
  }
  &-arrow {
    margin-left: 20px;
    transition: all 0.2s ease;
    &:hover {
      cursor: pointer;
      transform: translateX(5px);
    }
  }
}
</style>