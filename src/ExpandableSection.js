import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Context } from './Expandable';

export default class ExpandableSection extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        children: PropTypes.func.isRequired
    };
    static contextType = Context;
    render() {
        const { id, expanded, ...props } = this.props;
        let { expanded: expandedList, handleSectionClick } = this.context;

        return props.children({
            ...props,
            expanded: expandedList.includes(id),
            handleClick: handleSectionClick(id)
        });
    }
}
