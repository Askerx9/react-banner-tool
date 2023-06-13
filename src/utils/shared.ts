import path from "path"

export const convertToAbsPath = (dir: string) => path.isAbsolute(dir) ? dir : path.join(process.cwd(), dir)