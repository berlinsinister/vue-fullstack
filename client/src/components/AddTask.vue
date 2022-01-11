<template>
  <div v-if="loading" class="loading">loading ...</div>
  <div v-else>
    <div v-if="error" class="error">
      you are not authorized to view this page
    </div>
    <div v-else class="add-task-container">
      <div class="button">
        <div @click="newTask = true" class="overlay">
          <div class="plus">
            <div class="plus-horz"></div>
            <div class="plus-vert"></div>
          </div>
        </div>
        <div class="wrapper">
          <div
            v-for="i in 3"
            :key="i"
            :class="`sector-${i}`"
            class="sector"
          ></div>
        </div>
        <div class="wrapper wrapper-blur">
          <div
            v-for="i in 3"
            :key="i"
            :class="`sector-${i}`"
            class="sector"
          ></div>
        </div>
      </div>

      <NewTask
        v-if="newTask"
        @click="closeOnClick"
        @closeAfterCreate="closeAfterCreate"
      />
    </div>
  </div>
</template>

<script>
import NewTask from "./NewTask";
import gsap from "gsap";
import tasksAPICalls from "../TasksAPICalls";

export default {
  name: "AddTask",
  components: {
    NewTask,
  },
  data() {
    return {
      tasks: [],
      loading: true,
      error: null,
      newTask: false,
    };
  },

  async created() {
    try {
      const result = await tasksAPICalls.read();
      this.tasks = result.tasks;
      this.loading = false;
    } catch (error) {
      this.error = error;
      this.loading = false;
    }
  },

  methods: {
    closeGsap() {
      const form = document.querySelector(".input-wrapper");
      gsap.to(form, {
        scale: 0.2,
        duration: 0.45, // 0.65,
        delay: 0,
        opacity: 0,
        ease: "back.out(1.7)",
      });
      setTimeout(() => {
        this.newTask = false;
      }, 400);
    },
    closeOnClick(event) {
      if (event.target.className == "input-container") {
        this.closeGsap();
      }
    },
    closeAfterCreate() {
      this.closeGsap();
    },
  },
};
</script>

<style lang="scss" scoped>
@use "sass:math";
@import "@/assets/sass/main.scss";

.loading,
.error,
.add-task-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.error,
.loading {
  background: #3a4467;
}
.add-task-container {
  background: #3a4467;
  position: relative;
  .button {
    position: relative;
    .wrapper {
      width: 300px;
      height: 300px;
      border-radius: 50%;
      position: relative;
      overflow: hidden;
      .sector {
        $size: 200px;
        position: absolute;
        transform-origin: 100% 100%;
        width: $size;
        height: $size;
        left: 50%;
        top: 50%;
        margin-top: -$size;
        margin-left: -$size;
        animation: sector-blur 1.5s linear infinite;
        @keyframes sector-blur {
          0%,
          100% {
            filter: blur(5px);
          }
          50% {
            filter: blur(40px);
          }
        }
      }
      .sector-1 {
        background: linear-gradient(90deg, #9d83f1, #ff73b3);
        transform: rotate(0deg) skew(-10deg);
      }
      .sector-2 {
        background: #32c0e4;
        transform: rotate(120deg) skew(-10deg);
      }
      .sector-3 {
        background: #619edd;
        transform: rotate(240deg) skew(-10deg);
      }
    }
    .wrapper-blur {
      position: absolute;
      top: 0;
      left: 0;
      filter: blur(50px);
      animation: wrapper-blur 7s linear infinite;
      @keyframes wrapper-blur {
        50% {
          transform: rotate(360deg) scale(1.1);
          // overflow: visible;
          filter: blur(100px);
        }
      }
    }
    .overlay {
      position: absolute;
      background: #3a4467;
      width: 290px;
      height: 290px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1;
      &:hover {
        cursor: pointer;
        + .wrapper {
          animation: button-scale 1.5s ease-in-out infinite;
          @keyframes button-scale {
            50% {
              transform: scale(1.1);
              // rotate(360deg)
              // overflow: visible;
            }
          }
        }
        // + .wrapper > .sector {
        //   animation: sector-blur 1.5s ease-in-out infinite;
        //   @keyframes sector-blur {
        //     50% {
        //       filter: blur(40px);
        //     }
        //   }
        // }
      }
      .plus {
        $size: 80px;
        width: $size;
        height: $size;
        &-horz,
        &-vert {
          background: #fff;
          position: relative;
          height: 2px;
          top: math.div($size, 2);
        }
        &-vert {
          transform: rotate(90deg);
        }
      }
    }

    // button {
    //   width: 300px;
    //   height: 300px;
    //   border-radius: 50%;
    //   background: none;
    //   color: #fff;
    //   font-family: "Roboto", serif;
    //   font-size: 60px; // 36px;
    //   font-weight: 100;
    //   border: 1px solid rgba(255, 255, 255, 0.5);
    //   backdrop-filter: blur(15px);
    //   transition: all 0.2s ease;
    //   &:hover {
    //     cursor: pointer;
    //     animation: button-shadow 1s linear infinite;
    //   }
    //   @keyframes button-shadow {
    //     0%,
    //     100% {
    //       box-shadow: 0 3px 10px 2px rgba(255, 255, 255, 0.15);
    //     }
    //     20% {
    //       box-shadow: 0 0 1px 2px rgba(255, 255, 255, 0.15);
    //     }
    //     40% {
    //       box-shadow: 3px 0 10px 2px rgba(255, 255, 255, 0.15);
    //     }
    //     60% {
    //       box-shadow: 3px 0 20px 2px rgba(255, 255, 255, 0.15);
    //     }
    //   }
    // }
  }
}
</style>
