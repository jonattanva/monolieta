//@flow
import { readFile, readJson } from '..'

describe('Read', function () {
    it('read json', async function () {
        await expect(
            readJson(
                new window.File([`Lorem ipsum dolor sit amet`], 'mock.json', {
                    type: 'application/json'
                })
            )
        ).rejects.toThrow()

        const file = await readJson(
            new window.File([`{"version":1, "name": "mock"}`], 'mock.json', {
                type: 'application/json'
            })
        )

        expect(file.version).toEqual(1)
        expect(file.name).toEqual('mock')
    })

    it('read file', async function () {
        const file = await readFile(
            new window.File(
                [
                    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis libero velit, nec consequat libero aliquet a. Donec luctus quis eros a vehicula. Nunc dictum risus eu lectus sodales ultricies. Vivamus condimentum dictum egestas. Sed ligula neque, facilisis a odio id, facilisis accumsan risus. Etiam accumsan massa eget placerat pretium. In hac habitasse platea dictumst. Mauris condimentum pulvinar libero a consectetur. Pellentesque suscipit cursus sem in viverra. Sed rhoncus vestibulum odio eu tincidunt. Aenean nisi ante, consectetur eu tincidunt vel, ullamcorper a odio. Nam pellentesque lacinia dapibus.`
                ],
                'text.txt',
                {
                    type: 'text/plain'
                }
            )
        )

        expect(file).toEqual(
            `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis libero velit, nec consequat libero aliquet a. Donec luctus quis eros a vehicula. Nunc dictum risus eu lectus sodales ultricies. Vivamus condimentum dictum egestas. Sed ligula neque, facilisis a odio id, facilisis accumsan risus. Etiam accumsan massa eget placerat pretium. In hac habitasse platea dictumst. Mauris condimentum pulvinar libero a consectetur. Pellentesque suscipit cursus sem in viverra. Sed rhoncus vestibulum odio eu tincidunt. Aenean nisi ante, consectetur eu tincidunt vel, ullamcorper a odio. Nam pellentesque lacinia dapibus.`
        )
    })
})
