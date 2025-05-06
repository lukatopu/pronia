import React, {useEffect} from 'react'
import { useLoader } from '../hooks/useLoader'

function Pages() {

  const { useFakeLoader } = useLoader()

  useEffect(() => useFakeLoader(), [])


  return (
    <div>NOT FOUND</div>
  );
}

export default Pages;
