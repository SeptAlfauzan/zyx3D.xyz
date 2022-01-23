import { Router, useRouter } from "next/router";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { getExtension, getFileFakePath } from "../lib/handleFileUpload";
import Detail from "./detail";

const fileTypes = ['mtl', 'obj', 'png'];

function ContainerDragDrop() {
    return (
        <div className="flex justify-center items-center full-width">
            <input type="file" className="h-80 bg-black" />
        </div>
    )
}

const DragDropFile = ({isHome, handleToPreview}) => {
    // useEffect(()=>{
    //     isHome && setEnter(false)
    // },[isHome])
    const router = useRouter();
    const [file, setFile] = useState(null);
    const [fileExtensions, setFileExtensions] = useState(null);
    const [enter, setEnter] = useState(false);
    const [uploaded, setUploaded] = useState(false);
    
    const handleChange = (file) => {
        const { fileData, fileFakePath } = getFileFakePath(file);
        
        if (fileFakePath == '') return setEnter(false);// handle when user cancel uploading file
        const extensions = getExtension(fileFakePath);
        const fileURL = URL.createObjectURL(fileData);
        setFile(fileURL);
        setFileExtensions(extensions);
        router.push({
            pathname: '/detail',
            query: {fileURL, extensions}
        })
        
        // handleToPreview();
    };

    const handleEnterDrag = () => {
        setEnter(true);
    }

    const handleLeaveDrag = () => {
        setEnter(false);
    }

    return (
        <div className="flex justify-center items-center full-width h-full">
            {/* {isHome && ( */}
                <div className="w-3/4 md:w-1/2 flex-row">
                    <h3 className=' text-3xl mb-3  text-center'>Welcome To zyx3d.xyz</h3>
                    <p className='mb-10 text-gray-500  text-center'>Currently Support: .gltf, .obj, .fbx</p>
                    <div id='dropfile-container' className={`${enter ? 'border-black bg-purple-400' : 'border-gray-300'} transition-all duration-100 w-full rounded-2xl border-2 h-80 flex items-center justify-center relative flex-col`}>
                        <div className="w-3/4 h-32 relative mb-5">
                        <Image alt="upload icon" src="/illustrations/upload.svg" fill="cover" layout="fill"/>
                        </div>
                        <p>Drop your file here</p>
                        <input type="file" onDragEnter={handleEnterDrag} onDragLeave={handleLeaveDrag} onChange={(file) => handleChange(file)} className="h-80 bg-purple-500 opacity-0 absolute w-full"></input>
                    </div>
                </div>
            {/* )}
            {!isHome && <Detail file={file} extensions={fileExtensions} />} */}
        </div>
    );
}

export default DragDropFile;