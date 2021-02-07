//@flow
import Picture from '..'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

describe('<Picture />', function () {
    /*
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

    it('load', async function () {
        const onUploadedImage = jest.fn()
        const file = new window.File(['23 43 21'], 'chucknorris.png', {
            type: 'image/png'
        })

        render(
            <Picture
                image={file}
                onUploadedImage={onUploadedImage}
                id="2758b85b-8c13-4e7d-8147-ff537278eff7"
            />
        )

        await waitFor(
            () => {
                expect(onUploadedImage).toHaveBeenCalledTimes(1)
                expect(onUploadedImage.mock.calls[0][0]).toEqual(
                    '2758b85b-8c13-4e7d-8147-ff537278eff7'
                )
            },
            { timeout: 1000 }
        )
    })
    */
})
