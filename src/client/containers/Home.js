import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { fetchServerStats } from '../actions/mc'
import HomeComponent from '../components/Home'

class Home extends PureComponent {
    componentDidMount() {
        this.props.fetchServerStats()
    }

    render() {
        const {serverStats, fetchingStats, fetchedStats, errorServerStats} = this.props

        const loadingStats = fetchingStats && !fetchedStats
        const errorStats = errorServerStats || (fetchedStats && !serverStats)

        return <HomeComponent 
            stats={serverStats} 
            loadingStats={loadingStats}
            errorStats={errorStats}
        />
    }
}

Home.propTypes = {
    serverStats: PropTypes.object,
    fetchingStats: PropTypes.bool,
    fetchedStats: PropTypes.bool,
    errorServerStats: PropTypes.object,

    fetchServerStats: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    serverStats: state.mc.stats,
    fetchingStats: state.mc.fetching,
    fetchedStats: state.mc.fetched,
    errorServerStats: state.mc.error
})

const mapDispatchToProps = dispatch => ({
    fetchServerStats: () => dispatch(fetchServerStats())
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)