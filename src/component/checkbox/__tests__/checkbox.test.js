import Checkbox from '../index.jsx'

import {
    render,
    screen,
    fireEvent
} from '@testing-library/react'

describe('<Checkbox />', function () {

    it('click', function () {
        const onChange = jest.fn()
        render(
            <Checkbox onChange={ onChange } />
        )

        const input = screen.getByRole('input')
        fireEvent.click(input)

        expect(onChange).toHaveBeenCalledTimes(1)
    })

    it('checked', function() {
        render(
            <Checkbox checked={ true } />
        )

        let input = screen.getByRole('input')
        expect(input.dataset.checked).toBeTruthy()
        fireEvent.click(input)
    })
})