//@flow
import Option from '..'
import { render, screen, fireEvent } from '@testing-library/react'

describe('<Option />', function () {
    it('new file', function () {
        const onNewFile = jest.fn()
        render(<Option onNewFile={onNewFile} />)

        const buttons = screen.getAllByRole('button')
        fireEvent.click(buttons[0])

        expect(onNewFile).toHaveBeenCalledTimes(1)
    })

    it('new project', function () {
        const onNewProject = jest.fn()
        render(<Option onNewProject={onNewProject} />)

        const buttons = screen.getAllByRole('button')
        fireEvent.click(buttons[1])

        expect(onNewProject).toHaveBeenCalledTimes(1)
    })

    it('open project', function () {
        const onOpenProject = jest.fn()
        render(<Option onOpenProject={onOpenProject} />)

        const buttons = screen.getAllByRole('button')
        fireEvent.click(buttons[2])

        expect(onOpenProject).toHaveBeenCalledTimes(1)
    })
})
