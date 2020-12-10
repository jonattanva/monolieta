import Range from '../index.jsx'
import renderer from 'react-test-renderer'
import { act, Simulate } from 'react-dom/test-utils'
import { render, unmountComponentAtNode } from 'react-dom'

let container = null
beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
})

afterEach(() => {
    unmountComponentAtNode(container)
    container.remove()
    container = null
})

describe('<Range />', function () {

    it('value', function () {
        const node = renderer.create(
            <Range value={ 60 } />
        ).toJSON()

        expect(node.props.style.backgroundImage)
            .toEqual('linear-gradient(to right, #6200ee 60%, #f5f5f5 0)')
    })

    it('change', async function () {
        const props = {
            onChange: jest.fn(),
            value: 20
        }

        act(() => {
            render(
                <Range { ...props } />, container
            )
        })

        const component = container.querySelector('input')
        await act( async() => {
            Simulate.change(component)
        })

        expect(props.onChange).toHaveBeenCalledTimes(1)
    })
})