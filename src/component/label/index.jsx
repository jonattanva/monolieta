// @flow
import * as React from 'react'
import styled from 'styled-components'
import Text from 'component/text'
import Empty from 'component/empty'
import Checkbox from 'component/checkbox'

const Color = React.lazy(() => {
    return import('component/color')
})

const Body = styled.div`
    align-items: center;
    background-color: var(--color-secondary, hsl(220, 13%, 15%));
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    height: 50px;
    justify-content: center;
    padding: 8px;
    width: 100%;
`

const Picker = styled.div`
    border-radius: 4px;
    cursor: pointer;
    height: 38px;
    margin: 0 8px;
    min-width: 38px;
    width: 38px;
`

type PropsType = {
    autoPosition?: boolean,
    autofocus?: boolean,
    color: string,
    id: string,
    name: string,
    onSavedColor: (string, string) => void,
    onSelectedClass: (string, boolean) => void,
    onSelectedName: (string, string) => void,
    selected?: boolean
}

const Root = (props: PropsType): React.Node => {
    const onSelectedClass = (checked: boolean) => {
        if (props.onSelectedClass) {
            props.onSelectedClass(props.id, checked)
        }
    }

    const onSavedColor = (color: string) => {
        if (props.onSavedColor) {
            props.onSavedColor(props.id, color)
        }
    }

    const onSelectedName = (value: string) => {
        if (props.onSelectedName) {
            props.onSelectedName(props.id, value)
        }
    }

    return (
        <Body>
            <Checkbox
                tabIndex={-1}
                checked={props.selected}
                onChange={onSelectedClass}
            />
            <Picker style={{ background: props.color }}>
                <React.Suspense fallback={<Empty />}>
                    <Color
                        color={props.color}
                        onSavedColor={onSavedColor}
                        autoPosition={props.autoPosition}
                    />
                </React.Suspense>
            </Picker>
            <Text
                placeholder="Enter class name"
                onChange={onSelectedName}
                value={props.name}
                autofocus={props.autofocus}
            />
        </Body>
    )
}

Root.displayName = 'Label'

export default Root
