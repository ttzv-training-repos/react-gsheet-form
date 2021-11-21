import React from 'react'
import PropTypes from 'prop-types'

export const FormErrors = ({ formErrors }) =>
  <div className='formErrors'>
      <p>{formErrors}</p>
  </div>

FormErrors.propTypes = {
  formErrors: PropTypes.string.isRequired
}
