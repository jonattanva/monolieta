//@flow
import Picture from '..'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

describe('<Picture />', function () {
    it('select', function () {
        const onSelectedImage = jest.fn()
        const file = new window.File(['(⌐□_□)'], 'chucknorris.png', {
            type: 'image/png'
        })

        render(
            <Picture
                id="2758b85b"
                file={file}
                onSelectedImage={onSelectedImage}
            />
        )

        const image = screen.getByRole('image', {
            hidden: true
        })
        fireEvent.click(image)

        expect(onSelectedImage).toHaveBeenCalledTimes(1)
        expect(onSelectedImage.mock.calls[0][0]).toEqual('2758b85b')
    })

    it('load', async function () {
        const onUploadedImage = jest.fn()
        const file = new window.File(['23 43 21'], 'chucknorris.png', {
            type: 'image/png'
        })

        render(
            <Picture
                id="ff537278eff7"
                file={file}
                onUploadedImage={onUploadedImage}
            />
        )

        await waitFor(() => {
            expect(onUploadedImage).toHaveBeenCalledTimes(1)
            expect(onUploadedImage.mock.calls[0][0]).toEqual('ff537278eff7')
        })
    })
})
