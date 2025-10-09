import fs from 'fs/promises'
import path from 'path'

export async function fileExists(filename: string) {
  try {
    await fs.access(filename, fs.constants.R_OK) // check file exists and is readable
    return true
  } catch (err) {
    return false
  }
}

export function safeJoin(base: string, file: string) {
  const file2 = path.join('/', file) // removes all `../` by making the file relative to root `/`
  return path.join(base, file2)
}
