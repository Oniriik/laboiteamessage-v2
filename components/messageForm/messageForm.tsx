import {
  Input, Tooltip, Button, Divider,
  Form,
  Row,
} from 'antd';

import {
  InfoCircleOutlined,
  UserOutlined,

} from '@ant-design/icons';

import { IMessagePayload } from '@/models';
import { MdOutlineEmail } from 'react-icons/md';
import { useEffect, useState } from 'react';
import * as Styled from './messageForm.styled';

const { TextArea } = Input;

const defaultOptions = {
  longMessage: false,
  fastDelivery: false,
};

const createMessage = async (data: IMessagePayload) => {
  const response = await fetch('/api/messages/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((res) => res.json()).catch((err) => {
    console.error(err);
  });

  if (response?._id) {
    window.location.href = `/messages/${response._id}`;
  }
};

export const MessageForm = () => {
  const [userIp, setUserIp] = useState({ ip: 'unknown', country: 'unknown' });
  const [options] = useState(defaultOptions);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') return;
    fetch(`https://api.ipdata.co/?api-key=${process.env.IP_RESOLVER_KEY}`).then(async (res) => {
      const { ip, country_name } = await res.json();
      setUserIp({
        ip: ip || 'unknown',
        country: country_name || 'unknown',
      });
    }).catch((err) => {
      console.error(err);
    });
  }, []);

  return (
    <Styled.MessageForm>
      <Form
        className="message-form"
        layout="vertical"
        form={form}
        name="messageForm"
        onFinish={
          (values) => {
            setLoading(true);
            createMessage({ ...values, userData: userIp });
            setTimeout(
              () => {
                setLoading(false);
              },
              3000,
            );
          }
        }
        autoComplete="on"
      >
        <Form.Item
          label="Votre Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'L\'email est requis',
            },
            {
              type: 'email',
              message: 'L\'email est invalide',
            },
          ]}
        >
          <Input
            placeholder="Votre adresse email"
            prefix={<MdOutlineEmail />}
            suffix={(
              <Tooltip title="Pour recevoir les informations sur votre message">
                <InfoCircleOutlined />
              </Tooltip>
            )}
          />
        </Form.Item>
        <Divider />
        <Form.Item
          label="Destinataire"
          name="recipient"
          rules={[
            {
              required: true,
              message: 'Le destinataire est requis',
            },
            {
              pattern: /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/,
              message: 'Le nom d\'utilisateur Instagram est invalide',
            },

          ]}
          normalize={(value) => (value.startsWith('@') ? value.slice(1) : value)}
        >
          <Input
            placeholder="@ instagram"
            prefix={<UserOutlined />}
            suffix={(
              <Tooltip title="Compte instagram du destinataire">
                <InfoCircleOutlined />
              </Tooltip>
            )}
          />
        </Form.Item>
        <Form.Item
          label="Votre message"
          name="message"
          rules={[
            {
              required: true,
              message: 'Le message est requis',
            },
            {
              max: options.longMessage ? 1000 : 150,
              message: `Le message doit faire moins de ${options.longMessage ? 1000 : 150} caractères`,
            },
          ]}
        >
          <TextArea
            placeholder="Votre message"
            maxLength={
              options.longMessage
                ? 1000
                : 150
            }
            count={{
              show: true,
              max: options.longMessage
                ? 1000
                : 150,
            }}
            rows={options.longMessage ? 10 : 3}
          />
        </Form.Item>

        <Form.Item>
          <Row justify="center">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              disabled={loading}
            >
              Envoyer
            </Button>
          </Row>
        </Form.Item>
      </Form>
    </Styled.MessageForm>
  );
};
