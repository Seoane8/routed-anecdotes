import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'

import AnecdoteList from './AnecdoteList'
import CreateNew from './CreateNew'
import About from './About'
import Footer from './Footer'
import Anecdote from './Anecdote'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link to='/' style={padding}>anecdotes</Link>
      <Link to='/create' style={padding}>create new</Link>
      <Link to='/about' style={padding}>about</Link>
    </div>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const notificate = (msg, time) => {
    setNotification(msg)
    setTimeout(
      () => setNotification(''),
      time
    )
  }

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <Router>
        <h1>Software anecdotes</h1>

        <Menu />
        {notification && <p>{notification}</p>}

        <Switch>
          <Route path='/create' >
            <CreateNew addNew={addNew} notificate={notificate} />
          </Route>
          <Route path='/about' >
            <About />
          </Route>
          <Route path='/anecdotes/:id' >
            <Anecdote anecdotes={anecdotes} />
          </Route>
          <Route path='/' >
            <AnecdoteList anecdotes={anecdotes} />
          </Route>
        </Switch>
        
        <Footer />
    </Router>
  )
}

export default App;
