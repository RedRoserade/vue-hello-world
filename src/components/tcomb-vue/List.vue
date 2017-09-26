<script>
import { ValidationResult/*, pathToString */, getBaseType, getInputFactory } from './util'

import List from '../tcomb-vue-templates-bootstrap/List.vue'

export default {
  name: 't-list',
  components: {
    't-list-bootstrap': List
  },
  props: ['type', 'value', 'name', 'path'],
  data () {
    return {
      label: this.name
    }
  },
  render (h) {
    const baseType = getBaseType(this.type)
    const componentType = getInputFactory(baseType)
    const value = this.value || []

    const items = value.map((v, i) => {
      const path = [...this.path, i]

      return h(
        componentType,
        {
          props: {
            // name: pathToString(path),
            value: v,
            type: baseType,
            path: path
          },
          on: {
            change: updated => this.handleChange(i, updated)
          },
          slot: i,
          key: i,
          ref: `item__${i}`
        }
      )
    })

    return (
      <t-list-bootstrap
        name={this.name}
        type={baseType}
        value={this.value}
        onAdd={this.handleAdd}
        onRemove={this.handleRemove}
        onSwap={this.handleSwap}
      >
        {items}
      </t-list-bootstrap>
    )
  },
  methods: {
    handleAdd () {
      this.$emit('change', [...(this.value || []), null])
    },
    handleChange (index, value) {
      this.value.splice(index, 1, value)

      this.$emit('change', this.value)
    },
    handleRemove (index) {
      this.value.splice(index, 1)
      this.$emit('change', this.value)
    },
    getValue () {
      // Return an empty list by default to prevent errors with the
      // component is initialized with null values.
      if (this.value == null && this.type.meta.kind !== 'maybe') {
        return []
      }

      return Object.values(this.$refs)
        .filter(x => typeof x.getValue === 'function')
        .map(x => x.getValue())
    },
    validate () {
      const errors = Object.values(this.$refs)
        .filter(x => typeof x.validate === 'function')
        .map(x => x.validate())
        .filter(x => !x.isValid())

      return new ValidationResult(errors)
    },
    handleSwap (index1, index2) {
      const copy = [...this.value]

      const idx1 = copy[index1]

      copy[index1] = copy[index2]

      copy[index2] = idx1

      this.$emit('change', copy)
    }
  }
}
</script>
