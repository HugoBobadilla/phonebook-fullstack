import React from 'react'

const Person = ({ person, deletePerson }) => {
  return (
      <div className='person-item'>
        <div className='info'>
        <p>{person.name}</p>
        <p><span className='info-number'>Number: </span>{person.number}</p>
        </div>
        <button className='btn btn-delete' onClick={() => deletePerson(person.id)}>delete</button>
      </div>
  )
}

export default Person
