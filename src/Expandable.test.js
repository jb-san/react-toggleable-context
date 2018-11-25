import React from 'react';
import { shallow, mount } from 'enzyme';
import Expandable from './Expandable';

describe('Expandable Component', () => {
    test('should pass expanded state for section and update it when handleClick is called', () => {
        const wrapper = mount(
            <Expandable>
                <Expandable.Section id={'first'}>
                    {({ handleClick, expanded }) => (
                        <>
                            <a id={'link'} onClick={handleClick}>
                                Header
                            </a>
                            <div id={'section-body'} expanded={expanded ? 'true' : 'false'}>
                                lorem
                            </div>
                            )
                        </>
                    )}
                </Expandable.Section>
                <Expandable.Section id={'second'}>
                    {({ handleClick, expanded }) => (
                        <>
                            <a id={'link'} onClick={handleClick}>
                                Header
                            </a>
                            <div id={'section-body'} expanded={expanded ? 'true' : 'false'}>
                                lorem
                            </div>
                            )
                        </>
                    )}
                </Expandable.Section>
            </Expandable>
        );

        expect(
            wrapper
                .find('#first')
                .find('#section-body')
                .props().expanded
        ).toBe('false');
        expect(
            wrapper
                .find('#second')
                .find('#section-body')
                .props().expanded
        ).toBe('false');

        wrapper
            .find('#first')
            .find('#link')
            .simulate('click');

        expect(
            wrapper
                .find('#first')
                .find('#section-body')
                .props().expanded
        ).toBe('true');
        expect(
            wrapper
                .find('#second')
                .find('#section-body')
                .props().expanded
        ).toBe('false');

        wrapper
            .find('#second')
            .find('#link')
            .simulate('click');

        expect(
            wrapper
                .find('#first')
                .find('#section-body')
                .props().expanded
        ).toBe('true');
        expect(
            wrapper
                .find('#second')
                .find('#section-body')
                .props().expanded
        ).toBe('true');
        wrapper.unmount();
    });
    test('should collapse other sections if collapse prop is given to Expandable', () => {
        const wrapper = mount(
            <Expandable collapse>
                <Expandable.Section id={'first'}>
                    {({ handleClick, expanded }) => (
                        <>
                            <a id={'link'} onClick={handleClick}>
                                Header
                            </a>
                            <div id={'section-body'} expanded={expanded ? 'true' : 'false'}>
                                lorem
                            </div>
                            )
                        </>
                    )}
                </Expandable.Section>
                <Expandable.Section id={'second'}>
                    {({ handleClick, expanded }) => (
                        <>
                            <a id={'link'} onClick={handleClick}>
                                Header
                            </a>
                            <div id={'section-body'} expanded={expanded ? 'true' : 'false'}>
                                lorem
                            </div>
                            )
                        </>
                    )}
                </Expandable.Section>
                <Expandable.Section id={'third'}>
                    {({ handleClick, expanded }) => (
                        <>
                            <a id={'link'} onClick={handleClick}>
                                Header
                            </a>
                            <div id={'section-body'} expanded={expanded ? 'true' : 'false'}>
                                lorem
                            </div>
                            )
                        </>
                    )}
                </Expandable.Section>
            </Expandable>
        );
        wrapper
            .find('#first')
            .find('#link')
            .simulate('click');
        expect(
            wrapper
                .find('#first')
                .find('#section-body')
                .props().expanded
        ).toBe('true');
        expect(
            wrapper
                .find('#second')
                .find('#section-body')
                .props().expanded
        ).toBe('false');

        wrapper
            .find('#first')
            .find('#link')
            .simulate('click');
        wrapper
            .find('#second')
            .find('#link')
            .simulate('click');
        expect(
            wrapper
                .find('#first')
                .find('#section-body')
                .props().expanded
        ).toBe('false');
        expect(
            wrapper
                .find('#second')
                .find('#section-body')
                .props().expanded
        ).toBe('true');
        expect(
            wrapper
                .find('#third')
                .find('#section-body')
                .props().expanded
        ).toBe('false');
        wrapper.unmount();
    });
    test('should start expanded if expanded prop is given to Expandable component', () => {
        const wrapper = mount(
            <Expandable expanded={['first', 'second']}>
                <Expandable.Section id={'first'}>
                    {({ handleClick, expanded }) => (
                        <>
                            <a id={'link'} onClick={handleClick}>
                                Header
                            </a>
                            <div id={'section-body'} expanded={expanded ? 'true' : 'false'}>
                                lorem
                            </div>
                            )
                        </>
                    )}
                </Expandable.Section>
                <Expandable.Section id={'second'}>
                    {({ handleClick, expanded }) => (
                        <>
                            <a id={'link'} onClick={handleClick}>
                                Header
                            </a>
                            <div id={'section-body'} expanded={expanded ? 'true' : 'false'}>
                                lorem
                            </div>
                            )
                        </>
                    )}
                </Expandable.Section>
                <Expandable.Section id={'third'}>
                    {({ handleClick, expanded }) => (
                        <>
                            <a id={'link'} onClick={handleClick}>
                                Header
                            </a>
                            <div id={'section-body'} expanded={expanded ? 'true' : 'false'}>
                                lorem
                            </div>
                            )
                        </>
                    )}
                </Expandable.Section>
            </Expandable>
        );

        expect(
            wrapper
                .find('#first')
                .find('#section-body')
                .props().expanded
        ).toBe('true');
        expect(
            wrapper
                .find('#second')
                .find('#section-body')
                .props().expanded
        ).toBe('true');
        expect(
            wrapper
                .find('#third')
                .find('#section-body')
                .props().expanded
        ).toBe('false');

        wrapper
            .find('#third')
            .find('#link')
            .simulate('click');
        expect(
            wrapper
                .find('#third')
                .find('#section-body')
                .props().expanded
        ).toBe('true');
        wrapper.unmount();
    });
    test('should start expanded if expanded prop is given to Expandable component but collapse if collapse prop is given', () => {
        const wrapper = mount(
            <Expandable expanded={['first', 'second']} collapse>
                <Expandable.Section id={'first'}>
                    {({ handleClick, expanded }) => (
                        <>
                            <a id={'link'} onClick={handleClick}>
                                Header
                            </a>
                            <div id={'section-body'} expanded={expanded ? 'true' : 'false'}>
                                lorem
                            </div>
                            )
                        </>
                    )}
                </Expandable.Section>
                <Expandable.Section id={'second'}>
                    {({ handleClick, expanded }) => (
                        <>
                            <a id={'link'} onClick={handleClick}>
                                Header
                            </a>
                            <div id={'section-body'} expanded={expanded ? 'true' : 'false'}>
                                lorem
                            </div>
                            )
                        </>
                    )}
                </Expandable.Section>
                <Expandable.Section id={'third'}>
                    {({ handleClick, expanded }) => (
                        <>
                            <a id={'link'} onClick={handleClick}>
                                Header
                            </a>
                            <div id={'section-body'} expanded={expanded ? 'true' : 'false'}>
                                lorem
                            </div>
                            )
                        </>
                    )}
                </Expandable.Section>
            </Expandable>
        );

        // initial expanded state for all sections should be undefined
        expect(
            wrapper
                .find('#first')
                .find('#section-body')
                .props().expanded
        ).toBe('true');
        expect(
            wrapper
                .find('#second')
                .find('#section-body')
                .props().expanded
        ).toBe('true');
        expect(
            wrapper
                .find('#third')
                .find('#section-body')
                .props().expanded
        ).toBe('false');
        wrapper
            .find('#third')
            .find('#link')
            .simulate('click');
        expect(
            wrapper
                .find('#third')
                .find('#section-body')
                .props().expanded
        ).toBe('true');
        expect(
            wrapper
                .find('#first')
                .find('#section-body')
                .props().expanded
        ).toBe('false');
        expect(
            wrapper
                .find('#second')
                .find('#section-body')
                .props().expanded
        ).toBe('false');
        wrapper.unmount();
    });
    test('should be expanded if respondToHash prop is set', () => {
        window.location.hash = '#second';

        const wrapper = mount(
            <Expandable respondToHash>
                <Expandable.Section id={'first'}>
                    {({ handleClick, expanded }) => (
                        <>
                            <a id={'link'} onClick={handleClick}>
                                Header
                            </a>
                            <div id={'section-body'} expanded={expanded ? 'true' : 'false'}>
                                lorem
                            </div>
                            )
                        </>
                    )}
                </Expandable.Section>
                <Expandable.Section id={'second'}>
                    {({ handleClick, expanded }) => (
                        <>
                            <a id={'link'} onClick={handleClick}>
                                Header
                            </a>
                            <div id={'section-body'} expanded={expanded ? 'true' : 'false'}>
                                lorem
                            </div>
                            )
                        </>
                    )}
                </Expandable.Section>
            </Expandable>
        );
        expect(
            wrapper
                .find('#first')
                .find('#section-body')
                .props().expanded
        ).toBe('false');
        expect(
            wrapper
                .find('#second')
                .find('#section-body')
                .props().expanded
        ).toBe('true');

        wrapper.unmount();
    });
});
