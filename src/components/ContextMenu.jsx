import React from 'react'

export default function ContextMenu({
  menuPosition,
  setMenuPosition,
  setServices,
  setService,
  services,
  setEditingRowId,
  rowId,
}) {
  if (!menuPosition.left) return
  return (
    <div className="context-menu" style={{ ...menuPosition }}>
      <div
        onClick={() => {
          const { name, description, price } = services.find(
            (service) => service.id === rowId
          )
          setEditingRowId(rowId)
          setService({ name, description, price })
          setMenuPosition({})
        }}
      >
        Edit
      </div>
      <div
        onClick={() => {
          setServices((prevState) =>
            prevState.filter((service) => service.id !== rowId)
          )
          setMenuPosition({})
        }}
      >
        Delete
      </div>
    </div>
  )
}