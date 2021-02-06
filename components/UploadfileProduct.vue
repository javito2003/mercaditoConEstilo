<template>
  <div class="container">
    <div class="large-12 medium-12 small-12 cell">
      <input
        type="file"
        id="file"
        ref="file"
        v-on:change="handleFileUpload()"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ["url"],
  name: "Uploadfile",
  data() {
    return {
      file: "",
      accountId: this.$store.state.auth.userData._id
    };
  },
  props: {
    url: {
      type: String
    }
  },
  methods: {
    submitFile() {
      /*
                    Initialize the form data
                */
      let formData = new FormData();

      /*
                    Add the form data we need to submit
                */
      formData.append("file", this.file);
      console.log(this.file);
      var that = this;
      /*
                  Make the request to the POST /single-file URL
                */
      let config = {
        headers: {
          token: this.$store.state.auth.token
        }
      };
      console.log(config);
      this.$axios
        .post(this.url, formData, config)
        .then(function(res) {
          console.log("los datos son: ");
          console.log(res.data);

          if (res.data.status == true) {
            that.$emit("urlReady", res.data.data.url);
          }
        })
        .catch(function(e) {
          console.log("FAILURE!! " + e);
        });
    },

    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    }
  }
};
</script>
