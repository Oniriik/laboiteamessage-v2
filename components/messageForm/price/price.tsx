import { Divider } from 'antd';
import * as Styled from './price.styled';

interface IOptions {
  longMessage: boolean;
  fastDelivery: boolean;
}

const prices: { [key: string]: number } = {
  longMessage: 2,
  fastDelivery: 5,
};

const featuresMapping: { [key: string]: string } = {
  longMessage: 'Message long',
  fastDelivery: 'Envoi rapide',
};

export const Price = (options: IOptions) => (
  <Styled.Price>
    {
      // @ts-ignore
      // eslint-disable-next-line react/destructuring-assignment
      Object.keys(options).some((key:string) => options[key]) && (
        <>
          <Divider />
          <div className="title">
            <span>Option</span>
            <span>Prix</span>
          </div>
        </>
      )
    }
    {
      Object.keys(options).map((key:string) => {
        // @ts-ignore
      // eslint-disable-next-line react/destructuring-assignment
        if (options[key]) {
          return (
            <div key={key} className="price">
              <span>{featuresMapping[key]}</span>
              <span>
                {prices[key]}
                €
              </span>
            </div>
          );
        }
        return null;
      })
    }
  </Styled.Price>
);
