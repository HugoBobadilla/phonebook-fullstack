
import { useEffect, useState } from 'react'
import personService from './services/persons'
import './App.css'
import AddPerson from './components/AddPerson'
import Persons from './components/Persons'
import Search from './components/Search'
import Notification from './components/Notification'

function App() {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notificationMsg, setNotificacionMsg] = useState(null)
  const [isError, setIsError] = useState(false)
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons=> {
        setPersons(initialPersons)
      })
  }, [])

  const handleNewName = (e) => {
    setNewName(e.target.value)
  }

  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value)
  }

  const handleFilter = (e) => {
    setFilter(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(newName === '' || phoneNumber === '') {
      alert('Name and Phone are required!')
    } else {
      const newPersonObj = {
        name: newName,
        number: phoneNumber
      }
      
      const person = persons.find(p => p.name.toLowerCase() === newPersonObj.name.toLowerCase())
      
      if(person !== undefined) {
        const answer = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
        if(answer) {
          const updatedPerson = {...person, number: phoneNumber}
          personService
            .update(updatedPerson)
            .then(returnedPerson => {
              const updatedPersonsArr = persons.map(p => p.name !== updatedPerson.name ? p : returnedPerson)
              setPersons(updatedPersonsArr)
              console.log(returnedPerson)
              setNotificacionMsg(`Updated ${updatedPerson.name}`)
              setNewName('')
              setPhoneNumber('')
              setIsError(false)
              setTimeout(() => {
                setNotificacionMsg(null)
              }, 5000)
            })
            .catch(error => {
              console.log(error.response.data)
              setNotificacionMsg(error.response.data.error)
              setIsError(true)
              setTimeout(() => {
                setNotificacionMsg(null)
              }, 5000)
            })
        }
      } else {
        personService
          .create(newPersonObj)
          .then(returnedPerson => {
            setPersons([...persons, returnedPerson])
            setNotificacionMsg(`Added ${newPersonObj.name}`)
            setNewName('')
            setPhoneNumber('')
            setIsError(false)
            setTimeout(() => {
              setNotificacionMsg(null)
            }, 5000)
          })
          .catch(error => {
            console.log(error.response.data)
            setNotificacionMsg('Name is required and must be at least 3 characters.')
            setIsError(true)
            setTimeout(() => {
              setNotificacionMsg(null)
            }, 5000)
          })
      }
    }
  }

  const deletePerson = (id) => {
    const personToRemove = persons.find(person => person.id === id)
    if(window.confirm(`Delete ${personToRemove.name} ?`)) {
      personService
      .remove(id)
      .then(returnedPerson => {
        const newPersonsArr = persons.filter(person => person.id !== id)
        setPersons(newPersonsArr)
      })
      .catch(error => {
        if(error.response.status === 404) {
          setNotificacionMsg(`Information of ${personToRemove.name} has already been removed from server`)
          setIsError(true)
          setTimeout(() => {
            setNotificacionMsg(null)
          }, 5000) 
        }
      })
    }
  }

  return (
    <div className='app'>
      <h1>Phonebook</h1>
      {
        notificationMsg !== null && (<Notification message={notificationMsg} isError={isError} />)
      }
      <Search 
        handleFilter={handleFilter}
        filter={filter}
      />
      <AddPerson
        handleSubmit={handleSubmit}
        handleNewName={handleNewName}
        handlePhoneNumber={handlePhoneNumber}
        newName={newName}
        phoneNumber={phoneNumber}
      />
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App
