<template>
  <svg xmlns="http://www.w3.org/2000/svg" 
    :width="width" 
    :height="height" 
    :viewBox="viewBox" 
    :aria-labelledby="iconName"
    :class="iconClass"
    fill="currentColor"
  >
    <title :id="iconName" lang="en">{{iconName}}</title>
    <slot />
  </svg>
</template><script>
export default {
  props: {
    viewBox: { type: String, default: '0 0 16 16'},
    iconName: { type: String, default: ''},
    width: { type: [Number, String], default: '1em' },
    height: {type: [Number, String], default: '1em' },
    iconColor: {type: String, default: 'currentColor'},
    iconClass: {type: String, defualt: 'h-5 w-5 fill-current'}
  }
}
</script>