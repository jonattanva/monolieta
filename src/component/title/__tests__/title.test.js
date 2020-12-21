import Title from '../index.jsx'

import {
    render,
    screen,
    fireEvent
} from '@testing-library/react'

describe('<Title />', function () {

    it('text', function () {
        render(
            <Title>Example</Title>
        )

        expect(screen.getByText('Example')).toBeDefined()
    })

    it('hide', function () {
        const onClick = jest.fn()
        render(
            <Title onHideHandle={ onClick }>
                Example
            </Title>
        )

        const input = screen.getByRole('button')
        fireEvent.click(input)

        expect(onClick).toHaveBeenCalledTimes(1)
    })

})