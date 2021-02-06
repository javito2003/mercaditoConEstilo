<template>
  <div>
    <section class="Form my-4 mx-5">
      <div class="container">
        <div class="row no-gutters">
          <div class="col-lg-5">
            <img src="../static/Untitled.png" class="img-fluid" />
          </div>
          <div class="col-lg-7 px-5 pt-5">
            <h1 class="font-weight-bold py-3">Logo</h1>
            <h4>Sign into your account</h4>
            <form @submit.prevent="login()">
              <div class="form-row">
                <div class="col-lg-7">
                  <input
                    type="email"
                    v-model="user.email"
                    class="form-control my-3 p-4"
                    placeholder="Email adress"
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="col-lg-7">
                  <input
                    type="password"
                    v-model="user.password"
                    class="form-control my-3 p-4"
                    placeholder="Password"
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="col-lg-7">
                  <button type="submit" class="btn1 mt-3 mb-5">
                    Log in
                  </button>
                </div>
              </div>
              <a href="">Forgot password</a>
              <p>
                Don't have an account? <a href="/register">Register here</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  middleware: "notAuthenticated",
  head() {
    return {
      title: "Sign In"
    };
  },
  data() {
    return {
      user: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      this.$axios
        .post("/login", this.user)
        .then(res => {
          console.log(res);
          if (res.data.status === "success") {
            const auth = {
              token: res.data.token,
              userData: res.data.userData
            };
            //token a la tiend
            this.$store.commit("setAuth", auth);

            //set auth in localStorage
            localStorage.setItem("auth", JSON.stringify(auth));
            alert("Welcome " + auth.userData.name);
            $nuxt.$router.push("/profile");

            return;
          }
        })
        .catch(err => {
          console.log(err.response);
        });
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
  background: rgb(219, 226, 226);
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
