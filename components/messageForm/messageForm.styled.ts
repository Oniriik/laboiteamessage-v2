import styled from 'styled-components';

export const MessageForm = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;

    gap: 24px;

    width: 400px;   

    textarea{
        white-space: break-spaces;
        overflow-x: hidden;
        word-wrap: break-word;
    }
`;
