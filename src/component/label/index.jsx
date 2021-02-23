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
    background-color: hsl(220, 13%, 15%);
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
    id: string,
    color: string,
    name: string,
    selected?: boolean,
    autofocus?: boolean,
    autoPosition?: boolean,
    onSavedColor: (string, string) => void,
    onSelectedClass: (string, boolean) => void,
    onSelectedName: (string, string) => void
}

const Root = (props: PropsType): React.Node => {
    const onSelectedClass = React.useCallback(
        (checked: boolean) => {
            if (props.onSelectedClass) {
                props.onSelectedClass(props.id, checked)
            }
        },
        [props]
    )

    const onSavedColor = React.useCallback(
        (color: string) => {
            if (props.onSavedColor) {
                props.onSavedColor(props.id, color)
            }
        },
        [props]
    )

    const onSelectedName = React.useCallback(
        (value: string) => {
            if (props.onSelectedName) {
                props.onSelectedName(props.id, value)
            }
        },
        [props]
    )

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

export default (React.memo<PropsType>(Root): React.AbstractComponent<
    PropsType,
    mixed
>)
