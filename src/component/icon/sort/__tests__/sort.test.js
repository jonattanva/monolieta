import Sort from '..'
import { render, screen } from '@testing-library/react'

describe('<Sort />', function () {
    it('ascending', function () {
        const { rerender } = render(<Sort ascending={true} />)

        let icon = screen.getByRole('icon')
        expect(icon.childNodes[0].getAttribute('d')).toEqual(
            'M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12'
        )

        rerender(<Sort ascending={false} />)

        icon = screen.getByRole('icon')
        expect(icon.childNodes[0].getAttribute('d')).toEqual(
            'M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4'
        )
    })
})
