var app = new Vue({
  el: "#app",
  data: {
    brand: "Vue Mastery",
    product: "Socks",
    selectedVariant: 0,
    inventory: 5,
    details: ["80% cotton", "20 polyester", "Gender-neutral"],
    variants: [
      {
        variantId: 2234,
        variantColor: "green",
        variantImage: "./assets/vmSocks-green-onWhite.jpg",
        variantQuantity: 8
      },
      {
        variantId: 2235,
        variantColor: "blue",
        variantImage: "./assets/vmSocks-blue-onWhite.jpg",
        variantQuantity: 0
      },
    ],
    cart: 0,
    lineThroughClass: "lineThrough",
    onSale: true,
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
    updateProduct(index) {
      this.selectedVariant = index;
      console.log(index);
    }
  },
  computed: {
    title() {
      return this.brand + ' ' + this.product
    },
    image() {
      return this.variants[this.selectedVariant].variantImage
    },
    inStock() {
      return this.variants[this.selectedVariant]. variantQuantity
    },
    sale() {
      if (this.onSale) {
        return this.brand + ' ' + this.product + ' ' + 'are on sale!'
      }
      return this.brand + ' ' + this.product + ' ' + 'are not on sale'
    }
  }
});
