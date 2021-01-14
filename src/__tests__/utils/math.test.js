import { getRatio, scale } from '../../utils/math.js'

describe('math', function () {
    it('ratio', function () {
        expect(getRatio(200, 100)).toEqual(2)
        expect(getRatio(200, 400)).toEqual(0.5)
    })

    it('scale', function () {
        const { width, height } = scale({ width: 200, height: 400 }, 2)
        expect(width).toEqual(400)
        expect(height).toEqual(800)
    })
})
