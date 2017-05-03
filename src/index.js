import React from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Main from './Main'; // Our custom react component

// Needed for onTouchTap
injectTapEventPlugin();

render(<Main />, document.getElementById('app'));
