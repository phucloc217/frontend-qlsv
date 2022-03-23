<template>
  <section class="vh-100">
    <div class="container-fluid h-custom pt-5">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-md-9 col-lg-6 col-xl-5">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            class="img-fluid"
            alt="Sample image"
          />
        </div>
        <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
          <form>
            <div
              class="
                d-flex
                flex-row
                align-items-center
                justify-content-center justify-content-lg-start
              "
            >
              <h1 class="">Đăng nhập</h1>
            </div>

            <div class="divider d-flex align-items-center my-4"></div>

            <!-- Email input -->
            <div class="form-outline mb-4">
              <label class="form-label" for="email"
                >Địa chỉ Email</label
              >
              <input
                type="email"
                id="email"
                class="form-control form-control-lg"
                placeholder="Email" autocomplete="username"
              />
            </div>

            <!-- Password input -->
            <div class="form-outline mb-3">
              <label class="form-label" for="password">Mật khẩu</label>
              <input
                type="password"
                id="password"
                class="form-control form-control-lg"
                placeholder="Mật khẩu" autocomplete="current-password"
              />
            </div>
            <div class="text-center text-lg-start mt-4 pt-2">
              <button
                type="button"
                class="btn btn-primary btn-lg "
                style="padding-left: 2.5rem; padding-right: 2.5rem"
                @click="greet" id="login"
              >
               <span id="loading" class="spinner-border spinner-border-sm mb-1 d-none" role="status" aria-hidden="true"></span>
                Đăng nhập
              </button>
              <p class="small fw-bold mt-2 pt-1 mb-0">
                Bạn chưa có tài khoản?
                 <router-link to="/register" class="link-danger">Đăng ký</router-link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div
      class="
        d-flex
        flex-column flex-md-row
        text-center text-md-start
        justify-content-between
        py-4
        px-4 px-xl-5
        bg-primary
      "
    >
      <!-- Copyright -->
      <div class="text-white mb-3 mb-md-0">
        Copyright © 2022. All rights reserved.
      </div>
      <!-- Copyright -->

      <!-- Right -->
      <div>
        <a href="#!" class="text-white me-4">
          <i class="fab fa-facebook-f"></i>
        </a>
        <a href="#!" class="text-white me-4">
          <i class="fab fa-twitter"></i>
        </a>
        <a href="#!" class="text-white me-4">
          <i class="fab fa-google"></i>
        </a>
        <a href="#!" class="text-white">
          <i class="fab fa-linkedin-in"></i>
        </a>
      </div>
      <!-- Right -->
    </div>
  </section>
</template>

<script>
import $ from "jquery";
import axios from "axios";
export default {
  name: "LoginView",
  components: {},
   created() {
     if(window.localStorage.getItem("token")!=null)
     {
        this.$router.push("/students");
     }
   },
  methods: {
    greet() {
      let email = $("#email").val();
      let password = $("#password").val();
      $("#login").prop( "disabled", true);
      $("#loading").removeClass("d-none");
      //https://xdpm.herokuapp.com/
      axios 
        .post("http://127.0.0.1:8000/api/login", {
          email:email,
          password: password,
        })
        .then(
          (response) => {
           window.localStorage.setItem('token', response.data.token);
           this.$router.push("/students");
          },
          (error) => {
            console.log(error);
             $("#login").prop( "disabled", false);
             $("#loading").addClass("d-none");
          }
        );
    },
    data: function () {
      return {
       
      };
    },
  },
};
</script>

<style scoped>
.divider:after,
.divider:before {
  content: "";
  flex: 1;
  height: 1px;
  background: #eee;
}
.h-custom {
  height: calc(100% - 73px);
}
@media (max-width: 450px) {
  .h-custom {
    height: 100%;
  }
}
</style>