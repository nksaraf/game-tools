import React, { forwardRef, useLayoutEffect } from "react"
import { MathUtils } from "three"
import { Box } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import { button, useControls } from "leva"
import { mergeRefs } from "leva/plugin"
import { game } from "vinxi/game"
import { EntityEditor } from "../editor/EntityInspectorPanel"

export const Editable = forwardRef((props, forwardedRef) => {
  const ref = React.useRef()
  // useControls(
  //   props.name,
  //   {
  //     position: {
  //       value: props.position
  //         ? Array.isArray(props.position)
  //           ? props.position
  //           : [props.position, props.position, props.position]
  //         : [0, 0, 0],
  //       onChange(e) {
  //         ref.current?.position.set(...e)
  //       },
  //       step: 0.1
  //     },
  //     rotation: {
  //       value: props.rotation
  //         ? Array.isArray(props.rotation)
  //           ? props.rotation.map((e) => MathUtils.radToDeg(e))
  //           : [
  //               MathUtils.radToDeg(props.rotation),
  //               MathUtils.radToDeg(props.rotation),
  //               MathUtils.radToDeg(props.rotation)
  //             ]
  //         : [0, 0, 0],
  //       onChange(e) {
  //         ref.current?.rotation.set(...e.map((i) => MathUtils.degToRad(i)))
  //       },
  //       step: 0.1
  //     },
  //     scale: {
  //       value: props.scale
  //         ? Array.isArray(props.scale)
  //           ? props.scale
  //           : [props.scale, props.scale, props.scale]
  //         : [0, 0, 0],
  //       onChange(e) {
  //         ref.current?.scale.set(...e)
  //       },
  //       step: 0.1
  //     },
  //     save: button((get) => {
  //       fetch("/__editor/write", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json"
  //         },
  //         body: JSON.stringify({
  //           source: props._source,
  //           value: {
  //             position: get(`${props.name}.position`),
  //             scale: get(`${props.name}.scale`),
  //             rotation: get(`${props.name}.rotation`).map((i) =>
  //               MathUtils.degToRad(i)
  //             )
  //           }
  //         })
  //       })
  //     })
  //   },
  //   {
  //     collapsed: true
  //   }
  // )
  return (
    // <Box
    //   ref={mergeRefs([ref, forwardedRef])}
    //   {...props}
    //   onPointerDown={(e) => {
    //     console.log(e)
    //   }}
    // />
    <game.Entity
      entity={{
        name: props.name,
        jsx: props._source,
        mesh: {
          geometry: {},
          material: {}
        }
      }}
    >
      {(entity) => (
        <>
          <game.Component name="transform">
            <Box
              ref={mergeRefs([ref, forwardedRef])}
              {...props}
              onPointerDown={(e) => {
                console.log(e)
              }}
            />
          </game.Component>
          <MeshC ent={entity} />
        </>
      )}
    </game.Entity>
  )
})

function MeshC({ ent }) {
  useLayoutEffect(() => {
    Object.defineProperty(ent, "mesh$", {
      get() {
        return ent.transform
      }
    })
  })

  return null
}
