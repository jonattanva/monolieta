import Clazz from '..'
import { render, screen, fireEvent } from '@testing-library/react'

describe('<Clazz />', function () {
    it('select checkbox', function () {
        const props = {
            id: '2',
            onSelectedClass: jest.fn()
        }

        render(<Clazz {...props} />)

        const button = screen.getByRole('input')
        fireEvent.click(button, {
            target: {
                checked: true
            }
        })

        expect(props.onSelectedClass).toHaveBeenCalledTimes(1)
        expect(props.onSelectedClass.mock.calls[0][0]).toEqual('2')
        expect(props.onSelectedClass.mock.calls[0][1]).toBeTruthy()
    })

    it('class name', function () {
        const onSelectedName = jest.fn()

        render(<Clazz id="4" onSelectedName={onSelectedName} />)

        const input = screen.getByPlaceholderText('Enter class name')
        fireEvent.change(input, { target: { value: 'Bird' } })

        expect(onSelectedName).toHaveBeenCalledTimes(1)
        expect(onSelectedName.mock.calls[0][0]).toEqual('4')
        expect(onSelectedName.mock.calls[0][1]).toEqual('Bird')
    })

    it('instances', function () {
        const { rerender } = render(<Clazz info={true} />)
        expect(screen.getByText(/0/i)).toBeDefined()

        rerender(<Clazz instances={3} info={true} />)
        expect(screen.getByText(/3/i)).toBeDefined()
    })
})
