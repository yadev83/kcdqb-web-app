import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Col } from 'react-bootstrap'

import lo from 'lodash'
import { Loading, Error } from '../../utils/components'

class List extends Component {
    constructor(props) {
        super(props)

        const newMods = lo.cloneDeep(props?.mods)

        this.state = {
            // Filter to keep only files (might update to handle directories if needed)
            mods: newMods?.length ? newMods : []
        }
    }

    componentDidUpdate(prevProps) {
        if(!lo.isEqual(prevProps.mods, this.props.mods)) {
            const newMods = lo.cloneDeep(this.props.mods)
            this.setState({mods: newMods})
        }
    }

    render() {
        const {mods} = this.state
        const {loadingMods, errorMods} = this.props

        return <Container>
            <Row>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                    <h1>Liste des mods</h1>
                </div>
            </Row>
            <Row>
                <Col xs={12}>
                    {loadingMods ? <Loading /> : errorMods ? <Error error={errorMods} /> : <pre>
                        {JSON.stringify(mods, null, 2)}
                    </pre>}
                </Col>
            </Row>
        </Container>
    }
}

List.propTypes = {
    mods: PropTypes.array,
    loadingMods: PropTypes.bool,
    errorMods: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
}

export default List