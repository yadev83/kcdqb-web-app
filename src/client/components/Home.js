import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import PropTypes from 'prop-types'

import lo from 'lodash'
import { Loading, Error } from '../utils/components'
import ServerInfo from './ServerInfo'

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            stats: props?.stats || null
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(!lo.isEqual(prevProps.stats, this.props.stats)) {
            this.setState({stats: lo.cloneDeep(this.props.stats)})
        }
    }

    render() {
        const {loadingStats, errorStats} = this.props
        const {stats} = this.state

        return <Container>
            <Row>
                <Col xs={12}>
                    {loadingStats ? <Loading /> : errorStats ? <Error error={errorStats} /> : stats ? <ServerInfo serverStats={stats} /> : null}
                </Col>
                <div>
                    <h1>Télécharger le pack KCDQB complet</h1>
                    <a href="/download/kcdqb-pack.zip">KCDQB Pack</a><br />
                    <em>Contient Optifine 1.20, Faithful 1.20, Fresh Animations 1.20 et Complementary Reimagined 1.20</em>
                </div>
                <div>
                    <h1>Liens utiles de téléchargement</h1>
                    <hr />
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <a href="https://optifine.net/home">Optifine Download</a>
                        <a href="https://minecraft.fr/faithful-32x32/">Faithful Resource Pack</a>
                        <a href="https://www.curseforge.com/minecraft/texture-packs/fresh-animations">Fresh Animations</a>
                        <a href="https://www.curseforge.com/minecraft/customization/complementary-reimagined">Complementary Reimagined (shader pack)</a>
                    </div>
                </div>
            </Row>
        </Container>
    }
}

Home.propTypes = {
    stats: PropTypes.object,
    loadingStats: PropTypes.bool,
    errorStats: PropTypes.oneOfType([PropTypes.bool, PropTypes.object])
}

export default Home