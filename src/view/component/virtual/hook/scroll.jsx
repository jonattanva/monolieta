import { useState, useEffect, useCallback } from 'react'

export default (scrollRef) => {
    const [value, setValue] = useState()

    const onScroll = useCallback(
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

    const onGlobalScroll = useCallback(() => {
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

    useEffect(() => {
        const scroll = scrollRef.current
        setValue({
            scrollTop: scroll.scrollTop,
            size: {
                width: scroll.offsetWidth,
                height: scroll.offsetHeight
            }
        })

        window.addEventListener('resize', onGlobalScroll)
        scroll.addEventListener('scroll', onScroll)
        return () => {
            window.removeEventListener('resize', onGlobalScroll)
            scroll.removeEventListener('scroll', onScroll)
        }
    }, [scrollRef, onGlobalScroll, onScroll, setValue])

    return value
}
