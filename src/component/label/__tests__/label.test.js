// @flow
import Label from '..'
import { render, screen, fireEvent } from '@testing-library/react'

const props = {
    id: '2',
    name: 'Cat',
    color: '#333333',
    onSelectedClass: jest.fn(),
    onSelectedName: jest.fn(),
    onSavedColor: jest.fn()
}

jest.mock('component/color', () => {
    return function mock(props) {
        return (
            <button
                role="color"
                type="button"
                onClick={() => props.onSavedColor('#344224')}>
                Color picker
            </button>
        )
    }
})

describe('<Label />', function () {
    it('select class', function () {
        render(<Label {...props} />)

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

    it('enter class name', function () {
        render(<Label {...props} />)

        const input = screen.getByPlaceholderText('Enter class name')
        fireEvent.change(input, { target: { value: 'Bird' } })

        expect(props.onSelectedName).toHaveBeenCalledTimes(1)
        expect(props.onSelectedName.mock.calls[0][0]).toEqual('2')
        expect(props.onSelectedName.mock.calls[0][1]).toEqual('Bird')
    })

    it('change class color', function () {
        render(<Label {...props} />)

        const button = screen.getByRole('color')
        fireEvent.click(button)

        expect(props.onSavedColor).toHaveBeenCalledTimes(1)
        expect(props.onSavedColor.mock.calls[0][0]).toEqual('2')
        expect(props.onSavedColor.mock.calls[0][1]).toEqual('#344224')
    })
})
