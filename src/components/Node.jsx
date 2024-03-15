import React, { useCallback, useState } from 'react'
import ReactFlow, { useNodesState, useEdgesState, addEdge, MiniMap, Controls, Background, useReactFlow } from 'reactflow'
import 'reactflow/dist/style.css'

//Starting Node 
const initialNodes = [
    {
        id: '1',
        type: 'input',
        data: { label: 'Mind Map' },
        position: { x: 0, y: 0 },
        style: { border: "10px solid #9999" },
    },
]

const initialEdges = [];
const onLoad = (reactFlowInstance) => {
    reactFlowInstance.fitView();
};

function Node() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [name, setName] = useState('');

    function addNewNode() {
        setNodes((nds) =>
            nds.concat({
                id: (nds.length + 1).toString(),
                data: { label: name },
                position: {
                    x: window.innerWidth / 2,
                    y: window.innerHeight / 2,
                },
                style: { border: "5px solid #9999" },
            })
        );
    };


    const onConnect = useCallback((params) => {
        //param: src and target node ids
        setEdges((edge) => addEdge(params, edge))
    }, [setEdges])

    const handleSaveClick = () => {
        saveMindMap(nodes, edges);
        console.log(nodes);
    };

    const handleLoadClick = () => {
        const loadedData = loadMindMap();
        if (loadedData) {
            setNodes(loadedData.nodes);
            setEdges(loadedData.edges);
            console.log(loadedData);
        }
    };

    const refreshPage = () => {
        window.location.reload();
    };

    // const nodeOrigin = [0.5, 0.5];
    const connectionLineStyle = {
        stroke: "#9999",
        strokeWidth: 3,
    };

    const defaultEdgeOptions = { style: connectionLineStyle, type: "mindmap" };

    return (
        //mini Map projected in a corner of the window
        <div className='h-[100vh]'>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onLoad={onLoad}
                defaultEdgeOptions={defaultEdgeOptions}
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

                <button onClick={addNewNode}
                    className='bg-blue-400 rounded-md px-1 text-white'>
                    Add Node
                </button>
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