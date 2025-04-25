import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useProjectStore } from '../../store/projectStore';

interface GameViewProps {
  isFullscreen: boolean;
}

const GameView: React.FC<GameViewProps> = ({ isFullscreen }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameIdRef = useRef<number>(0);
  
  const { isPlaying, is3D } = useProjectStore();

  // Three.jsシーンの初期化
  useEffect(() => {
    if (!mountRef.current) return;

    // シーンの設定
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    sceneRef.current = scene;

    // カメラの設定
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // レンダラーの設定
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 基本オブジェクトの追加（デモ用）
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshLambertMaterial({ color: 0x3b82f6 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // ライトの追加
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // アニメーションループ
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      
      if (isPlaying) {
        // キューブを回転させる（デモ用）
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
      }
      
      renderer.render(scene, camera);
    };
    
    animate();

    // リサイズハンドラ
    const handleResize = () => {
      if (!mountRef.current || !cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // クリーンアップ
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameIdRef.current);
      
      if (rendererRef.current && mountRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
      
      if (sceneRef.current) {
        // シーンのクリーンアップ
        sceneRef.current.clear();
      }
    };
  }, [isPlaying, is3D]);

  return (
    <div className="h-full w-full flex flex-col">
      <div className={`p-2 bg-slate-100 border-b border-slate-200 ${isFullscreen ? 'hidden' : ''}`}>
        <h2 className="text-lg font-semibold">ゲームビュー</h2>
        <div className="flex text-sm text-slate-600">
          <p>現在のモード: {is3D ? '3Dモード' : '2Dモード'}</p>
        </div>
      </div>
      <div 
        ref={mountRef} 
        className={`relative flex-1 overflow-hidden ${isFullscreen ? 'h-full w-full' : ''}`}
      >
        {isPlaying && (
          <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded-md text-xs font-medium animate-pulse">
            ゲーム実行中
          </div>
        )}
      </div>
    </div>
  );
};

export default GameView;