const validation = values => {
  const errors = {}

  if (!values.message) errors.message = 'required'

  return errors
}

export default validation
