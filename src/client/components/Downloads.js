import React, { Component } from 'react'
import PropTypes from 'prop-types'
import lo from 'lodash'

import { API_URL } from '../utils'
import { LottieRender, Loading, Error } from '../utils/components'
import { Col, Container, Row, Table } from 'react-bootstrap'

const SIZE_TYPES = ['o', 'Ko', 'Mo', 'Go']

class Downloads extends Component {
    constructor(props) {
        super(props)

        const newList = lo.cloneDeep(props?.list)

        this.state = {
            // Filter to keep only files (might update to handle directories if needed)
            list: newList?.length ? newList?.filter(file => file?.type && file.type === 'file') : []
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(!lo.isEqual(prevProps.list, this.props.list)) {
            const newList = lo.cloneDeep(this.props.list)
            this.setState({list: newList?.length ? newList?.filter(file => file?.type && file.type === 'file') : []})
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
                    {loadingList ? <Loading /> : errorList ? <Error error={errorList} /> : list?.length ? <Table>
                        <thead>
                            <th>Nom du fichier</th>
                            <th>Taille</th>
                            <th>Mise en ligne</th>
                            <th>Dernière mise à jour</th>
                            <th>Télécharger</th>
                        </thead>
                        <tbody>
                            {list.map((file, index) => {
                                // Calculate a human readable file size (o, ko, mo, go)
                                // Automatically adjusts based on how big the file is
                                let sizeStr = file.size.toString()
                                let size = file.size, sizeType = 0

                                while(sizeStr.length > 4 && sizeType < 3) {
                                    size = size / 1024
                                    sizeType++

                                    sizeStr = Math.trunc(size).toString()
                                }

                                // Produce human readable create/update dates
                                const creationDate = new Date(file.created_at).toLocaleString()
                                const updateDate = new Date(file.updated_at).toLocaleString()
                                
                                // Render the file row
                                return <tr key={index}>
                                    <td>{file.name}</td>
                                    <td>{size.toFixed(3)} {SIZE_TYPES[sizeType]}</td>
                                    <td>{creationDate}</td>
                                    <td>{updateDate}</td>
                                    <td><a href={`${API_URL}/cdn/${file.name}`}>Télécharger</a></td>
                                </tr>
                            })}
                        </tbody>
                    </Table> : <p style={{width: '100%', textAlign: 'center'}}>
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