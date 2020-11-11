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