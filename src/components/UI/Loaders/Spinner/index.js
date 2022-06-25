import React from 'react'

const Spinner = ({ color = 'var(--brand-01)', background = 'var(--ui-01)' }) => (
  <div className="loader spinnerAnimation">
    Loading...
    <style jsx>{`
      .loader,
      .loader:before,
      .loader:after {
        border-radius: 50%;
      }
      .loader {
        color: ${color};
        font-size: 11px;
        text-indent: -99999em;
        margin: 55px auto;
        position: relative;
        width: 10em;
        height: 10em;
        box-shadow: inset 0 0 0 1em;
        -webkit-transform: translateZ(0);
        -ms-transform: translateZ(0);
        transform: translateZ(0);
      }
      .loader:before,
      .loader:after {
        position: absolute;
        content: '';
      }
      .loader:before {
        width: 5.2em;
        height: 10.2em;
        background: ${background};
        border-radius: 10.2em 0 0 10.2em;
        top: -0.1em;
        left: -0.1em;
        -webkit-transform-origin: 5.1em 5.1em;
        transform-origin: 5.1em 5.1em;
      }
      .loader:after {
        width: 5.2em;
        height: 10.2em;
        background: ${background};
        border-radius: 0 10.2em 10.2em 0;
        top: -0.1em;
        left: 4.9em;
        -webkit-transform-origin: 0.1em 5.1em;
        transform-origin: 0.1em 5.1em;
      }
    `}</style>
  </div>
)

export default Spinner
