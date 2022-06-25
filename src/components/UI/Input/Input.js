import React from 'react'
import classnames from 'classnames'

const Input = ({
  field,
  form,
  label,
  info,
  placeholder,
  autoFocus,
  autoComplete,
  type,
  step,
  description,
  disabled,
  wrapperStyles,
  inputStyles
}) => {
  const { error, touched } = form.getFieldMeta(field.name)
  const isError = !!(touched && error)

  return (
    <div
      className="field__container"
      {...(wrapperStyles && { style: wrapperStyles })}
    >
      {(label || info) && (
        <div className="field__infoWrapper">
          <label className="label text--1" htmlFor={field.name}>
            {label}
          </label>
          <p className="caption text--3">
            {info}
          </p>
        </div>
      )}
      {description && (
        <div className="field__descriptionWrapper">
          <p className="body_2 text--2">
            {description}
          </p>
        </div>
      )}
      <input
        className={classnames('field__input input text--1', {
          'field__input--error': isError
        })}
        {...field}
        type={type}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        placeholder={placeholder}
        disabled={disabled}
        step={step}
        id={field.name}
        style={inputStyles}
      />
      <div className="field__error">
        {isError && <p className="caption text--support-error" style={{ margin: 0 }}>
          {error}
        </p>}
      </div>
    </div>
  )
}

export default Input
