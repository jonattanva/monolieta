//@flow
import Explorer from '..'
import Session from 'component/session'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

describe('<Explorer />', function () {
    it('dismiss', async function () {
        const { container } = render(
            <Session>
                <Explorer />
            </Session>
        )

        const button = screen.getByRole('button')
        fireEvent.click(button)

        await waitFor(() => {
            expect(screen.getByRole('menu')).toBeDefined()
        })

        fireEvent.keyDown(container, { key: 'Escape' })
        fireEvent.keyUp(container, { key: 'Escape' })

        await waitFor(() => {
            expect(screen.queryByText(/new file/i)).toBeNull()
            expect(screen.queryByText(/new project/i)).toBeNull()
            expect(screen.queryByText(/open project/i)).toBeNull()
        })
    })

    it('new project', async function () {
        const onNewProject = jest.fn()
        render(
            <Session>
                <Explorer onNewProject={onNewProject} />
            </Session>
        )

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
})
