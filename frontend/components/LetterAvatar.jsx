import React from "react";

// Utility functions
function getInitials(name) {
  const firstNameInitial = name.split(" ")[0][0].toUpperCase();
  const lastNameInitial = name.split(" ")[1][0].toUpperCase();

  return `${firstNameInitial}${lastNameInitial}`;
}

function generateBackground(name) {
  let hash = 0;
  let i;

  for (i = 0; i < name.length; i += 1) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

export default function LetteredAvatar({ name, size, onClick }) {
  let initials = getInitials(name);
  let color = generateBackground(name);
  const fontSize = Math.floor((size * 2) / 5);

  const customStyle = {
    display: "flex",
    height: `${size}px`,
    width: `${size}px`,
    color: "white",
    background: color,
    justifyContent: "center",
    alignItems: "center",
    fontSize: `${fontSize}px`,
    cursor: "pointer",
  };

  return (
    <div style={customStyle} onClick={onClick}>
      <span>{initials}</span>
    </div>
  );
}