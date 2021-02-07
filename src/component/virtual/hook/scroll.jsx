// @flow
import * as React from 'react'

export default (
    scrollRef: any
): null | { scrollTop: number, size: { width: number, height: number } } => {
    const [value, setValue] = React.useState(null)

    const onScroll = React.useCallback(
        (event) => {
            requestAnimationFrame(() => {
                const scroll = event.target
                setValue({
                    scrollTop: scroll.scrollTop,
                    size: {
                        width: scroll.offsetWidth,
                        height: scroll.offsetHeight
                    }
                })
            })
        },
        [setValue]
    )

    const onGlobalScroll = React.useCallback(() => {
        requestAnimationFrame(() => {
            const scroll = scrollRef.current
            setValue({
                scrollTop: scroll.scrollTop,
                size: {
                    width: scroll.offsetWidth,
                    height: scroll.offsetHeight
                }
            })
        })
    }, [scrollRef, setValue])

    React.useEffect(() => {
        const scroll = scrollRef.current
        setValue({
            scrollTop: scroll.scrollTop,
            size: {
                width: scroll.offsetWidth,
                height: scroll.offsetHeight
            }
        })

        scroll.addEventListener('scroll', onScroll)
        window.addEventListener('resize', onGlobalScroll)

        return () => {
            scroll.removeEventListener('scroll', onScroll)
            window.removeEventListener('resize', onGlobalScroll)
        }
    }, [scrollRef, onGlobalScroll, onScroll, setValue])

    return value
}
