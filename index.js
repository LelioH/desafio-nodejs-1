const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

const ageChek = (req, res, next) => {
  const { age } = req.query

  if (!age) {
    return res.redirect('/')
  }

  return next()
}

app.get('/', (req, res) => {
  return res.render('index')
})

app.get('/minor', ageChek, (req, res) => {
  const { age } = req.query

  return res.render('minor', { age })
})

app.get('/major', ageChek, (req, res) => {
  const { age } = req.query

  return res.render('major', { age })
})

app.post('/check', (req, res) => {
  const { age } = req.body

  if (age < 18) {
    return res.redirect(`/minor?age=${age}`)
  } else {
    return res.redirect(`major?age=${age}`)
  }
})

app.listen(3000)
