import { create } from 'zustand';

interface ProjectState {
  projectName: string;
  code: string;
  blocklyXml: string | null;
  isPlaying: boolean;
  is3D: boolean;
  initialized: boolean;
  
  // アクション
  setProjectName: (name: string) => void;
  setCode: (code: string) => void;
  setBlocklyXml: (xml: string) => void;
  togglePlayMode: () => void;
  toggleDimensionMode: () => void;
  saveProject: () => void;
  loadProject: () => void;
  initializeProject: () => void;
}

// ダミーの初期コード
const initialCode = `// ゲームのコードをここに書きましょう！
function setup() {
  // ゲームの初期化
  createSprite("player", 100, 100, "player");
}

function update() {
  // ゲームの更新（毎フレーム実行）
  if (isKeyPressed("ArrowRight")) {
    moveSprite("player", 5, 0);
  }
  
  if (isKeyPressed("ArrowLeft")) {
    moveSprite("player", -5, 0);
  }
}
`;

// 初期Blocklyの状態 (simple setup and update blocks)
const initialBlocklyXml = '<xml xmlns="https://developers.google.com/blockly/xml"><block type="controls_if" id="1" x="63" y="63"><mutation else="1"></mutation><value name="IF0"><block type="game_key_pressed" id="2"><field name="KEY">ArrowRight</field></block></value><statement name="DO0"><block type="game_move_sprite" id="3"><field name="NAME">player</field><value name="X"><block type="math_number" id="4"><field name="NUM">5</field></block></value><value name="Y"><block type="math_number" id="5"><field name="NUM">0</field></block></value></block></statement><statement name="ELSE"><block type="controls_if" id="6"><value name="IF0"><block type="game_key_pressed" id="7"><field name="KEY">ArrowLeft</field></block></value><statement name="DO0"><block type="game_move_sprite" id="8"><field name="NAME">player</field><value name="X"><block type="math_number" id="9"><field name="NUM">-5</field></block></value><value name="Y"><block type="math_number" id="10"><field name="NUM">0</field></block></value></block></statement></block></statement></block></xml>';

export const useProjectStore = create<ProjectState>((set) => ({
  projectName: 'マイゲーム',
  code: initialCode,
  blocklyXml: initialBlocklyXml,
  isPlaying: false,
  is3D: true,
  initialized: false,
  
  setProjectName: (name) => set({ projectName: name }),
  
  setCode: (code) => set({ code }),
  
  setBlocklyXml: (xml) => set({ blocklyXml: xml }),
  
  togglePlayMode: () => set((state) => ({ isPlaying: !state.isPlaying })),
  
  toggleDimensionMode: () => set((state) => ({ is3D: !state.is3D })),
  
  saveProject: () => {
    // LocalStorageにプロジェクトを保存（今後はオンライン保存に拡張可能）
    const state = useProjectStore.getState();
    const projectData = {
      name: state.projectName,
      code: state.code,
      blocklyXml: state.blocklyXml,
      is3D: state.is3D
    };
    
    try {
      localStorage.setItem('kidsgame_project', JSON.stringify(projectData));
      alert('プロジェクトを保存しました！');
    } catch (e) {
      console.error('Failed to save project', e);
      alert('プロジェクトの保存に失敗しました。');
    }
  },
  
  loadProject: () => {
    // LocalStorageからプロジェクトを読み込む
    try {
      const savedProject = localStorage.getItem('kidsgame_project');
      if (savedProject) {
        const projectData = JSON.parse(savedProject);
        set({
          projectName: projectData.name,
          code: projectData.code,
          blocklyXml: projectData.blocklyXml,
          is3D: projectData.is3D
        });
        alert('プロジェクトを読み込みました！');
      } else {
        alert('保存されたプロジェクトがありません。');
      }
    } catch (e) {
      console.error('Failed to load project', e);
      alert('プロジェクトの読み込みに失敗しました。');
    }
  },
  
  initializeProject: () => {
    // プロジェクトの初期化処理
    set({ initialized: true });
  }
}));