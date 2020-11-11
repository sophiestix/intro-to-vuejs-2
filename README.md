# intro-to-vuejs-2
Vue mastery course

## Style Bindings

```
data: {
    color: 'red',
    fontSize: '13px'
}

<p :style="{'font-size': fontSize}">...</p> // Quotes!!

or 
<p :style="{fontSize: fontSize}">...</p>
```

### Objects

```
data: {
    styleObject: {
        color: 'red',
        fontSize: '13px'
    }
}

<p :style="styleObject">...</p>
```

### Arrays

```
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

```
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

```
data: {
    classObject: {
        activeClass: true,
        errorClass: false
    }
}

<div :class="classObject">...</div>
```

### Arrays

```
data: {
    activeClass: 'active',
    errorClass: 'text-danger'
}

<div :class="[activeClass, errorClass]">...</div>
```


### Conditionals

```
data: {
    isActive: true,
    activeClass: 'active'
}

<div :class="[isActive ? activeClass : '' ]">...</div>
```