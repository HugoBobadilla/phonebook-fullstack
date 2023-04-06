import React from 'react'

const AddPerson = ({
  handleSubmit,
  handleNewName,
  handlePhoneNumber,
  newName,
  phoneNumber
}) => {
  return (
    <form className='form' onSubmit={handleSubmit}>
      <h3>Add a New Contact</h3>
      <div>
        <label htmlFor='name'>Name:</label>
        <input 
          className='input-field' 
          onChange={handleNewName} 
          value={newName} id='name'
        />
      </div>
      <div>
        <label htmlFor='number'>Number:</label>
        <input 
          className='input-field' 
          onChange={handlePhoneNumber} 
          value={phoneNumber} id='number'
        />
      </div>
      <div>
        <button type='submit' className='btn btn-submit'>add</button>
      </div>
    </form>
  )
}

export default AddPerson