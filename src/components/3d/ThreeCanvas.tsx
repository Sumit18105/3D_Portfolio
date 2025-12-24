"use client";

import React, { useRef, useEffect, Suspense } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ThreeCanvas = ({ onLoad }: { onLoad: () => void }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current || !mountRef.current) return;
    isInitialized.current = true;

    gsap.registerPlugin(ScrollTrigger);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x1a1a2a, 0.05);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 10;
    camera.position.y = 1;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const primaryLight = new THREE.PointLight(0x6F00FF, 150, 40);
    primaryLight.position.set(0, 5, 5);
    scene.add(primaryLight);

    const accentLight = new THREE.PointLight(0x00FFFF, 100, 40);
    accentLight.position.set(10, -5, -10);
    scene.add(accentLight);

    // Saturn Model
    const loadingManager = new THREE.LoadingManager(() => {
        onLoad();
    });
    const textureLoader = new THREE.TextureLoader(loadingManager);
    const saturnTexture = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/saturnmap.jpg');
    const ringTexture = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/saturnring.png');
    
    // Planet
    const planetGeometry = new THREE.SphereGeometry(2, 64, 64);
    const planetMaterial = new THREE.MeshStandardMaterial({ 
        map: saturnTexture,
        metalness: 0.1,
        roughness: 0.7
    });
    const saturn = new THREE.Mesh(planetGeometry, planetMaterial);
    saturn.rotation.x = 0.3;
    scene.add(saturn);

    // Rings
    const ringGeometry = new THREE.RingGeometry(2.5, 4.5, 64);
    const ringMaterial = new THREE.MeshBasicMaterial({
        map: ringTexture,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.9,
    });
    const rings = new THREE.Mesh(ringGeometry, ringMaterial);
    rings.rotation.x = Math.PI / 2;
    rings.rotation.y = 0.1;
    saturn.add(rings); // Add rings as a child of Saturn

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 50;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.015,
      color: 0xffffff,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Scroll Animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".scroll-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    // Animate camera and planet
    tl.to(camera.position, { z: 6, y: 1 }, 'start')
      .to(saturn.rotation, { y: 1 }, 'start')
      .to(camera.position, { x: -5, y: 3, z: 8 }, 'about')
      .to(camera.rotation, { x: -0.2, y: -0.5, z: 0 }, 'about')
      .to(saturn.rotation, { y: 2.5 }, 'about')
      .to(camera.position, { x: 8, y: 4, z: 6 }, 'skills')
      .to(camera.rotation, { y: 1, x: -0.5 }, 'skills')
      .to(saturn.rotation, { y: 4 }, 'skills')
      .to(camera.position, { x: 0, y: -6, z: 7 }, 'projects')
      .to(camera.rotation, { x: 0.7, y: 0 }, 'projects')
      .to(saturn.rotation, { y: 5.5 }, 'projects')
      .to(camera.position, { x: -10, y: 2, z: 5 }, 'experience')
      .to(camera.rotation, { y: -1.5, x: 0 }, 'experience')
      .to(saturn.rotation, { y: 7 }, 'experience')
      .to(camera.position, { x: 0, y: 0, z: 12 }, 'contact')
      .to(camera.rotation, { x: 0, y: 0, z: 0 }, 'contact')
      .to(saturn.rotation, { y: 8.5 }, 'contact');
      

    const clock = new THREE.Clock();
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Gentle bobbing motion
      saturn.position.y = Math.sin(elapsedTime * 0.5) * 0.1;

      // Slow continuous rotation
      saturn.rotation.y += 0.0005;

      particlesMesh.rotation.y = elapsedTime * 0.02;

      primaryLight.position.x = Math.sin(elapsedTime * 0.7) * 4;
      primaryLight.position.z = Math.cos(elapsedTime * 0.7) * 4;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      // Dispose Three.js objects to free memory
      scene.traverse(object => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    };
  }, [onLoad]);

  return <div ref={mountRef} className="fixed top-0 left-0 w-full h-full z-[-1]" />;
};

export default ThreeCanvas;
