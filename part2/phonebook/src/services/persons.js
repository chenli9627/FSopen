import axios from 'axios'
const baseUrl = 'http://localhost:3002/persons'

const getAll = async () => {
  const request = await axios.get(baseUrl)
  console.log('getAll fetched info', request)
  return request.data
  // return request.then(request => request.data)
}
const create = async (newObject) => {
  const request = await axios.post(baseUrl, newObject)
  console.log('create responsed info', request)
  return request.data
  // return request.then(response => response.data)
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

export default { deleteOnePerson, create, getAll }
