<script>
import { getInputFactory, ValidationResult, log } from './util'

import FormGroup from './FormGroup.vue'

import Struct from '../tcomb-vue-templates-bootstrap/Struct.vue'

export default {
  name: 't-struct',
  props: ['type', 'value', 'name', 'path'],
  components: {
    't-formgroup': FormGroup
  },
  data () {
    return {
      inputs: Object.entries(this.type.meta.props)
        .map(([name, type]) => ({ name, type, component: getInputFactory(type) }))
    }
  },
  render (h) {
    const fields = this.inputs
      .map(({ name, type, component }) => {
        const field = h(component,
          {
            props: {
              name,
              type,
              value: this.tryGetValue(name),
              path: [...this.path, name]
            },
            on: {
              change: updated => this.handleChange(name, updated)
            },
            ref: `input__${name}`
          },
          null
        )

        return { name, field }
      })
      .reduce((acc, v) => {
        acc[v.name] = v.field

        return acc
      }, {})

    return h(
      Struct,
      {
        props: {
          fields: fields,
          name: this.name,
          type: this.type
        }
      }
    )
  },
  methods: {
    tryGetValue (name) {
      if (this.value == null) {
        return null
      }

      return this.value[name]
    },
    handleChange (name, value) {
      const updated = {
        ...this.value,
        [name]: value
      }

      this.$emit('change', updated)
    },
    validate () {
      log.trace('validating t-fieldset', this.path)

      const validationErrors = Object.values(this.$refs)
        .filter(r => typeof r.validate === 'function')
        .map(r => r.validate())
        .filter(r => !r.isValid())

      const result = new ValidationResult(validationErrors)

      log.trace('t-fieldset', this.path, 'is valid:', result.isValid(), 'errors:', result.errors)

      return result
    }
  }
}
</script>
