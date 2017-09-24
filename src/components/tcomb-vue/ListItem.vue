<script>
import { getInputFactory } from './util'

export default {
  name: 't-list-item',
  props: ['type', 'name', 'value', 'path', 'index', 'isFirst', 'isLast'],
  render (h) {
    const componentType = getInputFactory(this.type)

    return (
      <div class='row'>
        <div class='col-sm-8'>
          {h(
            componentType,
            {
              props: {
                value: this.value,
                type: this.type,
                path: this.path,
                name: this.name
              },
              on: {
                change: this.handleChange
              }
            }
          )}
        </div>
        <div class='col-sm-4'>
          <div class='form-group'>
            <label class='control-label' aria-hidden={true}>Options</label>
            <div class="btn-toolbar">
              <div class='btn-group'>
                <button class='btn btn-default' disabled={this.isFirst} onClick={this.handleUp} type='button'>Up</button>
                <button class='btn btn-default' disabled={this.isLast} onClick={this.handleDown} type='button'>Down</button>
              </div>
              <button class='btn btn-danger' onClick={this.handleRemove} type='button'>Remove</button>
            </div>
          </div>
        </div>
      </div>
    )
  },
  methods: {
    validate () {
      return this.$refs.input.validate()
    },
    handleRemove () {
      this.$emit('remove')
    },
    handleChange (value) {
      this.$emit('change', value)
    },
    handleUp () {
      if (this.isFirst) {
        return
      }

      this.$emit('swap', this.index, this.index - 1)
    },
    handleDown () {
      if (this.isLast) {
        return
      }

      this.$emit('swap', this.index, this.index + 1)
    }
  }
}
</script>
