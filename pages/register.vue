<template>
  <div>
    <section class="Form my-4 mx-5">
      <div class="container">
        <div class="row no-gutters">
          <div class="col-lg-5">
            <img src="../static/ilu.png" class="img-fluid" />
          </div>
          <div class="col-lg-7 px-5 pt-5">
            <h1 class="font-weight-bold py-3">Register</h1>
            <h4>Sign up rigth now!</h4>
            <form @submit.prevent="register()">
              <div class="form-row">
                <div class="col-lg-7">
                  <input
                    type="text"
                    v-model="usuario.name"
                    class="form-control my-3 p-4"
                    placeholder="Enter your username"
                  />
                  <input
                    type="text"
                    v-model="usuario.surname"
                    class="form-control my-3 p-4"
                    placeholder="Enter your surname"
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="col-lg-7">
                  <input
                    v-model="usuario.email"
                    type="email"
                    class="form-control my-3 p-4"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="col-lg-7">
                  <input
                    v-model="usuario.password"
                    type="password"
                    class="form-control my-3 p-4"
                    placeholder="Enter your password"
                  />
                </div>
                <div class="col-lg-7">
                  <input
                    v-model="usuarioVerif.password"
                    type="password"
                    class="form-control my-3 p-4"
                    placeholder="Repeat you password"
                  />
                </div>
                <input
                  type="file"
                  ref="file"
                  v-on:change="handleFileUpload()"
                />
              </div>
              <div class="form-row">
                <div class="col-lg-7">
                  <button type="submit" class="btn1 mt-3 mb-5">Sign up</button>
                </div>
              </div>
              <p>Do you have an account? <a href="/login">Login Now!</a></p>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import swal from "sweetalert";
export default {
  middleware: "notAuthenticated",
  data() {
    return {
      usuario: {
        name: "",
        surname: "",
        mail: "",
        password: ""
      },
      selectedFile: "",
      file: "",
      usuarioVerif: {
        password: ""
      }
    };
  },

  methods: {
    register() {
      if (this.usuario.password === this.usuarioVerif.password) {
        let data = new FormData();

        data.append("name", this.usuario.name);
        data.append("surname", this.usuario.surname);
        data.append("password", this.usuario.password);
        data.append("email", this.usuario.email);
        data.append("file", this.file);

        let config = {
          header: {
            "Content-Type": "multipart/form-data"
          }
        };

        this.$axios
          .post("/register", data, config)
          .then(res => {
            console.log(res);
            swal({
              title: "Good job!",
              text: "Going to the login page...",
              icon: "success"
            });
            $nuxt.$router.push("/login");
          })
          .catch(err => {
            console.log(err.response);
            if (
              err.response.data.error.message ===
              "User validation failed: email: Error, email already exists"
            ) {
              swal({
                title: "Error",
                text: "Email already exists",
                icon: "error"
              });
            }
          });
      } else if (this.usuario.password !== this.usuarioVerif.password) {
        swal({
          title: "Error",
          text: "Passwords aren't same",
          icon: "error"
        });
      }
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    }
  }
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
body {
  background-color: rgb(219, 226, 226);
}
.row {
  background-color: white;
  border-radius: 3px;
  box-shadow: 12px 12px 22px grey;
}
img {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 5px;
}
.btn1 {
  border: none;
  outline: none;
  height: 50px;
  width: 100%;
  background-color: black;
  color: white;
  border-radius: 4px;
  font-weight: bold;
}
.btn1:hover {
  background-color: white;
  border: 1px solid;
  color: black;
}
</style>
