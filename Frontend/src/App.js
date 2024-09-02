import './App.css';
import Detail from './Components/Detail';


function App() {
  return (
    <div className="App">
      <div className="flex items-center justify-center">
        <h1 className="text-3xl font-bold text-center text-black-300 flex items-center space-x-4">
          <img className="w-20 h-20" src="https://res.cloudinary.com/dedpvue13/image/upload/c_scale,h_80,w_80/v1724556991/images_vjgjul.png" alt="Barbehaus Catering Logo" />
          <span>Barbehaus Catering</span>
        </h1>
      </div>

      <Detail />

    </div>
  );
}

export default App;
