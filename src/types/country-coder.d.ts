declare module '@rapideditor/country-coder' {
  export function iso1A2Code(
    query: [number, number] | string,
    opts?: { level?: string; withProp?: string }
  ): string | null
}
