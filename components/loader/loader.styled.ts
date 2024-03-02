import styled from 'styled-components';

export const Loader = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;

    .bar{
        width: 70%;
        height: 10px;
        background-color: #f2f2f2;
        border-radius: 5px;
        position: relative;
        overflow: hidden;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .bar-fill{
        width: 100%;
        height: 100%;
        background-color: #D85548;
        position: absolute;
        top: 0;
        left: 0;
        animation: slide 2s cubic-bezier(0.2, 0.8, 0.2, 1) infinite;
    }


@keyframes slide {
    0% {
        transform: translateX(-100%);
    }
    50% {
        transform: translateX(100%);
    }
    100% {
        transform: translateX(-100%);
    }
}

    `;
