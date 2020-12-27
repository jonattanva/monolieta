import Group from '../index.jsx'

import {
    render,
    screen
} from '@testing-library/react'

describe('<Group />', function () {

    it('empty objects', function() {
        render(
            <Group />
        )

        expect(screen.getByText('To add an annotation instance, draw an object'))
            .toBeDefined()
    })

})