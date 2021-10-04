import React from 'react'
import { render, waitFor, cleanup, screen} from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import '@testing-library/jest-dom'

import {App} from '../ui/App'

describe('Testing with error', () => {
    let initialFetch
    beforeEach(() => {
        initialFetch = global.fetch
    })
    afterEach(() => {
        global.fetch = initialFetch
        cleanup()
    })

    global.fetch = jest.fn(() =>
        Promise.reject("Something wrong")
    )

    it('Home page should show error message', async () => {
        await act(async () => {
            render(
                <App />
            )
        })

        await waitFor(() => {
            expect(screen.getByTestId('error')).toBeInTheDocument()
        })

        expect(screen.queryByTestId('carousel')).not.toBeInTheDocument()        
    })
})