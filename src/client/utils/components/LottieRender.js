import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Lottie from 'react-lottie'

class LottieRender extends Component {
    render() {
        const {name, loop = true, autoplay = true, width = 600, height = 600} = this.props
        const animationData = require(`../../lotties/${name}.json`)

        const lottieOptions = {
            loop: loop,
            autoplay: autoplay,
            animationData: animationData
        }

        return <Lottie isClickToPauseDisabled={true} options={lottieOptions} width={width} height={height} />
    }
}

LottieRender.propTypes = {
    name: PropTypes.string.isRequired,
    loop: PropTypes.bool,
    autoplay: PropTypes.bool,
    width: PropTypes.number,
    height: PropTypes.number
}

export default LottieRender