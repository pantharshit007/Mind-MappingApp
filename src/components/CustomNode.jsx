const CustomNode = ({ data }) => {
    return (
        <div>
            <Handle type="target" position="left" />
            <div>{data.label}</div>
            <Handle type="source" position="right" />
        </div>
    );
};

export default CustomNode;