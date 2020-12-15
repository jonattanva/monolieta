import Explorer from '../index.jsx'

import {
    render,
    fireEvent
} from '@testing-library/react'

describe('<Explorer />', function () {

    beforeAll(() => {
        Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
            configurable: true,
            value: 500
        })

        Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
            configurable: true,
            value: 500
        })
    })

    it('select', function () {
        const onSelect = jest.fn()
        const { container } = render(
            <Explorer dataSource={[{
                    image: '/mock.png',
                    label: 'mock'
                }]} onSelect={ onSelect } />
        )

        const image = container.querySelector('[data-key="0"]')

        fireEvent.click(image)

        expect(onSelect).toHaveBeenCalledTimes(1)
        expect(onSelect.mock.calls[0][0]).toEqual(0)
        expect(onSelect.mock.calls[0][1]).toEqual({
            image: '/mock.png',
            label: 'mock'
        })
    })
})