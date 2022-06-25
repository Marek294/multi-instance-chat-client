import React from 'react'

const Dots = ({ color = 'var(--ui-01)' }) => (
  <div className="dots__spinner">
    <div className="dot dotsSpinnerAnimation" />
    <div className="dot dotsSpinnerAnimation" />
    <div className="dot dotsSpinnerAnimation" />
    <style jsx>{`
      .dots__spinner {
        display: flex;
        justify-content: center;
        align-items: center;
        transform: translateY(-50%);
      }

      .dots__spinner .dot {
        width: 6px;
        height: 6px;
        min-width: 6px;
        min-height: 6px;
        margin: 0 3px 0 0;
        border: 2px solid ${color};
        border-radius: 50%;
      }

      .dots__spinner .dot:last-of-type {
        margin: 0;
      }

      .dots__spinner .dot:nth-child(1) {
        animation-delay: calc(300ms * 1);
      }

      .dots__spinner .dot:nth-child(2) {
        animation-delay: calc(300ms * 2);
      }

      .dots__spinner .dot:nth-child(3) {
        animation-delay: calc(300ms * 3);
      }
    `}</style>
  </div>
)

export default Dots
