import React from 'react'
import { CgUnavailable } from "react-icons/cg";

const NoDataAvailable = ({
    message = 'No Data Available'
}) => {
  return (
    <div className="flex items-center justify-center h-full flex-col gap-3">
        {message}
        <CgUnavailable className="h-10 w-10 text-red-500"/>
    </div>
  )
}

export default NoDataAvailable
