// @flow
import * as React from 'react'

const areKeysPressed = (
    keys: Array<string> = [],
    keysPressed: Array<string> = []
): boolean => {
    return keys.every((value) => {
        return keysPressed.includes(value)
    })
}

const isWhiteList = (target): boolean => {
    return target instanceof HTMLInputElement
}

export default (keys: Array<string>): boolean => {
    const [keyPressed, setKeyPressed] = React.useState([])

    const downHandler = React.useCallback(
        (event) => {
            const { key, repeat, target } = event
            if (repeat || isWhiteList(target)) {
                return
            }

            setKeyPressed((previous) => {
                if (keys.includes(key) && !previous.includes(key)) {
                    event.stopPropagation()
                    event.preventDefault()

                    return [...previous, key]
                }
                return previous
            })
        },
        [keys, setKeyPressed]
    )

    const upHandler = React.useCallback(
        (event) => {
            const { key, target } = event

            if (!keys.includes(key) || isWhiteList(target)) {
                return
            }

            setKeyPressed((previous) => {
                event.stopPropagation()
                event.preventDefault()

                return previous.filter((value) => {
                    if (specialKeys.includes(key)) {
                        return false
                    }
                    return value !== key
                })
            })
        },
        [keys, setKeyPressed]
    )

    React.useEffect(() => {
        window.addEventListener('keydown', downHandler)
        window.addEventListener('keyup', upHandler)

        return () => {
            window.removeEventListener('keydown', downHandler)
            window.removeEventListener('keyup', upHandler)
        }
    }, [downHandler, upHandler])

    const isKeysPressed = areKeysPressed(keys, keyPressed)
    if (isKeysPressed) {
        setKeyPressed([])
    }
    return isKeysPressed
}

const specialKeys = [
    'Alt',
    'Backspace',
    'CapsLock',
    'Control',
    'Escape',
    'Meta',
    'Shift',
    'Tab'
]
