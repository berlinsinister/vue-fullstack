<template>
  <div class="login-container">
    <img src="@/assets/images/smooth.jpg" alt="" />
    <div class="left-green">
      <div class="sign-in-title">Sign in</div>
      <!-- <div class="sign-in-text">** test mode</div> -->

      <!-- <div class="arrow">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="50">
          <path d="M20 0 L40 50 L20 40 L0 50 Z"></path>
        </svg>
      </div> -->
    </div>
    <div class="right-beige"></div>
    <div class="wrapper">
      <div class="logo">
        <div class="logo-text">Sign in</div>
      </div>
      <div class="login">
        <p>User Id</p>
        <input type="text" placeholder="e.g. 0131721105068603" />
        <i class="fa-solid fa-user fa-custom fa-left"></i>
      </div>
      <div class="password">
        <p>Password</p>
        <input
          v-if="!showPassword"
          v-model="password"
          type="password"
          placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
        />
        <input v-else v-model="password" type="text" />
        <i class="fa-solid fa-lock fa-custom fa-left"></i>
        <i
          v-if="!showPassword"
          @click="showPassword = true"
          class="fa-solid fa-eye fa-custom fa-right"
        ></i>
        <i
          v-else
          @click="showPassword = false"
          class="fa-solid fa-eye-slash fa-custom fa-right"
        ></i>
      </div>
      <div class="submit">
        <button>Login</button>
      </div>
    </div>
  </div>
</template>

<script>
import gsap from "gsap";

export default {
  name: "Login",
  data() {
    return {
      password: "",
      showPassword: false,
    };
  },
  mounted() {
    const wrapper = document.querySelector(".wrapper");
    gsap.to(wrapper, {
      scale: 1,
      duration: 0.45, // 0.65,
      delay: 0.35,
      opacity: 1,
      ease: "back.out(1.7)",
    });

    const signInTitle = document.querySelector(".sign-in-title");
    gsap.to(signInTitle, {
      x: 0,
      duration: 0.4,
      delay: 0,
      opacity: 1,
      ease: "power2.out",
    });
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/main.scss";

.login-container {
  height: 100vh;
  background: $beige;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: linear-gradient(45deg, #3f434e, #2d2f36);
  > img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    object-fit: cover;
  }
  .left-green,
  .right-beige {
    position: absolute;
    top: 0;
    width: 50%;
    height: 100%;
  }
  .left-green {
    left: 0;
    // background: #3f434e; // #2d2f36; // $mint-green;
    // background: linear-gradient(45deg, #3f434e, #2d2f36);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .sign-in-title {
      font-size: 150px;
      font-weight: bold;
      color: #fff;
      margin-left: -70px;
      opacity: 0; // for gsap
      transform: translate(-70px); // for gsap
    }
    .sign-in-text {
      color: #fff;
      font-weight: 100;
      font-style: italic;
    }
    // .arrow {
    //   position: absolute;
    //   top: 44%;
    //   left: 140px;
    //   transform: rotate(45deg) translateY(-50%);
    //   path {
    //     fill: #fff;
    //     // stroke: #fff;
    //     // stroke-width: 3;
    //     // stroke-linecap: "round";
    //     // stroke-linejoin: "arcs";
    //   }
    // }
  }
  .right-beige {
    right: 0;
    // background: #e2e2e5; // $beige;
    overflow: hidden;
  }
  .wrapper {
    width: 360px;
    background: #fff;
    padding: 30px;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 12px;
    // border-radius: $border-radius;
    transform: scale(1.25); // for gsap
    opacity: 0; // for gsap
    .logo {
      margin: 5px 0 20px 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 12px;
      &-text {
        font-size: 24px; // 15px;
        font-weight: bold;
      }
    }
    .login,
    .password {
      padding: 7px 0;
      position: relative;
      > p {
        font-size: 14px;
        margin-bottom: 5px; // 10px;
        font-weight: bold;
      }
      > input[type="text"],
      > input[type="password"] {
        width: 100%;
        border: none;
        border-bottom: 1px solid gainsboro;
        height: 50px;
        outline: none;
        padding-left: 30px;
        transition: all 0.4s ease;
        &:focus {
          border-bottom: 1px solid $mint-green;
        }
        &::placeholder {
          color: gainsboro;
          transition: all 0.4s ease;
        }
        &:focus::placeholder {
          color: transparent;
        }
      }
      .fa-custom {
        position: absolute;
        bottom: 23px;
        color: gainsboro;
        cursor: pointer;
      }
      .fa-left {
        left: 0;
      }
      .fa-right {
        right: 0;
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