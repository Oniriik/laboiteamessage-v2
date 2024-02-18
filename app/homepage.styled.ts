import styled from 'styled-components';

export const HomePage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h1{
        line-height: 1;
        font-size: 4rem;
        color: #000;
        font-weight: 700;
        margin-bottom: 1rem;

        background: linear-gradient(180deg, #D85548 24%, #4D252F 100%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        user-select: none;
    }

    h2{
        line-height: 1;
        font-size: 1.2rem;
        color: #000;
        font-weight: 400;
        margin-bottom: 1rem;

        background: linear-gradient(180deg, #D85548 24%, #4D252F 100%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        user-select: none;

    }

    * {
        user-select: none;
    }
`;
