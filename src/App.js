import React, {Fragment, Component} from 'react';
import './App.css';
import {connect} from 'react-redux';

import Header from './components/Header';
import Footer from './components/Footer';

import {loadObjects} from './actions/actionCreator';

class App extends Component {
	
	constructor(props) {
		super(props)
	}
	
	componentDidMount = () => {
		const {loadObjects} = this.props;
		loadObjects(JSON.parse(localStorage.getItem('savedState')));
	}
	
	render() {
		const {children} = this.props;
		return (
			<Fragment>
				<Header/>
				<main>
					{children}
				</main>
				<Footer/>
			</Fragment>
		);
	}
}

export {App};
export default connect(state =>({
	loadedObjects: state.loadedObjects,
}),{loadObjects})(App);
