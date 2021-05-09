import logo from './logo.svg';
import './App.css';
import {Col, Row, Container} from "react-bootstrap";
import {Alert} from "bootstrap";

function App() {
  return (
      <div className="jumbotron jumbotron-fluid">
          <div className="container">
              <h1 className="display-4">Fluid jumbotron</h1>
              <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its
                  parent.</p>
          </div>
      </div>
  );
}

export default App;
