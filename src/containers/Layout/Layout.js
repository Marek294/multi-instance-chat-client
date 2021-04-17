import React, { PureComponent } from 'react'
import Primary from '../../components/SubLayouts/Primary'

class Layout extends PureComponent {
  render() {
    return (
      <Primary>
        {this.props.children}
      </Primary>
    )
  }
}

export default Layout
