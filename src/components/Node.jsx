import React, { useCallback, useState, useRef } from 'react'
import ReactFlow, { useNodesState, useEdgesState, addEdge, MiniMap, Controls, Background, useReactFlow, Handle } from 'reactflow'
import 'reactflow/dist/style.css'
import { CustomNode, initialCustomNode } from './CustomNode'
import { initialNodes, initialEdges } from './initialNode'
import { saveMindMap, loadMindMap } from '../storage/storage'
import AddNode from './AddNode'

const onLoad = (reactFlowInstance) => {
    reactFlowInstance.fitView();
};

function Node() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [name, setName] = useState('');
    const [nodeIdCounter, setNodeIdCounter] = useState(initialNodes.length); // Initialize based on initial nodes
    // const reactFlowWrapper = useRef(null);
    // const reactFlowInstance = useReactFlow(reactFlowWrapper);   // Get the react flow instance
    // const nodeStyling = {
    //     border: "5px solid #9999",
    //     borderRadius: "2px",
    // }

    // function addNewNode() {
    //     const { x, y, zoom } = reactFlowInstance.getViewport();
    //     const newNodePosition = {
    //         x: x + (100 / zoom) + Math.random() * zoom,
    //         y: y + (100 / zoom) + Math.random() * zoom,
    //     };

    //     const newId = nodeIdCounter;
    //     setNodeIdCounter(nodeIdCounter + 1); // Increment counter

    //     setNodes((nds) => nds.concat({
    //         id: (newId + 1).toString(),
    //         type: 'custom',
    //         data: { id: newId - 1, label: name },
    //         position: newNodePosition,
    //         style: nodeStyling,
    //     }));
    // };

    const onConnect = useCallback((params) => {
        //param: src and target node ids
        setEdges((edge) => addEdge(params, edge))
    }, [setEdges])

    const handleSaveClick = () => {
        saveMindMap(nodes, edges);
        // console.log(nodes);
    };

    const handleLoadClick = () => {
        const loadedData = loadMindMap();
        if (loadedData) {
            setNodes(loadedData.nodes);
            setEdges(loadedData.edges);
            // console.log(loadedData);
        }
    };

    const refreshPage = () => {
        window.location.reload();
    };

    const connectionLineStyle = {
        stroke: "black",
        strokeWidth: 3,
    };

    const defaultEdgeOptions = { style: connectionLineStyle, type: "mindmap" };

    return (
        //mini Map projected in a corner of the window
        <div className='h-[80vh]'>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onLoad={onLoad}
                defaultEdgeOptions={defaultEdgeOptions}
                nodeTypes={{ initialCustom: initialCustomNode, custom: CustomNode }}
            >
                <Controls />
                <Background variant="dots" gap={12} size={1} />
                <MiniMap
                    nodeColor={(color) => {
                        if (color.type === "input") return "lightgreen";
                        return "blue"
                    }}
                />
            </ReactFlow>

            <div>
                <input type="text"
                    onChange={(event) => setName(event.target.value)}
                    name='title'
                    className='border-slate-500 border-2 rounded-md' />

                {/* <button onClick={addNewNode}
                    className='bg-blue-400 rounded-md px-1 text-white'>
                    Add Node
                </button> */}
                <AddNode name={name} nodeIdCounter={nodeIdCounter} setNodeIdCounter={setNodeIdCounter} setNodes={setNodes} />
            </div>

            <div className='flex justify-around'>
                <button id="two" onClick={handleSaveClick}
                    className='cursor-pointer bg-slate-400'>
                    Save Mind Map
                </button>

                <button id="three" onClick={handleLoadClick}
                    className='cursor-pointer bg-slate-400'>
                    Load Mind Map
                </button>

                <button id="four" onClick={refreshPage}
                    className='cursor-pointer bg-slate-400'>
                    Refresh
                </button>
            </div>

        </div>
    )
}

export default Node;