import './App.css'
import Node from './components/Node'
import { ReactFlowProvider } from 'reactflow'

function App() {

  return (
    <div className="">
      <ReactFlowProvider >
        <Node />
      </ReactFlowProvider>

    </div>
  )
}

export default App
