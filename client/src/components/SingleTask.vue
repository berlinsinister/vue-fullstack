<template>
  <div @click="endEdit" class="single-task-container">
    <div class="form">
      <!-- header -->
      <div class="form-header">
        <span
          v-if="!titleEdit && !urlEdit"
          @click="editSettings"
          :class="category"
        >
          <i class="fa-solid fa-pen"></i>
        </span>
      </div>

      <!-- close -->
      <router-link to="/all-tasks">
        <div class="close"><i class="fa-solid fa-xmark"></i></div>
      </router-link>

      <div class="form-content">
        <!-- title -->
        <div class="title">
          <h1 v-if="!titleEdit" @dblclick="titleEdit = true">{{ title }}</h1>
          <input
            v-else
            type="text"
            v-model="title"
            class="input-title"
            @keydown.exact.enter="titleEdit = false"
          />
        </div>

        <div class="url">
          <span
            v-if="!urlEdit"
            @dblclick="urlEdit = true"
            @mouseenter="urlHover = true"
            @mouseleave="urlHover = false"
            @click.ctrl="redirectToOuterPage"
            >{{ url || "https://" }}</span
          >
          <input
            v-else
            type="text"
            v-model="url"
            @keydown.exact.enter="urlEdit = false"
          />
        </div>

        <!-- edit categories -->
        <transition appear @before-enter="beforeEnter" @enter="enter">
          <div class="categories" data-index="1">
            <p>01. Edit category</p>
            <div class="category-items">
              <div
                class="radio-btn-container"
                v-for="(item, i) in categories"
                :key="i"
              >
                <label class="container">
                  <span class="title">{{ item }}</span>
                  <input
                    @change="setCategory(item)"
                    type="radio"
                    name="category"
                    :id="item"
                    :checked="item == category"
                  />
                  <span class="checkmark"></span>
                </label>
              </div>
            </div>
          </div>
        </transition>

        <!-- edit types -->
        <transition appear @before-enter="beforeEnter" @enter="enter">
          <div class="types" data-index="2">
            <p>02. Edit type</p>
            <div class="type-items">
              <div
                class="radio-btn-container"
                v-for="(item, i) in types"
                :key="i"
              >
                <label class="container">
                  <span class="title">{{ item }}</span>
                  <input
                    @change="setType(item)"
                    type="radio"
                    name="type"
                    :id="item"
                    :checked="item == type"
                  />
                  <span class="checkmark"></span>
                </label>
              </div>
            </div>
          </div>
        </transition>

        <!-- edit statuses -->
        <transition appear @before-enter="beforeEnter" @enter="enter">
          <div class="statuses" data-index="3">
            <p>03. Edit status</p>
            <div class="status-items">
              <div
                class="radio-btn-container"
                v-for="(item, i) in statuses"
                :key="i"
              >
                <label class="container">
                  <span class="title">{{ item }}</span>
                  <input
                    @change="setStatus(item)"
                    type="radio"
                    name="status"
                    :id="item"
                    :checked="item == status"
                  />
                  <span class="checkmark"></span>
                </label>
              </div>
            </div>
          </div>
        </transition>

        <div class="update">
          <button @click="updateTask" :class="category">Update</button>
          <router-link to="/all-tasks">
            <span>or dismiss and return to all tasks page</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gsap from "gsap";
import apiCallFunctions from "../TasksAPICalls";

export default {
  name: "SingleTask",
  data() {
    return {
      // from back
      singleTask: {},
      error: "",
      // front
      title: "",
      url: "",
      category: "",
      type: "",
      status: "",
      notes: [],
      categories: ["coding", "medicine", "cooking"],
      types: ["video", "book", "article"],
      statuses: ["not started", "in progress", "completed"],
      // edits
      titleEdit: false,
      urlEdit: false,
      urlHover: false,
    };
  },

  // created()?
  async mounted() {
    try {
      this.singleTask = await apiCallFunctions.readTask(this.$route.params.id);
      this.title = this.singleTask.title;
      this.url = this.singleTask.url;
      this.category = this.singleTask.category;
      this.type = this.singleTask.type;
      this.status = this.singleTask.status;

      // const form = document.querySelector(".form");
      // gsap.to(form, {
      //   scale: 1.25,
      //   // opacity: 0,
      //   delay: 0,
      //   duration: 0.2,
      //   ease: "back.out(1.7)",
      // });
      // gsap.to(form, {
      //   scale: 1,
      //   // opacity: 1,
      //   delay: 0.2,
      //   duration: 0.2,
      //   ease: "back.out(1.7)",
      // });
      const form = document.querySelector(".form");
      gsap.to(form, {
        scale: 1,
        duration: 0.45, // 0.65,
        delay: 0.35, // 0
        opacity: 1,
        ease: "back.out(1.7)",
      });
    } catch (error) {
      this.error = error.message;
    }

    const url = document.querySelector(".url");
    document.addEventListener("keydown", (event) => {
      if (this.urlHover && event.key == "Control") {
        url.style.textDecoration = "underline";
        url.style.cursor = "pointer";
      }
    });
    document.addEventListener("keyup", (event) => {
      if (event.key == "Control") {
        url.style.textDecoration = "none";
        url.style.cursor = "auto";
      }
    });
  },

  methods: {
    editSettings() {
      this.titleEdit = true;
      this.urlEdit = true;
    },

    endEdit(event) {
      if (
        event.target.className == "form" ||
        event.target.className == "single-task-container"
      ) {
        this.titleEdit = false;
        this.urlEdit = false;
      }
    },

    async updateTask() {
      const data = {
        title: this.title,
        url: this.url,
        category: this.category,
        type: this.type,
        status: this.status,
      };
      try {
        await apiCallFunctions.update(this.$route.params.id, data);

        const form = document.querySelector(".form");
        gsap.to(form, {
          scale: 1.25,
          opacity: 1,
          delay: 0,
          duration: 0.45,
          ease: "back.out(1.7)",
        });
        gsap.to(form, {
          scale: 0.5,
          opacity: 0,
          delay: 0.45,
          duration: 0.45,
          ease: "back.out(1.7)",
        });

        setTimeout(() => {
          window.location.href = "/all-tasks";
        }, 1000);
      } catch (error) {
        this.error = error.message;
      }
    },

    setCategory(category) {
      this.category = category;
    },

    setType(type) {
      this.type = type;
    },

    setStatus(status) {
      this.status = status;
    },

    redirectToOuterPage() {
      window.open(this.url, "_blank");
    },

    beforeEnter(el) {
      el.style.opacity = 0;
      // el.style.transform = "translate(-100%)";
    },

    enter(el, done) {
      gsap.to(el, {
        opacity: 1,
        // x: 0,
        duration: 0.7,
        delay: el.dataset.index * 0.4,
        ease: "power.out(4)",
        onComplete: done,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/main.scss";

.single-task-container {
  // cursor: none;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  // background: linear-gradient(45deg, #3f434e, #2d2f36);
  background: #3a4467;
  .form {
    width: 500px;
    // background: rgba(255, 255, 255, 0.15); // #fff;
    // background: linear-gradient(90deg, #555f82, #3a4467);
    background: #555f82;
    border-radius: 10px;
    box-shadow: 0px 15px 10px -10px #222b48;
    padding: 30px;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 12px;
    // backdrop-filter: blur(20px);
    overflow: hidden;
    transform: scale(1.25); // for gsap
    opacity: 0; // for gsap
    // > div {
    //   // border: 1px solid red;
    // }
    .close {
      @include close-button;
    }
    &-header {
      height: 80px;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      // background: #555f82;
      background: linear-gradient(90deg, #555f82, #3a4467);
      > span {
        @include edit-button;
      }
    }
    &-content {
      margin-top: 100px;
      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        > h1,
        > input {
          font-size: 32px;
          font-weight: 300;
          color: #fff;
        }
        > input {
          width: 100%;
          background: none;
          border: none;
          border-bottom: 1px solid #fff;
          outline: none;
        }
      }
      .url {
        margin-bottom: 15px;
        > span,
        > input {
          font-size: 16px;
          font-weight: 300;
          color: #fff;
        }
        > input {
          width: 100%;
          background: none;
          border: none;
          border-bottom: 1px solid #fff;
          outline: none;
        }
      }
      .categories,
      .types,
      .statuses {
        border-bottom: 1px solid rgba(255, 255, 255, 0.15);
        padding: 20px 0;
        > p {
          color: #fff;
          font-size: 14px;
          font-weight: 300;
          margin-bottom: 10px;
        }
        > div {
          display: flex;
          justify-content: space-between;
          .radio-btn-container {
            width: 120px;
            @include radio($type: "update");
          }
        }
      }
      .update {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        margin-top: 15px;
        > button {
          width: 100%; // 150px;
          height: 50px;
          // background: none;
          color: #fff;
          font-size: 14px;
          border: none;
          // border: 1px solid rgba(255, 255, 255, 0.5);
          // background: linear-gradient(90deg, #555f82, #3a4467);
          border-radius: $border-radius;
          transition: all 0.2s ease;
          &:hover {
            // background: rgba(255, 255, 255, 0.15);
            cursor: pointer;
          }
        }
        span {
          color: #fff;
          font-size: 14px;
          font-weight: 300;
          font-style: italic;
          margin-top: 15px;
          display: inline-block;
          text-decoration: none;
        }
      }
    }
  }
}
</style>