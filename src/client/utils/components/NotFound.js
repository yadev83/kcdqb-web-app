import React, { PureComponent } from 'react'
import { Container } from 'react-bootstrap'
import Lottie from 'react-lottie'

import notFoundAnimation from '../../lotties/404'

class NotFound extends PureComponent {
    render() {
        const lottieOptions = {
            loop: true,
            autoplay: true,
            animationData: notFoundAnimation
        }

        return <Container>
            <Lottie options={lottieOptions} height={600} width={600} />
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%'}}><a href="/">Revenir à l'accueil</a></div>
        </Container>
    }
}

export default NotFound