import Classes from '../index.jsx'

import {
    render,
    screen
} from '@testing-library/react'

describe('<Classes />', function () {

    it('empty project', function() {
        render(
            <Classes />
        )

        expect(screen.getByText('Your class list is empty'))
            .toBeDefined()
    })

})