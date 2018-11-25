# react-expandable-context

React components to make anything to be expandable

## [Demo](https://codesandbox.io/s/m9qzrrymmx)

## Installation

`npm i react-expandable-context`

`yarn add react-expandable-context`

## Usage

```jsx
import Expandable from 'react-expandable-context';

function MyComponent(props) {
    return (
        <Expandable>
            <Expandable.Section id={'first'}>
                {({ handleClick, expanded }) => (
                    <>
                        <a id={'link'} onClick={handleClick}>
                            Header
                        </a>
                        <div id={'section-body'} expanded={expanded ? 'true' : 'false'}>
                            lorem
                        </div>)
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
                        </div>)
                    </>
                )}
            </Expandable.Section>
        </Expandable>
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
