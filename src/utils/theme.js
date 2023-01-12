import axios from 'axios'
import rgbHex from 'rgb-hex'
import color from 'css-color-function'
import formula from '@/constant/formula.json'

export async function getOriginStyle() {
  const version = require('element-plus/package.json').version
  const url = `https://unpkg.com/element-plus@${version}/dist/index.css`
  const { data } = await axios(url)
  return getStyleTemplate(data)
}

// 把需要替换的颜色打上标记
export function getStyleTemplate(data) {
  const colorMap = {
    '#3a8ee6': 'shade-1',
    '#409eff': 'primary',
    '#53a8ff': 'light-1',
    '#66b1ff': 'light-2',
    '#79bbff': 'light-3',
    '#8cc5ff': 'light-4',
    '#a0cfff': 'light-5',
    '#b3d8ff': 'light-6',
    '#c6e2ff': 'light-7',
    '#d9ecff': 'light-8',
    '#ecf5ff': 'light-9'
  }

  Object.keys(colorMap).forEach((key) => {
    const value = colorMap[key]
    data = data.replace(new RegExp(key, 'ig'), value)
  })

  return data
}

export function generateColors(primary) {
  if (!primary) return

  const colors = {
    primary
  }

  Object.keys(formula).forEach((key) => {
    const value = formula[key].replace(/primary/g, primary)
    colors[key] = `#` + rgbHex(color.convert(value))
  })

  return colors
}

export function writeNewStyle(newStyle) {
  const styleDom = document.createElement('style')
  styleDom.innerText = newStyle
  document.head.append(styleDom)
}

export async function generateNewStyle(primaryColor) {
  // 根据主色生成色值表
  const colors = generateColors(primaryColor)
  console.log(colors)
  // 根据当前 element-plus 的默认样式表，并且把需要替换的色值打上标记
  let cssText = await getOriginStyle()
  // 遍历生成的色值表，在默认样式表进行全局替换
  Object.keys(colors).forEach((key) => {
    cssText = cssText.replace(
      new RegExp('(:|\\s+)' + key, 'g'),
      '$1' + colors[key]
    )
  })
  console.log(cssText)
  return cssText
}
