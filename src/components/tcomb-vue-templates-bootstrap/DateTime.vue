<template>
  <div :class="{ 'form-group': true, 'has-error': this.hasError }">
    <label class="control-label" :for="name">{{ label }}</label>
    <div class="row">
      <input type="hidden" :value="valueAsDateString" :name="name" />
      <div class="col-sm-2 col-xs-4 form-group">
        <input
          class="form-control"
          type="number"
          min="1901"
          max="9999"
          :id="name"
          :value="yearValue"
          @change="handleYearChange"
        />
      </div>

      <div class="col-sm-2 col-xs-4 form-group">
        <select :value="monthValue" @input="handleMonthChange" class="form-control">
          <option value="0">1</option>
          <option value="1">2</option>
          <option value="2">3</option>
          <option value="3">4</option>
          <option value="4">5</option>
          <option value="5">6</option>
          <option value="6">7</option>
          <option value="7">8</option>
          <option value="8">9</option>
          <option value="9">10</option>
          <option value="10">11</option>
          <option value="11">12</option>
        </select>
      </div>

      <div class="col-sm-2 col-xs-4 form-group">
        <input
          class="form-control"
          type="number"
          min="1"
          :max="maxDayValue"
          :value="dayValue"
          :disabled="yearValue == null || monthValue == null"
          @input="handleDayChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 't-datetime-bootstrap',
  props: ['value', 'name', 'hasError'],
  data () {
    const data = {
      yearValue: null,
      monthValue: null,
      dayValue: null,
      label: this.name
    }

    if (this.value instanceof Date) {
      data.yearValue = this.value.getFullYear()
      data.monthValue = this.value.getMonth()
      data.dayValue = this.value.getDate()
    }

    return data
  },
  methods: {
    emitChangeOnValidDate () {
      const value = this.valueAsDate

      if (value != null) {
        this.$emit('change', value)
      }
    },
    ensureCorrectDayValue () {
      if (this.dayValue != null) {
        this.dayValue = Math.min(this.dayValue, this.maxDayValue)
      }
    },
    handleYearChange (e) {
      this.yearValue = e.target.valueAsNumber
      this.ensureCorrectDayValue()
      this.emitChangeOnValidDate()
    },
    handleMonthChange (e) {
      this.monthValue = parseInt(e.target.value, 10)
      this.ensureCorrectDayValue()
      this.emitChangeOnValidDate()
    },
    handleDayChange (e) {
      this.dayValue = e.target.valueAsNumber
      this.emitChangeOnValidDate()
    }
  },
  computed: {
    valueAsDate () {
      if (
        this.yearValue != null &&
        this.monthValue != null &&
        this.dayValue != null
      ) {
        return new Date(
          Date.UTC(
            this.yearValue,
            this.monthValue,
            this.dayValue
          )
        )
      }

      return null
    },
    valueAsDateString () {
      const value = this.valueAsDate

      if (value == null) {
        return null
      }

      return value.toISOString()
    },
    maxDayValue () {
      if (
        this.yearValue != null &&
        this.monthValue != null
      ) {
        // Use the 0th day of the next month.
        const d = new Date(
          Date.UTC(
            this.yearValue,
            this.monthValue + 1,
            0
          )
        )

        return d.getDate()
      }

      return 1
    }
  }
}
</script>
