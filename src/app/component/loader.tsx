
import React from 'react'

const Loader = ({className}:any) => {
  return (
    <div>
        <div className={`h-8 w-8 rounded-full  rotate animate-bounce border-t-4 shadow-2xl  ${className} border-b-2 border-b-black`}></div>
    </div>
  )
}

export default Loader