import PropTypes from 'prop-types'
import React from 'react'

export const FormErrors = ({ formErrors }) => (
  <div className="formErrors">
    <p>{formErrors}</p>
  </div>
)

FormErrors.propTypes = {
  formErrors: PropTypes.string.isRequired
}
