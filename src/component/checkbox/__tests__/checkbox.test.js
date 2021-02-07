//@flow
import Checkbox from '..'
import { render, screen, fireEvent } from '@testing-library/react'

describe('<Checkbox />', function () {
    it('click', function () {
        const onChange = jest.fn()
        render(<Checkbox onChange={onChange} />)

        const input = screen.getByRole('input')
        fireEvent.click(input, {
            target: {
                checked: true
            }
        })

        expect(onChange).toHaveBeenCalledTimes(1)
        expect(onChange.mock.calls[0][0]).toBeTruthy()
    })

    it('checked', function () {
        render(<Checkbox checked={true} onChange={() => {}} />)

        let input = screen.getByRole('input')
        expect(input.dataset.checked).toBeTruthy()
        fireEvent.click(input)
    })
})
