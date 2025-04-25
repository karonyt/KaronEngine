// ビューモード
export type ViewMode = 'block' | 'code';

// ゲームスプライト
export interface GameSprite {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  image: string;
}

// プロジェクト設定
export interface ProjectSettings {
  name: string;
  is3D: boolean;
  width: number;
  height: number;
  backgroundColor: string;
}