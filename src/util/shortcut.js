//@flow
import { isMac } from 'util/platform'

const control = isMac ? '⌘' : 'Ctrl'

export default {
    open: {
        key: ['Meta', 'o'],
        title: `${control}O`
    },

    escape: {
        key: ['Escape'],
        title: 'Esc'
    }
}
