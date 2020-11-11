import React, { useState } from 'react'
import { NewItemForm } from './NewItemForm'
import { AddItemButton } from './styles'

interface AddNewItemProps {
  onAdd(text: string): void;
  toggleButtonText: string;
  dark?: boolean
}

export const AddNewItem = (props: AddNewItemProps) => {
  const [showFrom, setShowFrom] = useState(false)
  const { onAdd, toggleButtonText, dark } = props

  if (showFrom) {
    return (
      <NewItemForm onAdd={text => {
        onAdd(text)
        setShowFrom(false)
      }} />
    )
  }

  return (
    <AddItemButton dark={dark} onClick={() => setShowFrom(true)}>
      {toggleButtonText}
    </AddItemButton>
  )
}
