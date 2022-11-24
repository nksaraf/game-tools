import React from "react"
import ReactDOM from "react-dom/client"
import "./src/editor-proxy"
import "./index.css"
import "./assets/Ghost.gltf?gltfjsx"
import { StartScreen } from "./src/lib/StartScreen"
/* We need to make sure that this file imports _something_ from @react-three/fiber
because otherwise Vite gets confused. :( */
import "@react-three/fiber"
import { GameCanvas } from "vinxi/GameCanvas"
import { CameraSystem } from "vinxi/systems/camera"
import Editor, { store } from "./editor/Editor"
import RenderSystem from "vinxi/systems/render"
import { GLTFSystem } from "vinxi/systems/gltf"
import { ControlledMovementSystem } from "vinxi/systems/controller"
import MeshSystem from "vinxi/systems/mesh"
import { ScriptSystem } from "vinxi/systems/script"
import LightSystem from "vinxi/systems/light"
import { Instances, GroundSystem as TerrainSystem } from "./src/lib/terrain"
import { GridSystem } from "./src/scripts/grid"
import { TopDownControlledMovementSystem } from "./src/scripts/top-down-controller"
import { Euler, Vector3 } from "three"
import { Terrain } from "./src/scripts/Terrain"
import { Editable } from "./src/A"
function Systems() {
  return (
    <>
      <Editor />
      <GridSystem />
      <GLTFSystem />
      <ScriptSystem />
      <MeshSystem />
      <LightSystem />
      <CameraSystem />
      {/* <Instances /> */}
      <RenderSystem />
      <Terrain />
      {/* <ControlledMovementSystem /> */}
      <TopDownControlledMovementSystem />
      {/* <Comp /> */}
      {/* <TerrainSystem /> */}
    </>
  )
}
export const App = () => {
  return (
    <StartScreen>
      <GameCanvas>
        <mesh
          name="cube1"
          position={[
            6.849697374920435, -0.3376143545311696, -2.8329259215657463,
          ]}
          rotation={[-0.43633231299858233, 0.7853981633974483, 0]}
          scale={[1, 1, 1]}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color="red" />
        </mesh>
        <mesh
          name="cube2"
          position={[1.1172988147184817, 0, 0]}
          rotation={[-0.7853981633974483, 0, 0]}
          scale={[6, 1, 1]}
        >
          <meshBasicMaterial color={"#aa1100"} />
        </mesh>
        <Editor />
      </GameCanvas>
    </StartScreen>
  )
}
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
