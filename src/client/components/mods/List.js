import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Col, Table } from 'react-bootstrap'

import lo from 'lodash'
import { getStringFromKey } from '../../utils'
import { Loading, Error, FilterDropdown, LottieRender } from '../../utils/components'

class List extends Component {
    constructor(props) {
        super(props)

        const newMods = lo.cloneDeep(props?.mods)

        this.state = {
            mods: newMods?.length ? newMods : [],
            filteredCategories: ['qol', 'worldgen', 'tech', 'flora', 'equipment', 'misc', 'magic', 'progress', 'mobs']
        }

        this._onFilterCategoriesChange = this.onFilterCategoriesChange.bind(this)
    }

    componentDidUpdate(prevProps) {
        if(!lo.isEqual(prevProps.mods, this.props.mods)) {
            const newMods = lo.cloneDeep(this.props.mods)
            this.setState({mods: newMods})
        }
    }

    onFilterCategoriesChange(selectedCategories) {
        this.setState({filteredCategories: selectedCategories})
    }

    render() {
        const {mods, filteredCategories} = this.state
        const {loadingMods, errorMods} = this.props

        console.log(filteredCategories)

        const keys = ['name', 'category', 'description']
        const categories = mods?.length ? [...new Set(mods.map(mod => mod.category))] : []
        const filteredMods = mods?.length ? mods.filter(mod => filteredCategories.includes(mod.category)) : []

        return <Container fluid>
            <Row>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                    <h1>Liste des mods</h1>
                </div>
                <br />
                <div style={{display: 'flex', justifyContent: 'flex-end', whiteSpace: 'nowrap'}}>
                    <FilterDropdown options={categories} selectedOptions={filteredCategories} onFilterChange={this._onFilterCategoriesChange} />
                </div>
            </Row>
            <Row>
                <Col xs={12}>
                    {loadingMods ? <Loading /> : errorMods ? <Error error={errorMods} /> : filteredMods?.length ? <Table hover striped>
                        <thead>
                            {keys.map((key, keyIndex) => {
                                return <th style={{padding: '10px'}} key={'mods-key-' + keyIndex}>
                                    {getStringFromKey(key)}
                                </th>
                            })}
                        </thead>
                        <tbody>
                            {filteredMods.map(mod => {
                                return <tr key={'mods-row-' + mod.id}>
                                    {keys.map((key, keyIndex) => {
                                        return <td style={{padding: '10px', whiteSpace: key === 'category' ? 'nowrap' : null}} key={'mod-key-' + mod.id + '-' + keyIndex}>
                                            {getStringFromKey(mod[key])}
                                        </td>
                                    })}
                                </tr>
                            })}
                        </tbody>
                    </Table> : <>
                        <LottieRender name="empty" width={325} height={325} /><br />
                        <div style={{display: 'flex', justifyContent: 'center'}}>{getStringFromKey('empty_results')}</div>
                    </>}
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