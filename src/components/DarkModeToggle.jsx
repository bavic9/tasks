import React from 'react'

function DarkModeToggle() {

    const mode = 'light'

  return (
    <div className='relative inline-flex cursor-pointer items-center w-11 h-6 rounded-full bg-[#635fc7]'>
      <span className='translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition'
      style={mode === 'light' ? {left: '2px'} : {right: '2px'}}
      ></span>
    </div>
  )
}

export default DarkModeToggle
