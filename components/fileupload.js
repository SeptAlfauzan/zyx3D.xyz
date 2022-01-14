import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ['mtl','obj', 'png'];

function ContainerDragDrop(){
    return (
        <div className="flex justify-center items-center full-width">
        <input type="file" className="h-80 bg-black"/>
        </div>
    )
}

function DragDropFile(params) {
    const [file, setFile] = useState(null);
    const [enter, setEnter] = useState(false);

    const handleChange = (file) => {
        setFile(file);
        alert(file);
    };

    const handleEnterDrag = () => {
        setEnter(true);
    }

    const handleLeaveDrag = () => {
        setEnter(false);
    }

    const tes = () => console.log('tes')
    return (
        <div className="flex justify-center items-center full-width">
            <div id='dropfile-container' className={`${enter? 'border-black bg-gray-400':'border-gray-300'} transition-all duration-100 w-2/4 rounded-2xl border-2 h-80 flex items-center justify-center`}>
                <p>Drop your file here</p>
            </div>
            <input type="file"  onDragEnter={handleEnterDrag} onDragLeave={handleLeaveDrag} onChange={handleChange} className="h-80 bg-gray-100 opacity-0 absolute w-2/4"></input>
        </div>
    );
}

export default DragDropFile;