import PropTypes from 'prop-types'
import React from 'react'
import Form from 'react-bootstrap/Form'

const FormErrors = ({ errors }) => (
  <Form.Text className="text-mute">
    <div className="panel panel-default">
      <div className="formErrors">
        <p>{errors}</p>
      </div>
    </div>
  </Form.Text>
)

FormErrors.propTypes = {
  errors: PropTypes.string
}

export default FormErrors
