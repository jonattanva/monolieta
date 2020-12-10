import Status from '../index.jsx'
import renderer from 'react-test-renderer'

describe('<Status />', function () {

    it('filename', function () {
        const external = renderer.create(
            <Status filename="http://fake.com/image/001.png" />
        ).toTree()

        expect(
            external.rendered.rendered[0].rendered[0].props.children
        ).toEqual("001.png")

        const local = renderer.create(
            <Status filename="/Users/fake/Documents/100.png" />
        ).toTree()

        expect(
            local.rendered.rendered[0].rendered[0].props.children
        ).toEqual("100.png")
    })

})