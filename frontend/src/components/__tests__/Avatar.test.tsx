// src/components/__tests__/Avatar.test.tsx
import { render, screen } from '@testing-library/react'
import Avatar from '../Avatar'

describe('Avatar', () => {
    it('renders correctly with given props', () => {
        render(<Avatar firstName="John" lastName="Doe" />)

        const avatar = screen.getByAltText('User Avatar')
        expect(avatar).toBeInTheDocument()
        expect(avatar).toHaveAttribute(
            'src',
            'https://robohash.org/John-Doe.png'
        )
    })

    it('updates when props change', () => {
        const { rerender } = render(<Avatar firstName="John" lastName="Doe" />)

        rerender(<Avatar firstName="Jane" lastName="Smith" />)

        const avatar = screen.getByAltText('User Avatar')
        expect(avatar).toHaveAttribute(
            'src',
            'https://robohash.org/Jane-Smith.png'
        )
    })
})