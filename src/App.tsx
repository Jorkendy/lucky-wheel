import useSheet from "./hooks/useSheet";
import appStyles from "./App.module.scss";
import useWheel from "./hooks/useWheel";
import text from "./assets/images/TEXT_mini.png";

function App() {
  const { data, updateSheet = [] } = useSheet();
  const { onStart } = useWheel(data, updateSheet);

  return (
    <div className={appStyles.wrapper}>
      <img src={text} className={appStyles.text} />

      <div className={appStyles.wheelWrapper}>
        <canvas
          id="canvas"
          width="500"
          height="500"
          data-responsiveMinWidth="180"
          data-responsiveScaleHeight="true"
          onClick={onStart}
        >
          <p>Sorry, your browser doesn't support canvas. Please try another.</p>
        </canvas>
      </div>
    </div>
  );
}

export default App;
