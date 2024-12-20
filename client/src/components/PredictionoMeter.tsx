import styled from "styled-components";

interface Props {
  prediction: number;
  isPredicting: boolean;
}

const PredictionoMeter = ({ prediction, isPredicting }: Props) => {
  const predictionLabel = (): string => {
    const labels = ["Low", "Moderate", "High", "Very High", "Extreme"];

    return `${labels[prediction - 1]} Usage`;
  };

  return (
    <Meter>
      <BarHolder></BarHolder>
      <Bar steps={prediction}></Bar>
      <Details>
        <DetailsContent>
          {isPredicting ? (
            <AnimateDots>Predicting</AnimateDots>
          ) : prediction ? (
            predictionLabel()
          ) : (
            "Predict first"
          )}
        </DetailsContent>
      </Details>
    </Meter>
  );
};

const Meter = styled.div`
  position: relative;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background-image: conic-gradient(
    transparent 0deg 180deg,
    #78c679 180deg 216deg,
    #fdd835 216deg 252deg,
    #fb8c00 252deg 288deg,
    #e64a19 288deg 324deg,
    #d32f2f 324deg 360deg
  );
  transform: rotateZ(90deg);
  margin-bottom: -120px;
`;

const Bar = styled.div<{ steps: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-100%, -50%)
    ${({ steps }) => `rotateZ(${252 + 36 * steps}deg)`};
  transform-origin: right;
  width: 40%;
  height: 10px;
  background-color: ${({ theme }) => theme.colors.background};
  z-index: 10;
  transition: all 1000ms;

  &::after {
    content: "";
    position: absolute;
    display: block;
    width: 15px;
    height: 15px;
    top: 50%;
    transform: translate(-50%, -50%) rotateZ(45deg);
    background-color: inherit;
  }
`;

const BarHolder = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  background-color: ${({ theme }) => theme.colors.background};
  z-index: 15;
`;

const Details = styled.div`
  position: absolute;
  width: 500px;
  height: 250px;
  font-size: 2rem;
  font-weight: 900;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.background};
  transform: translate(25%, 50%) rotateZ(270deg);
  z-index: 20;
`;

const DetailsContent = styled.div`
  margin-top: 10px;
`;

const AnimateDots = styled.div`
  @keyframes dot-blink {
    0% {
      content: ".";
    }
    50% {
      content: "..";
    }
    100% {
      content: "...";
    }
  }

  &::after {
    content: ".";
    position: absolute;
    animation: dot-blink 1.5s infinite;
  }
`;

export default PredictionoMeter;
