<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#">NavBar</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="/">Home</b-nav-item>
          <b-nav-item href="/mercado">Mercado</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right v-if="estarActivo">
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <b-avatar :src="user.url"></b-avatar>
              <em>{{ user.name }}</em>
            </template>
            <b-dropdown-item href="/profile">Profile</b-dropdown-item>
            <b-dropdown-item @click="logOut()">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      user: {}
    };
  },

  methods: {
    logOut() {
      localStorage.removeItem("auth");
      this.$store.commit("setAuth", null);
      location.reload();
    }
  },
  async mounted() {
    if (this.$store.state.auth.userData) {
      this.user = this.$store.state.auth.userData;
    }
  },
  computed: {
    ...mapGetters(["estarActivo"])
  }
};
</script>
