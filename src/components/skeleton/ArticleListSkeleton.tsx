import React from 'react'
import Skeleton from './Skeleton'

function ArticleListSkeleton() {
  return (
    <div className="m-5 space-y-6">
    <div className="grid gap-6 grid-cols-5">
      <div className="col-span-6 md:col-span-1">
        <Skeleton type="image" className="h-48 w-full" />
        <Skeleton type="title" className="mt-4" />
        <Skeleton type="text" count={2} className="mt-2" />
      </div>
      <div className="col-span-6 md:col-span-3 row-span-2 px-3 border-r-1">
        <Skeleton type="image" className="h-96 w-full" />
        <Skeleton type="title" className="mt-4 h-10" />
        <Skeleton type="text" count={4} className="mt-2" />
      </div>
      <div className="col-span-6 md:col-span-1">
        <Skeleton type="image" className="h-48 w-full" />
        <Skeleton type="title" className="mt-4" />
        <Skeleton type="text" count={2} className="mt-2" />
      </div>
      <div className="col-span-6 md:col-span-1">
        <Skeleton type="image" className="h-48 w-full" />
        <Skeleton type="title" className="mt-4" />
        <Skeleton type="text" count={2} className="mt-2" />
      </div>
      <div className="col-span-6 md:col-span-1">
        <Skeleton type="image" className="h-48 w-full" />
        <Skeleton type="title" className="mt-4" />
        <Skeleton type="text" count={2} className="mt-2" />
      </div>
    </div>
    <div className="grid gap-6 grid-cols-4 auto-rows-auto">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="col-span-6 md:col-span-3 lg:col-span-1 p-2">
          <Skeleton type="image" className="h-48 w-full" />
          <Skeleton type="title" className="mt-4" />
          <Skeleton type="text" count={2} className="mt-2" />
        </div>
      ))}
    </div>
  </div>
  )
}

export default ArticleListSkeleton