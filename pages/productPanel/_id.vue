<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-3"></div>
      <div class="col-sm-6">
        <div class="text-center">
          <h1>Edit the product</h1>
          <form @submit.prevent="editProduct(productEdit)">
            <label>Name of product</label>
            <input
              type="text"
              class="form-control my-2"
              v-model="productEdit.name"
            />
            <label>Price of product</label>
            <input
              type="text"
              class="form-control my-2"
              v-model="productEdit.price"
            />
            <label>Description of product</label>
            <input
              type="text"
              class="form-control my-2"
              v-model="productEdit.description"
            />
            <b-button type="submit" variant="success" class="btn-block my-3"
              >Edit Product</b-button
            >
          </form>
        </div>
      </div>
      <div class="col-sm-3"></div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: "authenticated",
  data() {
    return {
      id: this.$route.params.id,
      product: {},
      productEdit: {}
    };
  },
  created() {
    this.getProduct();
  },
  methods: {
    getProduct() {
      let config = {
        headers: {
          token: this.$store.state.auth.token
        }
      };
      this.$axios
        .post(`/product/${this.id}`, null, config)
        .then(res => {
          this.product = res.data.product;
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    editProduct(item) {
      let config = {
        headers: {
          token: this.$store.state.auth.token
        }
      };
      this.$axios
        .$post(`/edit-product/${this.id}`, item, config)
        .then(res => {
          console.log(res);
          this.product.name = res.data.name;
          this.product.price = res.data.price;
          this.product.description = res.data.description;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
