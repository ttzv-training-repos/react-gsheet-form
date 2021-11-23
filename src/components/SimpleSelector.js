import PropTypes from 'prop-types'
import React from 'react'
import Form from 'react-bootstrap/Form'

const SimpleSelector = props => {
  const { options, label, name, onChange, onBlur, errors } = props

  const optionsList = () => {
    if (options) {
      return options.map((option, index) => (
        <option key={`this.props.name-${index}`}>{option}</option>
      ))
    }
  }

  SimpleSelector.propTypes = {
    options: PropTypes.array,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    errors: PropTypes.node.isRequired
  }

  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as="select"
        size="md"
        name={name}
        onChange={onChange}
        onBlur={onBlur}
      >
        <option />
        {optionsList()}
      </Form.Control>
      {errors}
    </Form.Group>
  )
}

export default SimpleSelector
