import React from 'react'
import classNames from 'classnames'
import Dots from '../Loaders/Dots'
import SVG from '../SVG'

const StyledButton = ({
  onClick,
  secondary,
  tertiary,
  small,
  isDisabled,
  active,
  loading,
  children,
  customStyles,
  icon,
  error,
  type = 'button',
  dataType = 'button',
  ...props
}) => {
  return (
    <button
      className={classNames('styledButton button', {
        'text--support-info active': active,
        'text--inverse primary svg--active svg--inverse': !secondary && !active && !error && !tertiary,
        'svg--active svg--inverse': !secondary && !active && !error && icon,
        'text--support-info secondary': secondary && !active && !error && !tertiary,
        'text--4 tertiary': !secondary && !active && !error && tertiary,
        'text--inverse error': !secondary && !active && !tertiary && error,
        'button_small small': small
      })}
      type={type}
      data-test={dataType}
      onClick={onClick}
      disabled={isDisabled || loading}
      style={customStyles}
      {...props}
    >
      {icon && <SVG icon={icon} className="svg__icon" />}
      {loading ? <Dots color={secondary && 'var(--ui-04)'} /> : children}
      <style jsx>{`
        .styledButton {
          display: flex;
          justify-content: center;
          align-items: center;
          min-width: 88px;
          height: 48px;
          padding: ${icon ? '0 12px' : '0 8px'};
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s ease;
          outline: 1px solid transparent;
        }
        .styledButton:focus {
          outline: 1px solid rgba(84, 137, 202, 0.4);
        }
        .styledButton[disabled] {
          pointer-events: none;
        }

        .primary {
          border: 1px solid transparent;
          background-color: var(--brand-01);
        }
        .primary:hover:not([disabled]) {
          background-color: var(--hover);
        }
        .primary:active:not([disabled]) {
          background-color: var(--ui-03);
          color: var(--brand-01);
        }
        .primary[disabled] {
          background-color: var(--ui-04);
        }

        .error {
          border: 1px solid transparent;
          background-color: var(--support-error);
        }
        .error:hover:not([disabled]),
        .error:active:not([disabled]),
        .error[disabled] {
          opacity: 0.6;
        }

        .secondary {
          border: 1px solid var(--brand-01);
          background-color: var(--ui-01);
        }
        .secondary:hover:not([disabled]) {
          border: 1px solid var(--hover);
          color: var(--hover);
        }
        .secondary:active:not([disabled]) {
          border: 1px solid transparent;
          background-color: var(--ui-03);
          color: var(--brand-01);
        }
        .secondary[disabled] {
          border: 1px solid var(--ui-04);
          color: var(--ui-04);
        }

        .tertiary {
          border: 1px solid transparent;
          background-color: var(--ui-01);
        }

        .tertiary:hover:not([disabled]),
        .tertiary:active:not([disabled]) {
          opacity: 0.6;
        }

        .tertiary[disabled] {
          background-color: var(--ui-04);
        }

        .active {
          border: 1px solid transparent;
          background-color: var(--ui-03);
        }

        .small {
          max-height: 32px;
        }
      `}</style>
    </button>
  )
}

export default StyledButton
