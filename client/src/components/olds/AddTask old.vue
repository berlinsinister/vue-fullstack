<template>
  <div class="container" :style="deletePopup ? { cursor: 'auto' } : ''">
    <div class="list-container">
      <div class="list-header">
        <div class="list-header-date">
          <div>{{ day }}</div>
          <div>
            <div>{{ month }}</div>
            <div>{{ year }}</div>
          </div>
        </div>
        <div class="list-header-weekday">{{ weekday }}</div>
      </div>

      <div
        @mouseenter="listItemSettings($event, i)"
        @mouseleave="listItemSettings($event, i)"
        class="list-item"
        v-for="(task, i) in tasks"
        :key="task._id"
        :data-index="i"
        :style="i === tasks.length - 1 ? { borderBottom: 'none' } : ''"
      >
        {{ task.title }}
        <div v-show="i === listIndex" class="list-item-settings">
          <div @click="redirectToSingleTask(task._id)" class="read">
            <i class="fa-solid fa-eye"></i>
          </div>
          <!-- @click="deleteTask(task._id)" -->
          <div @click="listDelete(task._id)" class="delete">
            <i class="fa-solid fa-xmark"></i>
          </div>
        </div>
      </div>
      <div v-show="deletePopup" class="list-delete">
        <p>enter password</p>
        <input
          v-model="password"
          type="password"
          placeholder="Enter password"
        />
        <div class="list-delete-buttons">
          <button @click="deletePopup = false">cancel</button>
          <button @click="deleteTask(id_)">delete</button>
        </div>
      </div>
      <div class="list-bottom"></div>
    </div>

    <div class="button-container">
      <button @click="newTask = true">+</button>
    </div>

    <NewTask
      v-if="newTask"
      @click="closeOnClick"
      @closeAfterCreate="closeAfterCreate"
    />

    <!-- <RingCursor v-show="!deletePopup" :list-hover="listHover" /> -->

    <div
      v-show="deletePopup"
      @click="deletePopup = false"
      class="delete-background"
    ></div>
  </div>
</template>

<script>
import NewTask from "./NewTask";
// import RingCursor from "./RingCursor";
import gsap from "gsap";
import apiCallFunctions from "../TasksAPICalls";

export default {
  name: "AddTask",
  components: {
    NewTask,
    // RingCursor,
  },
  data() {
    return {
      tasks: [],
      error: "",
      day: null,
      month: null,
      year: null,
      weekday: null,
      newTask: false,
      listIndex: null,
      listHover: false,
      sound: null,
      deletePopup: false,
      id_: null,
      password: "",
    };
  },

  async created() {
    try {
      const result = await apiCallFunctions.read();
      this.tasks = result.slice(0, 4);
    } catch (error) {
      this.error = error.message;
    }

    this.setDate();
    this.sound = new Audio(require("@/assets/sounds/click.mp3"));
    this.sound.volume = 0.2;
  },

  methods: {
    async closeAfterCreate() {
      this.newTask = false;
      try {
        const result = await apiCallFunctions.read();
        this.tasks = result.slice(0, 4);

        setTimeout(() => {
          let latestTask = document.querySelector(".list-item");
          gsap.to(latestTask, {
            opacity: 1,
            scale: 1.25, // 1.4,
            duration: 0, // 0.05,
            delay: 0, // 0.2,
          });

          gsap.to(latestTask, {
            opacity: 1,
            scale: 1,
            duration: 0.05,
            delay: 0.25, // 0.4,
          });
        }, 0);
      } catch (error) {
        this.error = error.message;
      }
    },

    redirectToSingleTask(id) {
      this.$router.push({ name: "SingleTask", params: { id } });
    },

    async deleteTask(id) {
      if (this.password == process.env.VUE_APP_PASSWORD) {
        try {
          await apiCallFunctions.delete(id);
          const result = await apiCallFunctions.read();
          this.tasks = result.slice(0, 4);
          this.deletePopup = false;
          this.password = "";
        } catch (error) {
          this.error = error.message;
        }
      } else {
        alert("wrong password");
      }
    },

    setDate() {
      const months = [
        "jan",
        "feb",
        "mar",
        "apr",
        "may",
        "jun",
        "jul",
        "aug",
        "sept",
        "oct",
        "nov",
        "dec",
      ];
      const weekdays = [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ];
      let date = new Date();
      this.day = date.getDate();
      this.month = months[date.getMonth()];
      this.year = date.getFullYear();
      this.weekday = weekdays[date.getDay() - 1];
      if (!this.weekday) {
        this.weekday = "sunday";
      }
    },

    listItemSettings(event, i) {
      const readBtn = [...document.querySelectorAll(".read")][i];
      const deleteBtn = [...document.querySelectorAll(".delete")][i];

      // initial gsap settings for readBtn, changing later in the code for the individual case
      let gsapSettings = {
        scale: 1.15,
        delay: 0.1, // 0.05,
        duration: 0.1,
        ease: "back.out(1.7)",
      };

      if (event.type === "mouseenter") {
        this.listIndex = i;
        this.listHover = true;

        this.sound.play();

        this.animationGsap(readBtn, gsapSettings);

        // deleteBtn settings
        gsapSettings["scale"] = 1;
        gsapSettings["delay"] = 0;
        this.animationGsap(deleteBtn, gsapSettings);
      }
      if (event.type === "mouseleave") {
        this.listIndex = null;
        this.listHover = false;

        // reset settings for all
        gsapSettings["scale"] = 0.7;
        this.animationGsap(readBtn, gsapSettings);
        this.animationGsap(deleteBtn, gsapSettings);
      }
    },

    animationGsap(el, gsapSettings) {
      gsap.to(el, { ...gsapSettings });
    },

    closeOnClick(event) {
      if (event.target.className == "input-container") {
        const wrapper = document.querySelector(".input-wrapper");
        gsap.to(wrapper, {
          scale: 0.2,
          duration: 0.65,
          delay: 0,
          opacity: 0,
          ease: "back.out(1.7)",
        });
        setTimeout(() => {
          this.newTask = false;
        }, 400);
      }
    },

    listDelete(id) {
      this.id_ = id;
      this.deletePopup = true;
      const el = document.querySelector(".list-delete");
      gsap.to(el, {
        scale: 1.25, // 2, // 2.5,
        opacity: 0,
        delay: 0,
        duration: 0,
      });
      gsap.to(el, {
        scale: 1,
        opacity: 1,
        delay: 0.05,
        duration: 0.45,
        ease: "back.out(1.7)",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/main.scss";

.container {
  // cursor: none;
  background: #2a2a2a; // $beige;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .list-container {
    width: 500px;
    margin-top: 150px;
    box-shadow: 0 0 3px $beige-shadow;
    // border: 1px solid red;
    position: relative;
    .list-header,
    .list-item {
      background: #fff;
      border-bottom: 1px solid $beige;
      display: flex;
      justify-content: space-between;
    }
    .list-header {
      align-items: center;
      border-top-left-radius: $border-radius;
      border-top-right-radius: $border-radius;
      padding: 30px; // 25px;
      &-date {
        display: flex;
        align-items: center;
        > div:first-child {
          font-size: 44px;
          margin-right: 10px;
        }
        > div:nth-child(2) {
          > div:first-child {
            text-transform: uppercase;
            font-weight: bold;
          }
        }
      }
      &-weekday {
        text-transform: uppercase;
        font-weight: bold;
      }
    }
    .list-item {
      align-items: center;
      border-left: 4px solid transparent;
      height: 90px;
      padding: 0 30px;
      // transition: all 0.2s ease;
      transition: all 0.3s ease;
      &:hover {
        // cursor: pointer;
        border-left: 4px solid $mint-green;
        // padding: 35px 30px;
        height: 120px;
        box-shadow: 0 0 10px $beige-shadow;
        // z-index: 1000;
      }
      &-settings {
        // border: 1px solid red;
        display: flex;
        > div {
          @include settings-button($width: 50px, $height: 50px);
          // transform: scale(0.7); // for gsap
          &:hover {
            // transform: scale(1.2);
            // cursor: pointer;
            z-index: 50;
            color: $mint-green;
          }
        }
        .read {
          z-index: 30;
        }
        .delete {
          margin-left: -10px;
          z-index: 10;
          &:hover {
            color: $japanese-red;
          }
        }
      }
    }
    .list-delete {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: $border-radius - 6px;
      background: #fff;
      width: 450px;
      padding: 30px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      z-index: 120;
      > input[type="password"] {
        border: 1px solid gainsboro;
        height: 50px;
        outline: none;
        padding: 0 20px;
      }
      &-buttons {
        align-self: flex-end;
        > button {
          width: 100px;
          height: 35px;
          color: #fff;
          border: none;
          border-radius: $border-radius - 6px;
          &:first-child {
            background: gainsboro;
            margin-right: 4px;
          }
          &:nth-child(2) {
            background: $japanese-red;
          }
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
    .list-bottom {
      background: #fff;
      padding-bottom: 60px;
      border-bottom: none;
      border-bottom-left-radius: $border-radius;
      border-bottom-right-radius: $border-radius;
    }
    .list-white-bg {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 130px;
      width: 100%;
      background: linear-gradient(0deg, #fff, #fff, transparent);
      // border: 1px solid red;
    }
  }
  .button-container {
    margin-top: -50px;
    z-index: 100;
    button {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: $mint-green;
      color: #fff;
      font-family: "Roboto", serif;
      font-size: 60px; // 36px;
      font-weight: 100;
      border: none;
      transition: all 0.15s;
      &:hover {
        cursor: pointer;
        // transform: scale(1.1);
        animation: button-shadow 1s linear infinite;
      }
      @keyframes button-shadow {
        0%,
        100% {
          box-shadow: 0 3px 10px 2px $mint-green;
        }
        20% {
          box-shadow: 0 0 1px 2px $mint-green;
        }
        40% {
          box-shadow: 3px 0 10px 2px $mint-green;
        }
        60% {
          box-shadow: 3px 0 20px 2px $mint-green;
        }
      }
    }
  }
  .delete-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba($color: #000, $alpha: 0.5);
    z-index: 110;
  }
}
</style>
