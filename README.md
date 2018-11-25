# react-expandable-context

React components to make anything to be expandable

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

## TODO: document props
