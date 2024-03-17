import React, { useCallback, useState } from 'react'
import ReactFlow, { useNodesState, useEdgesState, addEdge, MiniMap, Controls, Background, } from 'reactflow'
import 'reactflow/dist/style.css'
import { CustomNode, initialCustomNode } from './CustomNode'
import { initialNodes, initialEdges } from './initialNode'
import AddNode from './AddNode'
import Buttons from './Buttons'

const onLoad = (reactFlowInstance) => {
    reactFlowInstance.fitView();
};

const nodeTypes = {
    initialCustom: initialCustomNode,
    custom: CustomNode
};

function Node() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [name, setName] = useState('');
    const [nodeIdCounter, setNodeIdCounter] = useState(initialNodes.length); // Initialize based on initial nodes

    const onConnect = useCallback((params) => {
        //param: src and target node ids
        setEdges((edge) => addEdge(params, edge))
    }, [setEdges])

    const connectionLineStyle = {
        stroke: "black",
        strokeWidth: 3,
    };

    const defaultEdgeOptions = { style: connectionLineStyle, type: "mindmap" };

    return (
        //mini Map projected in a corner of the window
        <div className='h-[78vh]'>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onLoad={onLoad}
                defaultEdgeOptions={defaultEdgeOptions}
                nodeTypes={nodeTypes}
            >
                <Controls />
                <Background variant="dots" gap={12} size={1} />
                <MiniMap
                    nodeColor={(color) => {
                        if (color.type === "initialCustom") return "lightgreen";
                        return "blue"
                    }}
                />
            </ReactFlow>

            <div className="flex flex-col gap-2 mt-3">
                <AddNode name={name} nodeIdCounter={nodeIdCounter} setNodeIdCounter={setNodeIdCounter} setNodes={setNodes} setName={setName} />
                {/* functional buttons */}
                <Buttons nodes={nodes} edges={edges} setNodes={setNodes} setEdges={setEdges} />
            </div>

        </div>
    )
}

export default Node;