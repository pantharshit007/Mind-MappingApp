export const loadMindMap = () => {
    const data = localStorage.getItem("mindMapData");
    return data ? JSON.parse(data) : null;
};

export const saveMindMap = (nodes, edges) => {
    const data = { nodes, edges };
    localStorage.setItem("mindMapData", JSON.stringify(data));
};