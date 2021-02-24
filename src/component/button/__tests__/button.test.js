//@flow
import Button from '..'
import { render, screen, fireEvent } from '@testing-library/react'

const props = {
    onClick: jest.fn()
}

describe('<Button />', function () {
    it('name', function () {
        render(<Button {...props}>Example</Button>)
        expect(screen.getByText('Example')).toBeDefined()
    })

    it('click', function () {
        render(<Button {...props}>My button</Button>)

        const input = screen.getByRole('button')
        fireEvent.click(input)

        expect(props.onClick).toHaveBeenCalledTimes(1)
    })
})
