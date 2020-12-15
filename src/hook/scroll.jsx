import {
    useRef,
    useState,
    useEffect,
    useCallback
} from 'react'

export default () => {
    const scrollRef = useRef()
    const [ value, setValue ] = useState()

    const onScroll = useCallback((event) => {
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
    }, [ setValue ])

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
    }, [ setValue ])

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
    }, [ onGlobalScroll, onScroll, setValue ])

    return [ scrollRef, value ]
}