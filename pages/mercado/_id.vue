<template>
  <div>
    <div class="container text-center">
      <h1 class="title text-center mt-3">{{ product.name }}</h1>
      <img src="" alt="" width="200px" height="200px" />
      <p class="my-2">{{ product.description }}</p>
      <h5>
        <strong>${{ product.price }}</strong>
      </h5>
      <b-button>Buy</b-button>
      <uploadfile url="updateprofilepicture"></uploadfile>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      product: {}
    };
  },
  created() {
    this.getProduct();
  },
  methods: {
    getProduct() {
      this.$axios
        .post(`/product/${this.id}`)
        .then(res => {
          this.product = res.data.product;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style></style>
