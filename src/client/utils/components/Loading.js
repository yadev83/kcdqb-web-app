import React, { PureComponent } from 'react'
import { Spinner } from 'react-bootstrap'

class Loading extends PureComponent {
	render() {
		return <div className="d-flex justify-content-center m-5">
			<Spinner animation="border" role="status" size="lg" />
		</div>
	}
}

export default Loading