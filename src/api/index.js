import { post, get } from '../utils/request'

export const login = (url, data) => {
  return post(url, data)
}

export const getNearbyList = (url, params = {}) => {
  return get(url, params)
}

export const getHotShop = (url, params) => {
  return get(url, params)
}

export const getProductWithId = (url, params) => {
  return get(url, params)
}