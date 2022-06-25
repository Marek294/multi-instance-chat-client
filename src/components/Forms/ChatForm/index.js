import React from 'react'
import { Formik, Field, Form } from 'formik'
import { Fields, fieldnames } from '../../UI/Input'
import StyledButton from '../../UI/Buttons/StyledButton'
import validate from './validate'

function ChatForm ({ onSubmit, initialValues }) {
  return (
    <Formik onSubmit={onSubmit} initialValues={initialValues} validate={validate} enableReinitialize>
      {props => (
        <>
          <Form>
            <div className="chatForm">
              <div className="chatForm__fields">
                <div className="chatFrom__field">
                  <Field
                    label="Message"
                    name={fieldnames.chat.message}
                    placeholder="Message"
                    component={Fields.Input}
                  />
                </div>
              </div>
              <div className="chatFrom__submitButton">
                <StyledButton
                  type="submit"
                  disabled={!props.isValid}
                >
                  Send
                </StyledButton>
              </div>
              {props.errors._error && (
                <p className="caption text--support-error">{props.errors._error}</p>
              )}
            </div>
            <style jsx>{`
              .chatForm {
                display: flex;
                justify-content: center;
              }

              .chatFrom__submitButton {
                margin: 16px 0px 0px 16px;
              }
            `}</style>
          </Form>
        </>
      )}
    </Formik>
  )
}

export default ChatForm
