// @flow
import * as React from 'react'
import styled from 'styled-components'
import Search from 'component/icon/search'

const Icon = styled.div`
    background: transparent;
    box-sizing: border-box;
    color: hsl(220, 13%, 65%);
    color: var(--color-font-light, hsl(220, 13%, 65%));
    display: flex;
    padding: 9px;
    position: absolute;
`

const Input = styled.input`
    background-color: hsl(220, 13%, 15%);
    background-color: var(--color-secondary, hsl(220, 13%, 15%));
    border-radius: 4px;
    border-color: transparent;
    border-style: solid;
    border-width: 1px;
    box-sizing: border-box;
    color: hsl(0, 0%, 90%);
    color: var(--color-font, hsl(0, 0%, 90%));
    font-family: Roboto, sans-serif;
    font-size: 0.875rem;
    height: 38px;
    outline: none;
    padding: 6px 12px 6px 36px;
    width: 100%;

    &:focus::-webkit-search-cancel-button {
        opacity: 1;
        pointer-events: all;
    }

    &::-webkit-search-cancel-button {
        background: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='hsl(220, 13%, 65%)'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 18L18 6M6 6l12 12' /></svg>");
        background-size: contain;
        background-position: 50% 50%;
        background-repeat: no-repeat;

        appearance: none;
        height: 14px;
        opacity: 0;
        pointer-events: none;
        width: 14px;
    }
`

type PropsType = {
    onEnter: (string) => void,
    placeholder?: string
}

const Root = (props: PropsType): React.Node => {
    const onEnter = React.useCallback(
        (event) => {
            if (props.onEnter && event.keyCode === 13) {
                props.onEnter(event.target.value)
            }
        },
        [props]
    )

    return (
        <React.Fragment>
            <Icon>
                <Search width={20} height={20} />
            </Icon>
            <Input
                type="search"
                onKeyDown={onEnter}
                placeholder={props.placeholder}
            />
        </React.Fragment>
    )
}

Root.displayName = 'Search'

Root.defaultProps = {
    placeholder: 'Search'
}

export default (React.memo<PropsType>(Root): React.AbstractComponent<
    PropsType,
    mixed
>)
