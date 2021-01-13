import Button from '..'
import { render, screen, fireEvent } from '@testing-library/react'

describe('<Button />', function () {
    it('name', function () {
        const title = 'My button'
        render(<Button>{title}</Button>)

        expect(screen.getByText(title)).toBeDefined()
    })

    it('click', function () {
        const onClick = jest.fn()
        render(<Button onClick={onClick}>My button</Button>)

        const input = screen.getByRole('button')
        fireEvent.click(input)

        expect(onClick).toHaveBeenCalledTimes(1)
    })
})
