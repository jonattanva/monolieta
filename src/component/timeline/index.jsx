// @flow
import * as React from 'react'
import styled from 'styled-components'

const Body = styled.div`
    margin: 30px auto;
    position: relative;
    width: 50%;

    &::before {
        background-color: hsl(0, 0%, 90%);
        background-color: var(--color-font, hsl(0, 0%, 90%));
        content: '';
        height: 90%;
        position: absolute;
        top: 0;
        width: 3px;
    }
`

const Item = styled.div`
    cursor: pointer;
    margin-bottom: 35px;
    position: relative;
    user-select: none;

    &::before {
        background-color: #6200ee;
        background-color: var(--color-primary, #6200ee);
        border-radius: 50%;
        border: 3px solid #fff;
        content: '';
        height: 24px;
        margin-left: -13.5px;
        position: absolute;
        top: 0;
        width: 24px;
    }

    &::after {
        background-color: hsl(0, 0%, 90%);
        background-color: var(--color-font, hsl(0, 0%, 90%));
        border-radius: 50%;
        content: '';
        display: var(--timeline-show, none);
        height: 12px;
        left: -4.5px;
        position: absolute;
        top: 9px;
        width: 12px;
    }
`

const Content = styled.div`
    font-family: Roboto, sans-serif;
    font-size: 0.875rem;
    margin-left: 35px;
`

const Title = styled(Content)`
    background-color: hsl(0, 0%, 90%);
    background-color: var(--color-font, hsl(0, 0%, 90%));
    font-family: inherit;
    font-weight: 600;
`

const Description = styled(Content)`
    color: hsl(220, 13%, 65%);
    color: var(--color-font-light, hsl(220, 13%, 65%));
    font-family: inherit;
    font-weight: 400;
`

type PropsType = {
    current: number,
    dataSource: Array<{
        title: string,
        description: string,
        order: number
    }>,
    onClick: (number) => void
}

const Root = (props: PropsType): React.Node => {
    const { dataSource = [], current = 0 } = props

    const elements = React.useMemo(() => {
        return dataSource.sort((before, after) => before.order - after.order)
    }, [dataSource])

    const onClick = React.useCallback(
        (event) => {
            if (props.onClick) {
                const index = event.currentTarget.dataset.index
                if (index) {
                    props.onClick(Number(index))
                }
            }
        },
        [props]
    )

    const visibleChildren = React.useMemo(() => {
        return elements.map((value, index) => {
            const isShow = index <= current ? 'block' : 'none'
            return (
                <Item
                    key={index}
                    onClick={onClick}
                    data-index={index}
                    style={{ '--timeline-show': isShow }}>
                    <Title>{value.title}</Title>
                    <Description>{value.description}</Description>
                </Item>
            )
        })
    }, [elements, onClick, current])

    return <Body>{visibleChildren}</Body>
}

Root.displayName = 'Timeline'

export default (React.memo<PropsType>(Root): React.AbstractComponent<
    PropsType,
    mixed
>)
