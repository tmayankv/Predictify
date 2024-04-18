import React, { useEffect, useState } from 'react'
import { useStateContext } from '../context/StateContext'

const NewsBar = () => {
 const {contract} = useStateContext()
 const [news, setNews] = useState([])
  const getNews = async ()=>{
    const response = await fetch('https://newsapi.org/v2/everything?q=cryptocurrency&apiKey=9e6d059f6b464ceabbdc98950ec73f8b&pageSize=20')
    const data = await response.json()
    setNews(data.articles)
    console.log(news)
  }
  useEffect(() => {
    if(contract) getNews()
  }, [contract])
  return (
    <div className="newsbar w-full rounded-2xl p-1 px-2 flex gap-2 flex-col items-center text-white text-xs">
      <h1 className="text-2xl font-bold italic underline">Trending News</h1>
      {news.slice(0,5).map((article, i)=>(
        <div className="w-full font-semibold truncate rounded-xl p-1 cursor-pointer hover:bg-violet-700">{i+1}. {article.title}</div>
      ))}
    </div>
  )
}

export default NewsBar
