import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'

describe('Core Features', () => {
  it('main components are rendered', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )
    
    const banner = await screen.findByRole('banner', {}, { timeout: 2000 })
    const nav = await screen.findByRole('navigation', {}, { timeout: 2000 })
    const main = await screen.findByRole('main', {}, { timeout: 2000 })
    
    expect(banner).toBeInTheDocument()
    expect(nav).toBeInTheDocument()
    expect(main).toBeInTheDocument()
  })
})