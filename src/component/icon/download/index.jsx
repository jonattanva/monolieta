import { memo } from 'react'

const Download = memo((props) => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" { ...props }>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
))

Download.displayName = 'Download'

export default Download