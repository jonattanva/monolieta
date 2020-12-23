import { memo } from 'react'

const Last = memo((props) => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" { ...props }>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
    </svg>
))

Last.displayName = 'Last'

export default Last