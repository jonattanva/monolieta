//@flow
import Search from '..'
import { render, screen, fireEvent } from '@testing-library/react'

describe('<Search />', function () {
    it('placeholder', function () {
        render(<Search placeholder="My placeholder" onEnter={() => {}} />)

        expect(screen.getByPlaceholderText('My placeholder')).toBeDefined()
    })

    it('search (Enter)', function () {
        const onEnter = jest.fn()
        render(<Search onEnter={onEnter} />)

        const input = screen.getByPlaceholderText('Search')
        fireEvent.keyDown(input, {
            key: 'Enter',
            keyCode: 13,
            target: {
                value: 'mock'
            }
        })

        expect(onEnter).toHaveBeenCalledTimes(1)
        expect(onEnter.mock.calls[0][0]).toEqual('mock')
    })
})
