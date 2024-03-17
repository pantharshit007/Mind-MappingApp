import './App.css'
import Node from './components/Node'
import { ReactFlowProvider } from 'reactflow'

function App() {

  return (
    <div className="">
      <div className='font-bold text-2xl -mt-5 uppercase'>Dashboard</div>
      <div className='border border-gray-600 rounded-md'>
        <ReactFlowProvider >
          <Node />
        </ReactFlowProvider>
      </div>

    </div>
  )
}

export default App
