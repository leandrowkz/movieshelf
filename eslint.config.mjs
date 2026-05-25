import next from "eslint-config-next"

const config = [
  {
    ignores: [".next/**", "node_modules/**", "components/ui/**"],
  },
  ...next,
  {
    rules: {
      // React 19 rule still maturing — flags legitimate external-system sync
      // (embla init, async fetch loading flags, zustand persist hydration).
      // Revisit when stable.
      "react-hooks/set-state-in-effect": "off",
    },
  },
]

export default config
