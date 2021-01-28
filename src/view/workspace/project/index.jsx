// @flow
import * as React from 'react'
import { nanoid } from 'nanoid'
import styled from 'styled-components'
import Text from 'component/text'
import Button from 'component/button'
import { saveFile } from 'utils/fs.js'
import { Session } from 'component/session'
import { generateWorkSpace } from 'utils/workspace.js'

const Project = styled.div`
    background-color: hsl(220, 13%, 20%);
    background-color: var(--color-secondary-panel, hsl(220, 13%, 20%));
    box-sizing: border-box;
    height: 100%;
    padding: 16px;
    width: 100%;
`

const Body = styled.div`
    background-color: hsl(220, 13%, 20%);
    background-color: var(--color-secondary-panel, hsl(220, 13%, 20%));
    box-sizing: border-box;
    margin: 0 auto;
    width: 50%;
`

const Title = styled.div`
    color: hsl(0, 0%, 90%);
    color: var(--color-font, hsl(0, 0%, 90%));
    cursor: default;
    font-family: Roboto, sans-serif;
    font-size: 1.25em;
    font-weight: 500;
    margin-bottom: 16px;
    user-select: none;
    width: 100%;
`

const Row = styled.div`
    margin: 8px 0;
`

const Label = styled.div`
    color: hsl(219, 13%, 66%);
    color: var(--color-font-variant, hsl(219, 13%, 66%));
    cursor: default;
    font-family: Roboto, sans-serif;
    font-size: 0.875rem;
    user-select: none;
`

const Warning = styled.div`
    color: #e60013;
    color: var(--color-alert, #e60013);
    font-family: Roboto, sans-serif;
    font-size: 0.875rem;
`

const Action = styled(Row)`
    align-items: center;
    display: flex;
    justify-content: flex-end;
    width: 100%;
`

const Cancel = styled(Button)`
    background-color: hsl(220, 13%, 15%);
    background-color: var(--color-primary-panel, hsl(220, 13%, 15%));
    margin: 0 8px;

    &:active {
        background-color: hsl(220, 13%, 25%);
        background-color: var(
            --color-primary-panel-variant: hsl(220, 13%, 25%)
        );
    }
`

type PropsType = {
    onCloseProject: () => void
}

const useInput = (initial: string = '') => {
    const [value, setValue] = React.useState(initial)

    const onChange = React.useCallback(
        (value: string) => {
            setValue(value)
        },
        [setValue]
    )

    return {
        onChange,
        value
    }
}

const Root = (props: PropsType): React.Node => {
    const { dispatch } = React.useContext(Session)

    const name = useInput('')
    const [isNameWarning, setNameWarning] = React.useState(false)

    const onNewProject = React.useCallback(() => {
        if (!name.value) {
            setNameWarning(true)
            return
        }

        const key = nanoid()
        const workspace = generateWorkSpace(key, name.value)

        saveFile(workspace, {
            filename: 'workspace',
            accept: {
                'application/json': ['.json', '.eva']
            }
        }).then(() => {
            dispatch({
                type: '/start',
                project: {
                    key,
                    name: name.value
                }
            })

            if (props.onCloseProject) {
                props.onCloseProject()
            }
        })
    }, [name.value, dispatch, props])

    return (
        <Project>
            <Body>
                <Title>New project</Title>
                <Row>
                    <Label>Name project</Label>
                    <Text {...name} />
                    {isNameWarning && (
                        <Warning>The project name is required</Warning>
                    )}
                </Row>
                <Action>
                    <Cancel onClick={props.onCloseProject}>Cancel</Cancel>
                    <Button onClick={onNewProject}>Create</Button>
                </Action>
            </Body>
        </Project>
    )
}

Root.displayName = 'Project'

export default (React.memo<PropsType>(Root): React.AbstractComponent<
    PropsType,
    mixed
>)
