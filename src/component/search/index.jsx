import PropTypes from 'prop-types'
import styled from 'styled-components'

import {
    memo,
    useRef,
    useCallback
} from 'react'

const Icon = styled.div`
    background: transparent;
    box-sizing: border-box;
    color: hsl(219, 13%, 66%);
    display: flex;
    padding: 9px;
    position: absolute;
`

const Input = styled.input`
    background-color: hsl(220,13%,15%);
    border-radius: 4px;
    border-color: transparent;
    border-style: solid;
    border-width: 1px;
    box-sizing: border-box;
    color: hsl(0, 0%, 90%);
    font-family: Roboto, sans-serif;
    font-size: .875rem;
    height: 38px;
    outline: none;
    padding: 6px 12px 6px 36px;
    width: 100%;

    &:focus::-webkit-search-cancel-button {
        opacity: 1;
        pointer-events: all;
    }

    &::-webkit-search-cancel-button {
        background: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='hsl(219, 13%, 66%)'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 18L18 6M6 6l12 12' /></svg>");
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

const Search = memo((props) => {
    const beforeRef = useRef(null)

    const onChange = useCallback((event) => {
        if (event.target.value === '') {
            beforeRef.current = null
        }

        if (props.onChange) {
            props.onChange(event)
        }
    }, [ props ])

    const onEnter = useCallback((event) => {
        if (props.onEnter && event.keyCode === 13) {
            const before = beforeRef.current
            const value = event.target.value.trim()

            if (value === '' && before === null) {
                return
            }

            if (value !== before) {
                props.onEnter(value)
                beforeRef.current = value
            }
        }
    }, [ props ])

    return (
        <div>
            <Icon>
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </Icon>
            <Input type="search"
                value={ props.value }
                onKeyDown={ onEnter }
                onChange={ onChange }
                placeholder={ props.placeholder } />
        </div>
    )
})

Search.displayName = "Search"

Search.propTypes = {
    /** It is called every time there is a change */
    onChange: PropTypes.func,

    /** It is called every time the enter key is pressed */
    onEnter: PropTypes.func,

    /** Sample value */
    placeholder: PropTypes.string,

    /** Element value */
    value: PropTypes.string
}

Search.defaultProps = {
    onChange: null,
    onEnter: null,
    placeholder: "Search"
}

export default Search