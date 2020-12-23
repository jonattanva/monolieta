import Panel from '../index.jsx'

import {
    render,
    screen,
    fireEvent
} from '@testing-library/react'

describe('<Panel />', function () {

    it('text', function () {
        render(
            <Panel title="Demo">
                Example
            </Panel>
        )

        expect(screen.getByText('Demo')).toBeDefined()
        expect(screen.getByText('Example')).toBeDefined()
    })

    it('hide', function () {
        const onHideHandle = jest.fn()
        render(
            <Panel title="Demo" onHideHandle={ onHideHandle }>
                Example
            </Panel>
        )

        const input = screen.getByRole('button')
        fireEvent.click(input)

        expect(onHideHandle).toHaveBeenCalledTimes(1)
    })
})