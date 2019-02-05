import React, {useContext} from 'react';
import AuthContext from '../authContext';

const Auth = props => {
	const auth = useContext(AuthContext)

	return (
		<React.Fragment>
			<h2>Auth component</h2>
			<button onClick={auth.login}>Log in!</button>
		</React.Fragment>
	);
};

export default Auth;
