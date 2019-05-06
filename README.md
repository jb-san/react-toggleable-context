# react-toggleable-context

React components to make anything to be toggleable
cam be used to make a custom accordion, or.. anything really

## [Demo](https://codesandbox.io/s/7mlqvn0370)

## Installation

`npm i react-toggleable-context`

`yarn add react-toggleable-context`

## Usage

```jsx
import ToggleGroup, { useToggleable } from 'react-toggleable-context';
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

the `ToggleGroup` component provides the context and `ToggleGroup.Section` gives you the `handleClick` and `toggled` renderprops. The section must have an unique id inorder to be toggled.

### ToggleGroup

| Prop           | Type  | Description                                                                       |
| -------------- | ----- | --------------------------------------------------------------------------------- |
| collapse       | bool  | if set, all other expanded sections will collapse when another section is pressed |
| initialToggled | array | if given a list of ids those sections will have expanded true on initial render   |

### ToggleGroup.Section

| Prop     | Type   | Description                                                                                                         | required |
| -------- | ------ | ------------------------------------------------------------------------------------------------------------------- | -------- |
| id       | string | must be unique                                                                                                      | true     |
| children | fn     | gives you 4 render props, handleClick, and toggled, the handleClick is bound to the section, handleOpen,handleClose | true     |
|          |        |                                                                                                                     |          |
