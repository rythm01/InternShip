import React from "react"
import { useRef } from "react"
import { useState } from "react"
import { IoEllipsisHorizontalOutline, IoEllipsisVerticalOutline } from "react-icons/io5"
import Container from "./Container"
import MenuContainer from "./MenuContainer"
import MenuItem from "./MenuItem"

export default function OptionsMenu({ options, orientation = "vertical", color = "rgba(0, 0, 0, 1)", position }) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)

  return (
    <Container
      position={position}
      ref={containerRef}
      onFocus={() => setIsOpen(v => !v)}
      onBlur={() => setIsOpen(false)}
    >
      {orientation === 'vertical' ? <IoEllipsisVerticalOutline color={color} /> : <IoEllipsisHorizontalOutline color={color} />}
      {isOpen && (
        <MenuContainer>
          {options.map((option, index) => (
            <MenuItem
             
              width="152px"
              key={index}
              onClick={() => {
                option.onClick()
                containerRef.current.blur()
              }}
            >
              {option.Icon && <img style={{ width: '19px', height: '19px', objectFit: 'cover', objectPosition:'center', marginBottom:'-5px', marginRight:'8px' }} src={option.Icon} />}{option.text}
            </MenuItem>
          ))}
        </MenuContainer>
      )}
    </Container>
  )
}
