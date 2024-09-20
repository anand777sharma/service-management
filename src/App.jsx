import { useState } from 'react'
import './App.css'
import serviceData from './data'
import { useLocalStorage } from './hooks/useLocalStorage'
import ServiceForm from './components/ServiceForm'
import ServiceTable from './components/ServiceTable'

function App() {
  const [service, setService] = useLocalStorage('service', {
    name: '',
    description: '',
    price: '',
  })
  const [services, setServices] = useLocalStorage('services', serviceData)
  const [editingRowId, setEditingRowId] = useLocalStorage('editingRowId', '')

  return (
    <main>
      <h1>Healthcare Services</h1>
      <div className="expense-tracker">
        <ServiceForm
          setServices={setServices}
          service={service}
          setService={setService}
          editingRowId={editingRowId}
          setEditingRowId={setEditingRowId}
        />
        <ServiceTable
          services={services}
          setService={setService}
          setServices={setServices}
          setEditingRowId={setEditingRowId}
        />
      </div>
    </main>
  )
}

export default App