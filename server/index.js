const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const Contact = require('./models/contact')
const errorHandler = require('./middlewares/ErrorHandler')

app.use(express.json())
app.use(express.static('build'))
app.use(cors())


app.get('/api/contacts', (req, res) => {
  Contact.find({})
    .then(contacts => {
      res.json(contacts)
    })
})

app.get('/api/contacts/:id', (req, res, next) => {
  const id = req.params.id
  Contact.findById(id)
    .then(contact => {
      res.json(contact)
    })
    .catch(error => next(error))
})

app.post('/api/contacts', (req, res, next) => {
  const body = req.body
  if(body.name === undefined || body.number === undefined) {
    return res.status(400).json({
      error: 'name and number are required'
    })
  }
  const contact = new Contact({
    name: body.name,
    number: body.number
  })
  contact.save()
    .then(savedContact => {
      res.json(savedContact)
    })
    .catch(error => next(error))

})

app.delete('/api/contacts/:id', (req, res, next) => {
  Contact.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => {
      next(error)
    })
})

app.put('/api/contacts/', async (req, res, next) => {
  const body = req.body
  let contactToUpdate = await Contact.find({ name: body.name })

  const contact = {
    name: contactToUpdate[0].name,
    number: body.number
  }


  Contact.findByIdAndUpdate(contactToUpdate[0].id, contact, { new: true })
    .then(updatedContact => {
      console.log(updatedContact)
      res.json(updatedContact)
    })
    .catch(error => {
      next(error)
    })
})


const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`)
})