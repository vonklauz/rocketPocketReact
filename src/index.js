import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import store from './store';
import * as firebase from 'firebase';

import ObjectsPageComponent from './components/objectsPage';
import FinPlanPageComponent from './components/finPlanPage';
import ConsolidationPageComponent from './components/consolidationPage';
import UnderConstructionPageComponent from './components/UnderConstructionPage';
import ErrorPageComponent from './components/Error';


const config = {
			apiKey: "AIzaSyBA8eN8K0oR8BsJMq3wwXvzXp3Gb7F4How",
			authDomain: "rocketpocket-d57a8.firebaseapp.com",
			databaseURL: "https://rocketpocket-d57a8.firebaseio.com",
			projectId: "rocketpocket-d57a8",
			storageBucket: "rocketpocket-d57a8.appspot.com",
			messagingSenderId: "426651486308"
		};
firebase.initializeApp(config);

ReactDOM.render((
	<BrowserRouter>
		<Provider store={store}>
			<App>
				<Switch>
					<Route exact path='/' component={ObjectsPageComponent} />
					<Route path='/financial_plan' component={FinPlanPageComponent} />
					<Route path='/charts_consolidation' component={ConsolidationPageComponent} />
					<Route path='/under_construction' component={UnderConstructionPageComponent} />
					<Route path='*' component={ErrorPageComponent} />
				</Switch>
			</App>
		</Provider>
	</BrowserRouter>
), document.getElementById('root'));

if (module.hot) { 
	module.hot.accept(); 
}	

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
