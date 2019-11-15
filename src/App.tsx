import "./App.css";

import React from "react";

import CarouselContainer from "./components/carousel-container";

const App: React.FC = () => {
  return (
    <div className="App">
      <CarouselContainer>
        <div className="slide-content">1</div>
        <div className="slide-content">2</div>
        <div className="slide-content">3</div>
      </CarouselContainer>
    </div>
  );
};

export default App;
