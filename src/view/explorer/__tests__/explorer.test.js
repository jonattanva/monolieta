//@flow
import Explorer from '..'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

describe('<Explorer />', function () {
    it('new file', async function () {
        const onNewFile = jest.fn()
        render(<Explorer onNewFile={onNewFile} project={{}} />)

        const button = screen.getByRole('button')
        fireEvent.click(button)

        await waitFor(() => {
            expect(screen.getByRole('menu')).toBeDefined()
        })

        const action = screen.getByText(/new file/i)
        expect(action).toBeDefined()

        fireEvent.click(action)
        expect(onNewFile).toHaveBeenCalledTimes(0)
    })

    it('new project', async function () {
        const onNewProject = jest.fn()
        render(<Explorer onNewProject={onNewProject} project={{}} />)

        const button = screen.getByRole('button')
        fireEvent.click(button)

        await waitFor(() => {
            expect(screen.getByRole('menu')).toBeDefined()
        })

        const action = screen.getByText(/new project/i)
        expect(action).toBeDefined()

        fireEvent.click(action)
        expect(onNewProject).toHaveBeenCalledTimes(1)
    })

    it('open project', async function () {
        const onOpenProject = jest.fn()
        render(<Explorer onOpenProject={onOpenProject} project={{}} />)

        const button = screen.getByRole('button')
        fireEvent.click(button)

        await waitFor(() => {
            expect(screen.getByRole('menu')).toBeDefined()
        })

        const action = screen.getByText(/open project/i)
        expect(action).toBeDefined()

        fireEvent.click(action)
        expect(onOpenProject).toHaveBeenCalledTimes(1)
    })
})
