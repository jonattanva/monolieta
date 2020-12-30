import PropTypes from 'prop-types'
import { memo } from 'react'

const Sort = memo((props) => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" { ...props }>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={
            props.ascending
                ? "M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                : "M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
        } />
    </svg>
))

Sort.displayName = 'Sort'

Sort.propTypes = {
    ascending: PropTypes.bool
}

Sort.defaultProps = {
    ascending: true
}

export default Sort