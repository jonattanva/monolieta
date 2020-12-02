import { memo } from 'react'
import styled from 'styled-components'

import Folder from '../icon/folder.jsx'

const Body = styled.div`
	background-color: hsl(220, 13%, 23%);
	height: 100%;
	left: 0;
	position: absolute;
	width: 48px;
`

export default memo(() => {
	return (
		<Body>
			<div>
				<div>
					<Folder />
				</div>
				<div>Project</div>
			</div>
		</Body>
	)
})