import React from 'react';
import SortableList from "./components/SortableList";
import "./App.css";

function App() {
    return (
        <div className="App">
            <div className="panel">
                <p>React Dashboard</p>
                <SortableList/>
            </div>
        </div>
    );
}

export default App;
