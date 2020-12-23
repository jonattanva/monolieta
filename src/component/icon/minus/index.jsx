import { memo } from 'react'

const Minus = memo((props) => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" { ...props }>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 12H6" />
    </svg>
))

Minus.displayName = 'Minus'

export default Minus