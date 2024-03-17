import React from 'react'
import { saveMindMap, loadMindMap } from '../storage/storage'

function Buttons({ setNodes, setEdges, nodes, edges }) {
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

    return (
        <div className='flex justify-around bg-slate-400 py-2 rounded-lg '>
            <button id="two" onClick={handleSaveClick}
                className='cursor-pointer bg-slate-600 rounded-md text-gray-200 font-semibold py-1 px-2 hover:scale-105 duration-200'>
                Save Mind Map
            </button>

            <button id="three" onClick={handleLoadClick}
                className='cursor-pointer bg-slate-600 rounded-md text-gray-200 font-semibold py-1 px-2 hover:scale-105 duration-200'>
                Load Mind Map
            </button>

            <button id="four" onClick={refreshPage}
                className='cursor-pointer bg-slate-600 rounded-md text-gray-200 font-semibold py-1 px-2 hover:scale-105 duration-200'>
                Refresh
            </button>
        </div>
    )
}

export default Buttons