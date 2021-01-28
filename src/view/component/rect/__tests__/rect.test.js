//@flow
import Rect from '..'
import * as React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

describe('<Rect />', function () {
    it('render', function () {
        const onDrag = jest.fn()
        const onResize = jest.fn()

        render(
            <svg xmlns="http://www.w3.org/2000/svg" width="800" height="800">
                <Rect
                    x={100}
                    y={100}
                    width={100}
                    height={100}
                    onDrag={onDrag}
                    onResize={onResize}
                />
            </svg>
        )

        const bbox = screen.getByRole('bounding-box')

        expect(onDrag).toHaveBeenCalledTimes(0)
        expect(onResize).toHaveBeenCalledTimes(0)
        expect(bbox.getAttribute('x')).toEqual('100')
        expect(bbox.getAttribute('y')).toEqual('100')
        expect(bbox.getAttribute('width')).toEqual('100')
        expect(bbox.getAttribute('height')).toEqual('100')
    })

    it('drag', function () {
        const onDrag = jest.fn()
        const onResize = jest.fn()

        render(
            <svg xmlns="http://www.w3.org/2000/svg" width="800" height="800">
                <Rect
                    x={50}
                    y={50}
                    width={100}
                    height={100}
                    onDrag={onDrag}
                    onResize={onResize}
                />
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

        expect(onDrag).toHaveBeenCalledTimes(1)
        expect(onResize).toHaveBeenCalledTimes(0)
        expect(onDrag.mock.calls[0][0]).toEqual(-10)
        expect(onDrag.mock.calls[0][1]).toEqual(80)
    })

    it('nw-resize', function () {
        const onDrag = jest.fn()
        const onResize = jest.fn()

        render(
            <svg xmlns="http://www.w3.org/2000/svg" width="800" height="800">
                <Rect
                    x={50}
                    y={50}
                    width={100}
                    height={100}
                    onDrag={onDrag}
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

        expect(onDrag).toHaveBeenCalledTimes(0)
        expect(onResize).toHaveBeenCalledTimes(1)
        expect(onResize.mock.calls[0][0]).toEqual(40) // x
        expect(onResize.mock.calls[0][1]).toEqual(130) // y
        expect(onResize.mock.calls[0][2]).toEqual(110) // w
        expect(onResize.mock.calls[0][3]).toEqual(20) // h
    })

    it('n-resize', function () {
        const onDrag = jest.fn()
        const onResize = jest.fn()

        render(
            <svg xmlns="http://www.w3.org/2000/svg" width="800" height="800">
                <Rect
                    x={50}
                    y={50}
                    width={100}
                    height={100}
                    onDrag={onDrag}
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

        expect(onDrag).toHaveBeenCalledTimes(0)
        expect(onResize).toHaveBeenCalledTimes(1)
        expect(onResize.mock.calls[0][0]).toEqual(50) // x
        expect(onResize.mock.calls[0][1]).toEqual(130) // y
        expect(onResize.mock.calls[0][2]).toEqual(100) // w
        expect(onResize.mock.calls[0][3]).toEqual(20) // h
    })

    it('ne-resize', function () {
        const onDrag = jest.fn()
        const onResize = jest.fn()

        render(
            <svg xmlns="http://www.w3.org/2000/svg" width="800" height="800">
                <Rect
                    x={50}
                    y={50}
                    width={100}
                    height={100}
                    onDrag={onDrag}
                    onResize={onResize}
                />
            </svg>
        )

        const bbox = screen.getByRole('bounding-box')
        fireEvent.click(bbox)

        const corner = screen.getAllByRole('corner')
        fireEvent.mouseDown(corner[2], {
            clientX: 40,
            clientY: 60
        })

        fireEvent.mouseMove(corner[2], {
            clientX: 20,
            clientY: 50
        })

        expect(onDrag).toHaveBeenCalledTimes(0)
        expect(onResize).toHaveBeenCalledTimes(1)
        expect(onResize.mock.calls[0][0]).toEqual(50) // x
        expect(onResize.mock.calls[0][1]).toEqual(40) // y
        expect(onResize.mock.calls[0][2]).toEqual(80) // w
        expect(onResize.mock.calls[0][3]).toEqual(110) // h
    })

    it('e-resize', function () {
        const onDrag = jest.fn()
        const onResize = jest.fn()

        render(
            <svg xmlns="http://www.w3.org/2000/svg" width="800" height="800">
                <Rect
                    x={50}
                    y={50}
                    width={100}
                    height={100}
                    onDrag={onDrag}
                    onResize={onResize}
                />
            </svg>
        )

        const bbox = screen.getByRole('bounding-box')
        fireEvent.click(bbox)

        const corner = screen.getAllByRole('corner')
        fireEvent.mouseDown(corner[3], {
            clientX: 10,
            clientY: 40
        })

        fireEvent.mouseMove(corner[3], {
            clientX: 10,
            clientY: 140
        })

        expect(onDrag).toHaveBeenCalledTimes(0)
        expect(onResize).toHaveBeenCalledTimes(1)
        expect(onResize.mock.calls[0][0]).toEqual(50) // x
        expect(onResize.mock.calls[0][1]).toEqual(50) // y
        expect(onResize.mock.calls[0][2]).toEqual(100) // w
        expect(onResize.mock.calls[0][3]).toEqual(100) // h
    })

    it('se-resize', function () {
        const onDrag = jest.fn()
        const onResize = jest.fn()

        render(
            <svg xmlns="http://www.w3.org/2000/svg" width="800" height="800">
                <Rect
                    x={100}
                    y={100}
                    width={150}
                    height={150}
                    onDrag={onDrag}
                    onResize={onResize}
                />
            </svg>
        )

        const bbox = screen.getByRole('bounding-box')
        fireEvent.click(bbox)

        const corner = screen.getAllByRole('corner')
        fireEvent.mouseDown(corner[4], {
            clientX: 100,
            clientY: 100
        })

        fireEvent.mouseMove(corner[4], {
            clientX: 50,
            clientY: 10
        })

        expect(onDrag).toHaveBeenCalledTimes(0)
        expect(onResize).toHaveBeenCalledTimes(1)
        expect(onResize.mock.calls[0][0]).toEqual(100) // x
        expect(onResize.mock.calls[0][1]).toEqual(100) // y
        expect(onResize.mock.calls[0][2]).toEqual(100) // w
        expect(onResize.mock.calls[0][3]).toEqual(60) // h
    })
})
