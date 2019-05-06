import React, { useState, useEffect, useContext, createContext } from 'react';
import { normalizeId, without } from './utils';
interface ExpandableContextTypes {
    expanded: string[];
    handleSectionClick: Function;
    handleOpen: Function;
    handleClose: Function;
}
interface ExpandableSectionContextTypes {
    expanded: boolean;
    handleClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
    handleOpen: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
    handleClose: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

const ExpandableContext = createContext<ExpandableContextTypes>({
    expanded: [],
    handleSectionClick: () => {},
    handleOpen: () => {},
    handleClose: () => {}
});

export function useExpandable(id: string) {
    const value = useContext(ExpandableContext);
    return {
        expanded: value.expanded.includes(id),
        handleClick: value.handleSectionClick(id),
        handleClose: value.handleClose(id),
        handleOpen: value.handleOpen(id)
    };
}

interface ExpandableSectionProps {
    id: string;
    children: (props: ExpandableSectionContextTypes) => JSX.Element;
}

function ExpandableSection({ id, children, ...props }: ExpandableSectionProps): JSX.Element {
    const value = useContext(ExpandableContext);
    return children({
        ...props,
        expanded: value.expanded.includes(id),
        handleClick: value.handleSectionClick(id),
        handleClose: value.handleClose(id),
        handleOpen: value.handleOpen(id)
    });
}

function Expandable({
    initialExpanded = [],
    collapse = false,
    children
}: {
    initialExpanded?: string[];
    collapse?: boolean;
    children: any;
}) {
    const [{ expanded }, setExpanded] = useState({ expanded: initialExpanded });

    /**
     * Set expanded if url contains # fragment
     */
    const handleLocationChange = () => {
        const { hash } = window.location;
        const ids = hash.split('#');
        setExpanded({ expanded: expanded.concat(ids) });
    };
    useEffect(() => {
        handleLocationChange();
        window.addEventListener('hashchange', handleLocationChange);
        return () => {
            window.removeEventListener('hashchange', handleLocationChange);
        };
    }, []);

    /**
     * Remove # fragment from url if location
     */
    useEffect(() => {
        const loc = window.location;
        const hashId = normalizeId(loc.hash);
        if (expanded.includes(hashId)) {
            if ('replaceState' in window.history)
                window.history.replaceState('', document.title, loc.pathname + loc.search);
            else {
                // Prevent scrolling by storing the page's current scroll offset
                const scrollV = document.body.scrollTop;
                const scrollH = document.body.scrollLeft;

                loc.hash = '';

                // Restore the scroll offset, should be flicker free
                document.documentElement.scrollTop = scrollV;
                document.documentElement.scrollLeft = scrollH;
            }
        }
    });
    const handleSectionClick = (id: string) => () => {
        const list = collapse ? [id] : expanded.includes(id) ? without(expanded, id) : expanded.concat(id);
        setExpanded({ expanded: list });
    };
    const handleClose = (id: string) => () => {
        const list = without(expanded, id);
        setExpanded({ expanded: list });
    };
    const handleOpen = (id: string) => () => {
        const list = expanded.concat(id);
        setExpanded({ expanded: list });
    };

    return (
        <ExpandableContext.Provider
            value={{
                expanded,
                handleSectionClick: handleSectionClick,
                handleOpen: handleOpen,
                handleClose: handleClose
            }}
        >
            {children}
        </ExpandableContext.Provider>
    );
}
Expandable.Section = ExpandableSection;
export default Expandable;
