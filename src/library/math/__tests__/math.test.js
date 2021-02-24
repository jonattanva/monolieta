import { getRatio, getScale, spectRatio } from '..'

describe('Math', function () {
    it('spect ratio', function () {
        let spect = spectRatio(
            {
                width: 100,
                height: 200
            },
            0.5
        )

        expect(spect.x).toEqual(0)
        expect(spect.y).toEqual(0)
        expect(spect.width).toEqual(100)
        expect(spect.height).toEqual(200)

        spect = spectRatio(
            {
                width: 200,
                height: 100
            },
            2
        )

        expect(spect.x).toEqual(0)
        expect(spect.y).toEqual(0)
        expect(spect.width).toEqual(200)
        expect(spect.height).toEqual(100)
    })

    it('scale', function () {
        let scale = getScale({ width: 100, height: 200 }, 2)
        expect(scale.width).toEqual(200)
        expect(scale.height).toEqual(400)

        scale = getScale({ width: 100, height: 200 })
        expect(scale.width).toEqual(100)
        expect(scale.height).toEqual(200)
    })

    it('ratio', function () {
        expect(getRatio(200, 100)).toEqual(2)
        expect(getRatio(100, 200)).toEqual(0.5)
    })
})
