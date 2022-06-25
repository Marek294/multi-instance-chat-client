import React from 'react'
import { Formik, Field, Form } from 'formik'
import { Fields, fieldnames } from '../../UI/Input'
import StyledButton from '../../UI/Buttons/StyledButton'
import validate from './validate'

function EnterChatForm ({ onSubmit, initialValues }) {
  return (
    <Formik onSubmit={onSubmit} initialValues={initialValues} validate={validate} enableReinitialize>
      {props => (
        <>
          <Form>
            <div className="enterChatForm">
              <div className="enterChatForm__fields">
                <div className="enterChatFrom__field">
                  <Field
                    label="Username"
                    name={fieldnames.enterChat.username}
                    placeholder="Username"
                    wrapperStyles={{
                      width: 200
                    }}
                    component={Fields.Input}
                  />
                </div>
              </div>
              <div className="enterChatFrom__submitButton">
                <StyledButton type="submit">
                  Enter Chat
                </StyledButton>
              </div>
              {props.errors._error && (
                <p className="caption text--support-error predictionParamsForm__formError">{props.errors._error}</p>
              )}
            </div>
            <style jsx>{`
              .enterChatForm {
                display: flex;
                justify-content: center;
              }

              .enterChatFrom__submitButton {
                margin: 16px 0px 0px 16px;
              }
            `}</style>
          </Form>
        </>
      )}
    </Formik>
  )
}

export default EnterChatForm
