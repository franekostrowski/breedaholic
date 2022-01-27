import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  customClasses?: string;
}

const Container: React.FC<ContainerProps> = ({ children, customClasses }) => {
  return <div className={`px-6 ${customClasses}`}>{children}</div>;
};

export default Container;
