import Color from '../index.jsx'
import { render, screen, fireEvent } from '@testing-library/react'

describe('<Color />', function () {
    it('open', function () {
        render(<Color />)

        const button = screen.getByRole('button')
        fireEvent.click(button)

        const picker = screen.getByLabelText('color picker dialog')
        expect(picker.className).toMatch(/visible/)
    })
})
