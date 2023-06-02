// this component loads up the FaIcons, SiIcons, and MdIcons
// then present them in a picker
// the picker sets the value of the field to the icon name, and the icon family
// this uses Chakra-ui and react-icons
import { Select } from '@chakra-ui/react'
import React from 'react'
import * as FaIcons from 'react-icons/fa';
const FaIconsKeys = Object.keys(FaIcons);
let FaIconsMap = FaIconsKeys.map((icon)=>{
  return {
    label: icon,
    value: icon
  }
})
import * as SiIcons from 'react-icons/si';
const SiIconsKeys = Object.keys(SiIcons)
let SiIconsMap = SiIconsKeys.map((icon)=>{
  return {
    label: icon,
    value: icon
  }
})
import * as MdIcons from 'react-icons/md';
const MdIconsKeys = Object.keys(MdIcons)
let MdIconsMap = MdIconsKeys.map((icon)=>{
  return {
    label: icon,
    value: icon
  }
})
const IconPicker = ({
  setIconFamily,
  setIconName,
}) => {
  return (
    <>
      <Select
        placeholder="Select Icon Family"
        onChange={(e) => {
          setIconFamily(e.target.value)
        }}
      >
        <option value="FaIcons">FaIcons</option>
        <option value="SiIcons">SiIcons</option>
        <option value="MdIcons">MdIcons</option>
      </Select>
      <Select
        placeholder="Select Icon"
        onChange={(e) => {
          setIconName(e.target.value)
          // set iconFamily
          let familyIconChars = e.target.value.substring(0, 2)
          let faIconFamily = familyIconChars === 'Fa'
          let siIconFamily = familyIconChars === 'Si'
          let mdIconFamily = familyIconChars === 'Md'
          if (faIconFamily) setIconFamily('FaIcons')
          if (siIconFamily) setIconFamily('SiIcons')
          if (mdIconFamily) setIconFamily('MdIcons')
        }}
      >
        {FaIconsMap.map((icon) => {
          // we are also going to render the icon here
          // so we can see what it looks like
          return (
            <option value={icon.value}>
              {icon.label}
              {React.createElement(FaIcons[icon.value])}
            </option>
          )
        })}
        {SiIconsMap.map((icon) => {
          return (
            <option value={icon.value}>
              {icon.label}
              {React.createElement(SiIcons[icon.value])}
            </option>
          )
        })}
        {MdIconsMap.map((icon) => {
          return (
            <option value={icon.value}>
              {icon.label}
              {React.createElement(MdIcons[icon.value])}
            </option>
          )
        })}
      </Select>
    </>
  )
}

export default IconPicker
