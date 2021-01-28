//@flow
import Text from '..'
import * as React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

describe('<Text />', function () {
    it('placeholder', function () {
        const onChange = jest.fn()
        render(
            <Text placeholder="My placeholder" onChange={onChange} value="" />
        )

        expect(screen.getByPlaceholderText('My placeholder')).toBeDefined()
    })

    it('change', function () {
        const onChange = jest.fn()
        render(<Text onChange={onChange} placeholder="Input test" value="" />)

        const input = screen.getByPlaceholderText('Input test')
        fireEvent.change(input, { target: { value: 'mock' } })

        expect(onChange).toHaveBeenCalledTimes(1)
        expect(onChange.mock.calls[0][0]).toEqual('mock')
    })
})
