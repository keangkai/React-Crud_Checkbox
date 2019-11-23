import React, { Component } from 'react';
import Todos from './components/Todos'
import './App.css';
import Header from './components/layouts/Header'
import AddTodo from './components/Addtodo'
import uuid from 'uuid'
import { BrowserRouter as Router, Route } from  'react-router-dom'
import About from './components/pages/About'
import axios from 'axios'
class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      todos : []
    }
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
    .then(res => this.setState({todos: res.data }))
  }

  markComplete = (id) => {
    const { todos } = this.state
    this.setState({ todos: todos.map(todo => {
      if (todo.id === id){
        todo.completed = !todo.completed
      }
      return todo
    }) 
  })
  }

  deleteTodo = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then(res => this.setState({ todos : [...this.state.todos.filter(todo => 
      todo.id !== id)] }))
    
  }

  addTodo = (title) => {
    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title,
      completed: false
    }).then(res => this.setState({ todos: [...this.state.todos, res.data] }) )
    
  }

  render(){
    return ( 
      <Router>
      <div className="App">
        <div className="container">
          <Header />
          <Route exact path='/' render={props => (
            <React.Fragment>
              <AddTodo addTodo={this.addTodo}/>
              <Todos 
                todos={this.state.todos} 
                markComplete={this.markComplete} 
                deleteTodo={this.deleteTodo} 
              />
            </React.Fragment>
          )} />
          <Route path='/about' component={About} />
        </div>
      </div>
      </Router>
    );
  }
}

export default App;
