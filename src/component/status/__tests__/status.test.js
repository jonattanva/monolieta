import Status from '../index.jsx'

import {
    render,
    screen,
    fireEvent
} from '@testing-library/react'

describe('<Status />', function () {

    it('external filename', function () {
        render(
            <Status filename="http://fake.com/image/001.png" />
        )

        expect(screen.queryByText("001.png")).toBeDefined()
    })

    it('local filename', function () {
        render(
            <Status filename="/Users/fake/Documents/100.png" />
        )
        expect(screen.queryByText("100.png")).toBeDefined()
    })

    it('zoom in', function () {
        const onClick = jest.fn()
        render(
            <Status onZoomHandle={ onClick } />
        )

        const elements = screen.queryAllByRole('button')
        const zoomIn = elements[4]

        fireEvent.click(zoomIn)

        expect(onClick).toHaveBeenCalledTimes(1)
        expect(onClick.mock.calls[0][0]).toEqual(1.1)
    })

    it('zoom out', function () {
        const onClick = jest.fn()
        render(
            <Status onZoomHandle={ onClick } zoom={{
                max: 4,
                min: 1,
                step: 0.1,
                value: 2
            }} />
        )

        const elements = screen.queryAllByRole('button')
        const zoomOut = elements[3]

        fireEvent.click(zoomOut)

        expect(onClick).toHaveBeenCalledTimes(1)
        expect(onClick.mock.calls[0][0]).toEqual(1.9)
    })

    it('reset zoom', function () {
        const onClick = jest.fn()
        render(
            <Status onZoomHandle={ onClick } zoom={{
                max: 4,
                min: 1,
                step: 0.1,
                value: 2
            }} />
        )

        const elements = screen.queryAllByRole('button')
        const reset = elements[2]

        fireEvent.click(reset)

        expect(onClick).toHaveBeenCalledTimes(1)
        expect(onClick.mock.calls[0][0]).toEqual(1)
    })

    it('next image', function () {
        const onClick = jest.fn()
        render(
            <Status onNavigationHandle={ onClick } navigation={{
                number: 2,
                total: 10
            }} />
        )

        const elements = screen.queryAllByRole('button')
        const next = elements[1]

        fireEvent.click(next)

        expect(onClick).toHaveBeenCalledTimes(1)
        expect(onClick.mock.calls[0][0]).toEqual(3)
    })

    it('previous image', function () {
        const onClick = jest.fn()
        render(
            <Status onNavigationHandle={ onClick } navigation={{
                number: 2,
                total: 10
            }} />
        )

        const elements = screen.queryAllByRole('button')
        const next = elements[0]

        fireEvent.click(next)

        expect(onClick).toHaveBeenCalledTimes(1)
        expect(onClick.mock.calls[0][0]).toEqual(1)
    })

})