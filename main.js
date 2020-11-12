Vue.component('product-details', {
  props: {
    details: {
      type: Array,
      required: true
    }
  },
  template: `
    <ul>
      <li v-for="detail in details">{{ detail }}</li>
    </ul>
  `
})

Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true,
    }
  },
  template: `
    <div class="product">
        <div class="product-image">
          <img v-bind:src="image" />
        </div>
        <div class="product-info">
          <!-- <h1>{{ brand }} {{ product }}</h1> -->
          <h1>{{ title }}</h1>
          <!-- v-show toggles the visability it -->
          <p v-show="inStock">In Stock</p>
          <!-- v-if remove the element from the DOM is it's false -->
          <!-- <p v-if="inventory > 10">In Stock</p> -->
          <p v-if="inStock">In Stock</p>
          <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out!</p>
          <p v-else :class="[inStock ? '' : lineThroughClass]">Out of Stock</p>
          <p v-else :class="{lineThrough : !inStock}">Out of Stock</p>
          <p>{{ sale }}</p>
          <p>User is premium: {{ premium }}</p>
          <p>Shipping: {{ shipping }}</p>

          <product-details :details="details"></product-details>

          <div v-for="(variant, index) in variants" 
            :key="variant.variantId" 
            class="color-box"
            :style="{backgroundColor: variant.variantColor}"
            @mouseover="updateProduct(index)">
            <!-- <p v-on:mouseover="">{{ variant.variantColor }}</p> -->
            <!-- <p @mouseover="updateProduct(variant.variantImage)">{{ variant.variantColor }}</p> -->
          </div>

          <!-- <button v-on:click="cart += 1">Add to Card</button> -->
          <button v-on:click="addToCart" 
            :disabled="!inStock"
            :class="{ disabledButton: !inStock}">Add to Card</button>

          <div class="cart">
            <p>Cart({{cart}})</p>
          </div>
        </div>
      </div>
    `,
    data() {
      return {
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
      }
    },
    methods: {
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
      },
      shipping() {
        if (this.premium) {
          return "Free"
        }
        return 2.99
      }
    }
})

var app = new Vue({
  el: "#app",
  data: {
    premium: false
  }
});
