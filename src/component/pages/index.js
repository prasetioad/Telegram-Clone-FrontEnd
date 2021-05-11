import React from 'react'
import { useEffect } from 'react'
import { useHistory } from 'react-router'

function Index() {
    const history = useHistory()
    useEffect(() => {
        history.push('./home')
    }, [])
    return (
        <div>
            
        </div>
    )
}

export default Index
