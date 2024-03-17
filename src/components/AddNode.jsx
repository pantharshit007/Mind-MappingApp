import React, { useRef } from 'react'
import { useReactFlow } from 'reactflow'

function AddNode({ name, nodeIdCounter, setNodeIdCounter, setNodes }) {
    const reactFlowWrapper = useRef(null);
    const reactFlowInstance = useReactFlow(reactFlowWrapper);   // Get the react flow instance
    const nodeStyling = {
        border: "5px solid #9999",
        borderRadius: "2px",
    }

    function addNewNode() {
        const { x, y, zoom } = reactFlowInstance.getViewport();
        const newNodePosition = {
            x: x + (100 / zoom) + Math.random() * zoom,
            y: y + (100 / zoom) + Math.random() * zoom,
        };

        const newId = nodeIdCounter;
        setNodeIdCounter(nodeIdCounter + 1); // Increment counter

        setNodes((nds) => nds.concat({
            id: (newId + 1).toString(),
            type: 'custom',
            data: { id: newId - 1, label: name },
            position: newNodePosition,
            style: nodeStyling,
        }));

        console.log("add node: " + newId - 1);
    };

    return (
        <button onClick={addNewNode}
            className='bg-blue-400 rounded-md px-1 text-white'>
            Add Node
        </button>
    )
}

export default AddNode