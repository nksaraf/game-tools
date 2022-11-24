import React, { useLayoutEffect } from "react"
import { Box } from "@react-three/drei"
import { Editable } from "./A"
import { game } from "vinxi/game"

const editableContext = React.createContext(false)

let lib = {
  mesh: (props) => {
    const ref = React.useRef()
    useLayoutEffect(() => {
      console.log("ref", ref)
    })
    if (props.name) {
      return React.createElement(Editable, { ...props, ref })
    } else {
      return <Box {...props} />
    }
  },
  meshBasicMaterial: (props) => {
    const entity = game.useCurrentEntity()
    if (entity?.mesh?.material) {
      entity.mesh.material.props = { ...props }
      entity.mesh.material.type = "basic"
    }

    return React.createElement("meshBasicMaterial", {
      ...props,
      userData: {
        ...props.userData,
        source: props._source
      }
    })
  }
}

const editable = new Proxy(lib, {
  get: (target, prop) => {
    console.log(target, prop)
    if (target[prop]) {
      return target[prop]
    } else {
      return prop
    }
  }
})

globalThis.$ = editable
export default editable
console.log("editable", editable)
