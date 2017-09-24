<script>
export default {
  name: 't-struct-bootstrap',
  props: ['type', 'name', 'value', 'fields'],
  data () {
    return {
      label: this.name
    }
  },
  render (h) {
    return (
      <fieldset>
        {this.label && <legend>{this.label}</legend>}

        {Object.values(this.fields)}
      </fieldset>
    )
  }
}
</script>
