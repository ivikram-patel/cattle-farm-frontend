/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import FullPageLoader from 'ui-component/FullPageLoader'

export const useFullPageLoader = () => {
    const [loading, setLoading] = useState(false)
    return [
        loading ? <FullPageLoader /> : null,
        () => setLoading(true),  //Show Loader
        () => setLoading(false),  //Hide Loader
    ]
}
