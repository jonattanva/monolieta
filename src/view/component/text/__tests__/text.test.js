import Text from '../index.jsx'
import { render, screen, fireEvent } from '@testing-library/react'

describe('<Text />', function () {
    it('placeholder', function () {
        render(<Text placeholder="My placeholder" />)

        expect(screen.getByPlaceholderText('My placeholder')).toBeDefined()
    })

    it('change', function () {
        const onChange = jest.fn()
        render(<Text onChange={onChange} placeholder="Input test" />)

        const input = screen.getByPlaceholderText('Input test')
        fireEvent.change(input, { target: { value: 'mock' } })

        expect(onChange).toHaveBeenCalledTimes(1)
        expect(onChange.mock.calls[0][0].target.value).toEqual('mock')
    })
})
