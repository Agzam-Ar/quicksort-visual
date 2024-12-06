import logo from './logo.svg';
import './App.css';

import TitleSlide from './slides/TitleSlide';
import Number from './slides/Number';

import Background from './Background';
import Vars from './Vars';


function App() {

    let eNumb = [];
    for (let key of Object.keys(Vars.nums)) {
        eNumb.push(<Number key={key} id={key}/>);
    }
    return (
    <div className="App">
        <Background/>
        <TitleSlide/>
        {eNumb}
        {/*<header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>*/}

    </div>
    );
}

// function LowIndex() {
//     return <div className="lowindex">^</div>;
// }

export default App;
