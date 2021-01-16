import React from 'react'
import { Popup } from 'semantic-ui-react'



function MyPopup({ content, children }) {
    return (
        <Popup  content={content} trigger={children} inverted />
    )
}


export default MyPopup
