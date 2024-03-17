import React, { useRef } from 'react'
import { useReactFlow } from 'reactflow'

function AddNode({ name, nodeIdCounter, setNodeIdCounter, setNodes, setName }) {
    const reactFlowWrapper = useRef(null);
    const reactFlowInstance = useReactFlow(reactFlowWrapper);   // Get the react flow instance
    const nodeStyling = {
        border: "5px solid #9999",
        borderRadius: "2px",
    }

    function addNewNode() {
        if (name.length === 0) return;
        const { x, y, zoom } = reactFlowInstance.getViewport();
        const newNodePosition = {
            x: x + (100 / zoom) + Math.random() * zoom,
            y: y + (100 / zoom) + Math.random() * zoom,
        };

        const newId = nodeIdCounter;
        setNodeIdCounter(nodeIdCounter + 1); // Increment counter

        setNodes((nds) => nds.concat({
            id: (nds.length + 1).toString(),
            type: 'custom',
            data: { id: newId - 1, label: name },
            position: newNodePosition,
            // style: nodeStyling,
        }));

        setName('');
    };

    return (
        <div className='flex justify-start  items-baseline '>
            <div className='flex flex-row gap-x-4 w-[40%] '>
                <input type="text"
                    onChange={(event) => setName(event.target.value)}
                    name='title'
                    value={name}
                    placeholder='New Node'
                    className='bg-slate-200 border-2 rounded-md border-none focus:outline-none px-5 py-1'
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') addNewNode();
                    }}

                />
                <button onClick={addNewNode}
                    className='bg-green-600 rounded-md px-2 py-1 font-semibold text-white hover:scale-105 duration-200 min-w-[7rem] lg:w-max'
                >
                    Add Node
                </button>
            </div>
        </div>

    )
}

export default AddNode