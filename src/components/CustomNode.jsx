import { useState } from "react";
import { Handle } from 'reactflow'
import sampleData from "../data/sampleData";

export const CustomNode = ({ data }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
        // console.log(sampleData[data.id])
        // console.log("=> ")
        // console.log(data.id)
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div className='bg-white border-gray-500 border-[5px] rounded-sm py-2  min-h-max px-4 min-w-[6rem] text-sm font-semibold relative z-[100]'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >

            <Handle type="target" position="left" />
            <div>{data.label}</div>
            <Handle type="source" position="right" />

            {isHovered && (
                <div className="absolute -top-3 left-full ml-2 bg-gray-200 p-2 rounded min-w-max min-h-max shadow-sm shadow-slate-700 z-[99]">
                    {sampleData[data.id] ? (
                        <div>
                            {/* Access and display specific data properties here */}
                            <p>Total Views: {sampleData[data.id].total_views}</p>
                            <p>Positive Views: {sampleData[data.id].positive_views}</p>
                            <p>Negative Views: {sampleData[data.id].negative_views}</p>
                            <p>Comments: {sampleData[data.id].comments}</p>
                        </div>
                    ) : (<div>NO CONTENT</div>)}
                </div>
            )}
        </div>
    );
};

export const initialCustomNode = ({ data }) => {
    return (
        <div className='bg-white py-2 rounded-lg min-h-max px-4 min-w-[6rem] text-xs'>
            <Handle type="source" position="right" /> {/* Right handle by default */}
            <div>{data.label}</div>
        </div>
    );
};

export default { initialCustomNode, CustomNode }