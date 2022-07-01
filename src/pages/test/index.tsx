import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import { store } from './store'

export const Test = observer(() => {
    const { init, inited } = store
    useEffect(() => {
        init()
    }, [])
    return (
        <>test
            {inited ? <div>inited = true</div> : <div>inited = false</div>}
        </>
    )
})
