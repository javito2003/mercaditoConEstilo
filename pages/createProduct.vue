<template>
  <div>
    <section class="Form my-4 mx-5">
      <div class="container">
        <div class="row no-gutters">
          <div class="col-lg-7 px-5 pt-5">
            <span
              ><strong
                ><a href="/profile" style="color:black">BACK</a></strong
              ></span
            >
            <hr />

            <h1>Create a product</h1>
            <h4>Sign a new product</h4>
            <form @submit.prevent="createProduct()">
              <div class="form-row">
                <div class="col-lg-7">
                  <input
                    type="text"
                    v-model="product.name"
                    class="form-control my-3 p-4"
                    placeholder="Enter name of the prod"
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="col-lg-7">
                  <input
                    type="Number"
                    v-model="product.price"
                    class="form-control my-3 p-4"
                    placeholder="Enter price of the prod"
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="col-lg-7">
                  <textarea
                    type="text"
                    v-model="product.description"
                    class="form-control my-3 p-4"
                    placeholder="Enter about of the product"
                  />
                </div>
                <div class="col-lg-7">
                  <input
                    type="file"
                    ref="file"
                    v-on:change="handleFileUpload()"
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="col-lg-7">
                  <button class="btnCreate mt-3 mb-5" type="submit">
                    Create Producto
                  </button>
                </div>
                <p>
                  You want edit or delete products?
                  <a href="/productPanel">Clcik here</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  middleware: ["authAdm", "authenticated"],
  data() {
    return {
      product: {
        name: "",
        price: null,
        description: "",
        selectedFile: null
      },
      file: ""
    };
  },
  methods: {
    createProduct() {
      //   Initializate the
      //   Form Data
      let data = new FormData();

      data.append("file", this.file);
      data.append("name", this.product.name);
      data.append("price", this.product.price);
      data.append("description", this.product.description);

      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          token: `${this.$store.state.auth.token}`
        }
      };
      console.log(config);
      this.$axios
        .post("/new-product", data, config)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    }
  }
};
</script>

<style></style>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
body {
  background: rgb(219, 226, 226);
}
.row {
  background-color: white;
  border-radius: 3px;
  box-shadow: 12px 12px 22px grey;
}
img {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 5px;
}
.btnCreate {
  border: none;
  outline: none;
  height: 50px;
  width: 100%;
  background-color: black;
  color: white;
  border-radius: 4px;
  font-weight: bold;
}
.btnCreate:hover {
  background-color: white;
  border: 1px solid;
  color: black;
}
</style>
