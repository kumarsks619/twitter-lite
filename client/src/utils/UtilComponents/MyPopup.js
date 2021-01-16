import React from 'react'
import { Popup } from 'semantic-ui-react'



function MyPopup({ content, children, header }) {
    return (
        <Popup  content={content} trigger={children} inverted header={ header ? header : false } />
    )
}


export default MyPopup
