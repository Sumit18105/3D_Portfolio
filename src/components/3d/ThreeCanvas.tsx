"use client";

import React, { useRef, useEffect, Suspense } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type HolographicScreen = {
  position: [number, number, number];
  rotation: [number, number, number];
  textureId: string;
};

const screensData: HolographicScreen[] = [
  { position: [-2.5, 1.5, -2], rotation: [0, Math.PI / 4, 0], textureId: 'screen-ai-model' },
  { position: [2.5, 1.5, -2], rotation: [0, -Math.PI / 4, 0], textureId: 'screen-data-charts' },
  { position: [-2.5, -0.5, -2], rotation: [0, Math.PI / 4, 0], textureId: 'screen-wireframes' },
  { position: [2.5, -0.5, -2], rotation: [0, -Math.PI / 4, 0], textureId: 'screen-code' },
];


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

    const primaryLight = new THREE.PointLight(0x6F00FF, 50, 20);
    primaryLight.position.set(0, 2, 0);
    scene.add(primaryLight);

    const accentLight = new THREE.PointLight(0x00FFFF, 50, 20);
    accentLight.position.set(5, 1, -5);
    scene.add(accentLight);

    // Desk Platform
    const deskGeometry = new THREE.CylinderGeometry(2, 2, 0.1, 64);
    const deskMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x111111, 
        metalness: 0.8,
        roughness: 0.4,
        emissive: 0x6F00FF,
        emissiveIntensity: 0.2
    });
    const desk = new THREE.Mesh(deskGeometry, deskMaterial);
    desk.position.y = -1;
    scene.add(desk);

    // Holographic Screens
    const textureLoader = new THREE.TextureLoader();
    const screens: THREE.Mesh[] = screensData.map(data => {
      const placeholder = PlaceHolderImages.find(p => p.id === data.textureId);
      const texture = textureLoader.load(placeholder?.imageUrl || '', onLoad);
      const geometry = new THREE.PlaneGeometry(2, 1.5);
      const material = new THREE.MeshBasicMaterial({ 
        map: texture, 
        side: THREE.DoubleSide, 
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
      });
      const screen = new THREE.Mesh(geometry, material);
      screen.position.set(...data.position);
      screen.rotation.set(...data.rotation);
      scene.add(screen);
      return screen;
    });

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

    tl.to(camera.position, { z: 4, y: 1 }, 'start')
      .to(camera.position, { x: 0, y: 15, z: 20 }, 'about')
      .to(camera.rotation, { x: -Math.PI / 8, y: 0, z: 0 }, 'about')
      .to(camera.position, { x: 15, y: 20, z: 15 }, 'skills')
      .to(camera.rotation, { y: -Math.PI / 4 }, 'skills')
      .to(camera.position, { x: 0, y: 30, z: -20 }, 'projects')
      .to(camera.rotation, { y: Math.PI }, 'projects')
      .to(camera.position, { x: -15, y: 40, z: 15 }, 'experience')
      .to(camera.rotation, { y: Math.PI / 2 }, 'experience')
      .to(camera.position, { x: 0, y: 50, z: 10 }, 'contact')
      .to(camera.rotation, { x: 0, y: 0, z: 0 }, 'contact');
      

    const clock = new THREE.Clock();
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      screens[0].position.y = 1.5 + Math.sin(elapsedTime * 0.5) * 0.1;
      screens[1].position.y = 1.5 + Math.cos(elapsedTime * 0.5) * 0.1;
      screens[2].position.y = -0.5 + Math.sin(elapsedTime * 0.4) * 0.1;
      screens[3].position.y = -0.5 + Math.cos(elapsedTime * 0.4) * 0.1;

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
      if (mountRef.current) {
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
