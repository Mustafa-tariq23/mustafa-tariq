/* Signal / Afterimage — amber wireframe orb with outer glow ring */
import { useEffect, useRef } from "react";

type OrbitSceneProps = {
  className?: string;
};

type DisposableObject = { geometry?: { dispose: () => void } };

export default function OrbitScene({ className = "" }: OrbitSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let destroyed = false;
    let cleanup: (() => void) | undefined;

    const boot = async () => {
      const THREE = await import("three");
      if (destroyed) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
      camera.position.set(0, 0, 7.2);

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);

      const system = new THREE.Group();
      const orb = new THREE.Group();
      system.add(orb);
      scene.add(system);

      // ── Materials ──────────────────────────────────────────────
      // Primary amber signal
      const signal = new THREE.LineBasicMaterial({ color: 0xffb16b, transparent: true, opacity: 0.85 });
      // Muted cool-blue grid lines
      const cool = new THREE.LineBasicMaterial({ color: 0x7a8ea0, transparent: true, opacity: 0.18 });
      // Warm amber for node spheres
      const nodeWarm = new THREE.MeshBasicMaterial({ color: 0xffd0a4, transparent: true, opacity: 0.92 });
      // Faint outer ring
      const outerRing = new THREE.LineBasicMaterial({ color: 0xffb16b, transparent: true, opacity: 0.12 });

      // ── Core icosahedron ────────────────────────────────────────
      const core = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.62, 2)),
        signal,
      );
      core.rotation.set(0.22, -0.42, 0.18);
      orb.add(core);

      // ── Inner wireframe ─────────────────────────────────────────
      const inner = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.18, 1)),
        cool,
      );
      inner.rotation.set(-0.2, 0.4, -0.28);
      orb.add(inner);

      // ── Elliptical rings ────────────────────────────────────────
      const ringGroup = new THREE.Group();
      const ringMaterial = new THREE.LineBasicMaterial({ color: 0x7a8ea0, transparent: true, opacity: 0.14 });
      [1.9, 2.14].forEach((radius, index) => {
        const ring = new THREE.LineLoop(
          new THREE.BufferGeometry().setFromPoints(
            Array.from({ length: 96 }, (_, pointIndex) => {
              const angle = (pointIndex / 96) * Math.PI * 2;
              return new THREE.Vector3(
                Math.cos(angle) * radius,
                Math.sin(angle) * radius * 0.34,
                0,
              );
            }),
          ),
          ringMaterial,
        );
        ring.rotation.set(
          index === 0 ? 0.55 : -0.22,
          index === 0 ? -0.18 : 0.7,
          index === 0 ? 0.28 : -0.45,
        );
        ringGroup.add(ring);
      });
      orb.add(ringGroup);

      // ── Outer glow ring ─────────────────────────────────────────
      const outerGlowRing = new THREE.LineLoop(
        new THREE.BufferGeometry().setFromPoints(
          Array.from({ length: 128 }, (_, i) => {
            const angle = (i / 128) * Math.PI * 2;
            return new THREE.Vector3(Math.cos(angle) * 2.55, Math.sin(angle) * 2.55, 0);
          }),
        ),
        outerRing,
      );
      outerGlowRing.rotation.set(0.9, 0.3, 0.1);
      orb.add(outerGlowRing);

      // ── Signal path (dashed arc) ─────────────────────────────────
      const signalArcMat = new THREE.LineBasicMaterial({ color: 0xffb16b, transparent: true, opacity: 0.45 });
      const signalArc = new THREE.LineLoop(
        new THREE.BufferGeometry().setFromPoints(
          Array.from({ length: 48 }, (_, i) => {
            const t = i / 48;
            const angle = t * Math.PI * 1.1 - 0.4;
            return new THREE.Vector3(
              Math.cos(angle) * 2.05,
              Math.sin(angle) * 2.05 * 0.22,
              0,
            );
          }),
        ),
        signalArcMat,
      );
      signalArc.rotation.set(-0.6, 1.1, 0.8);
      orb.add(signalArc);

      // ── Node spheres ─────────────────────────────────────────────
      const nodes = new THREE.Group();
      const nodePositions = [
        new THREE.Vector3(1.62, 0.58, 0.18),
        new THREE.Vector3(-1.1, 1.1, 0.46),
        new THREE.Vector3(-1.25, -0.9, 0.15),
        new THREE.Vector3(0.45, -1.45, 0.5),
      ];
      nodePositions.forEach((position, index) => {
        const node = new THREE.Mesh(
          new THREE.SphereGeometry(index === 0 ? 0.1 : 0.065, 12, 12),
          nodeWarm,
        );
        node.position.copy(position);
        nodes.add(node);
      });
      orb.add(nodes);

      // ── Pointer tracking ─────────────────────────────────────────
      const pointer = new THREE.Vector2(0, 0);
      const targetPointer = new THREE.Vector2(0, 0);
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      let frameId = 0;
      let resizeObserver: ResizeObserver | undefined;

      const resize = () => {
        const { width, height } = mount.getBoundingClientRect();
        renderer.setSize(Math.max(width, 1), Math.max(height, 1), false);
        camera.aspect = Math.max(width, 1) / Math.max(height, 1);
        camera.updateProjectionMatrix();
      };

      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(mount);
      resize();

      const handlePointer = (event: PointerEvent) => {
        const bounds = mount.getBoundingClientRect();
        targetPointer.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
        targetPointer.y = ((event.clientY - bounds.top) / bounds.height - 0.5) * -2;
      };
      mount.addEventListener("pointermove", handlePointer);

      // ── Render loop (capped at 60fps) ───────────────────────────
      let lastTime = 0;
      const TARGET_FPS = 1000 / 60;

      const animate = (time: number) => {
        frameId = requestAnimationFrame(animate);
        if (time - lastTime < TARGET_FPS) return;
        lastTime = time;

        const seconds = time * 0.00035;
        const easedTarget = targetPointer.clone().multiplyScalar(0.12);
        pointer.lerp(easedTarget, reducedMotion ? 0.035 : 0.07);
        system.rotation.y = pointer.x * 0.42 + (reducedMotion ? 0 : seconds * 0.42);
        system.rotation.x = pointer.y * 0.26 + Math.sin(seconds * 1.6) * 0.05;
        core.rotation.z += reducedMotion ? 0 : 0.0009;
        inner.rotation.z -= reducedMotion ? 0 : 0.0007;
        ringGroup.rotation.z += reducedMotion ? 0 : 0.0003;
        outerGlowRing.rotation.y += reducedMotion ? 0 : 0.0006;
        signalArc.rotation.z -= reducedMotion ? 0 : 0.0012;
        renderer.render(scene, camera);
      };

      animate(0);

      cleanup = () => {
        cancelAnimationFrame(frameId);
        resizeObserver?.disconnect();
        mount.removeEventListener("pointermove", handlePointer);
        renderer.dispose();
        core.geometry.dispose();
        inner.geometry.dispose();
        ringGroup.children.forEach((child) => (child as DisposableObject).geometry?.dispose());
        nodes.children.forEach((child) => (child as DisposableObject).geometry?.dispose());
        outerGlowRing.geometry.dispose();
        signalArc.geometry.dispose();
        signal.dispose();
        cool.dispose();
        nodeWarm.dispose();
        outerRing.dispose();
        signalArcMat.dispose();
        ringMaterial.dispose();
        if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
      };
    };

    void boot();

    return () => {
      destroyed = true;
      cleanup?.();
    };
  }, []);

  return <div ref={mountRef} className={`orbit-scene ${className}`} aria-hidden="true" />;
}
