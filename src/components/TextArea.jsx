import React from 'react'

export default function TextArea({ label, id, name, value, onChange, error }) {
  return (
    <div className="input-container">
      <label htmlFor={id}>{label}</label>
      <textarea id={id} name={name} value={value} onChange={onChange} />
      <p className="error">{error}</p>
    </div>
  )
}