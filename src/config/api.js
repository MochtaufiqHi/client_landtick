import axios from "axios";

export const API = axios.create({
  baseURL: 'http://localhost:1323/api/v1/'
})

export const TRAIN = axios.create({
  baseURL: 'https://booking.kai.id/api/stations2'
})

export const setAuthToken = (token) => {
  if(token) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete API.defaults.headers.common['Authorization']
  }
}