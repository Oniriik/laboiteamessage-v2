'use client';

import { useEffect, useState } from 'react';
import { Loader } from '@/components';
import { Page } from '@/styles';
import { IMessage } from '@/models';
import Image from 'next/image';
import { Button } from 'antd';
import { MessageStatus } from './messageStatus';
import { MessageCard } from './messageCard';
import * as Styled from './styled';

export default function Message({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<IMessage | null>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/messages/${params.id}`)
      .then((res) => res.json())
      .then((res) => {
        setIsLoading(false);
        if (res.ok === false) {
          setError(res.message);
        } else {
          setData(res);
        }
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [params.id]);

  return (
    <Page>
      {isLoading && <Loader />}
      { !isLoading && data && !error && (
        <Styled.Layout>
          <div className="content">
            <div className="logo">
              <Image src="/img/anonletter.png" height={150} width={150} alt="app-logo" />
              <h1>loveletter.bot</h1>
            </div>
            <MessageStatus status={data?.status} />
            <MessageCard message={data} />

            <Button type="primary" href="/">Annuler le message</Button>
          </div>
          <div>
            Les notifications à propos du message seront envoyées à
            {' '}
            {data?.email}
          </div>
        </Styled.Layout>
      )}
      {error && <div>{error}</div>}
    </Page>
  );
}
