import { getRatio } from '../../utils/math.js'

describe('math', function () {
    it('ratio', function () {
        expect(getRatio(200, 100)).toEqual(2)
        expect(getRatio(200, 400)).toEqual(0.5)
    })
})
