import React from "react"
import { Link } from "react-router-dom"

export default function CustomLink({ to, children, style }) {
  return (
    <Link to={to} style={{ textDecoration: "none", ...style }}>
      {children}
    </Link>
  )
}
