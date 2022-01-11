<template>
  <div class="input-container">
    <div class="input-wrapper">
      <div class="title">
        <p>Enter title</p>
        <input v-model="title" type="text" placeholder="enter title" />
      </div>
      <div class="url">
        <p>Enter url</p>
        <input v-model="url" type="text" placeholder="https://" />
      </div>
      <!-- categories -->
      <div class="categories">
        <p>Select category</p>
        <div class="category-items">
          <div
            class="radio-btn-container"
            v-for="(category, i) in categories"
            :key="i"
          >
            <!-- <input
              @change="setCategory(category)"
              type="radio"
              name="category"
              :id="category"
            />
            <label :for="category">{{ category }}</label> -->
            <label class="container">
              <span class="title">{{ category }}</span>
              <input
                @change="setCategory(category)"
                type="radio"
                name="category"
                :id="category"
              />
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
      </div>
      <!-- types -->
      <div class="types">
        <p>Select type</p>
        <div class="type-items">
          <div class="radio-btn-container" v-for="(type, i) in types" :key="i">
            <label class="container">
              <span class="title">{{ type }}</span>
              <input
                @change="setType(type)"
                type="radio"
                name="type"
                :id="type"
              />
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
      </div>
      <!-- statuses -->
      <div class="statuses">
        <p>Select status</p>
        <div class="status-items">
          <div
            class="radio-btn-container"
            v-for="(status, i) in statuses"
            :key="i"
          >
            <label class="container">
              <span class="title">{{ status }}</span>
              <input
                @change="setStatus(status)"
                type="radio"
                name="status"
                :id="status"
              />
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
      </div>

      <!-- <button @click="createTask">create task</button> -->
      <div class="submit">
        <button @click="createTask">Create task</button>
      </div>
    </div>
  </div>
</template>

<script>
import gsap from "gsap";
// import apiCallFunctions from "../TasksAPICalls";
import tasksAPICalls from "../TasksAPICalls";

export default {
  name: "NewTask",
  data() {
    return {
      error: null,
      // used for new task inputs and v-models;
      title: "",
      url: "",
      category: "",
      type: "",
      status: "",
      //
      categories: ["coding", "medicine", "cooking"],
      types: ["video", "book", "article"],
      statuses: ["not started", "in progress", "completed"],
      notes: [],
    };
  },

  mounted() {
    const wrapper = document.querySelector(".input-wrapper");
    gsap.to(wrapper, {
      scale: 1,
      duration: 0.45, // 0.65,
      delay: 0,
      opacity: 1,
      ease: "back.out(1.7)",
    });
  },

  methods: {
    async createTask() {
      const data = {
        title: this.title,
        url: this.url,
        category: this.category,
        type: this.type,
        status: this.status,
        createdBy: "619c05ae0195f60bf5e00fe9", // set later to the real user _id from mongodb
      };
      try {
        await tasksAPICalls.create(data);
        this.$emit("closeAfterCreate");
      } catch (error) {
        this.error = error;
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
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/main.scss";

.input-container {
  cursor: auto;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba($color: #000, $alpha: 0.5);
  // backdrop-filter: blur(5px);
  z-index: 200;
  .input-wrapper {
    // display: flex;
    // flex-direction: column;
    // gap: 12px;
    width: 500px;
    // padding: 30px;
    // background: #fff;
    // border-radius: $border-radius;

    background: #555f82;
    border-radius: 10px;
    box-shadow: 0px 15px 10px -10px #222b48;
    padding: 30px;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 12px;
    // overflow: hidden;
    transform: scale(1.25); // scale(0.2); // for gsap
    opacity: 0; // for gsap
    .title,
    .url {
      padding: 7px 0;
      > p {
        font-size: 14px;
        margin-bottom: 10px;
        font-weight: bold;
      }
      > input[type="text"] {
        width: 100%;
        border: 1px solid gainsboro;
        height: 50px;
        outline: none;
        padding: 0 20px;
        // text-transform: uppercase;
        transition: all 0.5s ease;
        &:focus {
          border: 1px solid $mint-green;
          // box-shadow: 0 0 2px 1px $mint-green;
        }
        &:focus::placeholder {
          color: transparent;
        }
      }
    }
    .categories,
    .types,
    .statuses {
      // border: 1px solid red;
      border-bottom: 1px solid gainsboro;
      padding: 20px 0;
      > p {
        // border: 1px solid red;
        font-size: 14px;
        margin-bottom: 10px;
        font-weight: bold;
      }
      > div {
        // border: 1px solid lime;
        display: flex;
        justify-content: space-between;
        .radio-btn-container {
          width: 120px;
          @include radio($type: "create");
        }
      }
    }
    .submit {
      > button {
        @include green-button;
      }
    }
  }
}
</style>