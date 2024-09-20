import React, { useState } from 'react'
import { useFilter } from '../hooks/useFilter'
import ContextMenu from './ContextMenu'

export default function ServiceTable({
  services,
  setService,
  setServices,
  setEditingRowId,
}) {
  const [filteredData, setQuery] = useFilter(services, (data) => data.description)
  const [menuPosition, setMenuPosition] = useState({})
  const [rowId, setRowId] = useState('')



  return (
    <>
      <ContextMenu
        menuPosition={menuPosition}
        setService={setService}
        setMenuPosition={setMenuPosition}
        services={services}
        setServices={setServices}
        rowId={rowId}
        setEditingRowId={setEditingRowId}
      />
      <table className="service-table" onClick={() => setMenuPosition({})}>
        <caption>To edit or delete a row, simply right-click on the desired row to open the context menu.</caption>
        <thead>
          <tr>
            <th className="name-column">Name</th>
            <th>
              Description
            </th>
            <th className="amount-column">
              <div>
                <span>Price</span>

              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(({ id, name, description, price }) => (
            <tr
              key={id}
              onContextMenu={(e) => {
                e.preventDefault()
                setMenuPosition({ left: e.clientX + 4, top: e.clientY + 4 })
                setRowId(id)
              }}
            >
              <td>{name}</td>
              <td>{description}</td>
              <td>₹{price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}