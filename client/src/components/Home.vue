<template>
  <div class="auth-container">
    <!-- form -->
    <div v-if="!loggedIn" class="form">
      <div class="email">
        <input
          v-model="email"
          @mouseenter="ringCursorHide = true"
          @mouseleave="ringCursorHide = false"
          @focus="error = null"
          type="text"
          placeholder="Email"
        />
      </div>
      <div class="password">
        <input
          v-if="!showPassword"
          v-model="password"
          @mouseenter="ringCursorHide = true"
          @mouseleave="ringCursorHide = false"
          @focus="error = null"
          type="password"
          placeholder="Password"
        />
        <input
          v-else
          v-model="password"
          @mouseenter="ringCursorHide = true"
          @mouseleave="ringCursorHide = false"
          @focus="error = null"
          type="text"
        />

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
        <input @click="login" type="button" value="Connect" />
      </div>
      <div class="error">
        <span v-if="error"> {{ error }} </span>
        <div v-if="error" class="error-border"></div>
      </div>
    </div>
    <div v-else class="form" style="z-index: 100">
      <div class="logout">
        <input @click="logout" type="button" value="Disconnect" />
      </div>
    </div>
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
  },
  methods: {
    async login() {
      const data = {
        email: this.email,
        password: this.password,
      };
      try {
        const result = await authAPICalls.login(data);
        // console.log(typeof result.user.userId);
        localStorage.setItem("token", result.token);
        this.loggedIn = true;
      } catch (error) {
        // this.error = error;
        this.error = error.response.data.msg;
        localStorage.removeItem("token");
        this.loggedIn = false;
        // setTimeout(() => {
        //   this.error = null;
        // }, 4000);
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
      setTimeout(() => {
        const form = document.querySelector(".form");
        this.loginFormAnimation(form);
      }, 100);
    },
    error(value) {
      console.log(value);
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
  background: #3a4467;
  .form {
    transform: scale(1.25); // for gsap
    opacity: 0; // for gsap
    .email,
    .password,
    .login,
    .logout {
      width: 450px;
      height: 70px;
      margin: 12px 0;
      padding: 0 25px;
      display: flex;
      align-items: center;
      color: #fff;
      background: linear-gradient(90deg, #555f82, #3a4467);
      border-radius: 10px;
      box-shadow: 0px 15px 10px -10px #222b48;
      transition: all 0.3s ease-out;
      &:hover {
        // transform: translate(5px);
        filter: brightness(1.1);
      }
      > input {
        height: 100%;
        width: 100%;
        background: none;
        border: none;
        outline: none;
        color: #fff;
        font-size: 16px;
        font-family: "Roboto";
        font-weight: 300;
      }
    }
    .email,
    .password {
      > input {
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
    .password {
      position: relative;
      .fa-custom {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        color: #fff;
        right: 20px;
        opacity: 0.2;
        cursor: pointer;
      }
    }
    .login,
    .logout {
      > input {
        cursor: pointer;
      }
    }
    .login {
      // background: linear-gradient(90deg, #9ce864, #54d674);
      background: linear-gradient(90deg, #9d83f1, #ff73b3);
    }
    .logout {
      background: linear-gradient(90deg, #f8baa5, #ff73b3);
    }
    .error {
      height: 70px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      > span {
        margin-top: auto;
        color: #fff;
        font-weight: 300;
        font-size: 14px;
        font-style: italic;
        opacity: 0.7;
      }
      &-border {
        height: 1px;
        width: 50%; // 100%;
        background: linear-gradient(90deg, #9d83f1, #ff73b3);
        margin-top: auto;
        animation: error-border 0.5s 3 ease-out;
        // testing...
        @keyframes error-border {
          0% {
            transform: scaleX(0.01);
          }
          100% {
            transform: scaleX(1);
          }
        }
      }
    }
  }
}
</style>