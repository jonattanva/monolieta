//@flow
import Picture from '..'
import * as React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

describe('<Picture />', function () {
    it('select', function () {
        const onSelectedImage = jest.fn()
        const file = new window.File(['(⌐□_□)'], 'chucknorris.png', {
            type: 'image/png'
        })

        render(
            <Picture
                image={file}
                onSelectedImage={onSelectedImage}
                id="2758b85b-8c13-4e7d-8147-ff537278eff7"
            />
        )

        const image = screen.getByRole('image', {
            hidden: true
        })
        fireEvent.click(image)

        expect(onSelectedImage).toHaveBeenCalledTimes(1)
        expect(onSelectedImage.mock.calls[0][0]).toEqual(
            '2758b85b-8c13-4e7d-8147-ff537278eff7'
        )
    })

    it('delete', function () {
        const onDeletedImage = jest.fn()
        const file = new window.File(['(⌐□_□)'], 'chucknorris.png', {
            type: 'image/png'
        })

        render(
            <Picture
                image={file}
                selected={true}
                onDeletedImage={onDeletedImage}
                id="2758b85b-8c13-4e7d-8147-ff537278eff7"
            />
        )

        const cover = screen.getByRole('cover')
        fireEvent.keyDown(cover, { key: 'Meta' })
        fireEvent.keyDown(cover, { key: 'Backspace' })

        fireEvent.keyUp(cover, { key: 'Backspace' })
        fireEvent.keyUp(cover, { key: 'Meta' })

        expect(onDeletedImage).toHaveBeenCalledTimes(1)
        expect(onDeletedImage.mock.calls[0][0]).toEqual(
            '2758b85b-8c13-4e7d-8147-ff537278eff7'
        )
    })
})
