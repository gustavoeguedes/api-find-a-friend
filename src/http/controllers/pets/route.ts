import { FastifyInstance } from 'fastify'
import { create } from './create'
import { fetchPetsByCity } from './fetch-pets-by-city'
import { findPetById } from './find-pet-by-id'

export function petsRoutes(app: FastifyInstance) {
  app.post('/pets', create)
  app.get('/pets/:id', findPetById)
  app.get('/pets', fetchPetsByCity)
}
