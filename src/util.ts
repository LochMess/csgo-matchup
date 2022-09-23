export function toJSON(obj: any): string {
  const seen: any[] = []
  return JSON.stringify(
    obj,
    function (_, val) {
      if (val !== undefined && typeof val === 'object') {
        if (seen.indexOf(val) >= 0) {
          return
        }
        seen.push(val)
      }
      return val
    },
    2,
  )
}
