import React from 'react'

const Search = ({ handleFilter, filter }) => {
  return (
    <>
      <div className='search-field'>
        <label htmlFor="filter">Filter contact</label>
        <input 
            className='input-field'
            type="text" 
            name="filter" 
            id="filter" 
            onChange={handleFilter} 
            value={filter} 
          />
      </div>
    </>
  )
}

export default Search