import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import * as THREE from "three";
import { BiCube } from 'react-icons/bi';
import { AiOutlineMenu, AiOutlineZoomIn, AiOutlineZoomOut } from 'react-icons/ai';
import { GiRapidshareArrow } from 'react-icons/gi';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { Canvas } from '@react-three/fiber'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { DDSLoader } from "three-stdlib";
import { Suspense } from "react";

import { OrbitControls, ContactShadows } from "@react-three/drei";
import { LoadingManager } from "three";
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { Router, useRouter } from "next/router";
import Layout from "../components/layout";

THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader());



const getLoader = (extensions, file) => {
    if (extensions == 'obj') {
        const loader = new THREE.ObjectLoader();
        return { loader, Loader: OBJLoader };
    } else if (extensions == 'gltf') {
        const loader = new GLTFLoader();
        return { loader, Loader: GLTFLoader };
    } else if (extensions == 'fbx') {
        const loader = new FBXLoader();
        return { loader, Loader: FBXLoader };
    }
    return null;
}

const Model = ({ file, extensions }) => {
    // console.log("from model", file, extensions)
    // const [properties, setProperties] = useState(null);
    // const manager = new LoadingManager();
    const { loader, Loader } = getLoader(extensions, file)
    // var loader = new THREE.ObjectLoader();
    const result = loader.setPath(file);
    const path = result.path;
    // return 'asd'
    const obj = useLoader(Loader, path);
    // setProperties(obj);
    if (extensions == 'gltf') return <primitive object={obj.scene} />
    return <primitive object={obj} />
}

const Detail = (props) => {
    const router = useRouter()
    console.log(router.query)
    const [openNavbar, SetOpenNavbar] = useState(false);
    const [size, setSize] = useState([0,0]);
    const [fileUrl, setFileUrl] = useState(null);
    const [extension, setExtension] = useState(null);

    const canvasParent = useRef(null);
    const detailBar = useRef(null);
    const modelRef = useRef(null);

    useLayoutEffect(() => {
        const updateWindowSize = () => {
            console.log("test")
            setSize([
                canvasParent.current.clientWidth,
                canvasParent.current.clientHeight
            ])
            console.log(canvasParent.current.clientWidth);
        }
        window.addEventListener('resize', updateWindowSize);//add event listener when component mount
        return () => window.removeEventListener('resize', updateWindowSize);//remove event listener when component unmount
      }, [size]);

    const toggle = () => {
        SetOpenNavbar(!openNavbar);
        detailBar.current.classList.toggle('hidden');
    };
    
    return router.query.fileURL && router.query.extensions? (
        <Layout>

        <div className="flex w-full h-full">
            {/* // sidebar menu */}
            {/* <div className="bg-white shadow md:h-full flex-1 border md:block hidden  md:mt-0 z-50">
                <button className="p-2 h-16 hidden md:block" onClick={toggle}>
                    <BiCube className="hover:text-blue-500 text-3xl" />
                </button>
            </div> */}
            {/* // window */}
            <div className="flex-grow min-w-0 h-full m-0" ref={canvasParent}>
                <div className=" z-50 bg-white rounded absolute ml-3 mt-3 flex gap-2 py-2 px-2 shadow">
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
                <Canvas frameloop="demand"  style={JSON.stringify(size) == JSON.stringify([0,0])? '' : {width: size[0]}}>
                    <Suspense fallback={null}>
                        <Model file={router.query.fileURL} extensions={router.query.extensions} ref={modelRef}/>
                        <ContactShadows
                            opacity={0.2}
                            width={1}
                            height={1}
                            blur={1}
                            // far={100}
                            resolution={256} />
                        <directionalLight color="white" position={[0, 0, 5]} />
                        <OrbitControls />
                    </Suspense>
                </Canvas>
            </div>
            {/* // sidebar detail */}
            <button className="bg-white p-2 md:hidden block shadow absolute right-3 mt-3 hover:text-white hover:bg-slate-300 rounded " onClick={toggle}>
                {openNavbar? 
                    <MdKeyboardArrowUp className=" text-3xl" /> :
                    <MdKeyboardArrowDown className=" text-3xl" />
                }
            </button>
            <div className="bg-white md:h-full md:w-80 self-center md:right-0 rounded right-3 h-3/4 border hidden md:block absolute md:relative px-3 py-4 transition-all duration-100" ref={detailBar}>Model Details</div>
        </div>
        </Layout>
    ) : router.push('/404');
}

export default Detail;