import React, {useState, useEffect, useReducer, useRef, useMemo} from 'react';
import axios from 'axios';
import List from './List';
import {useFormInput} from '../hooks/forms';

const Todo = props => {
	// const [todoName, setTodoName] = useState('');
	// const todoInputRef = useRef();
	// const [submittedTodo, setSubmittedTodo] = useState(null);
	// const [todoList, setTodoList] = useState([]);
	const [inputIsValid, setInputIsValid] = useState(false);
	const todoInput = useFormInput();

	const todoListReducer = (state, action) => {
		switch (action.type) {
			case 'ADD':
				return [...state, action.payload];

			case 'SET':
				return action.payload;

			case 'REMOVE':
				return state.filter(todo => todo.id !== action.payload);

			default:
				return state;
		}
	};

	const [todoList, dispatch] = useReducer(todoListReducer, []);

	useEffect(() => {
		axios.get('https://hooks-test-3331b.firebaseio.com/todos.json').then(res => {
			console.log(res);

			const todoData = res.data;
			const todos = [];

			for (let key in todoData) {
				todos.push({id: key, name: todoData[key].name});
			}

			dispatch({type: 'SET', payload: todos});
		});

		return () => {
			console.log('Cleanup');
		};
	}, []);

	// useEffect(() => {
	// 	if (submittedTodo) dispatch({type: 'ADD', payload: submittedTodo});
	// }, [submittedTodo]);

	// const inputChangeHandler = e => {
	// 	setTodoName(e.target.value);
	// };

	const inputValidationHandler = e => {
		if (e.target.value.trim() === '') setInputIsValid(false);
		else setInputIsValid(true);
	};

	const todoAddHandler = () => {
		const todoName = todoInput.value;

		axios
			.post('https://hooks-test-3331b.firebaseio.com/todos.json', {name: todoName})
			.then(res => {
				const todoItem = {name: todoName, id: res.data.name};
				dispatch({type: 'ADD', payload: todoItem});
				// setSubmittedTodo(todoItem);
			})
			.catch(err => console.error(err));
	};

	const todoRemoveHandler = id => {
		axios
			.delete(`https://hooks-test-3331b.firebaseio.com/todos/${id}.json`)
			.then(res => {
				dispatch({type: 'REMOVE', payload: id});
			})
			.catch(console.error);
	};

	return (
		<React.Fragment>
			<input
				type="text"
				placeholder="todo"
				value={todoInput.value}
				onChange={todoInput.onChange}
				// ref={todoInputRef}
				// onChange={inputValidationHandler}
				style={{background: todoInput.validity ? 'transparent' : '#f0d5d1'}}
			/>

			<button type="button" onClick={todoAddHandler}>
				Add
			</button>

			{useMemo(() => (
				<List todoList={todoList} todoRemoveHandler={todoRemoveHandler} />
			), [todoList])}
		</React.Fragment>
	);
};

export default Todo;
