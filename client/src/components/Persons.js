import React from 'react'
import Person from './Person'

const Persons = ({ persons, deletePerson }) => {
  if(persons.length <= 0) {
    return (
      <p>No contacts added to list.</p>
    )
  } else {
    return (
      <div className='contacts-list'>
        <h2>Contacts</h2>
        {persons.map(person => (
          <Person 
            key={person.id} 
            person={person} 
            deletePerson={deletePerson}
          />
        ))}
      </div>
    )
  }
}

export default Persons