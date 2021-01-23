import React from 'react';
import { RatedButton, RateNowButton } from './StatusButtons';

const RateButtons = ({ status, hasRated, onClick }) => {
  if (hasRated) return <RatedButton disabled text="Rated" />;
  else if (status === 'Accepted') return <RateNowButton onClick={onClick} />;
  else return <></>;
};

export default RateButtons;
