import React, { PureComponent } from 'react'
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import PropTypes from 'prop-types'

class Layout extends PureComponent {
    render() {
        const {children} = this.props

        return <Container fluid>
            {/* TODO :: ADD A MENU */}
            <Navbar>
                <Container>
                    <Navbar.Brand href="/">KCDQB</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Accueil</Nav.Link>
                        <NavDropdown title="Mods" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/mods/activites">Y a quoi à faire ?</NavDropdown.Item>
                            <NavDropdown.Item href="/mods/important">Les mods majeurs</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/mods/all">Base de données</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href={`${window.location.protocol}//${window.location.hostname}:8123`} target="_blank" noopener noreferrer>Map</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {children}
        </Container>
    }
}

Layout.propTypes = {
    children: PropTypes.object.isRequired
}

export default Layout