import React from 'react'

export default function AnalyticsSmallComp(props) {

  const {totalHitCount, category} = props

  return (
    <div className='w-full sm:w-1/6'>
        <div className='p-8 flex flex-col gap-2 justify-center items-center border rounded-md'>
            <span className='text-2xl'>  {category} </span>
            <span className='text-xl'> {totalHitCount} </span>
        </div>
    </div>
  )
}
