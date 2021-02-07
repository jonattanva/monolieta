//@flow
import Color from '../index.jsx'
import { render, screen, fireEvent } from '@testing-library/react'

describe('<Color />', function () {
    it('open', function () {
        render(<Color onSavedColor={() => {}} />)

        const buttons = screen.getAllByRole('button')
        fireEvent.click(buttons[0])

        const picker = screen.getByLabelText('color picker dialog')
        expect(picker.className).toMatch(/visible/)
    })
})
