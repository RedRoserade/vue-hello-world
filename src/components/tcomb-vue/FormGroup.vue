<template>
  <div class="form-group">
    <label class="control-label">
      {{ label }}
    </label>
    <slot />

  </div>
</template>

<script>
export default {
  props: ['type', 'name'],
  computed: {
    label () {
      return this.name
    }
  }
}
</script>
