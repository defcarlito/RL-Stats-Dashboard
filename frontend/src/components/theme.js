import { createSystem, defaultConfig, defineConfig, defineGlobalStyles } from "@chakra-ui/react"

const globalCss = defineGlobalStyles({
  body: {
    color: "text.base",
  },
})

const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        background: {
          base: { value: "#1B2531" },
        },
        container: {
          base: { value: "#212D3B" },
          soft: { value: "#2A3A4C" },
        },
        text: {
          base: { value: "#DBCDC6" },
          base_quieter: {value: "#8C827C"},
          quiet: { value: "#7E9BB8" },
          quieter: { value: "#30455A" },
          
        },
        card: {
          base: { value: "#233140" },
        },
        border: {
          soft: { value: "#2A3A4C" },
        },
      },
    },
  },
  globalCss,
})

export const system = createSystem(defaultConfig, customConfig)