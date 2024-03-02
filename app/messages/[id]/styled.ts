import styled from 'styled-components';

export const Layout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  
    .content{
        display: flex;
        flex-direction: column;
        gap: 16px;

        .logo{
        display: flex;
        flex-direction: column;
        align-items: center;
        }

        width: 500px;
    }

    @media (max-width: 768px) {
    
    .content{
        width: 100%;
    }
}

`;
