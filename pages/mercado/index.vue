<template>
  <div>
    <div class="container">
      <h1>mercado</h1>
      <div class="row">
        <div class="card m-5" v-for="(item, index) in products" :key="index">
          <img
            :src="item.image"
            style="width:100%"
            width="1000px"
            height="150px"
          />
          <h1>{{ item.name }}</h1>
          <p class="price">${{ numeroFormateo(item.price) }}</p>
          <p>{{ item.description }}</p>
          <b-button id="btn-see" :to="`/mercado/${item._id}`"
            >See more...</b-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: "authenticated",
  data() {
    return {
      products: []
    };
  },
  created() {
    this.listarProductos();
  },
  methods: {
    listarProductos() {
      let config = {
        headers: {
          token: this.$store.state.auth.token
        }
      };
      console.log(config);
      this.$axios
        .post("/products", null, config)
        .then(res => {
          this.products = res.data.products;
          console.log(this.products);
        })
        .catch(err => {
          console.log(err);
        });
    },
    numeroFormateo(num) {
      return new Intl.NumberFormat("de-DE").format(num);
    }
  }
};
</script>

<style>
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 300px;
  margin: auto;
  text-align: center;
  font-family: arial;
}

.price {
  color: grey;
  font-size: 22px;
}

#btn-see {
  border: none;
  outline: 0;
  padding: 12px;
  color: white;
  background-color: #000;
  text-align: center;
  cursor: pointer;
  width: 100%;
  font-size: 18px;
}

#bnt-see:hover {
  opacity: 0.7;
  background-color: white;
  color: black;
  border: 1px solid;
}
</style>
