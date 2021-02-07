//@flow
import Button from '..'
import { render, screen, fireEvent } from '@testing-library/react'

describe('<Button />', function () {
    it('name', function () {
        render(<Button onClick={() => {}}>Example</Button>)
        expect(screen.getByText('Example')).toBeDefined()
    })

    it('click', function () {
        const onClick = jest.fn()
        render(<Button onClick={onClick}>My button</Button>)

        const input = screen.getByRole('button')
        fireEvent.click(input)

        expect(onClick).toHaveBeenCalledTimes(1)
    })
})
