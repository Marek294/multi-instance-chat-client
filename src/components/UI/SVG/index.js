import React from 'react'
import { ReactSVG } from 'react-svg'

const SVG = ({ icon, className, svgClassName }) => (
  <ReactSVG
    src={`/images/icons/${icon}.svg`}
    className={className}
    beforeInjection={svg => {
      svg.setAttribute('style', 'display: flex')
      svgClassName && svg.classList.add(svgClassName)
    }}
  />
)

export default SVG
