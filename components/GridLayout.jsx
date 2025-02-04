import React, { useState, useEffect } from 'react';

const GridLayout = ({ children }) => {
  const [screenSize, setScreenSize] = useState('sm');

  // Update screen size on window resize
  useEffect(() => {
    const updateScreenSize = () => {
      if (window.innerWidth >= 1024) {
        setScreenSize('lg');
      } else if (window.innerWidth >= 768) {
        setScreenSize('md');
      } else {
        setScreenSize('sm');
      }
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);

    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  // Function to divide children into lists based on the column values
  const divideChildren = () => {
    const childrenArray = React.Children.toArray(children);
    const colCount = screenSize === 'sm' ? 1 : screenSize === 'md' ? 2 : 3;
    const dividedChildren = [];

    // Calculate how many children go into each list based on column count
    const itemsPerList = Math.ceil(childrenArray.length / colCount);

    for (let i = 0; i < colCount; i++) {
      dividedChildren.push(childrenArray.slice(i * itemsPerList, (i + 1) * itemsPerList));
    }

    return dividedChildren;
  };

  const lists = divideChildren();

  return (
    <div id="getting-started" className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12`}>
      {lists.map((list, index) => (
        <div className={`grid`} key={index}>
          {list}
        </div>
      ))}
    </div>
  );
};

export default GridLayout;
