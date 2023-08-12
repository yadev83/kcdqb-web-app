import React, { Component } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import PropTypes from 'prop-types'

import lo from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faServer, faSquare } from '@fortawesome/free-solid-svg-icons'

const INFO_KEYS = ['hostname', 'version', 'numplayers', 'maxplayers', 'hostip', 'hostport']

class ServerInfo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            infos: {}
        }
    }

    componentDidMount() {
        this.initInfos()
    }

    componentDidUpdate(prevProps) {
        if(!lo.isEqual(prevProps.serverStats, this.props.serverStats)) {
            this.initInfos()
        }
    }

    initInfos() {
        const {serverStats} = this.props

        if(!serverStats)
            this.setState({infos: {}})

        const infos = {}
        Object.entries(serverStats)?.forEach(([key, value]) => {
            if(INFO_KEYS.includes(key)) {
                infos[key] = value
            }
        })

        console.log(infos)

        this.setState({infos: infos})
    }

    render() {
        const {infos} = this.state

        return <Card>
            <Card.Header>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <span>
                        <FontAwesomeIcon icon={faSquare} color={infos?.hostname?.length ? '#00ff00' : '#ff0000'} style={{margin: '0'}} />&nbsp;
                        {infos?.hostname} ({infos?.version})
                    </span>
                    <span style={{marginLeft: 'auto'}}>
                        <FontAwesomeIcon icon={faServer} />&nbsp;
                        {infos?.hostip}:{infos?.hostport}
                    </span>
                </div>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    <b>Joueurs en ligne : </b>{infos?.numplayers} / {infos?.maxplayers}
                </Card.Text>
            </Card.Body>
        </Card>
    }
}

ServerInfo.propTypes = {
    serverStats: PropTypes.object
}

export default ServerInfo