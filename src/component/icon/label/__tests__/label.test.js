//@flow
import Label from '..'
import { render, screen, fireEvent } from '@testing-library/react'

describe('<Label />', function () {
    it('clic', function () {
        const onClick = jest.fn()
        render(<Label onClick={onClick} />)

        const input = screen.getByRole('icon')
        fireEvent.click(input)

        expect(onClick).toHaveBeenCalledTimes(1)
    })
})
