import React, {useEffect} from 'react'
import { useLoader } from '../hooks/useLoader'


function Blog() {
   const { useFakeLoader } = useLoader()
  
    useEffect(() => useFakeLoader(), [])
  
  return (
    <div>Blog</div>
  )
}

export default Blog