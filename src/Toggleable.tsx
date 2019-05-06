import React, { useState, useEffect, useContext, createContext } from 'react';
import { normalizeId, without } from './utils';
interface ToggleableContextTypes {
    toggled: Array<string>;
    handleSectionClick: Function;
    handleOpen: Function;
    handleClose: Function;
}
interface ToggleableSectionContextTypes {
    toggled: boolean;
    handleClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
    handleOpen: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
    handleClose: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

const ToggleableContext = createContext<ToggleableContextTypes>({
    toggled: [],
    handleSectionClick: () => {},
    handleOpen: () => {},
    handleClose: () => {}
});

export function useToggleable(id: string) {
    const value = useContext(ToggleableContext);
    return {
        toggled: value.toggled.includes(id),
        handleClick: value.handleSectionClick(id),
        handleClose: value.handleClose(id),
        handleOpen: value.handleOpen(id)
    };
}

interface ToggleableSectionProps {
    id: string;
    children: (props: ToggleableSectionContextTypes) => JSX.Element;
}

function ToggleableSection({ id, children, ...props }: ToggleableSectionProps): JSX.Element {
    const value = useContext(ToggleableContext);
    return children({
        ...props,
        toggled: value.toggled.includes(id),
        handleClick: value.handleSectionClick(id),
        handleClose: value.handleClose(id),
        handleOpen: value.handleOpen(id)
    });
}

function Toggleable({
    initialExpanded = [],
    collapse = false,
    children
}: {
    initialExpanded?: Array<string>;
    collapse?: boolean;
    children: any;
}) {
    const [{ toggled }, setToggled] = useState({ toggled: initialExpanded });

    /**
     * Set toggled if url contains # fragment
     */
    const handleLocationChange = () => {
        const { hash } = window.location;
        const ids = hash.split('#');
        setToggled({ toggled: toggled.concat(ids) });
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
        if (toggled.includes(hashId)) {
            if ('replaceState' in window.history) {
                window.history.replaceState('', document.title, loc.pathname + loc.search);
            }
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
        const list = collapse ? [id] : toggled.includes(id) ? without(toggled, id) : toggled.concat(id);
        setToggled({ toggled: list });
    };
    const handleClose = (id: string) => () => {
        const list = without(toggled, id);
        setToggled({ toggled: list });
    };
    const handleOpen = (id: string) => () => {
        const list = toggled.concat(id);
        setToggled({ toggled: list });
    };

    return (
        <ToggleableContext.Provider
            value={{
                toggled,
                handleSectionClick,
                handleOpen,
                handleClose
            }}
        >
            {children}
        </ToggleableContext.Provider>
    );
}
Toggleable.Section = ToggleableSection;
export default Toggleable;
