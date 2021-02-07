//@flow
import Action from '..'
import { render, screen, fireEvent } from '@testing-library/react'

describe('<Action />', function () {
    it('click', function () {
        const onClick = jest.fn()
        render(<Action onClick={onClick}>My button</Action>)

        const input = screen.getByRole('button')
        fireEvent.click(input)

        expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('name', function () {
        render(<Action onClick={() => {}}>Demo</Action>)

        expect(screen.getByText(/demo/i)).toBeDefined()
    })
})
