<template>
  <div v-if="loading" class="loading">loading ...</div>
  <div v-else>
    <div v-if="error" class="error">
      you are not authorized to view this page
    </div>
    <div v-else class="all-tasks-container">
      <div class="search">
        <input
          v-model="searchQuery"
          @blur="searchQuery = ''"
          @keydown.exact.enter="search"
          type="text"
          placeholder="Search task"
        />
      </div>
      <div
        v-if="isSearchInvoked"
        @click="backToAllTasks"
        class="back-to-all-tasks"
      >
        back to all tasks
      </div>
      <div class="list">
        <div class="list-header">
          <!-- <div class="title">All Tasks</div> -->
          <!-- <Bubbles /> -->
        </div>
        <div
          v-for="(task, i) in tasks"
          :key="i"
          @mouseenter="sound.play"
          @click="redirectToSingleTask(task._id)"
          class="list-item task-item"
        >
          <div :class="task.category" class="category">
            {{ shortCategory(task.category) }}
          </div>
          <div class="title-and-url">
            <div class="title">{{ task.title }}</div>
            <div class="url">{{ task.url }}</div>
          </div>
          <div class="created-and-status">
            <div class="created">{{ date(task.createdAt) }}</div>
            <div class="status">{{ task.status }}</div>
          </div>
          <div @click="deleteTask(task._id)" class="delete">
            <i class="fa-solid fa-xmark"></i>
            <div class="delete-bubble"></div>
          </div>
        </div>
        <div
          v-for="(filler, i) in tasksFillers"
          :key="i"
          class="list-item-filler task-item"
        ></div>
      </div>
      <div class="pagination">
        <div
          v-for="i in allPages"
          :key="i"
          @click="changePage(i)"
          :class="active === i ? 'active' : ''"
          class="page"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
// import Bubbles from "./Bubbles";
import tasksAPICalls from "../TasksAPICalls";
import gsap from "gsap";

export default {
  name: "AllTasks",
  // components: { Bubbles },
  data() {
    return {
      tasks: [],
      allTasks: [],
      tasksFillers: 0,
      loading: true,
      error: null,
      sound: null,
      deleteClicked: false,
      active: 1,
      prev: 1,
      taskItemsAnimation: true,
      allPages: null,
      limit: 3,
      searchQuery: "",
      isSearchInvoked: false,
    };
  },
  async created() {
    // try {
    //   const result = await tasksAPICalls.read();
    //   this.allTasks = result.tasks;
    //   this.tasks = result.tasks.slice(0, this.limit);
    //   this.allPages = Math.ceil(this.allTasks.length / this.limit);
    //   this.loading = false;
    //   console.log(this.tasks);
    // } catch (error) {
    //   this.error = error;
    //   this.loading = false;
    // }
    this.getAllTasks();

    this.sound = new Audio(require("@/assets/sounds/click.mp3"));
    this.sound.volume = 0.05;
  },
  updated() {
    if (this.active != this.prev && this.taskItemsAnimation) {
      const taskItems = document.querySelectorAll(".task-item");
      let i = 3;
      taskItems.forEach((item) => {
        gsap.to(item, {
          x: 30,
          // opacity: 0,
          delay: 0,
          duration: 0,
        });
        gsap.to(item, {
          x: 0,
          // opacity: 1,
          delay: 0.05 * i--,
          duration: 0.1,
        });
      });
    }
  },
  methods: {
    async getAllTasks() {
      try {
        const result = await tasksAPICalls.read();
        this.allTasks = result.tasks;
        this.tasks = result.tasks.slice(0, this.limit);
        this.allPages = Math.ceil(this.allTasks.length / this.limit);
        this.loading = false;
        console.log(this.tasks);
      } catch (error) {
        this.error = error;
        this.loading = false;
      }
    },
    date(createdAt) {
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
      let date = new Date(createdAt);
      return (
        date.getDate() +
        "/" +
        months[date.getMonth()] +
        "/" +
        date.getFullYear()
      );
    },
    shortCategory(category) {
      switch (category) {
        case "coding":
          return "cd";
        case "medicine":
          return "md";
        case "cooking":
          return "co";
      }
    },
    redirectToSingleTask(id) {
      if (!this.deleteClicked) {
        this.$router.push({ name: "SingleTask", params: { id } });
      }
    },
    async deleteTask(id) {
      // if (this.password == process.env.VUE_APP_PASSWORD) {
      //   try {
      //     await apiCallFunctions.delete(id);
      //     const result = await apiCallFunctions.read();
      //     this.tasks = result.slice(0, 4);
      //     this.deletePopup = false;
      //     this.password = "";
      //   } catch (error) {
      //     this.error = error.message;
      //   }
      // } else {
      //   alert("wrong password");
      // }
      this.deleteClicked = true;
      try {
        await tasksAPICalls.delete(id);
        const result = await tasksAPICalls.read();
        this.allTasks = result.tasks;
        this.tasks = result.tasks.slice(0, this.limit);
        this.allPages = Math.ceil(this.allTasks.length / this.limit);
      } catch (error) {
        this.error = error;
      }
    },
    changePage(toPage) {
      if (this.active != toPage) {
        this.prev = this.active;
        this.active = toPage;
        this.tasks = this.allTasks.slice(
          this.limit * (toPage - 1),
          this.limit * toPage
        );
        this.tasksFillers = this.limit - this.tasks.length;
        this.taskItemsAnimation = true;
      }
    },
    search() {
      this.searchQuery = this.searchQuery.toLowerCase();
      this.isSearchInvoked = true;
      const foundTasks = this.allTasks.filter((task) =>
        task.title.toLowerCase().includes(this.searchQuery)
      );
      console.log(foundTasks);
      // experimental
      if (foundTasks.length) {
        this.tasks = foundTasks;
        this.active = 1;
        this.allPages = Math.ceil(foundTasks.length / this.limit);
      } else {
        this.tasks = [];
      }
      // /
      this.searchQuery = "";
    },
    backToAllTasks() {
      this.isSearchInvoked = false;
      this.getAllTasks();
    },
  },
  watch: {
    searchQuery() {
      this.taskItemsAnimation = false; // stop animating task items on search input
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/main.scss";

.loading,
.error,
.all-tasks-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.error,
.loading {
  background: #3a4467;
}
.all-tasks-container {
  background: #3a4467;
  position: relative;
  flex-direction: column;
  .search {
    margin-bottom: 30px;
    > input {
      // width: 100%;
      width: 50px;
      margin-left: 650px;
      border: 1px solid rgba(255, 255, 255, 0.15);
      height: 50px;
      outline: none;
      padding: 0 20px;
      background: none;
      color: #fff;
      font-size: 14px;
      font-family: "Roboto";
      font-weight: 300;
      transition: all 0.2s ease-out;
      &:focus {
        width: 700px;
        margin-left: 0;
      }
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
  .list {
    // position: relative;
    &-header {
      // border: 1px solid red;
      position: relative;
      display: flex;
      justify-content: space-between;
      .title {
        color: #fff;
        font-weight: 300;
        font-size: 38px;
      }
    }
    &-item {
      width: 700px;
      height: 100px;
      margin: 12px 0;
      padding: 0 25px;
      display: flex;
      // justify-content: space-between;
      align-items: center;
      gap: 25px;
      color: #fff;
      background: linear-gradient(90deg, #555f82, #3a4467);
      border-radius: 10px;
      box-shadow: 0px 15px 10px -10px #222b48;
      transition: all 0.3s ease-out;
      &:hover {
        cursor: pointer;
        // transform: scale(1.03);
        // transform: translate(5px);
        filter: brightness(1.1);
        // box-shadow: 0px 15px 10px -10px #4a9612;
      }
      .category {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .title-and-url,
      .created-and-status {
        width: 200px;
        // border: 1px solid red;
        font-weight: 300;
        // :first-child {
        //   font-size: 18px;
        // }
        :nth-child(2) {
          font-size: 14px;
          // font-style: italic;
          opacity: 0.2;
          margin-top: 5px;
        }
      }
      .title-and-url .title {
        font-size: 18px;
        // font-weight: 400;
      }
      .delete {
        margin-left: auto; // aligns one item right with flexbox
        // border: 1px solid red;
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        overflow: hidden;
        border-radius: 20%;
        &:hover {
          .delete-bubble {
            opacity: 0.15;
            transform: translate(-50%) scale(20);
          }
        }
        &-bubble {
          position: absolute;
          width: 2px;
          height: 2px;
          left: 50%;
          transform: translate(-50%);
          opacity: 0;
          background: #fff;
          border-radius: 50%;
          transition: 0.2s ease-out;
        }
      }
    }
    &-item-filler {
      width: 700px;
      height: 100px;
      margin: 12px 0;
      border: 1px solid red;
      transition: all 0.3s ease-out;
    }
  }
  .pagination {
    display: flex;
    align-items: center;
    gap: 30px;
    height: 20px;
    margin-top: 20px;
    $size: 4px;
    .page,
    .active {
      width: $size;
      height: $size;
      border-radius: 50%;
      background: #fff;
      position: relative;
      transition: all 0.2s ease;
    }
    .page {
      opacity: 0.2;
      &::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 30px;
        height: 30px;
      }
    }
    .active,
    .page:hover {
      opacity: 1;
      transform: scale(2);
      cursor: pointer;
      // background: #ff73b3;
    }
  }
}
</style>