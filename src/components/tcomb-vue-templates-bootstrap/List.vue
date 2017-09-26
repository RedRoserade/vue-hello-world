<template>
  <fieldset>
    <legend v-if="!!label">{{ label }}</legend>

    <div class="row" v-for="(item, index) in value" :key="index">
      <div class="col-sm-8">
        <slot :name="index" />
      </div>
      <div class="col-sm-4">
        <div class="btn-toolbar">
          <div class="btn-group">
            <button type="button" class="btn btn-default" @click="handleUp(index)">Up</button>
            <button type="button" class="btn btn-default" @click="handleDown(index)">Down</button>
          </div>

          <button
            type="button"
            class="btn btn-danger"
            @click="handleRemove(index)"
          >
            Remove
          </button>
        </div>
      </div>
    </div>

    <div class="form-group">
      <div class="btn-toolbar">
        <button type="button" class="btn btn-default" @click="handleAdd">Add</button>
      </div>
    </div>
  </fieldset>
</template>


<script>
export default {
  name: 't-list-bootstrap',
  props: ['type', 'name', 'value'],
  data () {
    return {
      label: this.name
    }
  },
  methods: {
    handleAdd () {
      this.$emit('add')
    },
    handleUp (index) {
      this.$emit('up', index)
    },
    handleDown (index) {
      this.$emit('down', index)
    },
    handleRemove (index) {
      this.$emit('remove', index)
    }
  }
}
</script>
