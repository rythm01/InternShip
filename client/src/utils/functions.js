import axios from "axios"

export const truncateString = (string, to = 15) => {
  let str = string
  if (str.length > to) {
    let substr = str.split('.')
    str = str.slice(0, to - 5) + "..." + substr[substr.length - 1]
  }
  return str
}

export const createCopiedFileName = (string) => {
  let str = string
  let substr = str.split('.')
    str = substr.splice(-1, 0, " - copy")
  return str
}