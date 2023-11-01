import './App.css';
import { Route } from "react-router-dom"
import home from "./pages/homepage";
import chatpage from './pages/chatpage';

function App() {
  return (
    <div className="App">
      <Route path = '/' component={home} exact/>
      <Route path = '/chats' component={chatpage} />
    </div>
  );
}

export default App;
