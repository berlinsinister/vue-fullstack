<template>
  <div class="bubbles" style="transform: rotate(180deg)">
    <div v-for="i in 4" :key="i" :class="`bubble-${i}`"></div>
  </div>
</template>

<style lang="scss" scoped>
@mixin bubble($size-outer, $time, $size-inner, $color) {
  width: $size-outer * 1.5;
  height: $size-outer / 2;
  // border: 1px solid red;
  position: relative;
  animation: rotate $time linear infinite;
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: $size-inner;
    height: $size-inner;
    border-radius: 50%;
    background: $color;
  }
}

.bubbles {
  display: flex;
  .bubble-1,
  .bubble-2,
  .bubble-3,
  .bubble-4 {
    margin-left: -30px;
  }
  .bubble-1 {
    @include bubble(
      $size-outer: 60px,
      $time: 2s,
      $size-inner: 5px,
      $color: #fff
    );
  }
  .bubble-2 {
    @include bubble(
      $size-outer: 30px,
      $time: 1.5s,
      $size-inner: 7px,
      $color: yellow
    );
  }
  .bubble-3 {
    @include bubble(
      $size-outer: 70px,
      $time: 1.5s,
      $size-inner: 3px,
      $color: #fff
    );
  }
  .bubble-4 {
    @include bubble(
      $size-outer: 30px,
      $time: 1s,
      $size-inner: 5px,
      $color: #fff
    );
  }
}
</style>