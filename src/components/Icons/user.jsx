import * as React from "react"

export function SvgUser(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={30}
      height={30}
      fill="currentColor"
      className="bi bi-person-fill"
      viewBox="0 0 16 16"
      {...props}
    >
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 100-6 3 3 0 000 6" />
    </svg>
  )
}