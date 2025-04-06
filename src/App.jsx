

import { useState } from 'react'
import './App.css'

function App() {
  const [input, setInput] = useState('')
  const [list, setList] = useState([])
  const [editIndex, setEditIndex] = useState(null) // Track index of item being edited
  const [err, seterr] = useState(false)

  // function changeerr()
  // {
  //   seterr(false)
  // }
  // Add or update item in list
  const handleItemList = () => {
    if (!input) {
      seterr(true)
      return
    }

    if (editIndex !== null) {
      // If in edit mode, update item
      const updatedList = list.map((item, index) =>
        index === editIndex ? input : item
      )
      setList(updatedList)
      setEditIndex(null) // Reset edit mode
    } else {
      // Otherwise, add a new item
      setList([...list, input])
    }

    setInput('') // Clear input field
  }

  // Handle edit action
  const handleEdit = (index) => {
    setInput(list[index]) // Set selected item in input field
    setEditIndex(index) // Set index for edit mode
  }

  // Handle delete action
  const handleDelete = (index) => {
    setList(list.filter((_, i) => i !== index)) // Remove item from list
    if (editIndex === index) {
      setEditIndex(null)
      setInput('')
    }
  }

  return (
   <>
       <h1 className="card-title">React Item List Manager</h1>
     <div className="container">
      <div className="card">
        <div className="card-body"> 
        

          <div className="form-group">
            <label htmlFor="itemInput" className="form-label">
              Item Name
            </label>
            <input
              type="text"
              className="form-control"
              id="itemInput"
              placeholder="Enter Item Name"
              value={input}
              // onFocus={()=>changeerr()}
              onChange={(event) => {
                setInput(event.target.value)
                seterr(false)
              }}
            />
            {err && (
              <p className="error">Please enter input before adding to list</p>
            )}
          </div>

          <button className="btn btn-primary addbtn" onClick={handleItemList}>
            {editIndex !== null ? 'Update Item' : 'Add Item'}
          </button>

          <div>
             <ul>
              {list.map((item, index) => { 

        

return <li key={index} className="list-item">
      {item}
      <button
        className="btn btn-warning btn-sm"
        onClick={() => handleEdit(index)}
      >
        Edit
      </button>
      <button
        className="btn btn-danger btn-sm"
        onClick={() => handleDelete(index)}
      >
        Delete
      </button>
    </li>

}          
              )}
            </ul> 


          </div>
         </div>
      </div>
    </div> 
   </>
  )
}

export default App
