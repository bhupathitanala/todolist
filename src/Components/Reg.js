import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import axios from 'axios';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
  
    axios.get('http://localhost:3005/users')
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error('Error fetching todos:', error);
      });
  };

  const addTodo = () => {
    const newTodoObj = {
      username: newTodo,
      completed: false,
    };
    console.log(newTodoObj)

    axios.post('http://localhost:3005/users', newTodoObj)
      .then(() => {
        fetchTodos(); 
        setNewTodo('');
      })
      .catch((error) => {
        console.error('Error adding todo:', error);
      });
  };




  return (
    <div>
      <Box p={3}>
        <h1>To-Do List</h1>
        <TextField
          label="New Todo"
          variant="outlined"
          fullWidth
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={addTodo}
          disabled={!newTodo}
        >
          Add Todo
        </Button>
        <List>
          {todos.map((todo) => (
            <ListItem key={todo.id}>
              <ListItemText primary={todo.title} />
              <ListItemSecondaryAction>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Box>
    </div>
  );
}

export default TodoList;
