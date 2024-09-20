import React, { useEffect, useRef, useState } from 'react'
import Input from './Input'
import TextArea from './TextArea'

export default function ServiceForm({
  service,
  setService,
  setServices,
  editingRowId,
  setEditingRowId,
}) {
  const [errors, setErrors] = useState({})

  const validationConfig = {
    name: [
      { required: true, message: 'Please enter title' },
      { minLength: 2, message: 'Title should be at least 2 characters long' },
    ],
    description: [{ required: true, message: 'Please enter description' },
    { minLength: 50, message: 'Description should be at least 50 characters long' },
    ],
    price: [
      {
        required: true,
        message: 'Please enter an amount',
      },
      {
        pattern: /^[1-9]\d*(\.\d+)?$/,
        message: 'Please enter a valid number',
      },
    ],
  }

  const validate = (formData) => {
    const errorsData = {}

    Object.entries(formData).forEach(([key, value]) => {
      validationConfig[key].some((rule) => {
        if (rule.required && !value) {
          errorsData[key] = rule.message
          return true
        }

        if (rule.minLength && value.length < rule.minLength) {
          errorsData[key] = rule.message
          return true
        }

        if (rule.pattern && !rule.pattern.test(value)) {
          errorsData[key] = rule.message
          return true
        }
      })
    })

    setErrors(errorsData)
    return errorsData
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(service);

    const validateResult = validate(service)

    if (Object.keys(validateResult).length) return

    if (editingRowId) {
      setServices((prevState) =>
        prevState.map((prevService) => {
          if (prevService.id === editingRowId) {
            return { ...service, id: editingRowId }
          }
          return prevService
        })
      )
      setService({
        name: '',
        description: '',
        price: '',
      })
      setEditingRowId('')
      return
    }

    setServices((prevState) => [
      ...prevState,
      { ...service, id: crypto.randomUUID() },
    ])
    setService({
      name: '',
      description: '',
      price: '',
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setService((prevState) => ({
      ...prevState,
      [name]: value,
    }))
    setErrors({})
  }

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <Input
        label="Name"
        id="name"
        name="name"
        value={service.name}
        onChange={handleChange}
        error={errors.name}
      />
      <TextArea
        label="Description"
        id="description"
        name="description"
        value={service.description}
        onChange={handleChange}
        error={errors.description}
      />
      <Input
        label="Price"
        id="price"
        name="price"
        value={service.price}
        onChange={handleChange}
        error={errors.price}
      />
      <button className="add-btn">{editingRowId ? 'Save' : 'Add'}</button>
    </form>
  )
}