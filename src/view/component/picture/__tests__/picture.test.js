import Picture from '..'
import { render, screen, fireEvent } from '@testing-library/react'
import 'jest-styled-components'

describe('<Picture />', function () {
    it('select', function () {
        const onSelectedImage = jest.fn()
        render(<Picture onSelectedImage={onSelectedImage} />)

        const image = screen.getByRole('image', {
            hidden: true
        })
        fireEvent.click(image)

        expect(onSelectedImage).toHaveBeenCalledTimes(1)
        expect(onSelectedImage.mock.calls[0][0]).toEqual(true)
    })

    it('delete', function () {
        const onDeletedImage = jest.fn()
        render(<Picture onDeletedImage={onDeletedImage} selected={true} />)

        const cover = screen.getByRole('cover')
        fireEvent.keyDown(cover, { key: 'Meta' })
        fireEvent.keyDown(cover, { key: 'Backspace' })

        fireEvent.keyUp(cover, { key: 'Backspace' })
        fireEvent.keyUp(cover, { key: 'Meta' })

        expect(onDeletedImage).toHaveBeenCalledTimes(1)
    })

    it('load', function () {
        const onUploadedImage = jest.fn()
        render(<Picture image="fake.jpg" onUploadedImage={onUploadedImage} />)

        const image = screen.getByRole('image', {
            hidden: true
        })
        fireEvent.load(image)

        expect(onUploadedImage).toHaveBeenCalledTimes(1)
    })
})
