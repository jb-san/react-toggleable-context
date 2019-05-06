import React from 'react';
import { shallow, mount } from 'enzyme';
import Expandable, { useExpandable } from './Expandable';

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
                            <div id={'section-body'} data-expanded={expanded ? 'true' : 'false'}>
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
                            <div id={'section-body'} data-expanded={expanded ? 'true' : 'false'}>
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
                .prop('data-expanded')
        ).toBe('false');
        expect(
            wrapper
                .find('#second')
                .find('#section-body')
                .prop('data-expanded')
        ).toBe('false');

        wrapper
            .find('#first')
            .find('#link')
            .simulate('click');
        expect(
            wrapper
                .find('#first')
                .find('#section-body')
                .prop('data-expanded')
        ).toBe('true');
        expect(
            wrapper
                .find('#second')
                .find('#section-body')
                .prop('data-expanded')
        ).toBe('false');

        wrapper
            .find('#second')
            .find('#link')
            .simulate('click');

        expect(
            wrapper
                .find('#first')
                .find('#section-body')
                .prop('data-expanded')
        ).toBe('true');
        expect(
            wrapper
                .find('#second')
                .find('#section-body')
                .prop('data-expanded')
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
                            <div id={'section-body'} data-expanded={expanded ? 'true' : 'false'}>
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
                            <div id={'section-body'} data-expanded={expanded ? 'true' : 'false'}>
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
                            <div id={'section-body'} data-expanded={expanded ? 'true' : 'false'}>
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
                .prop('data-expanded')
        ).toBe('true');
        expect(
            wrapper
                .find('#second')
                .find('#section-body')
                .prop('data-expanded')
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
                .prop('data-expanded')
        ).toBe('false');
        expect(
            wrapper
                .find('#second')
                .find('#section-body')
                .prop('data-expanded')
        ).toBe('true');
        expect(
            wrapper
                .find('#third')
                .find('#section-body')
                .prop('data-expanded')
        ).toBe('false');
        wrapper.unmount();
    });
    test('should start expanded if expanded prop is given to Expandable component', () => {
        const wrapper = mount(
            <Expandable initialExpanded={['first', 'second']}>
                <Expandable.Section id={'first'}>
                    {({ handleClick, expanded }) => (
                        <>
                            <a id={'link'} onClick={handleClick}>
                                Header
                            </a>
                            <div id={'section-body'} data-expanded={expanded ? 'true' : 'false'}>
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
                            <div id={'section-body'} data-expanded={expanded ? 'true' : 'false'}>
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
                            <div id={'section-body'} data-expanded={expanded ? 'true' : 'false'}>
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
                .prop('data-expanded')
        ).toBe('true');
        expect(
            wrapper
                .find('#second')
                .find('#section-body')
                .prop('data-expanded')
        ).toBe('true');
        expect(
            wrapper
                .find('#third')
                .find('#section-body')
                .prop('data-expanded')
        ).toBe('false');

        wrapper
            .find('#third')
            .find('#link')
            .simulate('click');
        expect(
            wrapper
                .find('#third')
                .find('#section-body')
                .prop('data-expanded')
        ).toBe('true');
        wrapper.unmount();
    });
    test('should start expanded if expanded prop is given to Expandable component but collapse if collapse prop is given', () => {
        const wrapper = mount(
            <Expandable initialExpanded={['first', 'second']} collapse>
                <Expandable.Section id={'first'}>
                    {({ handleClick, expanded }) => (
                        <>
                            <a id={'link'} onClick={handleClick}>
                                Header
                            </a>
                            <div id={'section-body'} data-expanded={expanded ? 'true' : 'false'}>
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
                            <div id={'section-body'} data-expanded={expanded ? 'true' : 'false'}>
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
                            <div id={'section-body'} data-expanded={expanded ? 'true' : 'false'}>
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
                .prop('data-expanded')
        ).toBe('true');
        expect(
            wrapper
                .find('#second')
                .find('#section-body')
                .prop('data-expanded')
        ).toBe('true');
        expect(
            wrapper
                .find('#third')
                .find('#section-body')
                .prop('data-expanded')
        ).toBe('false');
        wrapper
            .find('#third')
            .find('#link')
            .simulate('click');
        expect(
            wrapper
                .find('#third')
                .find('#section-body')
                .prop('data-expanded')
        ).toBe('true');
        expect(
            wrapper
                .find('#first')
                .find('#section-body')
                .prop('data-expanded')
        ).toBe('false');
        expect(
            wrapper
                .find('#second')
                .find('#section-body')
                .prop('data-expanded')
        ).toBe('false');
        wrapper.unmount();
    });
    test('should be set initial expanded to window.location.hash ', () => {
        window.location.hash = 'second';

        const wrapper = mount(
            <Expandable>
                <Expandable.Section id={'first'}>
                    {({ handleClick, expanded }) => (
                        <>
                            <a id={'link'} onClick={handleClick}>
                                Header
                            </a>
                            <div id={'section-body'} data-expanded={expanded ? 'true' : 'false'}>
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
                            <div id={'section-body'} data-expanded={expanded ? 'true' : 'false'}>
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
                .prop('data-expanded')
        ).toBe('false');
        wrapper
            .find('#first')
            .find('#link')
            .simulate('click');
        expect(
            wrapper
                .find('#first')
                .find('#section-body')
                .prop('data-expanded')
        ).toBe('true');

        wrapper.unmount();
    });
    test('should work with the hook ', () => {
        function FirstComponent() {
            const { expanded, handleClick } = useExpandable('first');
            return (
                <div id={'first'}>
                    <a id={'link'} onClick={handleClick}>
                        Header
                    </a>
                    <div id={'section-body'} data-expanded={expanded ? 'true' : 'false'}>
                        lorem
                    </div>
                </div>
            );
        }
        function SecondComponent() {
            const { expanded, handleClick } = useExpandable('second');
            return (
                <div id={'second'}>
                    <a id={'link'} onClick={handleClick}>
                        Header
                    </a>
                    <div id={'section-body'} data-expanded={expanded ? 'true' : 'false'}>
                        lorem
                    </div>
                </div>
            );
        }
        const wrapper = mount(
            <Expandable>
                <FirstComponent />
                <SecondComponent />
            </Expandable>
        );
        expect(
            wrapper
                .find('#first')
                .find('#section-body')
                .prop('data-expanded')
        ).toBe('false');
        expect(
            wrapper
                .find('#second')
                .find('#section-body')
                .prop('data-expanded')
        ).toBe('true');

        wrapper.unmount();
    });
});
