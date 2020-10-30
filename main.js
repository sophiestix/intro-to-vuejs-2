var app = new Vue({
  el: "#app",
  data: {
    product: "Socks",
    image: "./assets/vmSocks-green-onWhite.jpg",
    inventory: 8,
    inStock: false,
    details: ["80% cotton", "20 polyester", "Gender-neutral"],
    variants: [
      {
        variandId: 2234,
        variantColor: "green",
        variantImage: "./assets/vmSocks-green-onWhite.jpg",
      },
      {
        variandId: 2235,
        variantColor: "blue",
        variantImage: "./assets/vmSocks-blue-onWhite.jpg",
      },
    ],
    cart: 0,
  },
  methods: {
    // addToCart: function () {
    //   this.cart += 1;
    // },
    // updateProduct: function (varianImage) {
    //   this.image = varianImage
    // },
    addToCart() {
      this.cart += 1;
    },
    updateProduct(varianImage) {
      this.image = varianImage
    }
  },
});
