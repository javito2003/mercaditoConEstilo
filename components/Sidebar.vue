<template>
  <div>
    <b-button v-b-toggle.sidebar-no-header>View Options</b-button>
    <b-sidebar
      id="sidebar-no-header"
      aria-labelledby="sidebar-no-header-title"
      no-header
      shadow
    >
      <template #default="{ hide }">
        <div class="p-3">
          <h4 id="sidebar-no-header-title">Options</h4>
          <nav class="mb-3">
            <b-nav vertical>
              <b-nav-item active @click="hide">Products</b-nav-item>
              <b-nav-item
                href="#link-1"
                @click="
                  hide;
                  changeState();
                "
                disabled
                >Users</b-nav-item
              >
            </b-nav>
          </nav>
          <b-button variant="primary" block @click="hide"
            >Close Sidebar</b-button
          >
        </div>
      </template>
    </b-sidebar>
  </div>
</template>

<script>
export default {
  props: ["state"],

  props: {
    state: {
      value: false
    }
  }
};
</script>
