import React, {useState} from 'react';
import Todo from './components/Todo';
import Header from './components/Header';
import Auth from './components/Auth';
import AuthContext from './authContext';

const App = () => {
	const [page, setPage] = useState('auth');
	const [authStatus, setAuthSatus] = useState(false);

	const switchPage = pageName => {
		setPage(pageName);
	};

	const login = () => {
		setAuthSatus(true);
	};

	return (
		<AuthContext.Provider
			value={{
				status: authStatus,
				login: login,
			}}
		>
			<div className="App">
				<Header onLoadTodos={() => switchPage('todos')} onLoadAuth={() => switchPage('auth')} />

				{page === 'auth' && <Auth />}
				{page === 'todos' && <Todo />}
			</div>
		</AuthContext.Provider>
	);
};

export default App;
