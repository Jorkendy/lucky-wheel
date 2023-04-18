import { useState } from "react";
import useSheet from "./hooks/useSheet";
import appStyles from './App.module.scss'
import useWheel from './hooks/useWheel';

function App() {
  const [count, setCount] = useState(0);
  const { data, updateSheet = [] } = useSheet();
  const { onStart } = useWheel(data, updateSheet);

  return (
    <div className={appStyles.wrapper}>
      <div className={appStyles.wheelWrapper} onClick={onStart}>
          <canvas id="canvas" width="434" height="434">
              <p>Sorry, your browser doesn't support canvas. Please try another.</p>
          </canvas>
      </div>
    </div>
  );
}

export default App;
