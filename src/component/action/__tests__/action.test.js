//@flow
import Action from '..'
import { render, screen, fireEvent } from '@testing-library/react'

const props = {
    onClick: jest.fn()
}

describe('<Action />', function () {
    it('click', function () {
        render(<Action {...props}>My button</Action>)

        const input = screen.getByRole('button')
        fireEvent.click(input)

        expect(props.onClick).toHaveBeenCalledTimes(1)
    })

    it('name', function () {
        render(<Action {...props}>Demo</Action>)

        expect(screen.getByText(/demo/i)).toBeDefined()
    })
})
