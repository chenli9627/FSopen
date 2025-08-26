const Filter = ({ newFilter, setNewFilter }) => {
  const addNewFilter = (event) => {
    setNewFilter(event.target.value)
  }
  return (
    <div>
      <form >
        <div>
          filter shown with<input onChange={addNewFilter} value={newFilter} />
        </div>
      </form>
    </div>
  )
}


export default Filter
