import fs from 'fs'

export const replaceMaskFile = (path: string, values: any) => {
  const contentFile = fs.readFileSync(path).toString()
  fs.writeFileSync(path, replaceMask(contentFile, values))
}

const replaceMask = (content: string, values: any): string => {
  Object.keys(values).map((key) => {
    content = content.split(`[[${key}]]`).join(values[key])
  })
  return content
}

export default replaceMask
