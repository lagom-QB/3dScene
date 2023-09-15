import { useThree } from "@react-three/fiber"; 
import React, { Suspense } from "react";
import { useProgress, Html, Center } from "@react-three/drei";

import { Stage } from "@react-three/drei";
import { BakeShadows, Bounds } from "@react-three/drei";
import { EffectComposer, Bloom } from '@react-three/postprocessing'

import { Perf } from 'r3f-perf'

import ModelActual from "./ModelActual";


const Loader = () => {
  const { progress } = useProgress();

  // Calculate the arc angle based on the progress value
  const arcAngle = Math.PI*2*((progress / 100) *(progress / 100));

  return (
    <Center>
      <Html center>
        <div style={{ color: 'white' }}>{progress}% </div><br/>
      </Html>
      <mesh rotateY={progress*progress}>
        <ringGeometry args={[.4, .42, 360, 1, 0, arcAngle]} scale={.7}/>
        {/* innerRad, outerRad, thethaSeg, phiSeg, thethaStart, thethaEnd */}
        <meshBasicMaterial color="#FFEB3B" />
      </mesh>
    </Center>
  );
};
const Debug = () => {
  const { width } = useThree((s) => s.size)
  return (
    <Perf
      minimal={width < 600}
      matrixUpdate
      deepAnalyze
      overClock
      // customData={{
      //   value: 60,
      //   name: 'physic',
      //   info: 'fps'
      // }}
    />
  )
}

export default function ModelLoader({ 
                            //modelScale = 10,  // Smaller number = bigger model
                            modelPosition = [0, -10, 0], 
                            modelRotation = [0, 90, 0], 
                             }) {
  return (
      <>        
        <Debug />
        <Suspense fallback={<Loader />}>
          <Bounds>
                <Stage contactShadow shadows adjustCamera intensity={.5}>
                <ModelActual 
                  position={modelPosition}
                  rotation={modelRotation} />
                </Stage>
                <BakeShadows/>
            </Bounds>
            <EffectComposer>
                <Bloom mipmapBlur radius={0.1} luminanceThreshold={1} luminanceSmoothing={0.9} height={300} />
            </EffectComposer>
        </Suspense>
      </>
  );
}