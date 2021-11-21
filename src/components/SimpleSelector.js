import Form from 'react-bootstrap/Form'
import React from 'react'
import PropTypes from 'prop-types'

const SimpleSelector = (props) => {
  const { options, label, name, onChange, required } = props

  const optionsList = () => {
    if (options) {
      return options.map((option, index) => (
        <option key={`this.props.name-${index}`}>{option}</option>
      ))
    }
  }

  SimpleSelector.propTypes = {
    options: PropTypes.array.isRequired, label: PropTypes.string.isRequired, name: PropTypes.string.isRequired, onChange: PropTypes.func.isRequired, required: PropTypes.bool.isRequired
  }

  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as="select"
        size="md"
        name={name}
        onChange={onChange}
        required={required}
      >
        <option />
        {optionsList()}
      </Form.Control>
    </Form.Group>
  )
}

export default SimpleSelector
