import React from 'react';
import { shallow, mount } from 'enzyme';
import Toggleable, { useToggleable } from './Toggleable';

describe('Toggleable Component', () => {
    test('should pass toggled state for section and update it when handleClick is called', () => {
        const wrapper = mount(
            <Toggleable>
                <Toggleable.Section id={'first'}>
                    {({ handleClick, toggled }) => (
                        <>
                            <a id={'link'} onClick={handleClick}>
                                Header
                            </a>
                            <div id={'section-body'} data-toggled={toggled ? 'true' : 'false'}>
                                lorem
                            </div>
                            )
                        </>
                    )}
                </Toggleable.Section>
                <Toggleable.Section id={'second'}>
                    {({ handleClick, toggled }) => (
                        <>
                            <a id={'link'} onClick={handleClick}>
                                Header
                            </a>
                            <div id={'section-body'} data-toggled={toggled ? 'true' : 'false'}>
                                lorem
                            </div>
                            )
                        </>
                    )}
                </Toggleable.Section>
            </Toggleable>
        );
        expect(
            wrapper
                .find('#first')
                .find('#section-body')
                .prop('data-toggled')
        ).toBe('false');
        expect(
            wrapper
                .find('#second')
                .find('#section-body')
                .prop('data-toggled')
        ).toBe('false');

        wrapper
            .find('#first')
            .find('#link')
            .simulate('click');
        expect(
            wrapper
                .find('#first')
                .find('#section-body')
                .prop('data-toggled')
        ).toBe('true');
        expect(
            wrapper
                .find('#second')
                .find('#section-body')
                .prop('data-toggled')
        ).toBe('false');

        wrapper
            .find('#second')
            .find('#link')
            .simulate('click');

        expect(
            wrapper
                .find('#first')
                .find('#section-body')
                .prop('data-toggled')
        ).toBe('true');
        expect(
            wrapper
                .find('#second')
                .find('#section-body')
                .prop('data-toggled')
        ).toBe('true');
        wrapper.unmount();
    });
    test('should collapse other sections if collapse prop is given to Toggleable', () => {
        const wrapper = mount(
            <Toggleable collapse>
                <Toggleable.Section id={'first'}>
                    {({ handleClick, toggled }) => (
                        <>
                            <a id={'link'} onClick={handleClick}>
                                Header
                            </a>
                            <div id={'section-body'} data-toggled={toggled ? 'true' : 'false'}>
                                lorem
                            </div>
                            )
                        </>
                    )}
                </Toggleable.Section>
                <Toggleable.Section id={'second'}>
                    {({ handleClick, toggled }) => (
                        <>
                            <a id={'link'} onClick={handleClick}>
                                Header
                            </a>
                            <div id={'section-body'} data-toggled={toggled ? 'true' : 'false'}>
                                lorem
                            </div>
                            )
                        </>
                    )}
                </Toggleable.Section>
                <Toggleable.Section id={'third'}>
                    {({ handleClick, toggled }) => (
                        <>
                            <a id={'link'} onClick={handleClick}>
                                Header
                            </a>
                            <div id={'section-body'} data-toggled={toggled ? 'true' : 'false'}>
                                lorem
                            </div>
                            )
                        </>
                    )}
                </Toggleable.Section>
            </Toggleable>
        );
        wrapper
            .find('#first')
            .find('#link')
            .simulate('click');
        expect(
            wrapper
                .find('#first')
                .find('#section-body')
                .prop('data-toggled')
        ).toBe('true');
        expect(
            wrapper
                .find('#second')
                .find('#section-body')
                .prop('data-toggled')
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
                .prop('data-toggled')
        ).toBe('false');
        expect(
            wrapper
                .find('#second')
                .find('#section-body')
                .prop('data-toggled')
        ).toBe('true');
        expect(
            wrapper
                .find('#third')
                .find('#section-body')
                .prop('data-toggled')
        ).toBe('false');
        wrapper.unmount();
    });
    test('should start toggled if toggled prop is given to Toggleable component', () => {
        const wrapper = mount(
            <Toggleable initialExpanded={['first', 'second']}>
                <Toggleable.Section id={'first'}>
                    {({ handleClick, toggled }) => (
                        <>
                            <a id={'link'} onClick={handleClick}>
                                Header
                            </a>
                            <div id={'section-body'} data-toggled={toggled ? 'true' : 'false'}>
                                lorem
                            </div>
                            )
                        </>
                    )}
                </Toggleable.Section>
                <Toggleable.Section id={'second'}>
                    {({ handleClick, toggled }) => (
                        <>
                            <a id={'link'} onClick={handleClick}>
                                Header
                            </a>
                            <div id={'section-body'} data-toggled={toggled ? 'true' : 'false'}>
                                lorem
                            </div>
                            )
                        </>
                    )}
                </Toggleable.Section>
                <Toggleable.Section id={'third'}>
                    {({ handleClick, toggled }) => (
                        <>
                            <a id={'link'} onClick={handleClick}>
                                Header
                            </a>
                            <div id={'section-body'} data-toggled={toggled ? 'true' : 'false'}>
                                lorem
                            </div>
                            )
                        </>
                    )}
                </Toggleable.Section>
            </Toggleable>
        );

        expect(
            wrapper
                .find('#first')
                .find('#section-body')
                .prop('data-toggled')
        ).toBe('true');
        expect(
            wrapper
                .find('#second')
                .find('#section-body')
                .prop('data-toggled')
        ).toBe('true');
        expect(
            wrapper
                .find('#third')
                .find('#section-body')
                .prop('data-toggled')
        ).toBe('false');

        wrapper
            .find('#third')
            .find('#link')
            .simulate('click');
        expect(
            wrapper
                .find('#third')
                .find('#section-body')
                .prop('data-toggled')
        ).toBe('true');
        wrapper.unmount();
    });
    test('should start toggled if toggled prop is given to Toggleable component but collapse if collapse prop is given', () => {
        const wrapper = mount(
            <Toggleable initialExpanded={['first', 'second']} collapse>
                <Toggleable.Section id={'first'}>
                    {({ handleClick, toggled }) => (
                        <>
                            <a id={'link'} onClick={handleClick}>
                                Header
                            </a>
                            <div id={'section-body'} data-toggled={toggled ? 'true' : 'false'}>
                                lorem
                            </div>
                            )
                        </>
                    )}
                </Toggleable.Section>
                <Toggleable.Section id={'second'}>
                    {({ handleClick, toggled }) => (
                        <>
                            <a id={'link'} onClick={handleClick}>
                                Header
                            </a>
                            <div id={'section-body'} data-toggled={toggled ? 'true' : 'false'}>
                                lorem
                            </div>
                            )
                        </>
                    )}
                </Toggleable.Section>
                <Toggleable.Section id={'third'}>
                    {({ handleClick, toggled }) => (
                        <>
                            <a id={'link'} onClick={handleClick}>
                                Header
                            </a>
                            <div id={'section-body'} data-toggled={toggled ? 'true' : 'false'}>
                                lorem
                            </div>
                            )
                        </>
                    )}
                </Toggleable.Section>
            </Toggleable>
        );

        // initial toggled state for all sections should be undefined
        expect(
            wrapper
                .find('#first')
                .find('#section-body')
                .prop('data-toggled')
        ).toBe('true');
        expect(
            wrapper
                .find('#second')
                .find('#section-body')
                .prop('data-toggled')
        ).toBe('true');
        expect(
            wrapper
                .find('#third')
                .find('#section-body')
                .prop('data-toggled')
        ).toBe('false');
        wrapper
            .find('#third')
            .find('#link')
            .simulate('click');
        expect(
            wrapper
                .find('#third')
                .find('#section-body')
                .prop('data-toggled')
        ).toBe('true');
        expect(
            wrapper
                .find('#first')
                .find('#section-body')
                .prop('data-toggled')
        ).toBe('false');
        expect(
            wrapper
                .find('#second')
                .find('#section-body')
                .prop('data-toggled')
        ).toBe('false');
        wrapper.unmount();
    });
    test('should be set initial toggled to window.location.hash ', () => {
        window.location.hash = 'second';

        const wrapper = mount(
            <Toggleable>
                <Toggleable.Section id={'first'}>
                    {({ handleClick, toggled }) => (
                        <>
                            <a id={'link'} onClick={handleClick}>
                                Header
                            </a>
                            <div id={'section-body'} data-toggled={toggled ? 'true' : 'false'}>
                                lorem
                            </div>
                            )
                        </>
                    )}
                </Toggleable.Section>
                <Toggleable.Section id={'second'}>
                    {({ handleClick, toggled }) => (
                        <>
                            <a id={'link'} onClick={handleClick}>
                                Header
                            </a>
                            <div id={'section-body'} data-toggled={toggled ? 'true' : 'false'}>
                                lorem
                            </div>
                            )
                        </>
                    )}
                </Toggleable.Section>
            </Toggleable>
        );
        expect(
            wrapper
                .find('#first')
                .find('#section-body')
                .prop('data-toggled')
        ).toBe('false');
        wrapper
            .find('#first')
            .find('#link')
            .simulate('click');
        expect(
            wrapper
                .find('#first')
                .find('#section-body')
                .prop('data-toggled')
        ).toBe('true');

        wrapper.unmount();
    });
    test('should work with the hook ', () => {
        function FirstComponent() {
            const { toggled, handleClick } = useToggleable('first');
            return (
                <div id={'first'}>
                    <a id={'link'} onClick={handleClick}>
                        Header
                    </a>
                    <div id={'section-body'} data-toggled={toggled ? 'true' : 'false'}>
                        lorem
                    </div>
                </div>
            );
        }
        function SecondComponent() {
            const { toggled, handleClick } = useToggleable('second');
            return (
                <div id={'second'}>
                    <a id={'link'} onClick={handleClick}>
                        Header
                    </a>
                    <div id={'section-body'} data-toggled={toggled ? 'true' : 'false'}>
                        lorem
                    </div>
                </div>
            );
        }
        const wrapper = mount(
            <Toggleable>
                <FirstComponent />
                <SecondComponent />
            </Toggleable>
        );
        expect(
            wrapper
                .find('#first')
                .find('#section-body')
                .prop('data-toggled')
        ).toBe('false');
        wrapper
            .find('#first')
            .find('#link')
            .simulate('click');
        expect(
            wrapper
                .find('#first')
                .find('#section-body')
                .prop('data-toggled')
        ).toBe('true');

        wrapper.unmount();
    });
});
