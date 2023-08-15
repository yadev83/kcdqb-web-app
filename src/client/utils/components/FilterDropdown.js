import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Dropdown, Form } from 'react-bootstrap'

import lo from 'lodash'
import { getStringFromKey } from '../string'

class FilterDropdown extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedOptions: props?.selectedOptions ? props.selectedOptions : []
        }

        this._handleFilterChange = (option) => this.handleFilterChange.bind(this, option)
    }

    handleFilterChange(option) {
        const {selectedOptions} = this.state
        let newSelectedOptions = lo.cloneDeep(selectedOptions)

        if(selectedOptions.includes(option)) {
            newSelectedOptions = newSelectedOptions.filter(opt => opt !== option)
            this.setState({selectedOptions: newSelectedOptions})
        } else {
            newSelectedOptions.push(option)
            this.setState({selectedOptions: newSelectedOptions})
        }

        this.props.onFilterChange(newSelectedOptions)
    }

    render() {
        const {options} = this.props
        const {selectedOptions} = this.state

        console.log(selectedOptions)

        return <Dropdown>
            <Dropdown.Toggle variant="success" id="filter-dropdown">
                Filtres
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {options.map(option => {
                    return <Form.Group style={{padding: '5px'}} key={option} onClick={this._handleFilterChange(option)}>
                        <Form.Check
                            checked={selectedOptions?.includes(option)}
                            type="switch"
                            label={getStringFromKey(option)}
                        />
                    </Form.Group>
                })}
            </Dropdown.Menu>
        </Dropdown>
    }
}

FilterDropdown.propTypes = {
    options: PropTypes.array,
    selectedOptions: PropTypes.array,
    onFilterChange: PropTypes.func.isRequired
}

export default FilterDropdown