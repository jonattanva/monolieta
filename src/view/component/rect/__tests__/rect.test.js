import Rect from '..'
import { render, screen, fireEvent } from '@testing-library/react'

describe('<Rect />', function () {
    it('render', function () {
        render(
            <svg xmlns="http://www.w3.org/2000/svg" width="800" height="800">
                <Rect x={100} y={100} width={100} height={100} />
            </svg>
        )

        const bbox = screen.getAllByRole('bounding-box')
        expect(bbox[0].getAttribute('x')).toEqual('100')
        expect(bbox[0].getAttribute('y')).toEqual('100')
        expect(bbox[0].getAttribute('width')).toEqual('100')
        expect(bbox[0].getAttribute('height')).toEqual('100')
    })

    it('drag', function () {
        const onDrag = jest.fn()
        render(
            <svg xmlns="http://www.w3.org/2000/svg" width="800" height="800">
                <Rect x={50} y={50} width={100} height={100} onDrag={onDrag} />
            </svg>
        )

        const bbox = screen.getByRole('bounding-box')
        fireEvent.mouseDown(bbox, {
            clientX: 20,
            clientY: 60
        })

        fireEvent.mouseMove(bbox, {
            clientX: 10,
            clientY: 140
        })

        expect(onDrag.mock.calls[0][0]).toEqual(-10)
        expect(onDrag.mock.calls[0][1]).toEqual(80)
    })

    it('nw-resize', function () {
        const onResize = jest.fn()
        render(
            <svg xmlns="http://www.w3.org/2000/svg" width="800" height="800">
                <Rect
                    x={50}
                    y={50}
                    width={100}
                    height={100}
                    onResize={onResize}
                />
            </svg>
        )

        const bbox = screen.getByRole('bounding-box')
        fireEvent.click(bbox)

        const corner = screen.getAllByRole('corner')
        fireEvent.mouseDown(corner[0], {
            clientX: 20,
            clientY: 60
        })

        fireEvent.mouseMove(corner[0], {
            clientX: 10,
            clientY: 140
        })

        expect(onResize.mock.calls[0][0]).toEqual(40)   // x
        expect(onResize.mock.calls[0][1]).toEqual(130)  // y
        expect(onResize.mock.calls[0][2]).toEqual(110)  // w
        expect(onResize.mock.calls[0][3]).toEqual(20)   // h
    })

    it('n-resize', function () {
        const onResize = jest.fn()
        render(
            <svg xmlns="http://www.w3.org/2000/svg" width="800" height="800">
                <Rect
                    x={50}
                    y={50}
                    width={100}
                    height={100}
                    onResize={onResize}
                />
            </svg>
        )

        const bbox = screen.getByRole('bounding-box')
        fireEvent.click(bbox)

        const corner = screen.getAllByRole('corner')
        fireEvent.mouseDown(corner[1], {
            clientX: 20,
            clientY: 60
        })

        fireEvent.mouseMove(corner[1], {
            clientX: 10,
            clientY: 140
        })

        expect(onResize.mock.calls[0][0]).toEqual(50) // x
        expect(onResize.mock.calls[0][1]).toEqual(130) // y
        expect(onResize.mock.calls[0][2]).toEqual(100) // w
        expect(onResize.mock.calls[0][3]).toEqual(20) // h
    })
})
