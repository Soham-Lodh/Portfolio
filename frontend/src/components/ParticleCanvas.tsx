import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ParticleCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const baseColorsRef = useRef<Float32Array | null>(null);
  const twinkleSeedsRef = useRef<Float32Array | null>(null);
  const twinkleSpeedsRef = useRef<Float32Array | null>(null);
  const flashIntensityRef = useRef<Float32Array | null>(null);
  const flashPhaseRef = useRef<Float32Array | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.5, 4);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setClearColor(0x361d32, 0);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Particle field
    const particleCount = 2400;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const baseColors = new Float32Array(particleCount * 3);
    const twinkleSeeds = new Float32Array(particleCount);
    const twinkleSpeeds = new Float32Array(particleCount);
    const flashIntensity = new Float32Array(particleCount);
    const flashPhase = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const particleIndex = i / 3;
      const radius = 4.5 + Math.random() * 5.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = radius * Math.cos(phi);

      const starTint = Math.random() > 0.72 ? 0xfef4e8 : 0xf55951;
      const color = new THREE.Color(starTint);
      const brightness = 0.45 + Math.random() * 0.35;

      colors[i] = color.r * brightness;
      colors[i + 1] = color.g * brightness;
      colors[i + 2] = color.b * brightness;

      baseColors[i] = colors[i];
      baseColors[i + 1] = colors[i + 1];
      baseColors[i + 2] = colors[i + 2];

      twinkleSeeds[particleIndex] = Math.random() * Math.PI * 2;
      twinkleSpeeds[particleIndex] = 0.8 + Math.random() * 1.8;
      flashIntensity[particleIndex] = 0;
      flashPhase[particleIndex] = Math.random() * Math.PI * 2;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    baseColorsRef.current = baseColors;
    twinkleSeedsRef.current = twinkleSeeds;
    twinkleSpeedsRef.current = twinkleSpeeds;
    flashIntensityRef.current = flashIntensity;
    flashPhaseRef.current = flashPhase;

    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.055,
      sizeAttenuation: true,
      transparent: true,
      opacity: 1,
      vertexColors: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    particlesRef.current = particles;

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Animation loop
    const clock = new THREE.Clock();
    let flashCursor = 0;
    let animationFrameId = 0;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (particlesRef.current && geometry.attributes.color && baseColorsRef.current && twinkleSeedsRef.current && twinkleSpeedsRef.current && flashIntensityRef.current && flashPhaseRef.current) {
        const positionsAttribute = geometry.attributes.position as THREE.BufferAttribute;
        const colorsAttribute = geometry.attributes.color as THREE.BufferAttribute;
        const positionsArray = positionsAttribute.array as Float32Array;
        const colorsArray = colorsAttribute.array as Float32Array;
        const baseColorsArray = baseColorsRef.current;
        const twinkleSeedsArray = twinkleSeedsRef.current;
        const twinkleSpeedsArray = twinkleSpeedsRef.current;
        const flashIntensityArray = flashIntensityRef.current;
        const flashPhaseArray = flashPhaseRef.current;

        particlesRef.current.rotation.y = elapsed * 0.08;
        particlesRef.current.rotation.x = Math.sin(elapsed * 0.12) * 0.18;

        if (Math.random() > 0.965) {
          flashCursor = (flashCursor + Math.floor(Math.random() * 11) + 3) % particleCount;
          flashIntensityArray[flashCursor] = 1;
          flashPhaseArray[flashCursor] = Math.random() * Math.PI * 2;
        }

        for (let i = 0; i < particleCount; i += 1) {
          const index = i * 3;
          const twinkle = 0.52 + Math.sin(elapsed * twinkleSpeedsArray[i] + twinkleSeedsArray[i]) * 0.22;
          const flash = flashIntensityArray[i] > 0
            ? flashIntensityArray[i] * (0.75 + 0.25 * Math.sin(elapsed * 10 + flashPhaseArray[i]))
            : 0;
          const intensity = twinkle + flash;

          colorsArray[index] = Math.min(1, baseColorsArray[index] * intensity + flash * 0.45);
          colorsArray[index + 1] = Math.min(1, baseColorsArray[index + 1] * intensity + flash * 0.35);
          colorsArray[index + 2] = Math.min(1, baseColorsArray[index + 2] * intensity + flash * 0.25);

          if (flashIntensityArray[i] > 0) {
            flashIntensityArray[i] = Math.max(0, flashIntensityArray[i] - 0.02);
          }

          positionsArray[index + 1] += Math.sin(elapsed * 0.15 + flashPhaseArray[i]) * 0.00002;
        }

        colorsAttribute.needsUpdate = true;
        positionsAttribute.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };
    animationFrameId = requestAnimationFrame(animate);

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      containerRef.current?.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default ParticleCanvas;
