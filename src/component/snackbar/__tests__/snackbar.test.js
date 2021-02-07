//@flow
import Snackbar from '..'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

describe('<Snackbar />', function () {
    it('click', function () {
        const onClose = jest.fn()
        render(
            <Snackbar delay={null} onClose={onClose}>
                Message
            </Snackbar>
        )

        const input = screen.getByRole('button')
        fireEvent.click(input)

        expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('timeout', async function () {
        const onClose = jest.fn()
        render(
            <Snackbar delay={500} onClose={onClose}>
                Message
            </Snackbar>
        )

        await waitFor(
            () => {
                expect(onClose).toHaveBeenCalledTimes(1)
            },
            { timeout: 1000 }
        )
    })
})
