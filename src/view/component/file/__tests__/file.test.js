// @flow
import File from '..'
import * as React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

describe('<File />', function () {
    it('files added', function () {
        const onFilesAdded = jest.fn()
        render(<File onFilesAdded={onFilesAdded}>Upload</File>)

        const file = new window.File(['(⌐□_□)'], 'chucknorris.png', {
            type: 'image/png'
        })

        const input = screen.getByRole('input', { hidden: true })
        fireEvent.change(input, { target: { files: [file] } })

        const elements = onFilesAdded.mock.calls[0][0]
        expect(onFilesAdded).toHaveBeenCalledTimes(1)
        expect(elements.length).toEqual(1)
    })
})
