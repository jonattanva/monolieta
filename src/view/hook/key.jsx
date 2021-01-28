// @flow
import * as React from 'react'

export const areKeysPressed = (
    keys: Array<string> = [],
    keysPressed: Array<string> = []
): boolean => keys.every((value) => keysPressed.includes(value))

export default (keys: Array<string>): Array<string> => {
    const [keyPressed, setKeyPressed] = React.useState([])

    const downHandler = React.useCallback(
        ({ key, repeat }) => {
            if (repeat) {
                return
            }

            setKeyPressed((previous) => {
                if (keys.includes(key) && !previous.includes(key)) {
                    return [...previous, key]
                }
                return previous
            })
        },
        [keys, setKeyPressed]
    )

    const upHandler = React.useCallback(
        ({ key }) => {
            if (!keys.includes(key)) {
                return
            }

            setKeyPressed((previous) => {
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

    return keyPressed
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
