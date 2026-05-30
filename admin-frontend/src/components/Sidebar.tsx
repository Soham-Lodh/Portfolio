import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Folders, Mail } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const menuItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: 'Projects',
      path: '/projects',
      icon: <Folders size={20} />,
    },
    {
      name: 'Messages',
      path: '/messages',
      icon: <Mail size={20} />,
    },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-bg-deep border-r border-accent-red/20 pt-20">
      <nav className="flex flex-col gap-2 p-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-accent-red/20 text-accent-red'
                  : 'text-text-light hover:bg-bg-mid'
              }`
            }
          >
            {item.icon}
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
