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
          <th>ID</th>
          <th>Họ tên</th>
          <th>Ngày sinh</th>
          <th>Địa chỉ</th>
          <th>MSSV</th>
          <th>Khoa</th>
          <th>Lớp</th>
          <th>Khóa học</th>
          <th>Hệ đào tạo</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in students" :key="student.id" :id="student.id">
          <td>{{ student.id }}</td>
          <td>{{ student.hoten }}</td>
          <td>{{ student.ngaysinh }}</td>
          <td>{{ student.diachi }}</td>
          <td>{{ student.mssv }}</td>
          <td>{{ student.makhoa }}</td>
          <td>{{ student.malop }}</td>
          <td>{{ student.khoahoc }}</td>
          <td v-if="student.hedaotao == 1">{{ "Đại học" }}</td>
          <td v-else>{{ "Cao đẳng" }}</td>
          <td>
            <button class="btn btn-sm btn-warning">Sửa</button>
            <button
              class="btn btn-sm btn-danger"
              :value="student.id"
              @click="deleteStudent"
            >
              Xóa
            </button>
          </td>
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

  <!-- Modal -->
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
          <h5 class="modal-title" id="exampleModalLabel">Thêm sinh viên</h5>
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
              <label for="fullname" class="form-label">Họ tên</label>
              <input
                type="text"
                class="form-control"
                id="fullname"
                aria-describedby="emailHelp"
                name="fullname"
              />
            </div>
            <div class="mb-3">
              <label for="birthday" class="form-label">Ngày sinh</label>
              <input type="date" class="form-control" id="birthday" />
            </div>
            <div class="mb-3">
              <label for="mssv" class="form-label">Mã số sinh viên</label>
              <input type="text" class="form-control" id="mssv" />
            </div>
            <div class="mb-3">
              <label for="hedt" class="form-label">Khoa</label>
              <select name="faculty" id="faculty" class="form-control">
                <option
                  v-for="faculty in facultys"
                  :key="faculty.id"
                  :value="faculty.id"
                >
                  {{ faculty.tenkhoa }}
                </option>
              </select>
            </div>
            <div class="mb-3">
              <label for="hedt" class="form-label">Lớp</label>
              <select name="class" id="class" class="form-control">
                <option
                  v-for="classs in classes"
                  :key="classs.id"
                  :value="classs.id"
                >
                  {{ classs.tenlop }}
                </option>
              </select>
            </div>
            <div class="mb-3">
              <label for="year" class="form-label">Khóa học</label>
              <input type="number" class="form-control" id="year" />
            </div>
            <div class="mb-3">
              <label for="hedt" class="form-label">Hệ đào tạo</label>
              <select name="hedt" id="hedt" class="form-control">
                <option value="1">Đại học</option>
                <option value="2">Cao đẳng</option>
                <option value="3">Liên thông</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="birthday" class="form-label">Địa chỉ</label>
              <input type="text" class="form-control" id="addr" />
            </div>
            <div class="mb-3">
              <label for="img" class="form-label">Hình</label>
              <input type="file" class="form-control" id="img" />
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
            @click="insertStudent"
            id="save"
          >
            <span
              id="loading2"
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
  name: "StudentView",
  components: {
    NavbarMenu,
  },
  created() {
    if (window.localStorage.getItem("token") == null) {
      this.$router.push("/");
    }
  },

  mounted() {
    $("#student_menu").addClass("active");
    $("#faculty_menu").removeClass("active");
    $("#class_menu").removeClass("active");
    axios
      .get("http://127.0.0.1:8000/api/students", {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"), //the token is a variable which holds the token
        },
      })
      .then(
        (response) => {
          this.students = response.data;
          setTimeout(function () {
            $("#table").DataTable();
            $("#loading").addClass("d-none");
          }, 3000);
        },
        (error) => {
          console.log(error);
        }
      );
    axios
      .get("http://127.0.0.1:8000/api/faculty", {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"), //the token is a variable which holds the token
        },
      })
      .then(
        (response) => {
          this.facultys = response.data;
        },
        (error) => {
          console.log(error);
        }
      );
    axios
      .get("http://127.0.0.1:8000/api/class", {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"), //the token is a variable which holds the token
        },
      })
      .then(
        (response) => {
          this.classes = response.data;
        },
        (error) => {
          console.log(error);
        }
      );
  },
  methods: {
    insertStudent() {
      $("#save").prop("disabled", true);
      $("#loading2").removeClass("d-none");
      axios
        .post(
          "http://127.0.0.1:8000/api/students",
          {
            hoten: $("#fullname").val(),
            ngaysinh: $("#birthday").val(),
            diachi: $("#addr").val(),
            mssv: $("#mssv").val(),
            makhoa: $("#faculty").val(),
            malop: $("#class").val(),
            khoahoc: $("#year").val(),
            hedaotao: $("#hedt").val(),
            hinh: $("#img").val(),
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
            $("#save").prop("disabled", false);
            $("#loading2").addClass("d-none");
            console.log(error);
          }
        );
    },
    deleteStudent(e) {
      let id = e.target.value;
      axios
        .delete("http://127.0.0.1:8000/api/students/" + id, {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("token"), //the token is a variable which holds the token
          },
        })
        .then(
          (response) => {
            console.log(response);
            $("#" + id).remove();
            //this.$router.go();
          },
          (error) => {
            console.log(error);
          }
        );
    },
  },
  data: function () {
    return {
      students: [],
      facultys: [],
      classes: [],
    };
  },
};
</script>

<style>
</style>