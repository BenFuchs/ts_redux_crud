import axios from 'axios'
import { Product } from '../models/Product'
const SERVER = 'http://localhost:5000/products'

export function getData() {
   return axios<Product[]>(SERVER)
}

export function addData(prod:Product) {
    console.log(prod)
    return axios.post<Product>(SERVER, prod)
}

export function delData(id:String) {
    return axios.delete<Product>(SERVER + '/' + id)
}

export function updData(prod:Product, id:String) {
    return axios.put<Product>(SERVER + '/' + id, prod)
}