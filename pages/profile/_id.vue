<template>
  <div>
    <div class="container rounded bg-white mt-5 mb-5">
      <div class="row">
        <div class="col-md-3 border-right">
          <div
            class="d-flex flex-column align-items-center text-center p-3 py-5"
          >
            <img :src="user.url" width="200" height="200" /><span
              class="font-weight-bold"
              >{{ user.name }}</span
            ><span> </span>
            <uploadfile url="updateprofilepicture"></uploadfile>
          </div>
        </div>
        <div class="col-md-5 border-right">
          <form @submit.prevent="editarUser(userEdit)" v-if="editar">
            <div class="p-3 py-5">
              <div
                class="d-flex justify-content-between align-items-center mb-3"
              >
                <h4 class="text-right">Profile Settings</h4>
              </div>
              <div class="row mt-2">
                <div class="col-md-6">
                  <label class="labels">Name</label
                  ><input
                    v-model="userEdit.name"
                    type="text"
                    class="form-control"
                    placeholder="first name"
                  />
                </div>
                <div class="col-md-6">
                  <label class="labels">Surname</label
                  ><input
                    v-model="userEdit.surname"
                    type="text"
                    class="form-control"
                    placeholder="surname"
                  />
                </div>
              </div>
              <div class="col-md-12">
                <label class="labels">Password</label
                ><input
                  type="password"
                  class="form-control"
                  v-model="userEdit.password"
                />
              </div>
            </div>
            <div class="mt-5 text-center">
              <button class="btn btn-primary profile-button" type="submit">
                Save Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swal from "sweetalert";
export default {
  middleware: "authenticated",
  data() {
    return {
      editText: "Editar",
      id: this.$route.params.id,
      user: {},
      userEdit: {},
      editar: true
    };
  },
  created() {
    this.capturarUser();
  },
  methods: {
    capturarUser() {
      this.$axios
        .post(`/data/${this.id}`)
        .then(res => {
          this.user = res.data.userData;
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    editarUser(item) {
      this.$axios
        .post(`/user/${this.id}`, item)
        .then(res => {
          console.log(res.data);
          this.user.name = this.userEdit.name;
          this.user.surname = this.userEdit.surname;
          this.user.password = this.userEdit.password;

          //Update store
          const auth = {
            token: this.$store.state.auth.token,
            userData: this.user
          };
          this.$store.commit("setAuth", auth);

          localStorage.setItem("auth", JSON.stringify(auth));

          swal({
            title: "Good job!",
            text: "Your profile has edited!",
            icon: "success",
            button: "Aww yiss!",
            timer: 4000
          });
          window.location.href = "/profile";
        })
        .catch(err => {
          console.log(err.response);
        });
    }
  }
};
</script>

<style>
body {
  background: rgb(96, 224, 224);
}

.form-control:focus {
  box-shadow: none;
  border-color: #ba68c8;
}

.profile-button {
  background: rgb(99, 39, 120);
  box-shadow: none;
  border: none;
}

.profile-button:hover {
  background: #682773;
}

.profile-button:focus {
  background: #682773;
  box-shadow: none;
}

.profile-button:active {
  background: #682773;
  box-shadow: none;
}

.back:hover {
  color: #682773;
  cursor: pointer;
}

.labels {
  font-size: 11px;
}

.add-experience:hover {
  background: #ba68c8;
  color: #fff;
  cursor: pointer;
  border: solid 1px #ba68c8;
}
</style>
