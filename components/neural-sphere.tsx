'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Html } from '@react-three/drei';

type Node = { position: THREE.Vector3; label?: string };

function useIsDark(): boolean {
  const [isDark, setIsDark] = useState<boolean>(() =>
    typeof document !== 'undefined' ? document.documentElement.classList.contains('dark') : true
  );
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    const observer = new MutationObserver(() => {
      setIsDark(root.classList.contains('dark'));
    });
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);
  return isDark;
}

function NetworkPoints() {
  const group = useRef<THREE.Group>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is standard md breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const sphereRadius = isMobile ? 1.0 : 1.5; // Adjust radius based on screen size
  const { nodes, lines } = useMemo(() => {
    const nodes: Node[] = [];
    const linePositions: number[] = [];
    const count = 75; // original point count with improved distribution

    function fibonacciSpherePoint(i: number, n: number, r: number) {
      const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle in radians
      const y = 1 - (i / (n - 1)) * 2; // y goes from 1 to -1
      const radius = Math.sqrt(1 - y * y); // radius at y
      const theta = phi * i; // golden angle increment

      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;

      return new THREE.Vector3(x * r, y * r, z * r);
    }

    for (let i = 0; i < count; i++) {
      nodes.push({ position: fibonacciSpherePoint(i, count, sphereRadius) });
    }

    // Organize skills by category for better distribution
    const skillGroups = {
      core: ['Python', 'Java', 'Node.js', 'React'],
      ai: ['TensorFlow', 'Keras', 'CNN', 'OpenCV', 'SVM'],
      cloud: ['AWS', 'Azure', 'Docker', 'Kubernetes'],
      data: ['SQL', 'REST APIs', 'Microservices'],
      tools: ['Linux', 'Security', 'TensorRT', 'Dlib']
    };

    // Calculate evenly spaced indices for each group
    const totalLabels = Object.values(skillGroups).flat().length;
    const spacing = Math.floor(count / totalLabels);

    let currentIndex = 0;
    // Distribute labels evenly across the sphere
    Object.values(skillGroups).forEach((group) => {
      group.forEach((skill) => {
        // Skip some indices to spread out the labels
        if (currentIndex < count) {
          nodes[currentIndex].label = skill;
          currentIndex += spacing;
        }
      });
    });

    // Connect near neighbors across the sphere (no strict cap), then ensure no isolated node
    const degree: number[] = new Array(count).fill(0);
    const edgeKey = (a: number, b: number) => (a < b ? `${a}-${b}` : `${b}-${a}`);
    const edges = new Set<string>();

    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const d = nodes[i].position.distanceTo(nodes[j].position);
        if (d < 0.8) { // reduced connection distance for more uniform connections
          const key = edgeKey(i, j);
          if (!edges.has(key)) {
            edges.add(key);
            degree[i]++;
            degree[j]++;
            linePositions.push(
              nodes[i].position.x,
              nodes[i].position.y,
              nodes[i].position.z,
              nodes[j].position.x,
              nodes[j].position.y,
              nodes[j].position.z
            );
          }
        }
      }
    }

    // Ensure every node has at least one connection
    for (let i = 0; i < count; i++) {
      if (degree[i] === 0) {
        let nearest = -1;
        let nearestDist = Infinity;
        for (let j = 0; j < count; j++) {
          if (i === j) continue;
          const d = nodes[i].position.distanceTo(nodes[j].position);
          if (d < nearestDist) {
            nearestDist = d;
            nearest = j;
          }
        }
        if (nearest !== -1) {
          const key = edgeKey(i, nearest);
          if (!edges.has(key)) {
            edges.add(key);
            degree[i]++;
            degree[nearest]++;
            linePositions.push(
              nodes[i].position.x,
              nodes[i].position.y,
              nodes[i].position.z,
              nodes[nearest].position.x,
              nodes[nearest].position.y,
              nodes[nearest].position.z
            );
          }
        }
      }
    }

    return { nodes, lines: new Float32Array(linePositions) };
  }, []);

  // Lines
  const lineGeom = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(lines, 3));
    return geom;
  }, [lines]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = t * 0.05; // Continuous slow rotation
      group.current.rotation.x = Math.sin(t * 0.2) * 0.1; // Subtle tilt
      group.current.position.x = 2.0; // push sphere to the right side
    }
  });

  return (
    <group ref={group}>
      <lineSegments geometry={lineGeom}>
        <lineBasicMaterial color={new THREE.Color('white')} opacity={0.16} transparent />
      </lineSegments>
      {nodes.map((n, idx) => (
        <Point key={idx} position={n.position} label={n.label} />
      ))}
    </group>
  );
}

function Point({ position, label }: { position: THREE.Vector3; label?: string }) {
  const ref = useRef<THREE.Mesh>(null!);
  const pulse = useRef(Math.random());

  useFrame(({ clock }) => {
    const baseScale = label ? 0.045 : 0.035;
    const pulseAmount = label ? 0.015 : 0.01;
    const s = baseScale + pulseAmount * Math.sin(clock.getElapsedTime() * 2 + pulse.current);
    ref.current.scale.setScalar(s);
  });

  return (
    <mesh position={position} ref={ref}>
      <sphereGeometry args={[1, 12, 12]} />
      <meshBasicMaterial color={'white'} transparent opacity={label ? 1 : 0.9} />
      {label && (
        <Html center distanceFactor={8} position={[0, 0.22, 0]}>
          <span className="rounded-full bg-white/10 px-3 py-1 text-[9px] font-medium tracking-wide text-white/90 backdrop-blur-md border border-white/20 shadow-lg transform transition-transform hover:scale-110 hover:bg-white/15" style={{ whiteSpace: 'nowrap' }}>
            {label}
          </span>
        </Html>
      )}
    </mesh>
  );
}

export function Constellations() {
  const isDark = useIsDark();
  const group = useRef<THREE.Group>(null);

  const { pointsAttr, linesAttr } = useMemo(() => {
    const count = 450; // slightly increased for better coverage
    const positions: number[] = [];
    const linePositions: number[] = [];

    const bounds = {
      x: { min: -12, max: 12 },
      y: { min: -12, max: 12 },
      z: { min: -4, max: 4 }
    };

    const pts: THREE.Vector3[] = [];
    const numPoints = 180; // Adjusted point count for constellation effect

    // Helper function to create clusters
    const createCluster = (centerX: number, centerY: number, centerZ: number, size: number, points: number) => {
      for (let i = 0; i < points; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * size;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        const z = centerZ + (Math.random() - 0.5) * size;

        if (x >= bounds.x.min && x <= bounds.x.max &&
          y >= bounds.y.min && y <= bounds.y.max &&
          z >= bounds.z.min && z <= bounds.z.max) {
          pts.push(new THREE.Vector3(x, y, z));
          positions.push(x, y, z);
        }
      }
    };

    // Create random clusters of points
    const numClusters = 12;
    for (let i = 0; i < numClusters; i++) {
      const centerX = (Math.random() - 0.5) * (bounds.x.max - bounds.x.min);
      const centerY = (Math.random() - 0.5) * (bounds.y.max - bounds.y.min);
      const centerZ = (Math.random() - 0.5) * (bounds.z.max - bounds.z.min);
      createCluster(centerX, centerY, centerZ, 4, Math.floor(numPoints / numClusters));
    }

    // Add some random individual points for more natural look
    for (let i = 0; i < numPoints * 0.2; i++) {
      const x = (Math.random() - 0.5) * (bounds.x.max - bounds.x.min);
      const y = (Math.random() - 0.5) * (bounds.y.max - bounds.y.min);
      const z = (Math.random() - 0.5) * (bounds.z.max - bounds.z.min);
      pts.push(new THREE.Vector3(x, y, z));
      positions.push(x, y, z);
    }

    // Constellation-like connections
    for (let i = 0; i < pts.length; i++) {
      // Find the 2-3 nearest points to create constellation-like patterns
      const nearest: Array<{ index: number; dist: number }> = [];
      for (let j = 0; j < pts.length; j++) {
        if (i !== j) {
          const d = pts[i].distanceTo(pts[j]);
          if (d < 3.5) { // Increased max distance for longer connections
            nearest.push({ index: j, dist: d });
          }
        }
      }

      // Sort by distance and take closest points
      nearest.sort((a, b) => a.dist - b.dist);
      const maxConnections = Math.floor(Math.random() * 2) + 1; // 1-2 connections per point
      nearest.slice(0, maxConnections).forEach(({ index }) => {
        linePositions.push(
          pts[i].x, pts[i].y, pts[i].z,
          pts[index].x, pts[index].y, pts[index].z
        );
      });
    }

    return {
      pointsAttr: new Float32Array(positions),
      linesAttr: new Float32Array(linePositions)
    };
  }, []);

  // Smoother animation with subtle wave effect
  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    // Even slower and more organic movement
    group.current.rotation.y = t * 0.01; // Very slow base rotation
    group.current.rotation.z = Math.sin(t * 0.08) * 0.015; // More subtle tilt
    group.current.rotation.x = Math.sin(t * 0.06) * 0.01; // Additional axis movement
    group.current.position.y = Math.sin(t * 0.12) * 0.03; // Gentler floating effect
  });

  const pointGeom = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(pointsAttr, 3));
    return geom;
  }, [pointsAttr]);

  const lineGeom = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(linesAttr, 3));
    return geom;
  }, [linesAttr]);

  const color = useMemo(() => new THREE.Color('#4b5563'), [isDark]); // dark grey

  return (
    <group ref={group}>
      <points geometry={pointGeom}>
        <pointsMaterial
          size={0.08}
          sizeAttenuation
          color={color}
          opacity={0.7}
          transparent
          blending={THREE.AdditiveBlending}
        />
      </points>
      <lineSegments geometry={lineGeom}>
        <lineBasicMaterial color={color} opacity={0.25} transparent blending={THREE.AdditiveBlending} />
      </lineSegments>
    </group>
  );
}

export function NeuralSphere({ className = '' }: { className?: string }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <Canvas
      camera={{
        position: [0, 0, isMobile ? 8 : 6],
        fov: isMobile ? 60 : 45
      }}
      className={className}
      style={{ position: 'absolute', pointerEvents: 'none' }}
    >
      <ambientLight intensity={0.6} />
      {/* Main neural sphere only */}
      <NetworkPoints />
    </Canvas>
  );
}


