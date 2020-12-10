import styled from 'styled-components'

export const Button = styled.div`
    align-items: center;
    background-color: transparent;
    border-color: hsl(219, 13%, 66%);
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
    color: hsl(219, 13%, 66%);
    cursor: pointer;
    display: flex;
    height: 24px;
    justify-content: center;
    outline: none;
    text-align: center;
    transition: color .3s ease-in-out, border-color .3s ease-in-out;
    width: 24px;

    &[disabled] {
        border-color: hsl(219, 13%, 45%);
        color: hsl(219, 13%, 45%);
        cursor: default;
    }

    &:hover:not([disabled]) {
        border-color: hsl(219, 13%, 85%);
        color: hsl(219, 13%, 85%);
    }
`

export const Icon = styled.svg`
    outline: none;
`

export const Item = styled.div`
    align-items: center;
    align-self: center;
    display: flex;
    font-size: .75rem;
    justify-content: center;
    margin: 0 4px;
`

export const Separator = styled.div`
    align-self: center;
    background-color: hsl(219, 13%, 66%);
    height: 20px;
    margin: 0 4px;
    width: 1px;
`

export default {
    Button,
    Icon,
    Item,
    Separator
}