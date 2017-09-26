<template>
  <div :class="{ 'form-group': true, 'has-error': hasError }">
    <label :for="name" class="control-label">
      <slot name="label"/>
    </label>

    <slot name="input" />

    <slot name="help" />

    <slot name="error" />
  </div>
</template>

<script>
export default {
  props: ['hasError', 'name']
}
</script>
