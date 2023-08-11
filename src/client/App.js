import { PureComponent } from 'react'
import logo from './logo.svg'
import './styles/App.css'
import { greet } from './actions/test'
import { connect } from 'react-redux'

class App extends PureComponent {
	constructor(props) {
		super(props)

		this.state = {
			message: null
		}
	}

	componentDidMount() {
		this.props.greeting()
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.message != this.props.message || !this.state.message)
			this.setState({message: this.props.message})
	}

	render() {
		return <div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>HERE WE GO !</p>
				<a className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>Learn React</a>
				{this.state.message}
			</header>
		</div>
	}
}

const mapStateToProps = state => ({
	message: state.test.message
})

const mapDispatchToProps = dispatch => ({
	greeting: () => dispatch(greet())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
