import { useCallback, useEffect, useMemo } from "react";
import weightedRandom from "../utils/weightedRandom";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import axios from "axios";

let theWheel: any;
declare let Winwheel: any;

const useWheel = (data: any[], updateSheet: (id: string) => any) => {
  const segments = useMemo(
    () =>
      data.map((item: any) => ({
        text: item.name,
        fillStyle: item.color,
      })),
    [data]
  );
  const ids = useMemo(() => data.map((item: any) => item.id), [data]);
  const weights = useMemo(
    () => data.map((item: any) => Number(item.weight)),
    [data]
  );

  const onWheelFinished = useCallback((indicatedSegment: any) => {
    if (indicatedSegment) {
      Swal.fire({
        title: `Chúc mừng bạn đã trúng 1 ${indicatedSegment.text}`,
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      }).then((result) => {
        theWheel.stopAnimation(false); // Stop the animation, false as param so does not call callback function.
        theWheel.rotationAngle = 0; // Re-set the wheel angle to 0 degrees.
        theWheel.draw(); // Call draw to render changes to the wheel.
      });
    }
  }, []);

  useEffect(() => {
    const initializeWheel = () => {
      theWheel = new Winwheel({
        numSegments: segments.length, // Specify number of segments.
        outerRadius: 212, // Set outer radius so wheel fits inside the background.
        textFontSize: 22, // Set font size as desired.
        innerRadius: 22,
        responsive: true,
        segments: segments, // Define segments including colour and text.
        // Specify the animation to use.
        animation: {
          type: "spinToStop",
          duration: 5, // Duration in seconds.
          spins: 8, // Number of complete spins.
          callbackFinished: onWheelFinished,
        },
      });
    };

    if (segments.length > 0) {
      initializeWheel();
    }
  }, [segments, onWheelFinished]);

  const onStart = useCallback(async () => {
    const generatedItem = weightedRandom(ids, weights);
    if (!generatedItem) {
      return;
    }
    const result = data.find((item) => item.id === generatedItem.item);
    if (!result) {
      return;
    }
    updateSheet(result.id);
    const angle = 360 / data.length;
    const index = data.findIndex((item) => item.id === generatedItem.item);
    const fullSpins = Math.floor(Math.random() * 4) + 1;
    const offsetToPrice = index * angle;
    const additionalOffset = Math.floor(Math.random() * angle);
    theWheel.animation.stopAngle =
      fullSpins * 360 + offsetToPrice + additionalOffset;
    theWheel.startAnimation();
  }, [ids, weights]);

  return { onStart };
};

export default useWheel;
