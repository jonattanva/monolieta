// @flow
import * as Monolieta from 'Monolieta'
import * as React from 'react'
import styled from 'styled-components'
import Select from 'component/select'
import Lock from 'component/icon/lock'
import Label from 'component/icon/label'
import Trash from 'component/icon/trash'
import Visible from 'component/icon/visible'

const Body = styled.div`
    align-items: center;
    background-color: hsl(220, 13%, 15%);
    background-color: var(--color-secondary, hsl(220, 13%, 15%));
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 8px;
    width: 100%;
`

const Color = styled.div`
    align-items: center;
    background-image: repeating-linear-gradient(
        -45deg,
        transparent,
        transparent 2px,
        var(--group-color, #6f7a90) 2px,
        var(--group-color, #6f7a90) 4px
    );
    border-radius: 4px;
    color: hsl(0, 0%, 90%);
    color: var(--color-font, hsl(0, 0%, 90%));
    cursor: pointer;
    display: flex;
    height: 32px;
    justify-content: center;
    min-width: 32px;
    outline: none;
    width: 32px;
`

const Action = styled.div`
    align-items: center;
    border-radius: 4px;
    box-sizing: border-box;
    color: hsl(0, 0%, 90%);
    color: var(--color-font, hsl(0, 0%, 90%));
    cursor: pointer;
    display: flex;
    height: 32px;
    justify-content: center;
    padding: 6px;
    use-select: none;
    width: 32px;

    &:hover {
        background-color: hsl(220, 13%, 25%);
        background-color: var(--color-secondary-light, hsl(220, 13%, 25%));
    }
`

const Name = styled.div`
    box-sizing: border-box;
    margin: 0 8px;
    width: 100%;
`

type PropsType = {
    classes: Array<Monolieta.Label>,
    color?: string,
    id: string,
    onLockClass?: (string, boolean) => void,
    onSelectedClass?: (string, string) => void,
    onVisibleClass?: (string, boolean) => void
}

const Root = (props: PropsType): React.Node => {
    const { color = '#6f7a90' } = props

    const [isLocked, setLocked] = React.useState(false)
    const [isVisible, setVisible] = React.useState(true)

    const onVisible = React.useCallback(() => {
        setVisible((previous) => {
            const next = !previous
            if (props.onVisibleClass) {
                props.onVisibleClass(props.id, next)
            }
        })
    }, [props])

    const onLock = React.useCallback(() => {
        setLocked((previous) => {
            const next = !previous
            if (props.onLockClass) {
                props.onLockClass(props.id, next)
            }
        })
    }, [props])

    const onSelectedClass = React.useCallback(
        ({ value }) => {
            if (props.onSelectedClass) {
                props.onSelectedClass(props.id, value)
            }
        },
        [props]
    )

    const classes = React.useMemo(
        () =>
            props.classes.map((value) => ({
                label: value.name,
                value: value.id
            })),
        [props.classes]
    )

    return (
        <Body>
            <Color
                role="button"
                onClick={onVisible}
                style={{ '--group-color': color }}>
                <Visible width={24} height={20} open={isVisible} />
            </Color>
            <Name>
                <Select options={classes} onChange={onSelectedClass} />
            </Name>
            <Action role="button">
                <Label />
            </Action>
            <Action onClick={onLock} role="button">
                <Lock locked={isLocked} />
            </Action>
            <Action role="button">
                <Trash />
            </Action>
        </Body>
    )
}

Root.displayName = 'Group'

export default (React.memo<PropsType>(Root): React.AbstractComponent<
    PropsType,
    mixed
>)
