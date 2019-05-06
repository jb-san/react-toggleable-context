# react-toggleable-context

React components to make anything to be toggleable

## [Demo](https://codesandbox.io/s/m9qzrrymmx)

## Installation

`npm i react-toggleable-context`

`yarn add react-toggleable-context`

## Usage

```jsx
import ToggleGroup from 'react-toggleable-context';
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
function MyComponent(props) {
    return (
        <ToggleGroup>
            <FirstComponent />
            <SecondComponent />
        </ToggleGroup>
    );
}
```

```jsx
import ToggleGroup from 'react-toggleable-context';

function MyComponent(props) {
    return (
        <ToggleGroup>
            <ToggleGroup.Section id={'first'}>
                {({ handleClick, toggled }) => (
                    <>
                        <a id={'link'} onClick={handleClick}>
                            Header
                        </a>
                        <div id={'section-body'} expanded={toggled ? 'true' : 'false'}>
                            lorem
                        </div>)
                    </>
                )}
            </ToggleGroup.Section>
            <ToggleGroup.Section id={'second'}>
                {({ handleClick, toggled }) => (
                    <>
                        <a id={'link'} onClick={handleClick}>
                            Header
                        </a>
                        <div id={'section-body'} expanded={toggled ? 'true' : 'false'}>
                            lorem
                        </div>)
                    </>
                )}
            </ToggleGroup.Section>
        </ToggleGroup>
    );
}
```

the `Expandable` component provides the context and `Expandable.Section` gives you the `handleClick` and `expanded` renderprops. The section must have an unique id inorder to be toggled.

### Expandable

| Prop          | Type  | Description                                                                                                                                                                                        |
| ------------- | ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| collapse      | bool  | if set, all other expanded sections will collapse when another section is pressed                                                                                                                  |
| expanded      | array | if given a list of ids those sections will have expanded true on initial render                                                                                                                    |
| respondToHash | bool  | the expandable component will react to changes in window.location.hash, and add the has to the list of expanded sections, useful if you want to open a section from outside the Expandable context |

### Expandable.Section

| Prop     | Type   | Description                                                                                  | required |
| -------- | ------ | -------------------------------------------------------------------------------------------- | -------- |
| id       | string | must be unique                                                                               | true     |
| children | fn     | gives you 2 render props, handleClick, and expanded, the handleClick is bound to the section | true     |
|          |        |                                                                                              |          |
