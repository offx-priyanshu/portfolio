import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import "./ParticlePortrait.css";

/**
 * Sampling image into 3D point cloud particles matching Nikhil's reference
 */
function sampleImageToParticles(img, width, height) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.drawImage(img, 0, 0, width, height);
  const imgData = ctx.getImageData(0, 0, width, height).data;

  const points = [];
  const halfW = width / 2;
  const halfH = height / 2;
  const spread = 12.6 / height;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const idx = (y * width + x) * 4;
      const r = imgData[idx] / 255;
      const g = imgData[idx + 1] / 255;
      const b = imgData[idx + 2] / 255;
      const a = imgData[idx + 3] / 255;

      const brightness = 0.299 * r + 0.587 * g + 0.114 * b;

      // Particle distribution filter
      if (a > 0.15 && brightness > 0.02 && Math.random() < 0.32 + brightness * 0.55) {
        const pX = (x - halfW + (Math.random() - 0.5)) * spread;
        const pY = -(y - halfH + (Math.random() - 0.5)) * spread;
        const pZ = (Math.random() - 0.5) * 0.08;

        const size = (0.44 + Math.sqrt(brightness) * 1.45) * (0.8 + Math.random() * 0.5) * (280 / height);
        const col = Math.min(1, 0.2 + Math.pow(brightness, 0.76) * 1.05);

        points.push({ x: pX, y: pY, z: pZ, r: col, g: col, b: col, size });
      }
    }
  }

  const count = points.length;
  const positions = new Float32Array(count * 3);
  const originPositions = new Float32Array(count * 3);
  const velocities = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const pt = points[i];
    const i3 = i * 3;
    positions[i3] = pt.x;
    positions[i3 + 1] = pt.y;
    positions[i3 + 2] = pt.z;

    originPositions[i3] = pt.x;
    originPositions[i3 + 1] = pt.y;
    originPositions[i3 + 2] = pt.z;

    velocities[i3] = 0;
    velocities[i3 + 1] = 0;
    velocities[i3 + 2] = 0;

    colors[i3] = pt.r;
    colors[i3 + 1] = pt.g;
    colors[i3 + 2] = pt.b;

    sizes[i] = pt.size;
  }

  return { positions, originPositions, velocities, colors, sizes, count };
}

export default function ParticlePortrait({
  imageSrc,
  accent = "#EEEEEE",
  tier = "HIGH",
  reducedMotion = false
}) {
  const mountRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const pointsRef = useRef(null);
  const geomRef = useRef(null);
  const matRef = useRef(null);
  const particleDataRef = useRef(null);
  const animFrameRef = useRef(null);

  const mousePlane = useRef(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0));
  const raycaster = useRef(new THREE.Raycaster());
  const mouseTarget = useRef(new THREE.Vector3(999, 999, 0));
  const activeMotion = useRef(1);

  const handlePointerMove = useCallback((e) => {
    if (!mountRef.current || !cameraRef.current) return;
    const rect = mountRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

    raycaster.current.setFromCamera(new THREE.Vector2(x, y), cameraRef.current);
    const intersectPt = new THREE.Vector3();
    raycaster.current.ray.intersectPlane(mousePlane.current, intersectPt);
    if (intersectPt) {
      mouseTarget.current.copy(intersectPt);
      activeMotion.current = 1;
    }
  }, []);

  const handlePointerLeave = useCallback(() => {
    mouseTarget.current.set(999, 999, 0);
    activeMotion.current = 120;
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 750;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 15);
    cameraRef.current = camera;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    const hex = parseInt(accent.replace("#", ""), 16);
    const rCol = ((hex >> 16) & 255) / 255;
    const gCol = ((hex >> 8) & 255) / 255;
    const bCol = (hex & 255) / 255;

    const material = new THREE.ShaderMaterial({
      uniforms: {
        ink: { value: new THREE.Vector3(rCol, gCol, bCol) },
        scale: { value: (height * renderer.getPixelRatio()) / 280 }
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 tint;
        uniform float scale;
        uniform vec3 ink;
        void main() {
          tint = color * ink;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = max(1.0, size * scale);
        }
      `,
      fragmentShader: `
        varying vec3 tint;
        void main() {
          float d = length(gl_PointCoord - 0.5);
          if (d > 0.5) discard;
          gl_FragColor = vec4(tint, 1.0 - smoothstep(0.38, 0.5, d));
        }
      `,
      transparent: true,
      depthWrite: false
    });
    matRef.current = material;

    const geometry = new THREE.BufferGeometry();
    geomRef.current = geometry;

    const pointsObj = new THREE.Points(geometry, material);
    pointsRef.current = pointsObj;
    scene.add(pointsObj);

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const sampleH = window.innerWidth < 768 || tier === "SAVER" ? 165 : tier === "MED" ? 215 : 280;
      const sampleW = Math.round((sampleH * img.width) / img.height);
      const data = sampleImageToParticles(img, Math.min(sampleW, 400), sampleH);

      if (data && geomRef.current) {
        particleDataRef.current = data;
        geomRef.current.setAttribute("position", new THREE.BufferAttribute(data.positions, 3));
        geomRef.current.setAttribute("color", new THREE.BufferAttribute(data.colors, 3));
        geomRef.current.setAttribute("size", new THREE.BufferAttribute(data.sizes, 1));
        geomRef.current.attributes.position.needsUpdate = true;
        setLoaded(true);
      }
    };
    img.src = imageSrc;

    let lastTime = performance.now();
    const animate = (time) => {
      const delta = Math.min(2, Math.max(0.25, (time - lastTime) * 0.06));
      lastTime = time;

      animFrameRef.current = requestAnimationFrame(animate);

      const pData = particleDataRef.current;
      if (!pData || !geomRef.current || !pointsRef.current) return;

      const { positions, originPositions, velocities, count } = pData;
      const target = mouseTarget.current;

      if (target.x === 999) {
        if (activeMotion.current === 0) {
          renderer.render(scene, camera);
          return;
        }
        activeMotion.current -= 1;
      }

      const radius = 2.45;
      const damping = Math.pow(0.79, delta);

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const dx = originPositions[i3] - target.x;
        const dy = originPositions[i3 + 1] - target.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - dist / radius);

        const goldenAngle = i * 2.399963;
        const force = influence * influence * (1.1 + (i % 19) * 0.13);
        const timeFactor = time * 0.0015;

        const pushX = force * (Math.cos(goldenAngle + timeFactor) + dx / radius);
        const pushY = force * (0.8 * Math.sin(goldenAngle + timeFactor) + dy / radius);
        const pushZ = force * Math.sin(goldenAngle * 0.63);

        velocities[i3] = (velocities[i3] + (originPositions[i3] + pushX - positions[i3]) * 0.068 * delta) * damping;
        velocities[i3 + 1] = (velocities[i3 + 1] + (originPositions[i3 + 1] + pushY - positions[i3 + 1]) * 0.068 * delta) * damping;
        velocities[i3 + 2] = (velocities[i3 + 2] + (originPositions[i3 + 2] + pushZ - positions[i3 + 2]) * 0.068 * delta) * damping;

        positions[i3] += velocities[i3] * delta;
        positions[i3 + 1] += velocities[i3 + 1] * delta;
        positions[i3 + 2] += velocities[i3 + 2] * delta;
      }

      geomRef.current.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      if (!container || !renderer || !camera || !material) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      material.uniforms.scale.value = (h * renderer.getPixelRatio()) / 280;
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      material.dispose();
      geometry.dispose();
    };
  }, [imageSrc, accent, tier, reducedMotion]);

  // When Reduced Motion is ON: Display high-contrast monochrome static portrait exactly like Nikhil's reference
  if (reducedMotion) {
    return (
      <div className="portrait-surface static-fallback">
        <img
          src={imageSrc}
          alt="Priyanshu Portrait (Reduced Motion)"
          className="reduced-motion-photo"
        />
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className={`particle-canvas-container ${loaded ? "is-ready" : "is-loading"}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    />
  );
}
