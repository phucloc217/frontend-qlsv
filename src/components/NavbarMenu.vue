<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top shadow p-3 mb-5 bg-white rounded">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Nhóm 2</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/students" class="nav-link " id="student_menu">Sinh viên</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/faculty" class="nav-link " id="faculty_menu">Khoa</router-link>
          </li>
           <li class="nav-item">
            <router-link to="/class" class="nav-link " id="class_menu">Lớp</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click="logout">Đăng xuất</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavbarMenu",
  methods: {
    logout() {
      window.localStorage.removeItem("token");
      this.$router.push("/");
    },
    data: function () {
      return {
       
      };
    },
  },
};
</script>

<style>
</style>