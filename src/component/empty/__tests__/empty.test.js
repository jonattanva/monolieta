//@flow
import Empty from '..'
import { render, screen } from '@testing-library/react'
import 'jest-styled-components'

describe('<Empty />', function () {
    it('none', function () {
        render(<Empty />)
        const container = screen.getByRole('empty', {
            hidden: true
        })
        expect(container).toHaveStyleRule('display', 'none')
    })
})
