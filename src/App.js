import './App.css';
import News from './components/News'
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

function App() {


  return (
    <div className="App" > 
        <MuiPickersUtilsProvider utils={DateFnsUtils}>

    <News />
    </MuiPickersUtilsProvider>

    </div>
  );
}

export default App;





