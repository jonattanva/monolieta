//@flow
import Search from '..'
import { render, screen, fireEvent } from '@testing-library/react'

describe('<Search />', function () {
    it('placeholder', function () {
        render(<Search placeholder="My placeholder" onEnter={() => {}} />)

        expect(screen.getByPlaceholderText('My placeholder')).toBeDefined()
    })

    it('search (Change)', function () {
        const onChange = jest.fn()
        render(<Search onChange={onChange} />)

        const input = screen.getByPlaceholderText('Search')
        fireEvent.change(input, {
            target: {
                value: 'mock'
            }
        })

        expect(onChange).toHaveBeenCalledTimes(1)
        expect(onChange.mock.calls[0][0]).toEqual('mock')
    })
})
