Vue.component('product-review', {
  template: `
  <form class="review-form" @submit.prevent="onSubmit">

    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
    </p>

    <p>
      <label for="name">Name:</label>
      <input id="name" v-model="name" placeholder="name">
    </p>
    
    <p>
      <label for="review">Review:</label>      
      <textarea id="review" v-model="review"></textarea>
    </p>
    
    <p>
      <label for="rating">Rating:</label>
      <select id="rating" v-model.number="rating">
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>
    </p>

    <p>Would you recommend this product?</p>
    <label>
      Yes
      <input type="radio" value="Yes" v-model="recommend"/> 
    </label>
    <label>
      No
      <input type="radio" value="No" v-model="recommend"/> 
    </label>
        
    <p>
      <input type="submit" value="Submit">  
    </p>    

  </form>
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      recommend: null,
      errors: []
    }
  },
  methods: {
    onSubmit() {
      if (this.name && this.review && this.rating && this.recommend) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
          recommend: this.recommend
        }
  
        this.$emit('review-submitted', productReview)
  
        name = null;
        review = null;
        rating = null;
        recommend = null;
      } else {
        if (!this.name) this.errors.push("Name required.")
        if (!this.review) this.errors.push("Review required.")
        if (!this.rating) this.errors.push("Rating required.")
        if (!this.recommend) this.errors.push("Recommendation required.")
      }
    }
  }
})

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
            :class="{ disabledButton: !inStock}">Add to Car</button>

          <button v-on:click="removeFromCart" 
            :disabled="!inStock"
            :class="{ disabledButton: !inStock}">Remove from Cart</button>   
        </div>

        <div>
          <h2>Reviews</h2>
          <p v-if="!reviews.length">There are no reviews yet.</p>
          <ul>
            <li v-for="review in reviews">
              <p>{{ review.name }}</p>
              <p>Rating: {{ review.rating }}</p>
              <p>{{ review.review }}</p>
            </li>
          </ul>
        </div>

        <product-review @review-submitted="addReview"></product-review>
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
        lineThroughClass: "lineThrough",
        onSale: true,
        reviews: []
      }
    },
    methods: {
      addToCart() {
        this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
      },
      removeFromCart() {
        this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
      },
      updateProduct(index) {
        this.selectedVariant = index;
        console.log(index);
      },
      addReview(productReview) {
        this.reviews.push(productReview)
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
    premium: false,
    cart: [],
  },
  methods: {
    updateCart(id) {
      this.cart.push(id);
    },
    removeItem(id) {
      for (var i = this.cart.length - 1; i >= 0; i--) {
        if (this.cart[i] === id) {
          this.cart.splice(i, 1);
        }
      }
    }
  }
});
