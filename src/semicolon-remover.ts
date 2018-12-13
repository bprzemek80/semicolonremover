import * as vscode from 'vscode';
import { window, TextEditor } from 'vscode';

export class SemicolonRemover {
    
    editor: vscode.WorkspaceEdit;

    public removeSemicolons() {

        this.editor = new vscode.WorkspaceEdit();    

        const hasSemicolon = (text: string, size: number) => text.substring(size - 1, size) === ';'
        
        let activeEditor: TextEditor = vscode.window.activeTextEditor;        
        let uri = activeEditor.document.uri;

        for (let i = 0; i < activeEditor.document.lineCount; i++) {
            const line = activeEditor.document.lineAt(i);
            const textLength = line.text.length;
            if (hasSemicolon(line.text, textLength)) {
                const start = new vscode.Position(i, textLength - 1);
                const end = new vscode.Position(i, textLength);
                const range = new vscode.Range(start, end);
                this.editor.delete(uri, range);
            }
        }
    }
}