import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Col } from 'react-bootstrap'

class Error extends PureComponent {
	componentDidMount() {
		const {error} = this.props

		if (error)
			console.error(error)
	}


	render() {
		const {error} = this.props

		return <Col xs={12} sm={12} md={12} lg={12}>
			{error && error.message ? <pre>{error.message}</pre> : null}
			{error && error.response && error.response.data && error.response.data.message ?
				<pre>{error.response.data.message}</pre> : null}
		</Col>
	}
}

Error.propTypes = {
	error: PropTypes.object,
}

export default Error
