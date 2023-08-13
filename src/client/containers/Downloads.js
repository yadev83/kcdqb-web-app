import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { fetchDownloadablesList } from '../actions/cdn'
import DownloadsComponent from '../components/Downloads'

class Downloads extends PureComponent {
    componentDidMount() {
        this.props.fetchList()
    }

    render() {
        const {list, fetching, fetched, error} = this.props

        const loadingList = fetching && !fetched
        const errorList = error || (fetched && !list)

        return <DownloadsComponent
            list={list}
            loadingList={loadingList}
            errorList={errorList}
        />
    }
}

Downloads.propTypes = {
    list: PropTypes.object,
    fetching: PropTypes.bool,
    fetched: PropTypes.bool,
    error: PropTypes.object,

    fetchList: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    list: state.cdn.list,
    fetching: state.cdn.fetching,
    fetched: state.cdn.fetched,
    error: state.cdn.error
})

const mapDispatchToProps = dispatch => ({
    fetchList: () => dispatch(fetchDownloadablesList())
})

export default connect(mapStateToProps, mapDispatchToProps)(Downloads)