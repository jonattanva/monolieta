//@flow
import Checkbox from '..'
import { render, screen, fireEvent } from '@testing-library/react'

const props = {
    onChange: jest.fn()
}

describe('<Checkbox />', function () {
    it('click', function () {
        render(<Checkbox {...props} />)

        const input = screen.getByRole('input')
        fireEvent.click(input, {
            target: {
                checked: true
            }
        })

        expect(props.onChange).toHaveBeenCalledTimes(1)
        expect(props.onChange.mock.calls[0][0]).toBeTruthy()
    })
})
