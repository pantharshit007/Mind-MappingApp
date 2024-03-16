import React, { useCallback, useState, useRef } from 'react'
import ReactFlow, { useNodesState, useEdgesState, addEdge, MiniMap, Controls, Background, useReactFlow, Handle } from 'reactflow'
import 'reactflow/dist/style.css'
import sampleData from '../data/sampleData';

const CustomNode = ({ data }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
        console.log(sampleData[data.id])
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div className='bg-white py-2 rounded-lg min-h-max px-4 min-w-[6rem] text-xs relative'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >

            <Handle type="target" position="left" />
            <div>{data.label}</div>
            <Handle type="source" position="right" />

            {isHovered && (
                <div className="absolute top-0 left-full ml-2 bg-gray-200 p-2 rounded min-w-max min-h-max">
                    {sampleData[data.id] ? (
                        <div>
                            {sampleData[data.id]}
                        </div>
                    ) : (<div>NO CONTENT</div>)}
                </div>
            )}
        </div>
    );
};

const initialCustomNode = ({ data }) => {
    return (
        <div className='bg-white py-2 rounded-lg min-h-max px-4 min-w-[6rem] text-xs'>
            <Handle type="source" position="right" /> {/* Right handle by default */}
            <div>{data.label}</div>
        </div>
    );
};

//Starting Node 
const initialNodes = [
    {
        id: '1',
        type: 'initialCustom',
        data: { id: 0, label: 'Mind Map' },
        position: { x: 0, y: 0 },
        style: { border: "8px solid #9999", borderRadius: "3px" },
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
    const reactFlowWrapper = useRef(null);
    // Get the react flow instance
    const reactFlowInstance = useReactFlow(reactFlowWrapper);
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

        setNodes((nds) => nds.concat({
            id: (nds.length + 1).toString(),
            type: 'custom',
            data: { label: name },
            position: newNodePosition,
            style: nodeStyling,
        }));
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