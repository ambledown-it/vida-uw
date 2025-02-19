import { useState } from 'react'

const Menu = () => {
  const [activeItem, setActiveItem] = useState('applications')

  const menuItems = [
    { id: 'applications', label: 'Applications', disabled: false },
    { id: 'claims', label: 'Claims', disabled: true },
    { id: 'analytics', label: 'Analytics', disabled: true }
  ]

  return (
    <div className="flex items-center h-14">
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => !item.disabled && setActiveItem(item.id)}
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