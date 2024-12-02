import ArticleForm from '@/components/articleForm/ArticleForm'
import React from 'react'

export default function CreateArticlePage() {
  return (
    <div className='mb-5'>
      <h1 className='text-5xl m-8 text-center'>Create an article here . . .</h1>
      <ArticleForm />
    </div>
  )
}
