import { Steps } from 'antd';
import { useMemo } from 'react';
import {
  LoadingOutlined, SendOutlined, IdcardOutlined, InboxOutlined,
} from '@ant-design/icons';
import * as Styled from './messageStatus.styled';

export const MessageStatus = ({ status }:{ status:string | undefined }) => {
  const currentStatus = useMemo(() => {
    switch (status) {
      case 'pending':
        return 0;
      case 'processing':
        return 1;
      case 'posted':
        return 2;
      default:
        return 0;
    }
  }, [status]);

  return (
    <Styled.MessageStatus>
      <Steps
        current={currentStatus}
        items={[
          {
            title: 'Message reçu',
            icon: <IdcardOutlined />,
          },
          {
            title: currentStatus === 1 ? 'En cours d\'envoi' : 'Envoi',
            icon: currentStatus === 1 ? <LoadingOutlined /> : <SendOutlined />,
          },
          {
            title: 'Envoyé',
            icon: <InboxOutlined />,
          },
        ]}
      />
    </Styled.MessageStatus>

  );
};
