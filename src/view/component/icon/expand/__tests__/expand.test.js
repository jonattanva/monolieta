import Expand from '..'
import { render, screen } from '@testing-library/react'

describe('<Expand />', function () {
    it('open', function () {
        const { rerender } = render(<Expand open={false} />)

        let icon = screen.getByRole('icon')
        expect(icon.childNodes[0].getAttribute('d')).toEqual('M9 5l7 7-7 7')

        rerender(<Expand open={true} />)

        icon = screen.getByRole('icon')
        expect(icon.childNodes[0].getAttribute('d')).toEqual('M19 9l-7 7-7-7')
    })
})
