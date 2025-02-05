import React, { useState, useEffect } from 'react';

const GridLayout = ({ children }) => {
  const [screenSize, setScreenSize] = useState('sm');

  useEffect(() => {
    const updateScreenSize = () => {
      if (window.innerWidth >= 1024) {
        setScreenSize('lg');
      } else if (window.innerWidth >= 516) {
        setScreenSize('md');
      } else {
        setScreenSize('sm');
      }
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);

    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  const divideChildren = () => {
    const childrenArray = React.Children.toArray(children);
    const colCount = screenSize === 'sm' ? 1 : screenSize === 'md' ? 2 : 3;
    const dividedChildren = [];
    const totalItems = childrenArray.length;
    const baseItems = Math.floor(totalItems / colCount);
    const remainder = totalItems % colCount;

    let startIndex = 0;
    for (let i = 0; i < colCount; i++) {
      const endIndex = startIndex + baseItems + (i < remainder ? 1 : 0);
      dividedChildren.push(childrenArray.slice(startIndex, endIndex));
      startIndex = endIndex;
    }

    return dividedChildren;
  };

  const lists = divideChildren();

  return (
    <div id="getting-started" className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12`}>
      {lists.map((list, index) => (
        <div className={`flex flex-col gap-6`} key={index}>
          {list}
        </div>
      ))}
    </div>
  );
};

export default GridLayout;