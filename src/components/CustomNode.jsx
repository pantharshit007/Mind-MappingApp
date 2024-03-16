import { Handle } from 'reactflow';
const CustomNode = ({ data }) => {
    return (
        <div className='bg-white py-2 rounded-md min-h-max px-4 min-w-[6rem] text-xs'>
            <Handle type="target" position="left" />
            <div>{data.label}</div>
            <Handle type="source" position="right" />
        </div>
    );
};

export default CustomNode