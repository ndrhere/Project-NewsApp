import { Component } from 'react';
import './App.css';
import Navbar from './Navbar';
import News from './News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom";
 import LoadingBar from 'react-top-loading-bar'



 export default class App extends Component {
 state = {
progress : 0
 }

setProgress = (progress)=>{
  this.setState({
    progress: progress
  })
}


  render(){




  return (
   <>
   <Router>
   <Navbar/>
   <LoadingBar
        color={'#f11946'}
        progress={this.state.progress}
        height= {2}
       
      />

   <Routes>
   <Route path= "/" element={<News setProgress= {this.setProgress} pageSize={6} country = "in" key = "general" category="general"/>}></Route>
   <Route path= "/business" element={<News setProgress= {this.setProgress} pageSize={6} country = "in"key = "business" category="business"/>}></Route>
   <Route path= "/entertainment" element={<News setProgress= {this.setProgress} pageSize={6} country = "in"key = "entertainment" category="entertainment"/>}></Route>
   <Route path= "/general" element={<News setProgress= {this.setProgress} pageSize={6} country = "in" key = "general" category="general"/>}></Route>
   <Route path= "/health" element={<News setProgress= {this.setProgress} pageSize={6} country = "in" key = "health" category="health"/>}></Route>
   <Route path= "/science" element={<News setProgress= {this.setProgress} pageSize={6} country = "in" key = "science" category="science"/>}></Route>
   <Route path= "/sports" element={<News setProgress= {this.setProgress} pageSize={6} country = "in" key = "sports" category="sports"/>}></Route>
   <Route path= "/technology" element={<News setProgress= {this.setProgress} pageSize={6} country = "in" key = "technology" category="technology"/>}></Route>
   </Routes>


   </Router>
   </>
   
  )
}
 }

