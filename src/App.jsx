import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Routes, Route} from 'react-router-dom';
import Main from "./layaouts/main";



function App({handleTheme} ) {


  return (
    <>
    

    <Routes>
    <Route path="/*" element={ <Main/>} />
   
    </Routes>
   
    </>
  )
}

export default App
