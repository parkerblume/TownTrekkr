import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

const SpinningGlobe = () => {
  const mountRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previousMousePosition, setPreviousMousePosition] = useState({ x: 0, y: 0 });
  const rotationSpeed = useRef({ x: 0.0005, y: 0.0005 });

  const globeRef = useRef(null);

  useEffect(() => {
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 0, 200);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);

    const fbxLoader = new FBXLoader();
    fbxLoader.load(
      '/models/globe.fbx',
      (object) => {
        scene.add(object);
        object.scale.set(1, 1, 1);
        globeRef.current = object;
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      (error) => {
        console.error('An error happened:', error);
      }
    );

    const animate = () => {
      requestAnimationFrame(animate);
      if (globeRef.current) {
        globeRef.current.rotation.y += rotationSpeed.current.y;
        globeRef.current.rotation.x += rotationSpeed.current.x;
        console.log(rotationSpeed.current);
        if (rotationSpeed.current.x > 0.0005 || rotationSpeed.current.x < -0.0005) rotationSpeed.current.x = rotationSpeed.current.x * 0.9975;
        if (rotationSpeed.current.y > 0.0005 || rotationSpeed.current.y < -0.0005) rotationSpeed.current.y = rotationSpeed.current.y * 0.9975;
      }
      
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    const handleMouseDown = (event) => {
      setIsDragging(true);
      setPreviousMousePosition({ x: event.clientX, y: event.clientY });
    };

    const handleMouseMove = (event) => {
      if (isDragging && globeRef.current) {
        const deltaMove = {
          x: event.clientX - previousMousePosition.x,
          y: event.clientY - previousMousePosition.y,
        };
    
        const rotationFactor = 0.0003; // Adjust this value for sensitivity
        rotationSpeed.current = {
          y: deltaMove.x * rotationFactor,
          x: deltaMove.y * rotationFactor
        };
    
        globeRef.current.rotation.y += rotationSpeed.current.y;
        globeRef.current.rotation.x += rotationSpeed.current.x;
    
        setPreviousMousePosition({ x: event.clientX, y: event.clientY });
      }
    };
    

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, previousMousePosition]);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
};

export default SpinningGlobe;


