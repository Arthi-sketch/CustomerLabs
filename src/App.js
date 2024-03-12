
import './App.css';
import Info from './comps/content/info.jsx';
import Navbar from './comps/navbar/navbar.jsx';

function App() {
  return (
    <div className="App">
      <Navbar title={"View Audience"}/>
      <Info/>
    </div>
  );
}

export default App;
