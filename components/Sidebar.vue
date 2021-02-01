<template>
  <div>
    <b-button v-b-toggle.sidebar-no-header>🢂</b-button>
    <b-sidebar id="sidebar-no-header" aria-labelledby="sidebar-no-header-title" no-header shadow>
      <template #default="{ hide }">
        <div class="p-3">
          <h4 id="sidebar-no-header-title"><a href="/" class="text-dark">Mercadito de Liniers</a></h4>
          <hr>
          <nav class="mb-3">
            <b-nav vertical>
              <b-nav-item active href="/" @click="hide">Home</b-nav-item>
              <b-nav-item href="/login" @click="hide">Log In</b-nav-item>
              <b-nav-item href="/register" @click="hide">Register</b-nav-item>
              <b-nav-item href="/mercado" @click="hide">Productos</b-nav-item>
            </b-nav>
          </nav>
          <b-button variant="primary" block @click="hide">Close Sidebar</b-button>
        </div>
      </template>
    </b-sidebar>
  </div>
</template>

<script>
export default {
    
}
</script>
