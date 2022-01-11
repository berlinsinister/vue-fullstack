<template>
  <div class="auth-container">
    <img src="@/assets/images/lips.jpg" alt="" />

    <!-- form -->
    <div v-if="!loggedIn" class="form">
      <div class="email">
        <p>.01</p>
        <input
          v-model="email"
          @mouseenter="ringCursorHide = true"
          @mouseleave="ringCursorHide = false"
          type="text"
        />
        <div class="fake-placeholder">Email</div>
      </div>
      <div class="password">
        <p>.02</p>
        <input
          v-if="!showPassword"
          v-model="password"
          @mouseenter="ringCursorHide = true"
          @mouseleave="ringCursorHide = false"
          type="password"
        />
        <input
          v-else
          v-model="password"
          @mouseenter="ringCursorHide = true"
          @mouseleave="ringCursorHide = false"
          type="text"
        />
        <div class="fake-placeholder">Password</div>
        <i
          v-if="!showPassword"
          @click="showPassword = true"
          class="fa-solid fa-eye fa-custom"
        ></i>
        <i
          v-else
          @click="showPassword = false"
          class="fa-solid fa-eye-slash fa-custom"
        ></i>
      </div>
      <div class="login">
        <p>.03</p>
        <input @click="login" type="button" value="" />
        <div class="fake-placeholder">Log in</div>
      </div>
    </div>
    <div v-else class="form" style="z-index: 100">
      <!-- <div @click="logout">logout</div> -->
      <div class="logout">
        <p>.01</p>
        <input @click="logout" type="button" value="" />
        <div class="fake-placeholder">Log out</div>
      </div>
    </div>
    <div v-if="!loggedIn" class="welcome">Log in</div>
    <div v-else class="welcome">Willkommen</div>
    <RingCursor v-show="!ringCursorHide" />
  </div>
</template>

<script>
import RingCursor from "./RingCursor";
import authAPICalls from "../authAPICalls";
import gsap from "gsap";

export default {
  name: "Home",
  components: { RingCursor },
  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
      loggedIn: false,
      error: "",
      ringCursorHide: false,
    };
  },
  mounted() {
    if (localStorage.getItem("token")) {
      this.loggedIn = true;
    }
    const form = document.querySelector(".form");
    this.loginFormAnimation(form);
    console.log("mounted");
  },
  methods: {
    async login() {
      const data = {
        email: this.email,
        password: this.password,
      };
      try {
        const result = await authAPICalls.login(data);
        localStorage.setItem("token", result.token);
        this.loggedIn = true;
      } catch (error) {
        this.error = error;
        localStorage.removeItem("token");
        this.loggedIn = false;
      }
    },
    logout() {
      localStorage.removeItem("token");
      this.loggedIn = false;
    },
    loginFormAnimation(el) {
      gsap.to(el, {
        scale: 1,
        duration: 0.45, // 0.65,
        delay: 0.35,
        opacity: 1,
        ease: "back.out(1.7)",
      });
    },
  },
  watch: {
    loggedIn() {
      // lauch animation if logged out
      // if (!value) {
      //   setTimeout(() => {
      //     const form = document.querySelector(".form");
      //     this.loginFormAnimation(form);
      //   }, 100);
      // }

      setTimeout(() => {
        const form = document.querySelector(".form");
        this.loginFormAnimation(form);
      }, 100);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/main.scss";

.auth-container {
  cursor: none;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: linear-gradient(45deg, #3f434e, #2d2f36);
  // background: #1d2432;
  > img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    object-fit: cover;
  }
  .form {
    // border: 1px solid red;
    position: relative;
    display: flex;
    justify-content: space-between;
    gap: 40px;
    transform: scale(1.25); // for gsap
    opacity: 0; // for gsap
    .email,
    .password,
    .login,
    .logout {
      position: relative;
      > p {
        font-size: 13px;
        // margin-bottom: 5px; // 10px;
        // font-family: courier;
        font-weight: 300;
        color: #fff;
      }
      > input[type="text"],
      > input[type="password"],
      > input[type="button"] {
        width: 300px;
        height: 50px;
        background: none;
        border: none;
        border-bottom: 1px solid #fff;
        outline: none;
        font-size: 18px;
        padding-bottom: 4px;
        color: #fff;
        transition: all 0.3s ease;
        // &:focus {
        //   padding-left: 85px;
        //   ~ .fake-placeholder {
        //     opacity: 0;
        //     transform: translate(-10%);
        //   }
        // }
      }
      > input[type="text"],
      > input[type="password"] {
        padding-left: 100px;
        &:focus {
          padding-left: 85px;
          ~ .fake-placeholder {
            opacity: 0;
            transform: translate(-10%);
          }
        }
      }
      > input[type="button"] {
        &:hover {
          // border: 1px solid #fff;
          cursor: pointer;
        }
      }
      .fake-placeholder {
        position: absolute;
        bottom: 20px;
        color: #fff;
        font-size: 18px;
        font-weight: 300;
        transition: all 0.3s ease;
      }
      .fa-custom {
        position: absolute;
        bottom: 20px;
        color: #fff;
        right: 0;
        opacity: 0.4;
        cursor: pointer;
      }
    }
  }
  .welcome {
    position: absolute;
    top: 120px;
    font-size: 250px;
    opacity: 0;
    background: -webkit-linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.1),
      transparent
    );
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: move 7s 1s linear infinite, set-opacity 1s 1s linear forwards;
    @keyframes set-opacity {
      100% {
        opacity: 1;
      }
    }
    @keyframes move {
      0%,
      100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-70px);
      }
    }
  }
}
</style>