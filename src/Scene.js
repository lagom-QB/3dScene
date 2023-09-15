/* eslint-disable no-unused-vars */
/*TODO::
    - Combine all the scenes in a single file 
*/
import ModelViewer from "./ModelFiles/ModelViewer";
import AboutMeFetcher from "./ProjectFetchers/AboutMeFetcher";
import ProjectsGetter from "./ProjectFetchers/ProjectGetters/ProjectGetter";

import { Canvas } from "@react-three/fiber";
import { OrthographicCamera, OrbitControls } from "@react-three/drei";

import styled from "styled-components";
import React, { useState } from "react";

const Overlay = styled.div`
    position: absolute;
    max-width: 80vw;
    max-height: 80vh;
    overflow: auto;
    // display: flex;
    // float: left;
    // flex: 1;
    border: .05rem solid #fff6f2;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #202020;
    padding: 2rem 3rem 2rem 0rem;
    border-radius: 1rem;
    li {
        list-style-type: none;
        font-size: 1.5rem;
        font-family: monospace, sans-serif;
        margin-bottom: .1rem;
        margin-top: 1.2rem;
        a {
            color: red;
            text-decoration: none;
            :: clicked {
                color: orange;
            }

        }
    }
    div {
        color: #fff6f2;
        text-align: justify;
        font-family: serif, georgia;
        font-size: 1rem;
        margin-bottom: .25rem;
        padding: .25rem;
        max-width: 70vw;
    }
    span {
        margin: 1.2rem .25rem .25rem .25rem;
        border: .1rem solid #fff6f2;
        border-radius: .5rem;
        padding: .5rem .5rem 0rem .5rem;
        opacity: .5;
        font-family: monospace, sans-serif;
        font-size: .75rem;
        color: #fff6f2;
        width: fit-content;
    }`;
    const OverlayButton = styled.div`
    position: absolute;
    top: 8%;
    right: 20%;
    transform: translate(40%, -10%);
    z-index: 100000;
    padding: .75rem;
    text-align: center;
    color: red;
    background-color: None;
    font-size: 2rem;
    border: .1rem solid red;
    border-radius: 50%;
    cursor: pointer;`;

const Scene = ({
    hemisphereLightPosition = [0, 1, 0],
    directionalLightPosition = 30 * [-1, 1.75, 1],
    cameraPosition = [0, 0, 10],
    cameraRotation = [-60, 0, 0], }) => {

        const [overlayVisible, setOverlayVisible] = useState(false);
        const overlayButton = document.getElementById("overlayButton");
        const width = window.innerWidth;
        const height = window.innerHeight;

        const handleOverlayClick = () => {
            setOverlayVisible(!overlayVisible);
            console.log(`overlayButton clicked, overlayVisible: ${overlayVisible}`);
            overlayButton.textContent = overlayVisible ? "Projects": "X";
        }

    return (
        <>
            <Canvas
                style={{ height: '100vh', width: '100vw' }}
                camera={{ fov: 90, near: 10, far: 1000 }}
                shadows
                dpr={[1, 2]}> {/* frameloop="demand" */}
                {/* <axesHelper
                    scale={10}
                    position={[0, 0, 0]}
                    onUpdate={(self) => self.setColors('#ff2080', '#20ff80', '#2080ff')} /> */}
                <ambientLight name="ambientLight" />
                <hemisphereLight
                    name="hemisphereLight"
                    groundColor="#905e90"
                    color="#ffb600"
                    intensity={.6}
                    position={hemisphereLightPosition} />
                <directionalLight
                    name="directionalLight"
                    color="#fff6f2"
                    castShadow
                    shadow-mapSize={[2048, 2048]}
                    position={directionalLightPosition} />
                <color attach="background" args={['#202020']} />

                <ModelViewer/>
                {/* <AboutMeFetcher position={[width/2, height/2 ,0]}/> */}

                <OrbitControls autoRotate={false} rotateSpeed={.2} enableZoom={true} enablePan={false} />
                <OrthographicCamera makeDefault position={cameraPosition} rotation={cameraRotation} />
            </Canvas>

            <OverlayButton 
                id="overlayButton"
                style={{border:`${overlayVisible?'.1rem solid red' : 'None'}` ,opacity:`${overlayVisible?1.2:.25}`, transform:`scale(${overlayVisible?.5:1.2})`}} 
                onClick={handleOverlayClick}>Projects</OverlayButton>
            {overlayVisible ? <Overlay> <ProjectsGetter /> </Overlay> : null}
        </>
    )

};

export default Scene;