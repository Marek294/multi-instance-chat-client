const validation = values => {
  const errors = {}

  if (!values.username) errors.username = 'required'

  return errors
}

export default validation
