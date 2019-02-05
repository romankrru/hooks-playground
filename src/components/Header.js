import React, {useContext} from 'react';
import AuthContext from '../authContext';

const Header = props => {
	const auth = useContext(AuthContext);

	return (
		<header>
			{auth.status && <button onClick={props.onLoadTodos}>Todo list</button>}
			<button onClick={props.onLoadAuth}>Auth</button>
			<hr />
		</header>
	);
};

export default Header;
