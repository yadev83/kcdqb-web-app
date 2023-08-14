import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import lo from 'lodash'
import { fetchMods } from '../../actions/mods'

import ListComponent from '../../components/mods/List'

class List extends PureComponent {
    componentDidMount() {
        this.props.fetchMods()
    }

    render() {
        const {mods, fetchingMods, fetchedMods, errorMods} = this.props

        const loading = fetchingMods && !fetchedMods
        const error = errorMods || (fetchedMods && !mods?.length)

        return <ListComponent
            mods={mods}
            loadingMods={loading}
            errorMods={error}
        />
    }
}

List.propTypes = {
    mods: PropTypes.array,
    fetchingMods: PropTypes.bool,
    fetchedMods: PropTypes.bool,
    errorMods: PropTypes.object,

    fetchMods: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    mods: state.mods.mods,
    fetchingMods: state.mods.fetching,
    fetchedMods: state.mods.fetched,
    errorMods: state.mods.error
})

const mapDispatchToProps = (dispatch) => ({
    fetchMods: () => dispatch(fetchMods())
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
