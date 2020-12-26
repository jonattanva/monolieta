import PropTypes from 'prop-types'
import { memo } from 'react'

const Show = memo((props) => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"  { ...props }>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={
            props.open ? "M19 9l-7 7-7-7" : "M9 5l7 7-7 7"
        } />
    </svg>
))

Show.displayName = 'Show'

Show.propTypes = {
    open: PropTypes.bool
}

Show.defaultProps = {
    open: false
}

export default Show