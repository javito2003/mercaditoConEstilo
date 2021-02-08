<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-1">
        <div class="mt-5 text-center"></div>
      </div>
      <div class="col-sm-10">
        <div class="text-center">
          <h1>Products = {{ this.products.length }}</h1>
          <p>
            You want create a product? <a href="/createProduct">Click here!</a>
          </p>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Options</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in products" :key="index">
                <th scope="row">{{ item._id }}</th>
                <td>{{ item.name }}</td>
                <td>{{ item.price }}</td>
                <td>
                  <b-button
                    class="btn-sm mx-2"
                    variant="warning"
                    :to="`/productPanel/${item._id}`"
                  >
                    Edit
                  </b-button>
                  <b-button
                    class="btn-sm mx-2 btn-danger"
                    variant="danger"
                    @click="deleteProduct(item._id)"
                  >
                    Delete
                  </b-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-sm-1"></div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: "authenticated",
  data() {
    return {
      products: [],
      edit: false,
      editProduct: {}
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    getProducts() {
      let config = {
        headers: {
          token: this.$store.state.auth.token
        }
      };
      this.$axios
        .$post("/products", null, config)
        .then(res => {
          this.products = res.products;
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteProduct(id) {
      let config = {
        headers: {
          token: this.$store.state.auth.token
        }
      };
      this.$axios
        .post(`/delete-product/${id}`, null, config)
        .then(res => {
          const index = this.products.findIndex(
            item => item._id === res.data._id
          );
          this.products.splice(index, 1);
          this.getProducts();
        })
        .catch(err => {
          console.log(err.response);
        });
    }
  }
};
</script>
