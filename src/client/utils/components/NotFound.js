import React, { PureComponent } from 'react'
import { Container } from 'react-bootstrap'
import LottieRender from './LottieRender'


class NotFound extends PureComponent {
    render() {
        return <Container>
            <LottieRender name="404" />
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%'}}><a href="/">Revenir à l'accueil</a></div>
        </Container>
    }
}

export default NotFound