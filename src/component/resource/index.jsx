// @flow
import * as Monolieta from 'Monolieta'
import * as React from 'react'
import Empty from 'component/empty'
import styled from 'styled-components'

const Message = styled.div`
    align-items: center;
    color: hsl(0, 0%, 90%);
    color: var(--color-font, hsl(0, 0%, 90%));
    display: flex;
    flex-direction: column;
    font-family: Roboto, sans-serif;
    font-size: 0.875rem;
    height: 100%;
    justify-content: center;
    text-align: center;
    width: 100%;
`

const Picture = React.lazy(() => {
    return import('component/picture')
})

const Virtual = React.lazy(() => {
    return import('component/virtual')
})

type PropType = {
    size?: Monolieta.Size,
    dataSource?: Array<Monolieta.Resource>,
    message: string,
    onSelecteResource?:
        | null
        | ((
              Monolieta.Resource,
              Array<Monolieta.Resource>
          ) => void | Promise<void>)
}

const Root = (props: PropType): React.Node => {
    const {
        message = '',
        dataSource = [],
        onSelecteResource = null,
        size = { width: 120, height: 120 }
    } = props

    const indexRef = React.useRef({})

    if (dataSource.length === 0) {
        return <Message>{message}</Message>
    }

    const onSelected = (id: string) => {
        const indexed = Object.keys(indexRef.current)
        if (indexed.length > 0) {
            if (indexed.includes(id)) {
                return
            }

            indexed.reverse().forEach((id) => {
                const current = dataSource.find(
                    (resource) => resource.id === id
                )

                if (current) {
                    current.selected = false
                }

                delete indexRef.current[id]
            })
        }

        const current = dataSource.find((resource, index) => {
            if (resource.id === id) {
                indexRef.current[id] = index
                return true
            }
            return false
        })

        if (current) {
            current.selected = !current.selected

            if (onSelecteResource) {
                onSelecteResource(current, dataSource)
            }
        }
    }

    return (
        <React.Suspense fallback={<Empty />}>
            <Virtual {...size} margin={4}>
                {dataSource.map((resource) => (
                    <Picture
                        key={resource.id}
                        id={resource.id}
                        width={size.width}
                        height={size.height}
                        file={resource.file}
                        selected={resource.selected}
                        onSelectedImage={onSelected}
                    />
                ))}
            </Virtual>
        </React.Suspense>
    )
}

Root.displayName = 'Resource'

export default Root
