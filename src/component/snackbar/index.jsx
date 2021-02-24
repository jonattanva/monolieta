//@flow
import * as React from 'react'
import styled from 'styled-components'
import useTimeout from 'hook/timeout'

const Snackbar = styled.div`
    align-items: center;
    bottom: 0;
    box-sizing: border-box;
    color: var(--color-font, hsl(0, 0%, 90%));
    display: flex;
    font-family: Roboto, sans-serif;
    font-size: 0.875rem;
    justify-content: flex-start;
    left: 0;
    margin: 8px;
    position: fixed;
    right: 0;
    z-index: 10;
`

const Surface = styled.div`
    align-items: center;
    background-color: var(--color-secondary-dark, hsl(220, 13%, 20%));
    border-radius: 4px;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-start;
    max-width: 672px;
    min-width: 344px;
    opacity: 1;
    transform: scale(1);
`

const Label = styled.div`
    box-sizing: border-box;
    color: var(--color-font, hsl(0, 0%, 90%));
    flex-grow: 1;
    font-family: Roboto, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    letter-spacing: 0.0178571429em;
    line-height: 1.25rem;
    margin: 0;
    padding: 14px 16px;
    text-decoration: inherit;
    text-transform: inherit;
`

const Panel = styled.div`
    align-items: center;
    box-sizing: border-box;
    display: flex;
    flex-shrink: 0;
    margin-left: 0;
    margin-right: 8px;
`

const Close = styled.div`
    background-color: transparent;
    border: none;
    box-sizing: border-box;
    color: var(--color-font, hsl(0, 0%, 90%));
    cursor: pointer;
    display: inline-block;
    height: 36px;
    line-height: 1;
    margin-left: 8px;
    margin-right: 0;
    outline: none;
    padding: 9px;
    position: relative;
    user-select: none;
    width: 36px;

    &:hover {
        background-color: var(--color-secondary-light, hsl(220, 13%, 25%));
        border-radius: 50%;
    }
`

type PropsType = {
    children: string,
    delay: number | null,
    onClose: () => void
}

const Root = (props: PropsType): React.Node => {
    useTimeout(() => {
        if (props.onClose) {
            props.onClose()
        }
    }, props.delay)

    const onClose = () => {
        if (props.onClose) {
            props.onClose()
        }
    }

    return (
        <Snackbar>
            <Surface>
                <Label>{props.children}</Label>
                <Panel>
                    <Close onClick={onClose} role="button">
                        <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </Close>
                </Panel>
            </Surface>
        </Snackbar>
    )
}

Root.displayName = 'Snackbar'

export default Root
