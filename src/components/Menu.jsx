import { useState } from 'react'
import useAppStore from '../store/useAppStore'

const Menu = () => {
  const activeItem = useAppStore(state => state.activeMenuItem)
  const setActiveMenuItem = useAppStore(state => state.setActiveMenuItem)

  const menuItems = [
    { id: 'applications', label: 'Applications', disabled: false },
    { id: 'claims', label: 'Claims', disabled: true },
    { id: 'analytics', label: 'Analytics', disabled: false }
  ]

  const handleMenuClick = (itemId) => {
    if (itemId !== activeItem) {
      setActiveMenuItem(itemId)
    }
  }

  return (
    <div className="flex items-center h-14">
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => !item.disabled && handleMenuClick(item.id)}
          disabled={item.disabled}
          className={`
            menu-button
            ${activeItem === item.id ? 'active' : ''}
          `}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}

export default Menu 