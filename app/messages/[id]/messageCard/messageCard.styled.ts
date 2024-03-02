import styled from 'styled-components';

export const MessageCard = styled.div`
        display: flex;
        flex-direction: column;
        gap: 8px;
    background: #FBF0EE;
    padding: 16px;
    border-radius: 8px;
    border: 1px solid #DBC0BA;
    .info{
        display: flex;
        flex-direction: row;
        justify-content: start;
        gap: 8px;
        max-width: 400px;
    }
`;
