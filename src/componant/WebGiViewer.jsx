import React, {
  useRef,
  useCallback,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  ViewerApp,
  AssetManagerPlugin,
  GBufferPlugin,
  ProgressivePlugin,
  TonemapPlugin,
  SSRPlugin,
  SSAOPlugin,
  BloomPlugin,
  GammaCorrectionPlugin,
  mobileAndTabletCheck,
} from "webgi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollAnimation } from "../lib/scroll-animation";

gsap.registerPlugin(ScrollTrigger);

const WebGiViewer = forwardRef((props, ref) => {
  const canvasReference = useRef(null);
  const [viewerRef, setViewerRef] = useState(null);
  const [tragetRef, setTargetRef] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [positionRef, setPositionRef] = useState(null);
  const canvasContainerRef = useRef();
  const [previewMode, setPreviewMode] = useState(false);
  const [ismobile, setisMobile] = useState(null);

  useImperativeHandle(ref, () => ({
    triggerPreview() {
      setPreviewMode(true);
      canvasContainerRef.current.style.pointerEvents = "all";
      props.contentRef.current.style.opacity = "0";
      gsap.to(positionRef, {
        x: 13.0,
        y: -2.01,
        z: 2.29,
        duration: 2,
        onUpdate: () => {
          viewerRef.setDirty();
          cameraRef.positionTargetUpdated(true);
        },
      });
      gsap.to(tragetRef, {
        x: 0.11,
        y: 0.0,
        z: 0.0,
        duration: 2,
      });
      viewerRef.scene.activeCamera.setCameraOptions({ controlsEnabled: true });
    },
  }));
  const memorizedScrollAnimation = useCallback(
    (position, target, ismobile, onUpdate) => {
      if (position && target && onUpdate) {
        scrollAnimation(position, target, ismobile, onUpdate);
      }
    }
  );

  const setupViewer = useCallback(async () => {
    const viewer = new ViewerApp({
      canvas: canvasReference.current,
    });

    setViewerRef(viewer);

    const setisMobileortablet = mobileAndTabletCheck();
    setisMobile(setisMobileortablet);

    const manager = await viewer.addPlugin(AssetManagerPlugin);

    const camera = viewer.scene.activeCamera;
    const position = camera.position;
    const target = camera.target;
    setCameraRef(camera);
    setPositionRef(position);
    setTargetRef(target);
    // Add plugins individually.
    await viewer.addPlugin(GBufferPlugin);
    await viewer.addPlugin(new ProgressivePlugin(32));
    await viewer.addPlugin(new TonemapPlugin(true));
    await viewer.addPlugin(GammaCorrectionPlugin);
    await viewer.addPlugin(SSRPlugin);
    await viewer.addPlugin(SSAOPlugin);
    await viewer.addPlugin(BloomPlugin);

    viewer.renderer.refreshPipeline();

    // Import and add a GLB file.

    await manager.addFromPath("scene-black.glb");

    viewer.getPlugin(TonemapPlugin).config.clipBackground = true;
    viewer.scene.activeCamera.setCameraOptions({ controlsEnabled: true });

    if (setisMobileortablet) {
      position.set(-16.7, 1.17, 11.7);
      target.set(0, 1.37, 0);
      props.contentRef.current.className = "mobile-or-tablet";
    }
    window.scrollTo(0, 0);

    let needsUpdate = true;

    const onUpdate = () => {
      needsUpdate = true;
      viewer.setDirty();
    };

    viewer.addEventListener("preFrame", () => {
      if (needsUpdate) {
        camera.positionTargetUpdated(true);
        needsUpdate = false;
      }
    });
    memorizedScrollAnimation(position, target, setisMobileortablet, onUpdate);
  }, []);

  useEffect(() => {
    setupViewer();
  }, []);

  const handleExit = useCallback(() => {
    canvasContainerRef.current.style.pointerEvents = "none";
    props.contentRef.current.style.opacity = "1";
    viewerRef.scene.activeCamera.setCameraOptions({ controlsEnabled: false });
    setPreviewMode(false);

    gsap.to(positionRef, {
      x: !ismobile ? 1.56 : 9.36,
      y: !ismobile ? 5.0 : 8,
      z: !ismobile ? 0.01 : 0.09,
      scrollTrigger: {
        trigger: ".display-section",
        start: "top bottom",
        end: "top top",
        scrub: 2,
        immediateRender: false,
      },
      onUpdate: () => {
        viewerRef.setDirty();
        cameraRef.positionTargetUpdated(true);
      },
    });
    gsap.to(tragetRef, {
      x: !ismobile ? -0.55 : -1.62,
      y: !ismobile ? 0.6: 0.02,
      z: !ismobile ? 0.0 :-0.06,
      scrollTrigger: {
        trigger: ".display-section",
        start: "top bottom",
        end: "top top",
        scrub: 2,
        immediateRender: false,
      },
    });
  }, [canvasContainerRef, viewerRef, positionRef, cameraRef, tragetRef]);
  return (
    <div ref={canvasContainerRef} id="webgi-canvas-container">
      <canvas id="webgi-canvas" ref={canvasReference} />
      {previewMode && (
        <button className="button" onClick={handleExit}>
          Exit
        </button>
      )}
    </div>
  );
});

export default WebGiViewer;

// import React, {
//     useRef,
//     useCallback,
//     useEffect,
//     useState,
//     forwardRef,
//     useImperativeHandle,
//   } from "react";
//   import {
//     ViewerApp,
//     AssetManagerPlugin,
//     GBufferPlugin,
//     ProgressivePlugin,
//     TonemapPlugin,
//     SSRPlugin,
//     SSAOPlugin,
//     BloomPlugin,
//     GammaCorrectionPlugin,
//     addBasePlugins,
//     CanvasSnipperPlugin,
//     mobileAndTabletCheck,
//   } from "webgi";
//   import gsap from "gsap";
//   import { ScrollTrigger } from "gsap/ScrollTrigger";
//   function WebGiViewer() {
//     const canvasReference = useRef(null);

//     const setupViewer = useCallback(async () => {

//       const viewer = new ViewerApp({
//         canvas: canvasReference.current,
//       });

//       const manager = await viewer.addPlugin(AssetManagerPlugin);

//       // Add plugins individually.
//       await viewer.addPlugin(GBufferPlugin)
//       await viewer.addPlugin(new ProgressivePlugin(32))
//       await viewer.addPlugin(new TonemapPlugin(!viewer.useRgbm))
//       await viewer.addPlugin(GammaCorrectionPlugin)
//       await viewer.addPlugin(SSRPlugin)
//       await viewer.addPlugin(SSAOPlugin)
//       // await viewer.addPlugin(DiamondPlugin)
//       // await viewer.addPlugin(FrameFadePlugin)
//       // await viewer.addPlugin(GLTFAnimationPlugin)
//       // await viewer.addPlugin(GroundPlugin)
//       await viewer.addPlugin(BloomPlugin)
//       // await viewer.addPlugin(TemporalAAPlugin)
//       // await viewer.addPlugin(AnisotropyPlugin)

//       viewer.renderer.refreshPipeline();

//       // Import and add a GLB file.
//       await manager.addFromPath("scenes.glb");
//       viewer.getPlugin(TonemapPlugin).config.clipBackground = true;
//     }, []);

//     useEffect(() => {
//       setupViewer();
//     }, []);

//     return (
//       <div id="webgi-canvas-container">
//         <canvas id="webgi-canvas" ref={canvasReference} />
//       </div>
//     );
//   }

//   export default WebGiViewer;
