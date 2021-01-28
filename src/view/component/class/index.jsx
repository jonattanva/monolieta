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
    background-color: var(--color-primary-dark, hsl(220, 13%, 15%));
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

const Item = styled.div`
    background-color: hsl(220, 13%, 20%);
    background-color: var(--color-highlight, hsl(220, 13%, 20%));
    border-radius: 50%;
    box-sizing: border-box;
    color: hsl(219, 13%, 66%);
    color: var(--color-font-variant, hsl(219, 13%, 66%));
    cursor: default;
    height: 40px;
    margin: 0 8px;
    min-width: 40px;
    padding: 8px;
    text-align: center;
    user-select: none;
    width: 40px;
`

type PropsType = {
    id: string,
    name: string,
    color: string,
    checked: boolean,
    instances?: number,
    info?: boolean,
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
            <Checkbox checked={props.checked} onChange={onSelectedClass} />
            <Picker style={{ background: props.color }}>
                <React.Suspense fallback={<Empty />}>
                    <Color color={props.color} onSavedColor={onSavedColor} />
                </React.Suspense>
            </Picker>
            <Text
                placeholder="Enter class name"
                onChange={onSelectedName}
                value={props.name}
            />
            {props.info && <Item>{props.instances}</Item>}
        </Body>
    )
}

Root.displayName = 'Class'

Root.defaultProps = {
    info: false,
    instances: 0
}

export default (React.memo<PropsType>(Root): React.AbstractComponent<
    PropsType,
    mixed
>)
