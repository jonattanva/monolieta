//@flow
import * as React from 'react'

export default (callback: () => void, delay: ?number) => {
    const ref = React.useRef<(() => void) | null>(null)

    React.useEffect(() => {
        ref.current = callback
    }, [callback])

    React.useEffect(() => {
        const run = () => {
            if (ref.current) {
                ref.current()
            }
        }

        if (delay !== null) {
            const id = setTimeout(run, delay)
            return () => {
                clearTimeout(id)
            }
        }
    }, [delay])
}
