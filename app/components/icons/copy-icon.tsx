import React from 'react'

const CopyIcon: React.FC<{
  width?: number
  height?: number
  color?: string
}> = ({ height = 24, width = 24, color = 'currentColor' }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17 3H9C5.68629 3 3 5.68629 3 9V17"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <rect
        x="7"
        y="7"
        width="14"
        height="14"
        rx="4"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export default CopyIcon
