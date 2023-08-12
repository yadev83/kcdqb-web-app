import React, { PureComponent } from 'react'
import { Container } from 'react-bootstrap'
import PropTypes from 'prop-types'

class Layout extends PureComponent {
    render() {
        const {children} = this.props

        return <Container fluid>
            {/* TODO :: ADD A MENU */}
            {children}
        </Container>
    }
}

Layout.propTypes = {
    children: PropTypes.object.isRequired
}

export default Layout