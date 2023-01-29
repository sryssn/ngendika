import React from 'react';
import { GridLoader } from 'react-spinners';
import LoadingStyle from './styled/LoadingStyle';

function Loading() {
  return (
    <LoadingStyle>
      <GridLoader color="#0d6efd" />
    </LoadingStyle>
  );
}

export default Loading;
