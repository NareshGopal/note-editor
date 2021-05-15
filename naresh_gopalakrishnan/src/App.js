import './App.css';
import NoteInfo from './Components/NoteInfo';
import NoteList from './Components/Notelist';
import SideMenu from './Components/SideMenu';
import Topbar from './Components/Topbar';
import { Provider } from "react-redux";
import store from "./Redux/store";

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <SideMenu />
        <div className="content-section">
          <Topbar />
          <div className="notes-section">
            <NoteList />
            <NoteInfo />
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
