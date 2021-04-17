import React, { Component } from 'react'
import Navigation from '../../containers/Navigation'
import Footer from '../../containers/Footer'

class Primary extends Component {
  render() {
    return (
      <div className="layout-primary">
        <Navigation />
        {this.props.children}
        <Footer />
      </div>
    )
  }
}

export default Primary
