// @flow
import Group from '..'
import { render, screen, fireEvent } from '@testing-library/react'
import 'jest-styled-components'

const props = {
    classes: [
        {
            id: '1',
            name: 'Mock',
            color: '#333'
        }
    ],
    id: 'T3daw35f2',
    onLockClass: jest.fn(),
    onSelectedClass: jest.fn(),
    onShowLabelClass: jest.fn(),
    onTrashClass: jest.fn(),
    onVisibleClass: jest.fn()
}

jest.mock('component/select', () => {
    return function mock(props) {
        return (
            <select role="select" onChange={props.onChange}>
                {props.options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        )
    }
})

describe('<Group />', function () {
    it('color', function () {
        render(<Group {...props} color="#333" />)

        const buttons = screen.getAllByRole('button')

        const style = getComputedStyle(buttons[0])
        expect(style.getPropertyValue('--group-color')).toEqual('#333')
    })

    it('selected class', function () {
        render(<Group {...props} />)

        const field = screen.getByRole('select')
        fireEvent.change(field, { target: { value: 2 } })

        expect(props.onSelectedClass).toHaveBeenCalledTimes(1)
    })

    it('visible class', function () {
        render(<Group {...props} />)

        const buttons = screen.getAllByRole('button')
        fireEvent.click(buttons[0])

        expect(props.onVisibleClass).toHaveBeenCalledTimes(1)
        expect(props.onVisibleClass.mock.calls[0][0]).toEqual('T3daw35f2')
        expect(props.onVisibleClass.mock.calls[0][1]).toBeFalsy()
    })

    it('show label class', function () {
        render(<Group {...props} />)

        const buttons = screen.getAllByRole('button')
        fireEvent.click(buttons[1])

        expect(props.onShowLabelClass).toHaveBeenCalledTimes(1)
        expect(props.onShowLabelClass.mock.calls[0][0]).toEqual('T3daw35f2')
        expect(props.onShowLabelClass.mock.calls[0][1]).toBeTruthy()
    })

    it('lock class', function () {
        render(<Group {...props} />)

        const buttons = screen.getAllByRole('button')
        fireEvent.click(buttons[2])

        expect(props.onLockClass).toHaveBeenCalledTimes(1)
        expect(props.onLockClass.mock.calls[0][0]).toEqual('T3daw35f2')
        expect(props.onLockClass.mock.calls[0][1]).toBeTruthy()
    })

    it('trash class', function () {
        render(<Group {...props} />)

        const buttons = screen.getAllByRole('button')
        fireEvent.click(buttons[3])

        expect(props.onTrashClass).toHaveBeenCalledTimes(1)
        expect(props.onTrashClass.mock.calls[0][0]).toEqual('T3daw35f2')
    })
})
