import Range from '../index.jsx'
import renderer from 'react-test-renderer'
import { render, screen, fireEvent } from '@testing-library/react'

describe('<Range />', function () {
    it('value', function () {
        const node = renderer.create(<Range value={60} />).toJSON()

        expect(node.props.style.backgroundImage).toEqual(
            'linear-gradient(to right, #6200ee 60%, #f5f5f5 0)'
        )
    })

    it('change', function () {
        const props = {
            onChange: jest.fn(),
            value: 20
        }

        render(<Range {...props} />)

        const input = screen.getByRole('input')
        fireEvent.change(input, { target: { value: '10' } })

        expect(props.onChange).toHaveBeenCalledTimes(1)
        expect(props.onChange.mock.calls[0][0]).toEqual(10)
    })
})
