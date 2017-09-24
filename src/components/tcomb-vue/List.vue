<script>
import { ValidationResult, pathToString, getBaseType } from './util'

import ListItem from './ListItem.vue'

export default {
  name: 't-list',
  components: {
    't-list-item': ListItem
  },
  props: ['type', 'value', 'name', 'path'],
  data () {
    return {
      label: this.name
    }
  },
  render (h) {
    const baseType = getBaseType(this.type)
    const value = this.value || []

    const items = value.map((v, i) => {
      const path = [...this.path, i]

      return (
        <t-list-item
          name={pathToString(path)}
          value={v}
          path={path}
          index={i}
          isFirst={i === 0}
          isLast={i === value.length - 1}
          type={baseType}
          onChange={updated => this.handleChange(i, updated)}
          onRemove={() => this.handleRemove(i)}
          onSwap={this.handleSwap}
          ref={`item__${i}`}
        />
      )
    })

    return (
      <fieldset>
        {this.label && <legend>{this.label}</legend>}

        {items}

        <div class='form-group'>
          <button class='btn btn-default' type='button' onClick={this.handleAdd}>Add</button>
        </div>
      </fieldset>
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
      if (this.value == null && this.type.meta.kind !== 'maybe') {
        return []
      }

      return this.value
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
