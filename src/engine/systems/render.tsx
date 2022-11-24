import { useFrame } from "@react-three/fiber"
import { button, folder } from "leva"
import { Vector3, Euler, Object3D, MathUtils } from "three"
import { game } from "../game"
import { registerComponent } from "../../../editor/Editor"

const follower = game.world.with("helper$", "transform")

export default function RenderSystem() {
  useFrame(function helperSystem() {
    for (const entity of follower) {
      entity.helper$.position.copy(entity.transform.position)
    }
  })

  return null
}

registerComponent("jsx", {
  controls(entity) {
    return {
      save: button((get) => {
        let diffs = [
          {
            source: entity.jsx,
            value: {
              position: get(`${entity.name}.transform.position`),
              scale: get(`${entity.name}.transform.scale`),
              rotation: get(`${entity.name}.transform.rotation`).map((i) =>
                MathUtils.degToRad(i)
              )
            }
          }
        ]
        console.log(entity)
        if (entity.mesh$?.material?.userData?.source) {
          let diff2 = {
            source: entity.mesh$.material.userData.source,
            value: {
              color: get(`${entity.name}.material.color`)
            }
          }
          diffs.push(diff2)
        }
        console.log(entity)
        fetch("/__editor/write", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(diffs)
        })
      })
    }
  }
})

registerComponent("transform", {
  addTo(e) {
    game.world.addComponent(e, "transform", new Object3D())
  },
  controls(entity) {
    return {
      transform: folder(
        {
          position: {
            step: 0.5,
            value: entity.transform.position.toArray(),
            onChange: (value) => {
              entity.transform.position.fromArray(value)
              // @ts-ignore
              entity.transformControls$?.object?.position.fromArray(value)
            }
          },
          rotation: {
            step: 1,
            value: [
              MathUtils.radToDeg(entity.transform.rotation.x),
              MathUtils.radToDeg(entity.transform.rotation.y),
              MathUtils.radToDeg(entity.transform.rotation.z)
            ],
            onChange: (value) => {
              entity.transform.rotation.fromArray([
                ...value.map((v) => MathUtils.degToRad(v)),
                "XYZ"
              ] as any)
              entity.transformControls$?.object?.rotation.fromArray([
                ...value.map((v) => MathUtils.degToRad(v)),
                "XYZ"
              ])
            }
          },
          scale: {
            step: 0.5,
            value: entity.transform.scale.toArray(),
            onChange: (value) => {
              entity.transform.scale.fromArray(value)
              entity.transformControls$?.object?.scale.fromArray(value)
            }
          },
          visible: {
            value: entity.transform.visible,
            onChange: (value) => {
              entity.transform.visible = value
            }
          }
        },
        {
          collapsed: true
        }
      )
    }
  }
})
