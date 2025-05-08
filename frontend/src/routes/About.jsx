import React, { useEffect } from 'react';
import { useLoader } from '../hooks/useLoader';

function About() {
  const { useFakeLoader } = useLoader();

  useEffect(() => useFakeLoader(), []);
  return <div>About</div>;
}

export default About;
