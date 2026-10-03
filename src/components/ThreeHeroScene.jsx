import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import ThreeJsLogo from './ThreeJsLogo';

export default function ThreeHeroScene({ isDarkMode }) {
  const containerRef = useRef(null);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || 340;
    const height = container.clientHeight || 340;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Group for all interactive objects
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Neobrutalism Colors
    const orangeColor = 0xff4d00;
    const softOrangeColor = 0xffd4c2;
    const darkColor = isDarkMode ? 0x222222 : 0x0a0a0a;
    const edgeColor = isDarkMode ? 0xffd4c2 : 0x0a0a0a;

    // 1. Central Hero Object: Torus Knot with Neobrutalist bold edges
    const knotGeometry = new THREE.TorusKnotGeometry(1.4, 0.42, 100, 16, 2, 3);
    const knotMaterial = new THREE.MeshStandardMaterial({
      color: orangeColor,
      roughness: 0.3,
      metalness: 0.2,
      flatShading: true,
    });
    const knotMesh = new THREE.Mesh(knotGeometry, knotMaterial);
    knotMesh.castShadow = true;
    knotMesh.receiveShadow = true;
    mainGroup.add(knotMesh);

    // Wireframe edges for knot
    const knotEdges = new THREE.EdgesGeometry(knotGeometry, 24);
    const knotLineMaterial = new THREE.LineBasicMaterial({
      color: edgeColor,
      linewidth: 2,
    });
    const knotWireframe = new THREE.LineSegments(knotEdges, knotLineMaterial);
    knotMesh.add(knotWireframe);

    // 2. Satellite 1: Floating Icosahedron
    const icoGeometry = new THREE.IcosahedronGeometry(0.65, 0);
    const icoMaterial = new THREE.MeshStandardMaterial({
      color: isDarkMode ? 0xffffff : darkColor,
      roughness: 0.2,
      metalness: 0.4,
      flatShading: true,
    });
    const icoMesh = new THREE.Mesh(icoGeometry, icoMaterial);
    icoMesh.position.set(2.8, 1.8, -0.5);
    const icoEdges = new THREE.EdgesGeometry(icoGeometry);
    const icoLineMaterial = new THREE.LineBasicMaterial({ color: orangeColor, linewidth: 2 });
    icoMesh.add(new THREE.LineSegments(icoEdges, icoLineMaterial));
    mainGroup.add(icoMesh);

    // 3. Satellite 2: Floating Soft Orange Cube
    const cubeGeometry = new THREE.BoxGeometry(0.85, 0.85, 0.85);
    const cubeMaterial = new THREE.MeshStandardMaterial({
      color: softOrangeColor,
      roughness: 0.4,
      metalness: 0.1,
    });
    const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cubeMesh.position.set(-2.6, -1.6, 0.5);
    const cubeEdges = new THREE.EdgesGeometry(cubeGeometry);
    const cubeLineMaterial = new THREE.LineBasicMaterial({ color: darkColor, linewidth: 2 });
    cubeMesh.add(new THREE.LineSegments(cubeEdges, cubeLineMaterial));
    mainGroup.add(cubeMesh);

    // 4. Satellite 3: Floating Octahedron
    const octGeometry = new THREE.OctahedronGeometry(0.5, 0);
    const octMaterial = new THREE.MeshStandardMaterial({
      color: orangeColor,
      roughness: 0.3,
      metalness: 0.3,
    });
    const octMesh = new THREE.Mesh(octGeometry, octMaterial);
    octMesh.position.set(-2.2, 1.9, -1);
    const octEdges = new THREE.EdgesGeometry(octGeometry);
    octMesh.add(new THREE.LineSegments(octEdges, new THREE.LineBasicMaterial({ color: edgeColor })));
    mainGroup.add(octMesh);

    // Subtle Particle Field (Tech dust)
    const particleCount = 45;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 12;
      positions[i + 1] = (Math.random() - 0.5) * 12;
      positions[i + 2] = (Math.random() - 0.5) * 6;
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: orangeColor,
      size: 0.08,
      transparent: true,
      opacity: 0.65,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, isDarkMode ? 0.9 : 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.0);
    dirLight1.position.set(5, 8, 6);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(orangeColor, 1.6);
    dirLight2.position.set(-6, -4, -4);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(orangeColor, 2.2, 12);
    pointLight.position.set(0, 0, 4);
    scene.add(pointLight);

    // Mouse Drag & Tilt Interaction
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let targetRotation = { x: 0.3, y: 0.4 };
    let currentRotation = { x: 0.3, y: 0.4 };
    let mouseVelocity = { x: 0.005, y: 0.007 };

    const onMouseDown = (e) => {
      isDragging = true;
      setIsInteracting(true);
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;

        targetRotation.y += deltaX * 0.008;
        targetRotation.x += deltaY * 0.008;

        mouseVelocity = {
          x: deltaY * 0.001,
          y: deltaX * 0.001,
        };

        previousMousePosition = { x: e.clientX, y: e.clientY };
      } else {
        // Parallax hover effect
        const rect = container.getBoundingClientRect();
        const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        targetRotation.y = normX * 0.6;
        targetRotation.x = -normY * 0.5;
      }
    };

    const onMouseUp = () => {
      isDragging = false;
      setTimeout(() => setIsInteracting(false), 800);
    };

    // Touch support for mobile
    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        setIsInteracting(true);
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e) => {
      if (isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - previousMousePosition.x;
        const deltaY = e.touches[0].clientY - previousMousePosition.y;

        targetRotation.y += deltaX * 0.008;
        targetRotation.x += deltaY * 0.008;

        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchEnd = () => {
      isDragging = false;
      setTimeout(() => setIsInteracting(false), 800);
    };

    const domEl = renderer.domElement;
    domEl.style.cursor = 'grab';
    domEl.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    domEl.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Responsive Resize
    const resizeObserver = new ResizeObserver(() => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      if (newWidth && newHeight) {
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
      }
    });
    resizeObserver.observe(container);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth inertia rotation
      if (!isDragging) {
        targetRotation.y += 0.004;
        targetRotation.x = Math.sin(elapsedTime * 0.6) * 0.15;
      }

      currentRotation.x += (targetRotation.x - currentRotation.x) * 0.08;
      currentRotation.y += (targetRotation.y - currentRotation.y) * 0.08;

      mainGroup.rotation.x = currentRotation.x;
      mainGroup.rotation.y = currentRotation.y;

      // Orbit and bob satellites
      icoMesh.position.y = 1.8 + Math.sin(elapsedTime * 1.5) * 0.25;
      icoMesh.rotation.x += 0.01;
      icoMesh.rotation.z += 0.012;

      cubeMesh.position.y = -1.6 + Math.cos(elapsedTime * 1.4) * 0.22;
      cubeMesh.rotation.x += 0.008;
      cubeMesh.rotation.y += 0.014;

      octMesh.position.y = 1.9 + Math.sin(elapsedTime * 1.8 + 1) * 0.2;
      octMesh.rotation.y += 0.015;

      particles.rotation.y = elapsedTime * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();

      domEl.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);

      domEl.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);

      if (container.contains(domEl)) {
        container.removeChild(domEl);
      }

      // Dispose geometries & materials
      knotGeometry.dispose();
      knotMaterial.dispose();
      knotEdges.dispose();
      knotLineMaterial.dispose();

      icoGeometry.dispose();
      icoMaterial.dispose();
      icoEdges.dispose();
      icoLineMaterial.dispose();

      cubeGeometry.dispose();
      cubeMaterial.dispose();
      cubeEdges.dispose();
      cubeLineMaterial.dispose();

      octGeometry.dispose();
      octMaterial.dispose();
      octEdges.dispose();

      particleGeometry.dispose();
      particleMaterial.dispose();

      renderer.dispose();
    };
  }, [isDarkMode]);

  return (
    <div className="three-scene-wrapper" style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '100%',
          minHeight: '320px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          userSelect: 'none',
        }}
      />
      <div
        className="three-badge"
        style={{
          position: 'absolute',
          bottom: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: isDarkMode ? '#1e1e1e' : '#ffffff',
          color: isDarkMode ? '#ffffff' : '#0a0a0a',
          border: '2px solid ' + (isDarkMode ? '#333333' : '#0a0a0a'),
          boxShadow: isDarkMode ? '3px 3px 0 #ff4d00' : '3px 3px 0 #0a0a0a',
          padding: '6px 12px',
          fontSize: '0.74rem',
          fontWeight: 700,
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          zIndex: 5,
          transition: '0.25s ease',
        }}
      >
        <span
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: '#ff4d00',
            display: 'inline-block',
            animation: 'pulse 1.5s infinite',
          }}
        />
        <ThreeJsLogo size={14} color="#ff4d00" />
        {isInteracting ? '3D Active • Drag to Rotate' : 'Three.js 3D • Interactive'}
      </div>
    </div>
  );
}
