import Search from '../index.jsx'

import {
    render,
    screen,
    fireEvent
} from '@testing-library/react'

describe('<Search />', function () {

   it('placeholder', function () {
        render(
            <Search placeholder="My placeholder" />
        )

        expect(screen.getByPlaceholderText("My placeholder"))
            .toBeDefined()
    })

    it('search (Enter)', function () {
        const onEnter = jest.fn()
        render(
            <Search onEnter={ onEnter } value="mock" />
        )

        const input = screen.getByPlaceholderText("Search")
        fireEvent.keyDown(input, { key: 'Enter', keyCode: 13 })

        expect(onEnter).toHaveBeenCalledTimes(1)
        expect(onEnter.mock.calls[0][0]).toEqual('mock')
    })

    it('search (Change)', function () {
        const onChange = jest.fn()
        render(
            <Search onChange={ onChange } />
        )

        const input = screen.getByPlaceholderText("Search")
        fireEvent.change(input, { target: { value: 'mock' } })

        expect(onChange).toHaveBeenCalledTimes(1)
        expect(onChange.mock.calls[0][0].target.value).toEqual('mock')
    })
})