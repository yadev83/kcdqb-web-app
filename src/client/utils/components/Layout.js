import React, { PureComponent } from 'react'
import { Container } from 'react-bootstrap'
import PropTypes from 'prop-types'

class Layout extends PureComponent {
    render() {
        const {children} = this.props

        return <div style={{maxWidth: '100%', minWidth: '100%'}}>
            {/* TODO :: ADD A MENU */}
            {children}
        </div>
    }
}

Layout.propTypes = {
    children: PropTypes.object.isRequired
}

export default Layout