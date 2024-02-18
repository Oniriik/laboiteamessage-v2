'use client';

import Image from 'next/image';
import { MessageForm } from '@/components';
import * as Styled from './homepage.styled';

export default function Home() {
  return (
    <Styled.HomePage>
      <Image src="/img/anonletter.png" height={150} width={150} />
      <h1>loveletter.bot</h1>
      <h2>Soufflez vos sentiments, sans dévoiler votre ombre</h2>
      <MessageForm />
    </Styled.HomePage>
  );
}
