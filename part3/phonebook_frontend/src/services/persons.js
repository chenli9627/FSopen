import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = async () => {
  const request = await axios.get(baseUrl)
  console.log('getAll fetched info', request)
  return request.data
}

const create = async (newObject) => {
  const request = await axios.post(baseUrl, newObject)
  console.log('create responsed info', request)
  return request.data
}

const deleteOnePerson = async (id) => {
  try {
    const request = await axios.delete(`${baseUrl}/${id}`)
    console.log('delete success', id)
    return request
  } catch (error) {
    console.log('delete failed', id, error)
  }
}

const updateOnePerson = async (id, newObject) => {
  try {
    const request = await axios.put(`${baseUrl}/${id}`, newObject)
    console.log(request, 'this is axios.put returned newObject(update)')
    console.log('update success', id)
    return request
  } catch (error) {
    console.log('update failed', id, error)
  }
}

export default { deleteOnePerson, create, getAll, updateOnePerson }
