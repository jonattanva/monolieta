//@flow
import Empty from '..'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

describe('<Empty />', function () {
    it('general', function () {
        const tree = renderer.create(<Empty />).toJSON()
        expect(tree).toHaveStyleRule('display', 'none')
    })
})
