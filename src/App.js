import './App.css';
import { useEffect, useState, useReducer} from 'react';
import NavBar from './Components/NavBar';
import Card from "./Components/Cards";
import UploadForm from './Components/UploadForm';

const photos = [

]

const initialState =  {
    items: photos, 
    count: photos.length,
    inputs: {title: null, file: null, path: null},
    isCollapsed: false

}

const handleOnChange = (state, e) => {
  if (e.target.name === "file"){
    return {...state.inputs, title: e.target.value, file: e.target.files[0], path: URL.createObjectURL(e.target.files[0])}

  } else {
    return {...state.inputs, title: e.target.value}
    
  }
}


function reducer(state, action) {
  switch(action.type  ) {
      case 'setItem':
        return {
          ...state, 
          items: [state.inputs.path, ...state.items]
        }

      case "setInputs":
        return {
          ...state, 
          inputs: handleOnChange(state, action.payload.value)
        }

      case 'collapse':
        return {
          ...state, 
          isCollapsed: action.payload.bool
        }
      default : return state
  }
}

function App() {

  // Baically the hook are use to change the state that we initially passed
  // it take tow items one function and the variable which a arr which store all the value.
  // We cannot use hooks outside the components.

  const [state, dispatch] = useReducer(reducer, initialState)
  const [count, setCount] = useState()



  const handleOnChange = (e) => dispatch({type: "setInputs", payload : {value: e}})
 
  const toggle = (bool) => dispatch({ type: "collapse", payload: { bool }})

  const handleOnSubmit = (e) =>{
    e.preventDefault()
    dispatch({ type: 'setItem'})
    toggle(!state.isCollapsed)

  }



// user effects are used when we need to change the state when the userstate is changes here like
// items is the user we can pass any number of useState()

  useEffect(()=> {
    setCount(`you have ${state.items.length} image ${state.items.length > 1 ? "s" : ""}`)
  }, [state.items])

  

  useEffect(() => {
    console.log(state.items)
  }, [state.items]) 


  return (

    <>

    <NavBar/>

    <div className="container text-center mt-5">

    {/* <button className='btn btn-warning' onClick={() => setItems(["https://picsum.photos/id/1009/200/200", ...items])}>+Add</button> */}

    <button className='btn btn-success float-end' onClick={ () => toggle(!state.isCollapsed)}>{state.isCollapsed ? "Close" : "+ Add"}</button>

      <div className='clearfix mb-4'></div>
      {count}
      <h1>Gallery</h1>

      {/* isVisible, onChange, onSubmit is the prop here */}
      <UploadForm 

      inputs={state.inputs}
      isVisible={state.isCollapsed}
      onChange={handleOnChange}
      onSubmit={handleOnSubmit}
      

      />
     
      <div className="row">
      
      {/* Here Card src. where src is the prop which we are passing to the child Card.  */}

      {state.items.map((photo) => <Card src={photo}/>)}

      </div>


    </div>


    </>
  
      
   
  );
}

export default App;
