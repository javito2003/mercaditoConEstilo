<template>
  <div class="container">
    <div class="text-center">
      <br />
      <h1 class="title">{{ user.name }} {{ user.surname }}</h1>
      <hr />
      <img :src="user.url" width="200" height="200" />
      <br />
      <br />
      <hr />
    </div>
  </div>
</template>

<script>
export default {
  middleware: "authenticated",
  data() {
    return {
      user: {}
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      const localUser = JSON.parse(localStorage.getItem("auth"));
      this.user = localUser.userData;
    }
  }
};
</script>
