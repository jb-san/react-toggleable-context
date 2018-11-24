import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { without } from 'lodash-es';
export const Context = React.createContext();

export default class Expandable extends Component {
    state = {
        expanded: this.props.expanded || []
    };

    static Section = ExpandableSection;
    static propTypes = {
        expanded: PropTypes.arrayOf(PropTypes.string)
    };

    componentDidMount() {
        window.addEventListener('hashchange', this.handleLocationChange);
    }

    componentWillUnmount() {
        // clean up listeners
        window.removeEventListener('hashchange', this.handleLocationChange);
    }

    handleLocationChange = () => {
        const { hash } = window.location;
        const ids = hash.split('#');
        this.setState({ expanded: this.state.expanded.concat(ids) });
    };

    handleSectionClick = id => () => {
        const { expanded } = this.state;
        const { collapse } = this.props;
        const { hash } = window.location;
        const hashId = hash.slice(1);
        if (expanded.includes(hashId)) {
            this.removeUrlAnchor();
        }
        const list = collapse ? [id] : expanded.includes(id) ? without(expanded, id) : expanded.concat(id);
        this.setState({ expanded: list });
    };
    removeUrlAnchor = () => {
        window.location.hash = '';
    };

    render() {
        const { children } = this.props;
        const { expanded } = this.state;
        return (
            <Context.Provider value={{ expanded, handleSectionClick: this.handleSectionClick }}>
                {children}
            </Context.Provider>
        );
    }
}
