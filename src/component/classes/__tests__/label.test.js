import Label from '../label.jsx'

import {
    render,
    screen,
    fireEvent
} from '@testing-library/react'

describe('<Label />', function () {

    it('select checkbox', function() {
        const props = {
            id: '2',
            onSelectHandle: jest.fn()
        }

        render(
            <Label { ...props } />
        )

        const button = screen.getByRole('input')
        fireEvent.click(button, { target: { checked: true } })

        expect(props.onSelectHandle).toHaveBeenCalledTimes(1)
        expect(props.onSelectHandle.mock.calls[0][0]).toEqual('2')
        expect(props.onSelectHandle.mock.calls[0][1]).toBeTruthy()
    })

    it('class name', function() {
        const onChangeNameHandle = jest.fn()

        render(
            <Label id="4" onChangeNameHandle={ onChangeNameHandle } />
        )

        const input = screen.getByPlaceholderText('Enter class name')
        fireEvent.change(input, { target: { value: 'Bird' } })

        expect(onChangeNameHandle).toHaveBeenCalledTimes(1)
        expect(onChangeNameHandle.mock.calls[0][0]).toEqual('4')
        expect(onChangeNameHandle.mock.calls[0][1]).toEqual('Bird')
    })

})