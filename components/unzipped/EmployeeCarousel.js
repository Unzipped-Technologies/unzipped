import React, { useState } from 'react';
import styled from 'styled-components';
import { 
    BackArrow,
    VerifiedIcon,
    ReactCodeIcon,
} from '../icons'

const Container = styled.div`
    width: 100vw;
    position: relative;
    display: flex;
    justify-content: center;
    margin: 25px 0px;
    @media (max-width: 550px) {
        margin: 5px 0px;
      }
`;

const CarouselWrapper = styled.div`
  width: 85%;
  overflow: hidden;
  position: relative;
  margin: auto;
  background-color: #FBFBFB;
  padding: 40px 40px;
  margin: 25px 0px;
  display: flex;
  justify-content: center;
  @media (max-width: 550px) {
    padding: 0px 40px;
  }
`;

const CarouselContainer = styled.div`
  display: flex;
  gap: 16px;
  transition: transform 0.5s ease;
`;

const EmployeeCard = styled.div`
  flex: 0 0 auto;
  max-height: 410px;
  width: 210px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #FFFFFF;
  border: ${(props) => props.isSelected ? '2px solid #204ECF' : 'none'};
  transition: border 0.5s ease;
`;

const EmployeeImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const InfoSection = styled.div`
    padding: 8px 12px;
    background-color: #FBFBFB;
    height: 205px;
    border-radius: 6px;
`;

const Name = styled.div`
  font-size: 18px;
  color: #204ECF;
  margin-bottom: 4px;
`;

const Move = styled.div``;

const Position = styled.div`
  font-size: 14px;
  color: #36A996;
  display: flex;
  align-items: flex-start;
  svg {
    margin-right: 4px;
  }
`;

const Specialty = styled.div`
  font-size: 14px;
  color: #6A7283;
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  svg {
    margin-right: 4px;
  }
`;

const PrevPosition = styled.div`
  color: #515663;
  font-size: 13px;
  margin-bottom: 4px;
  margin-top: 10px;
`;

const PrevPositionBold = styled.div`
  font-size: 24px;
  font-weight: bold;
  line-height: 26px;
`;

const Arrow = styled.div`
  position: absolute;
  top: 50%;
  ${(props) => (props.direction === 'right' ? `right: 60px;` : `left: 60px;`)}
  font-size: 24px;
  color: #1C1B1F;
  cursor: pointer;
  user-select: none;
  transform: ${({ direction }) => (direction === 'right' ? 'scaleX(-1)' : 'scaleX(1)')};
  @media (max-width: 1096px) {
    ${(props) => (props.direction === 'right' ? `right: 35px;` : `left: 35px;`)}
  }
  @media (max-width: 770px) {
    ${(props) => (props.direction === 'right' ? `right: 15px;` : `left: 15px;`)}
  }
  @media (max-width: 550px) {
    ${(props) => (props.direction === 'right' ? `right: 5px;` : `left: 5px;`)}
  }
`;

const EmployeeCarousel = ({ initialItems }) => {
    const [offset, setOffset] = useState(0);
    const [selected, setSelected] = useState(10);
    const [touchStart, setTouchStart] = useState(null);

    const handleNext = () => {
        // Move to the next item by increasing the offset
        setOffset((prevOffset) => prevOffset - (200 + 24));
        setSelected(selected + 1)
    };
  
    const handlePrev = () => {
        // Move to the previous item by decreasing the offset
        setOffset((prevOffset) => prevOffset + (200 + 24));
        setSelected(selected - 1)
    };

    // Wrap around logic for infinite scrolling
    // If at the end, jump to the start
    if (offset <= -1512) {
        setOffset(0);
        setSelected(10);
    }
    // If at the start, jump to the end
    if (offset >= 1512) {
        setOffset(0);
        setSelected(10);
    }

    const handleTouchStart = (e) => {
        const touchX = e.touches[0].clientX; // Get the horizontal position of the touch
        setTouchStart(touchX);
    };
    
    const handleTouchEnd = (e) => {
        const touchEnd = e.changedTouches[0].clientX; // Get the horizontal position when touch ends
    
        // Determine swipe direction
        if (touchStart - touchEnd > 75) { // Swipe left
            handleNext();
        } else if (touchStart - touchEnd < -75) { // Swipe right
            handlePrev();
        }
    };

    return (
        <Container
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <Arrow direction="left" onClick={handlePrev}><BackArrow /></Arrow>
            <CarouselWrapper>
                <CarouselContainer style={{ transform: `translateX(${offset}px)`, transition: 'transform 0.5s ease' }}>
                    {initialItems.map((employee, index) => (
                        <EmployeeCard key={index} isSelected={index === selected}>
                            <EmployeeImage src={employee.imgUrl} alt={employee.name} />
                            <InfoSection>
                                <Name>{employee.name}</Name>
                                <Position>
                                    <Move><VerifiedIcon /></Move>
                                    <p>Verified Expert <br/> in {employee.position}</p>
                                </Position>
                                <Specialty>
                                    <ReactCodeIcon />
                                    {employee.specialty}
                                </Specialty>
                                <PrevPosition>PREVIOUSLY AT</PrevPosition>
                                <PrevPositionBold>{employee.prevPosition}</PrevPositionBold>
                            </InfoSection>
                        </EmployeeCard>
                    ))}
                </CarouselContainer>
            </CarouselWrapper>
            <Arrow direction="right" onClick={handleNext}><BackArrow /></Arrow>
        </Container>
    );
};

export default EmployeeCarousel;
