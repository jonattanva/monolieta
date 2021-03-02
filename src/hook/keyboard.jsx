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

export default (keys: Array<string>, handler: () => void) => {
    const [keyPressed, setKeyPressed] = React.useState([])

    const downHandler = React.useCallback(
        (event) => {
            const { key, repeat, target } = event

            if (repeat || isWhiteList(target)) {
                return
            }

            setKeyPressed((previous) => {
                if (keys.includes(key) && !previous.includes(key)) {
                    event.preventDefault()
                    event.stopPropagation()

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
                    if (specialKeys.includes(value)) {
                        return false
                    }
                    return value !== key
                })
            })
        },
        [keys, setKeyPressed]
    )

    React.useEffect(() => {
        window.addEventListener('keyup', upHandler)
        window.addEventListener('keydown', downHandler)

        return () => {
            window.removeEventListener('keyup', upHandler)
            window.removeEventListener('keydown', downHandler)
        }
    }, [downHandler, upHandler])

    React.useEffect(() => {
        const isKeysPressed = areKeysPressed(keys, keyPressed)
        if (isKeysPressed) {
            handler()
            setKeyPressed([])
        }
    }, [keys, keyPressed, handler])
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
