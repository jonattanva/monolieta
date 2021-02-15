// @flow
import Label from '..'
import { render, screen, fireEvent } from '@testing-library/react'

describe('<Label />', function () {
    it('select checkbox', function () {
        const onSelectedClass = jest.fn()
        render(
            <Label
                id="2"
                name=""
                color=""
                onSelectedClass={onSelectedClass}
                onSelectedName={() => {}}
                onSavedColor={() => {}}
            />
        )

        const button = screen.getByRole('input')
        fireEvent.click(button, {
            target: {
                checked: true
            }
        })

        expect(onSelectedClass).toHaveBeenCalledTimes(1)
        expect(onSelectedClass.mock.calls[0][0]).toEqual('2')
        expect(onSelectedClass.mock.calls[0][1]).toBeTruthy()
    })

    it('class name', function () {
        const onSelectedName = jest.fn()

        render(
            <Label
                id="4"
                name=""
                color=""
                onSelectedClass={() => {}}
                onSelectedName={onSelectedName}
                onSavedColor={() => {}}
            />
        )

        const input = screen.getByPlaceholderText('Enter class name')
        fireEvent.change(input, { target: { value: 'Bird' } })

        expect(onSelectedName).toHaveBeenCalledTimes(1)
        expect(onSelectedName.mock.calls[0][0]).toEqual('4')
        expect(onSelectedName.mock.calls[0][1]).toEqual('Bird')
    })
})
