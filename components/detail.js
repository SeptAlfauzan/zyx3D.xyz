import React, { useEffect, useState } from "react";
import * as THREE from "three";
import Navbar from "../components/navbar";
import { BiCube } from 'react-icons/bi';
import { AiOutlineZoomIn, AiOutlineZoomOut } from 'react-icons/ai';
import { GiRapidshareArrow } from 'react-icons/gi';
import { Canvas } from '@react-three/fiber'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { DDSLoader } from "three-stdlib";
import { Suspense } from "react";

import { Environment, OrbitControls, ContactShadows, Loader } from "@react-three/drei";
import { withRouter } from "next/router";
import { ObjectLoader } from "three";
import { LoadingManager } from "three";
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader());


const getLoader = (extensions, file) => {
    if(extensions == 'obj'){
        const loader = new THREE.ObjectLoader();
        return {loader, Loader: OBJLoader};
    }else if(extensions == 'gltf'){
        const loader = new GLTFLoader();
        return {loader, Loader: GLTFLoader};
    }else if(extensions == 'fbx'){
        const loader = new FBXLoader();
        return {loader, Loader: FBXLoader};
    }
    return null;
}

const Model = ({file, extensions}) => {
    const manager = new LoadingManager();

    const {loader, Loader} = getLoader(extensions, file)
    // var loader = new THREE.ObjectLoader();
    const result = loader.setPath(file);
    const path = result.path; 
    // return 'asd'
    const obj = useLoader(Loader, path);
    if(extensions == 'gltf') return <primitive object={obj.scene} />
    return <primitive object={obj} />
}

const Detail = (props) => {
    const [openNavbar, SetOpenNavbar] = useState(false);
    const toggle = () => SetOpenNavbar(!openNavbar);
    return (
        <>
            {/* <div className="flex flex-row"> */}
                {/* // sidebar menu */}
                <div className="h-full flex-1 border">
                    <button className="px-3 h-16" onClick={toggle}>
                        <BiCube className="hover:text-blue-500 text-3xl" />
                    </button>
                </div>
                {/* // window */}
                <div className="h-full grow">
                    <div className=" z-50 bg-white rounded absolute ml-3 mt-3 flex gap-2 py-2 px-2">
                        <div className=" border-r-2">
                            <AiOutlineZoomIn className="hover:text-blue-500 hover:cursor-pointer text-3xl text-gray-600" />
                        </div>
                        <div className=" border-r-2">
                            <AiOutlineZoomOut className="hover:text-blue-500 hover:cursor-pointer text-3xl text-gray-600" />
                        </div>
                        <div className="">
                            <GiRapidshareArrow className="hover:text-blue-500 hover:cursor-pointer text-3xl text-gray-600" />
                        </div>
                    </div>
                    <Canvas>
                        <Suspense fallback={null}>
                            <Model file={props.file} extensions={props.extensions}/>
                            <ContactShadows
                                opacity={0.2}
                                width={1}
                                height={1}
                                blur={1}
                                far={100}
                                resolution={256}/>
                            <directionalLight color="white" position={[0, 0, 5]} />
                            <OrbitControls />
                        </Suspense>
                    </Canvas>
                </div>
                {/* // sidebar detail */}
                <div className="h-full w-80 border md:d-block d-none">detail goes here</div>
            {/* </div> */}
        </>
    );
}

export default Detail;