// @flow
import * as React from 'react'

export default (ref: any, handler: (Event) => void) => {
    React.useEffect(() => {
        const listener = (event: Event) => {
            if (!ref.current || ref.current.contains(event.target)) {
                return
            }
            handler(event)
        }

        document.addEventListener('mousedown', listener)
        return () => {
            document.removeEventListener('mousedown', listener)
        }
    }, [ref, handler])
}
