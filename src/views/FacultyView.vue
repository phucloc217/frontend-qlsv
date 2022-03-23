<template>
  <NavbarMenu />

  <div class="row pe-5 m-0">
    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Thêm
      </button>
    </div>
  </div>
  <div class="row p-5 m-0">
    <table
      class="
        table table-hover table-bordered table-striped
        shadow
        p-3
        mb-5
        bg-white
        rounded
      "
      id="table"
    >
      <thead>
        <tr>
          <th>Id</th>
          <th>Tên khoa</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="faculty in facultys" :key="faculty.id">
          <td>{{ faculty.id }}</td>
          <td>{{ faculty.tenkhoa }}</td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
  <!--LOADING-->
  <section class="vh-100 position-absolute top-50 start-50" id="loading">
    <div class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </section>
  <!--Modal-->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Thêm khoa</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="fullname" class="form-label">Tên khoa</label>
              <input
                type="text"
                class="form-control"
                id="name"
                aria-describedby="emailHelp"
                name="name"
              />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Đóng
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="insertFaculty"
            id="save"
          >
            <span
              id="loading1"
              class="spinner-border spinner-border-sm mb-1 d-none"
              role="status"
              aria-hidden="true"
            ></span>
            Lưu
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarMenu from "@/components/NavbarMenu.vue";
import $ from "jquery";
import "datatables.net-bs5/js/dataTables.bootstrap5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import axios from "axios";

export default {
  name: "FacultyView",
  components: {
    NavbarMenu,
  },
  created() {
    if (window.localStorage.getItem("token") == null) {
      this.$router.push("/");
    }
  },

  mounted() {
    $("#faculty_menu").addClass("active");
    $("#student_menu").removeClass("active");
    $("#class_menu").removeClass("active");
    axios
      .get("http://127.0.0.1:8000/api/faculty", {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"), //the token is a variable which holds the token
        },
      })
      .then(
        (response) => {
          this.facultys = response.data;
          setTimeout(function () {
            $("#table").DataTable();
            $("#loading").addClass("d-none");
          }, 3000);
        },
        (error) => {
          console.log(error);
        }
      );
  },
  methods: {
    insertFaculty() {
      $("#save").prop("disabled", true);
      $("#loading1").removeClass("d-none");
      axios
        .post(
          "http://127.0.0.1:8000/api/faculty",
          {
            tenkhoa: $("#name").val(),
          },
          {
            headers: {
              Authorization: "Bearer " + window.localStorage.getItem("token"), //the token is a variable which holds the token
            },
          }
        )
        .then(
          (response) => {
            console.log(response);
            this.$router.go();
          },
          (error) => {
            console.log(error);
          }
        );
    },
  },
  data: function () {
    return {
      facultys: [],
    };
  },
};
</script>

<style>
</style>