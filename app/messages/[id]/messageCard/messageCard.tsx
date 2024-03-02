import { IMessage } from '@/models';
import { UserOutlined, SendOutlined } from '@ant-design/icons';
import * as Styled from './messageCard.styled';

export const MessageCard = ({ message }:{ message:IMessage | undefined }) => (
  <Styled.MessageCard>
    <div className="info">
      <UserOutlined />
      @
      {message?.recipient}
    </div>
    <div className="info">
      <span>
        <SendOutlined />
      </span>
      {message?.message}
    </div>
  </Styled.MessageCard>
);
