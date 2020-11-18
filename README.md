# intro-to-vuejs-2
Vue mastery course

## Style Bindings

```js
data: {
    color: 'red',
    fontSize: '13px'
}

<p :style="{'font-size': fontSize}">...</p> // Quotes!!

or 
<p :style="{fontSize: fontSize}">...</p>
```

### Objects

```js
data: {
    styleObject: {
        color: 'red',
        fontSize: '13px'
    }
}

<p :style="styleObject">...</p>
```

### Arrays

```js
data: {
    styleObject: {
        color: 'red',
        fontSize: '13px'
    },
    styleObject2: {
        margin: '5px',
        padding: '5px',
    }
}

<p :style="[styleObject, styleObject2]">...</p>
```

## Class Bindings

```js
data: {
    activeClass: true,
    errorClass: false
}

<div class="color-box"
    :class="{ active: activeClass, 'text-danger': errorClass }">
...
</div>
```

### Objects

```js
data: {
    classObject: {
        activeClass: true,
        errorClass: false
    }
}

<div :class="classObject">...</div>
```

### Arrays

```js
data: {
    activeClass: 'active',
    errorClass: 'text-danger'
}

<div :class="[activeClass, errorClass]">...</div>
```


### Conditionals

```js
data: {
    isActive: true,
    activeClass: 'active'
}

<div :class="[isActive ? activeClass : '' ]">...</div>
```

## Computed Properties

```js
computed: {
    title() {
      return this.brand + ' ' + this.product
    }
  }
```

```js
<div v-for="(variant, index) in variants" 
    :key="variant.variantId" 
    class="color-box"
    :style="{backgroundColor: variant.variantColor}"
    @mouseover="updateProduct(variant.index)">
</div>

data: {
    selectedVariant: 0,
  },
 methods: {
    updateProduct(index) {
      this.selectedVariant = index
    }
  },
  computed: {
    image() {
      return this.variants[this.selectedVariant].variantImage
    }
  }
  ```

  ## Components

  It has a props, template, and a `data() {return ...}` function that returns a fresh data object or each component.

```js
// Vue.component('product', {
//     props: [message],
//     template: `<div>{{ message }}</div>`,
//     data() {...}
// })

Vue.component('product', {
    props: {
        message: {
            type: String,
            required: true,
            default: "Hi"
        }
    },
    template: `<div>{{ message }}</div>`,
    data() {...},
    methods: {...},
    computed: {...}
})

<product :message="Hello!"></product>
```

## Communicating Events

Passing events up the tree, like adding things to the car with the `addToCart()`:

```js
<product :premium="premium" @add-to-cart="updateCart"></product>

Vue.component('product', {
    ...
    addToCart() {
        this.$emit('add-to-cart')
    }
})

var app = new Vue({
    ...
    data: {
        ...
        cart: 0
    },
    methods: {
        updateCart() {
            this.cart += 1
        }
    }
})
```

## Forms and v-model

Two-way data binding

```js
Vue.component('product-review', {
  template: `
    <input v-model="name">
  `,
  data() {
    return {
      name: null
    }
  }
})
```

```html
<select id="rating" v-model.number="rating">
```

`v-model.number` uses the .number modifier to typecaste the value as number.

```js
@submit.prevent="onSubmit" // the .prevent modifier prevents the default, thye page won't refresh after submitting
```

```js

// product-review component emits
<form class="review-form" @submit.prevent="onSubmit">

 methods: {
    onSubmit() {
        let productReview = {
            name: this.name,
            review: this.review,
            rating: this.rating
        }

        this.$emit('review-submitted', productReview)

        name = null;
        review = null;
        rating = null;
    }
  }

// product component listens to it
<product-review @review-submitted="addReview"></product-review>

data() {
    return {
      reviews: []
    }
},

methods: {
    addReview(productReview) {
        this.reviews.push(productReview)
    }
},
```

## Tabs

To transfer data throughout the application, e.g. grandparent-grandchild component: `eventBus` and move the action from `methods` to `mounted`:

```js
mounted() {
      eventBus.$on('review-submitted', productReview => {
        this.reviews.push(productReview)
      })
    }
```

But use Vuex instead if possible.