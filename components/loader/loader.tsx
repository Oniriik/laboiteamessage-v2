import React from 'react';
import Image from 'next/image';
import * as Styled from './loader.styled';

export const Loader = () => (
  <Styled.Loader>
    <Image src="/img/anonletter.png" height={150} width={150} alt="app-logo" />
    <h1>loveletter.bot</h1>
    <div className="bar">
      <div className="bar-fill" />
    </div>
  </Styled.Loader>
);
