//@flow
import Dropdown, { Item } from '..'
import { render, screen, fireEvent } from '@testing-library/react'
import 'jest-styled-components'

describe('<Dropdown />', function () {
    it('children', function () {
        render(
            <Dropdown>
                <Item>Demo</Item>
            </Dropdown>
        )

        expect(screen.getByText(/demo/i)).toBeDefined()
    })

    it('outside', function () {
        const onOutside = jest.fn()
        render(
            <div>
                <div role="button">Button</div>
                <Dropdown onOutside={onOutside}>
                    <Item>Demo</Item>
                </Dropdown>
            </div>
        )

        const input = screen.getByRole('button')
        fireEvent.mouseDown(input)

        expect(onOutside).toHaveBeenCalledTimes(1)
    })

    it('disabled', function () {
        render(
            <Dropdown>
                <Item disabled={true} role="item">
                    Demo
                </Item>
            </Dropdown>
        )

        const item = screen.getByRole('item')
        expect(item).toHaveStyleRule(
            'color',
            'var(--color-font-dark,hsl(220,13%,50%))'
        )
    })
})
