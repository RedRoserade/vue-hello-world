<template>
  <div>
    This is a test.

    <t-form
      ref="form"
      :type="modelType"
      :value="value"
      @change="handleChange"
    />

    <pre style="text-align: left">{{ valueAsJson }}</pre>

    <button type="button" @click="getValueFromForm">Get value</button>

    <pre style="text-align: left">{{ validationResultAsJson }}</pre>

    <button type="button" @click="validate">Validate</button>
  </div>
</template>


<script>
import t from 'tcomb'

import TCombForm from './tcomb-vue/Form.vue'

const Test = t.struct({
  someText: t.String,
  someOptional: t.maybe(t.String),
  // someOptions: t.enums({
  //   hi: 'Hi!',
  //   ho: 'Ho!',
  //   whatsUp: "What's up?"
  // }),
  someDate: t.Date,
  // someNumber: t.Number,
  someNestedStruct: t.struct({
    nestedString: t.String,
    someNestedDate: t.Date
  }),
  myList: t.maybe(t.list(t.String)),
  myListOfObjects: t.list(
    t.struct({
      whatever: t.String,
      somethingElse: t.Date
    })
  )
})

export default {
  name: 'form-test',
  components: {
    't-form': TCombForm
  },
  data () {
    return {
      modelType: Test,
      value: null,
      validationResult: null
    }
  },
  methods: {
    handleChange (value) {
      this.value = value
    },
    getValueFromForm () {
      console.log(this.$refs.form.getValue())
    },
    validate () {
      this.validationResult = this.$refs.form.validate()
    }
  },
  computed: {
    valueAsJson () {
      return JSON.stringify(this.value, null, 2)
    },
    validationResultAsJson () {
      return JSON.stringify(this.validationResult, null, 2)
    }
  }
}
</script>
