import React, { useState } from "react";
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

import { Environment, OrbitControls, ContactShadows } from "@react-three/drei";

THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader());

const Model = () => {
    const obj = useLoader(OBJLoader, '/cat.obj');
    return <primitive object={obj} />
}

const Detail = () => {
    const [openNavbar, SetOpenNavbar] = useState(false);
    const toggle = () => SetOpenNavbar(!openNavbar);
    return (
        <>
            <Navbar />
            <div className="flex flex-row">
                {/* // sidebar menu */}
                <div className="h-screen flex">
                    <button className="px-3 h-16" onClick={toggle}>
                        <BiCube className="hover:text-blue-500 text-3xl" />
                    </button>
                    <div className={`${openNavbar ? 'w-60' : 'w-0'} bg-gray-400 transition-all duration-75`}>
                        icon
                    </div>
                </div>
                {/* // window */}
                <div className="h-screen flex-1 bg-gray-500">
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
                            <Model/>
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
                <div className="h-screen w-80">test</div>
            </div>
        </>
    );
}

export default Detail