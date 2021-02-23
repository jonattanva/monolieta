//@flow
import Lock from '..'
import { render, screen } from '@testing-library/react'

describe('<Lock />', function () {
    it('locked', function () {
        const { rerender } = render(<Lock locked={false} />)

        let icon = screen.getByRole('icon')
        expect(icon.childNodes[0].getAttribute('d')).toEqual(
            'M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z'
        )

        rerender(<Lock locked={true} />)

        icon = screen.getByRole('icon')
        expect(icon.childNodes[0].getAttribute('d')).toEqual(
            'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
        )
    })
})
