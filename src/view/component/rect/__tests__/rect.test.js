import Rect from '..'
import { render, screen } from '@testing-library/react'

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
})
