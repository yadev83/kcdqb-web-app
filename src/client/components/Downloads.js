import React, { Component } from 'react'
import PropTypes from 'prop-types'
import lo from 'lodash'

import { LottieRender, Loading, Error } from '../utils/components'
import { Col, Container, Row } from 'react-bootstrap'

class Downloads extends Component {
    constructor(props) {
        super(props)

        this.state = {
            list: props?.list || []
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(!lo.isEqual(prevProps.list, this.props.list)) {
            this.setState({list: lo.cloneDeep(this.props.list)})
        }
    }

    render() {
        const {loadingList, errorList} = this.props
        const {list} = this.state
        
        return <Container>
            <Row>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                    <LottieRender name="download" width={100} height={100} />
                    <h1>Téléchargements</h1>
                    <LottieRender name="download" width={100} height={100} />
                </div>
            </Row>
            <Row>
                <Col xs={12}>
                    {loadingList ? <Loading /> : errorList ? <Error error={errorList} /> : null}
                    {list?.length ? <pre>
                        {JSON.stringify(list, null, 2)}
                    </pre> : <p style={{width: '100%', textAlign: 'center'}}>
                        Aucun fichier n'est disponible au téléchargement sur le serveur
                    </p>}
                </Col>
            </Row>
        </Container>
    }
}

Downloads.propTypes = {
    list: PropTypes.object,
    loadingList: PropTypes.bool,
    errorList: PropTypes.oneOfType([PropTypes.bool, PropTypes.object])
}

export default Downloads