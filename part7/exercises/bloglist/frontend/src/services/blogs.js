import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const create = async (newItem) => {
  const config = {
    headers: { Authorization: token },
  }

  const res = await axios.post(baseUrl, newItem, config)
  return res.data
}

const update = async (itemToUpdate) => {
  const config = {
    headers: { Authorization: token },
  }

  const res = await axios.put(
    `${baseUrl}/${itemToUpdate.id}`,
    itemToUpdate,
    config
  )

  return res.data
}

const remove = async (itemToRemove) => {
  const config = {
    headers: { Authorization: token },
  }

  const res = await axios.delete(`${baseUrl}/${itemToRemove.id}`, config)
  return res.data
}

const comment = async (id, content) => {
  const res = await axios.post(`${baseUrl}/${id}/comments`, content)
  return res.data
}

export default { getAll, create, setToken, update, remove, comment }
