/* React */
import React, {Component} from 'react';

/* External libs / components */
import HostedOn from 'hosted_on';

/* My libs / components */
import Bounce from './containers/Bounce';

/* Style and CSS */
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Bounce />

                <HostedOn link="https://github.com/mayk93/Bounce" new_tab={true}/>
            </div>
        );
    }
}

export default App;
