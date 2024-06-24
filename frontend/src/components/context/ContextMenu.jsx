// src/components/context/ContextMenu.js

import React, { useState, useEffect } from 'react';
import './ContextMenu.css';

const ContextMenu = ({ options, onClose, navigate }) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ xPos: 0, yPos: 0 });

  useEffect(() => {
    const handleContextMenu = (event) => {
      event.preventDefault();
      setPosition({
        xPos: event.pageX + 2,
        yPos: event.pageY + 2,
      });
      setVisible(true);
    };

    const handleClick = () => {
      setVisible(false);
      onClose();
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('click', handleClick);
    };
  }, [onClose]);

  return (
    visible && (
      <ul className="context-menu" style={{ top: position.yPos, left: position.xPos }}>
        {options.map((option, index) => (
          <li key={index} onClick={() => {
            option.onClick();
            navigate(option.path);
          }}>
            {option.label}
          </li>
        ))}
      </ul>
    )
  );
};

export default ContextMenu;
