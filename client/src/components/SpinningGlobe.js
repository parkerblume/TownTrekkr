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
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(85, window.innerWidth / window.innerHeight, 0.1, 1000);
		camera.position.set(0, 0, 200);

		const renderer = new THREE.WebGLRenderer();
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

		const onWindowResize = () => {
			camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
		};

		let animationFrameId;

		const animate = () => {
			if (!mountRef.current) return;
			animationFrameId = requestAnimationFrame(animate);
			if (globeRef.current) {
				globeRef.current.rotation.y += rotationSpeed.current.y;
				globeRef.current.rotation.x += rotationSpeed.current.x;
			}
			renderer.render(scene, camera);
		};

		window.addEventListener('resize', onWindowResize);
		onWindowResize(); // Initialize renderer size
		animate();

		return () => {
			window.removeEventListener('resize', onWindowResize);
			cancelAnimationFrame(animationFrameId);

      // Clean up the globe object
      if (globeRef.current) {
        scene.remove(globeRef.current);  // Remove the object from the scene
        if (globeRef.current.geometry) {
          globeRef.current.geometry.dispose();  // Dispose of the geometry
        }
        if (globeRef.current.material) {
          if (Array.isArray(globeRef.current.material)) {  // In case of multi-materials
            globeRef.current.material.forEach(material => material.dispose());
          } else {
            globeRef.current.material.dispose();  // Dispose of the material
          }
        }
        // If the object has a texture, dispose of it as well
        if (globeRef.current.material && globeRef.current.material.map) {
          globeRef.current.material.map.dispose();
        }
      }

      // Renderer cleanup
			renderer.dispose();
      if (mountRef.current) {
			mountRef.current.removeChild(renderer.domElement);
      }
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

				const rotationFactor = 0.0003;
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
