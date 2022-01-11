<template>
  <div class="ring" :style="{ top: y, left: x }">
    <div class="dot"></div>
  </div>
</template>

<script>
import gsap from "gsap";

export default {
  name: "RingCursor",
  data() {
    return {
      x: 0,
      y: 0,
      ring: null,
      dot: null,
      ringSize: 21,
    };
  },

  props: {
    listHover: { type: Boolean, default: false },
  },

  mounted() {
    this.ring = document.querySelector(".ring");
    this.dot = document.querySelector(".dot");

    window.addEventListener("mousemove", this.move);
  },

  beforeUnmount() {
    window.removeEventListener("mousemove", this.move);
  },

  methods: {
    move(event) {
      this.x = event.x - this.ringSize / 2 + "px";
      this.y = event.y - this.ringSize / 2 + "px";

      if (this.listHover) {
        gsap.to(this.ring, {
          width: 50,
          height: 50,
          opacity: 0.3,
          duration: 0.2,
        });
        this.dot.style.display = "none";
      } else {
        gsap.to(this.ring, {
          width: this.ringSize,
          height: this.ringSize,
          opacity: 1,
          duration: 0.2,
        });
        this.dot.style.display = "block";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/main.scss";

.ring {
  position: fixed;
  top: 0;
  left: 0;
  width: 21px;
  height: 21px;
  // border: 1px solid #fff; // $mint-green;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  z-index: 150;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  .dot {
    width: 5px;
    height: 5px;
    background: #fff; // $mint-green;
    border-radius: 50%;
    // animation: dot-shadow 0.5s linear infinite;
    // @keyframes dot-shadow {
    //   0%,
    //   100% {
    //     box-shadow: 0 0 7px 2px $mint-green;
    //   }
    //   50% {
    //     box-shadow: 0 0 1px 2px $mint-green;
    //   }
    // }
  }
}
</style>