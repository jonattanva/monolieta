import PropTypes from 'prop-types'
import { memo } from 'react'

const Lock = memo((props) => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" { ...props }>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={
            props.open
                ? 'M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z'
                : 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
        } />
    </svg>
))

Lock.displayName = 'Lock'

Lock.propTypes = {
    open: PropTypes.bool
}

Lock.defaultProps = {
    open: false
}

export default Lock