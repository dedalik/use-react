import React from "react";
import { useFavicon } from "../../..";

const Favicon: React.FC = () => {
  const [, setFavicon] = useFavicon();

  const favicon1 = () => {
    setFavicon("./logo512.png");
  };

  const favicon2 = () => {
    setFavicon("./favicon.ico");
  };

  return (
    <>
      <button onClick={favicon1}>light</button>
      <button onClick={favicon2}>Dark</button>
    </>
  );
};

export default Favicon;
