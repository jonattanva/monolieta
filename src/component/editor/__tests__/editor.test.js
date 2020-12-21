import Editor from '../index.jsx'

import {
    render,
    screen,
    fireEvent
} from '@testing-library/react'

describe('<Editor />', function () {

    it('empty project', function() {
        render(
            <Editor />
        )

        expect(screen.getByText('You have not yet opened a folder'))
            .toBeDefined()
    })

    it('open project', function () {
        const onOpenFolder = jest.fn()
        render(
            <Editor onOpenFolder={ onOpenFolder } />
        )

        const button = screen.getByText('Open folder')
        fireEvent.click(button)

        expect(onOpenFolder).toHaveBeenCalledTimes(1)
    })
})
