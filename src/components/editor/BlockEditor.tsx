import React, { useEffect, useRef } from 'react';
import * as Blockly from 'blockly';
import { Block } from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';
import { useProjectStore } from '../../store/projectStore';
import { defineBlocks } from '../../utils/blockDefinitions';

const BlockEditor: React.FC = () => {
  const blocklyDiv = useRef<HTMLDivElement>(null);
  const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);
  const { setCode, blocklyXml, setBlocklyXml } = useProjectStore();

  // Blocklyワークスペースの初期化
  useEffect(() => {
    if (blocklyDiv.current && !workspaceRef.current) {
      // ブロック定義の登録
      defineBlocks();
      
      // ツールボックスの設定
      const toolbox = {
        kind: 'categoryToolbox',
        contents: [
          {
            kind: 'category',
            name: '基本',
            colour: '#5C81E6',
            contents: [
              { kind: 'block', type: 'controls_if' },
              { kind: 'block', type: 'controls_repeat_ext' },
              { kind: 'block', type: 'logic_compare' },
              { kind: 'block', type: 'math_number' },
              { kind: 'block', type: 'math_arithmetic' },
              { kind: 'block', type: 'text' },
              { kind: 'block', type: 'text_print' },
            ],
          },
          {
            kind: 'category',
            name: 'ゲーム',
            colour: '#F0AC10',
            contents: [
              { kind: 'block', type: 'game_create_sprite' },
              { kind: 'block', type: 'game_move_sprite' },
              { kind: 'block', type: 'game_rotate_sprite' },
              { kind: 'block', type: 'game_check_collision' },
            ],
          },
          {
            kind: 'category',
            name: '入力',
            colour: '#9E42B2',
            contents: [
              { kind: 'block', type: 'game_key_pressed' },
              { kind: 'block', type: 'game_mouse_clicked' },
            ],
          },
        ],
      };
      
      // ワークスペースの作成
      workspaceRef.current = Blockly.inject(blocklyDiv.current, {
        toolbox,
        scrollbars: true,
        sounds: true,
        trashcan: true,
        zoom: {
          controls: true,
          wheel: true,
          startScale: 1.0,
          maxScale: 3,
          minScale: 0.3,
          scaleSpeed: 1.2,
        },
        grid: {
          spacing: 20,
          length: 3,
          colour: '#ccc',
          snap: true,
        },
      });

      // 保存されたブロックを復元
      if (blocklyXml) {
        try {
          const xml = Blockly.utils.xml.textToDom(blocklyXml);
          Blockly.Xml.domToWorkspace(xml, workspaceRef.current);
        } catch (e) {
          console.error('Failed to load blocks', e);
        }
      }

      // ブロック変更時のイベントハンドラ
      workspaceRef.current.addChangeListener(() => {
        if (workspaceRef.current) {
          // Blocklyコードを生成
          const code = javascriptGenerator.workspaceToCode(workspaceRef.current);
          setCode(code);
          
          // XMLを保存
          const xml = Blockly.Xml.workspaceToDom(workspaceRef.current);
          const xmlText = Blockly.Xml.domToText(xml);
          setBlocklyXml(xmlText);
        }
      });
    }

    // クリーンアップ
    return () => {
      if (workspaceRef.current) {
        workspaceRef.current.dispose();
        workspaceRef.current = null;
      }
    };
  }, [blocklyXml, setBlocklyXml, setCode]);

  return (
    <div className="h-full w-full flex flex-col">
      <div className="p-2 bg-slate-100 border-b border-slate-200">
        <h2 className="text-lg font-semibold">ブロックエディタ</h2>
        <p className="text-sm text-slate-600">ブロックをドラッグ＆ドロップしてゲームを作ろう！</p>
      </div>
      <div ref={blocklyDiv} className="flex-1 overflow-hidden" />
    </div>
  );
};

export default BlockEditor;