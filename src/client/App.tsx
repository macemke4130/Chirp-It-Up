import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AllChirps from './AllChirps';
import SingleChirp from './SingleChirp';
import Admin from './Admin';
import NewChirp from './NewChirp';
import AllMentions from './AllMentions';

export interface AppProps { };

const App: React.FC<AppProps> = (props) => {

	return (
		<>
		<Router>
			<Switch>
				<Route exact path="/" component={AllChirps} />
				<Route exact path="/new/" component={NewChirp} />
				<Route path="/mentions/:id" component={AllMentions} />
				<Route path="/admin/:id" component={Admin} />
				<Route path="/:id" component={SingleChirp} />
			</Switch>
		</Router>
		</>
	)
}

export default App;