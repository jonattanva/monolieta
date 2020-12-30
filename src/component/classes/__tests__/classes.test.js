import Classes from '../index.jsx'

import {
    render,
    screen,
    waitFor,
    fireEvent
} from '@testing-library/react'

describe('<Classes />', function () {

    it('empty classes', function() {
        render(
            <Classes />
        )

        expect(screen.getByText('Your class list is empty'))
            .toBeDefined()
    })

    it('class added', async function() {
        const onClassAdded = jest.fn()
        render(
            <Classes onClassAdded={ onClassAdded } />
        )

        const button = screen.getAllByRole('button')
        fireEvent.click(button[0])

        await waitFor(() => {
            expect(onClassAdded).toHaveBeenCalledTimes(1)
        })
    })

})