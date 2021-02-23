// @flow
import Group from '..'
import { render, screen, fireEvent } from '@testing-library/react'
import 'jest-styled-components'

describe('<Group />', function () {
    it('color', function () {
        render(<Group classes={[]} id="T3daw35f2" color="#333" />)

        const buttons = screen.getAllByRole('button')

        const style = getComputedStyle(buttons[0])
        expect(style.getPropertyValue('--group-color')).toEqual('#333')
    })

    it('visible class', function () {
        const onVisibleClass = jest.fn()
        render(
            <Group
                classes={[]}
                id="T3daw35f2"
                onVisibleClass={onVisibleClass}
            />
        )

        const buttons = screen.getAllByRole('button')
        fireEvent.click(buttons[0])

        expect(onVisibleClass).toHaveBeenCalledTimes(1)
        expect(onVisibleClass.mock.calls[0][0]).toEqual('T3daw35f2')
        expect(onVisibleClass.mock.calls[0][1]).toBeFalsy()
    })

    it('lock class', function () {
        const onLockClass = jest.fn()
        render(<Group classes={[]} id="T3daw35f2" onLockClass={onLockClass} />)

        const buttons = screen.getAllByRole('button')
        fireEvent.click(buttons[2])

        expect(onLockClass).toHaveBeenCalledTimes(1)
        expect(onLockClass.mock.calls[0][0]).toEqual('T3daw35f2')
        expect(onLockClass.mock.calls[0][1]).toBeTruthy()
    })
})
