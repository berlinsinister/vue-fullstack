<template>
  <div class="input-container">
    <div class="input-wrapper">
      <div class="form-header">
        <span>
          <!-- <i class="fa-solid fa-pen"></i> -->
          <!-- <i class="fa-solid fa-circle-plus"></i> -->
          <i class="fa-solid fa-plus"></i>
          <!-- <i class="fa-solid fa-circle-check"></i> -->
          <!-- <i class="fa-solid fa-check"></i> -->
        </span>
      </div>
      <div class="form-content">
        <div class="title">
          <p>01. Enter title</p>
          <input
            v-model="title"
            type="text"
            placeholder="Book, video or article name"
          />
        </div>
        <div class="url">
          <p>02. Enter url (if any)</p>
          <input v-model="url" type="text" placeholder="https://" />
        </div>
        <!-- categories -->
        <div class="categories">
          <p>03. Select category</p>
          <div class="category-items">
            <div
              class="radio-btn-container"
              v-for="(category, i) in categories"
              :key="i"
            >
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
          <p>04. Select type</p>
          <div class="type-items">
            <div
              class="radio-btn-container"
              v-for="(type, i) in types"
              :key="i"
            >
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
          <p>05. Select status</p>
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

        <div class="submit">
          <button @click="createTask">Create task</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gsap from "gsap";
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
        // createdBy: "619c05ae0195f60bf5e00fe9", // set later to the real user _id from mongodb
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
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 200;
  .input-wrapper {
    width: 500px;
    background: #555f82;
    border-radius: 10px;
    box-shadow: 0px 15px 10px -10px #222b48;
    padding: 30px;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 12px;
    overflow: hidden;
    transform: scale(1.25); // for gsap
    opacity: 0; // for gsap
    .form-header {
      height: 80px;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background: linear-gradient(90deg, #555f82, #3a4467);
      > span {
        @include edit-button;
        background: linear-gradient(90deg, #9d83f1, #ff73b3);
        // background: linear-gradient(90deg, #9ce864, #54d674);
        font-size: 28px;
      }
    }
    .form-content {
      margin-top: 100px;
      .title,
      .url {
        padding: 7px 0;
        > p {
          color: #fff;
          font-size: 14px;
          font-weight: 300;
          margin-bottom: 10px;
        }
        > input {
          width: 100%;
          border: 1px solid rgba(255, 255, 255, 0.15);
          height: 50px;
          outline: none;
          padding: 0 20px;
          background: none;
          color: #fff;
          font-size: 14px;
          font-family: "Roboto";
          font-weight: 300;
          &::placeholder {
            color: #fff;
            opacity: 0.2;
            transition: all 0.3s ease-out;
          }
          &:focus::placeholder {
            opacity: 0;
            transform: translate(-10px);
          }
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
      .submit {
        margin-top: 15px;
        > button {
          width: 100%;
          height: 50px;
          color: #fff;
          font-size: 14px;
          border: none;
          background: linear-gradient(90deg, #9d83f1, #ff73b3);
          // background: linear-gradient(90deg, #9ce864, #54d674);
          border-radius: $border-radius;
          transition: all 0.2s ease;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>