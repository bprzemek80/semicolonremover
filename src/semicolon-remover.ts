import * as vscode from 'vscode';

export class SemicolonRemover {
    public removeSemicolons(activeEditor: vscode.TextEditor, editor: vscode.WorkspaceEdit) {
        const hasSemicolon = (text: string, size: number) => text.substring(size - 1, size) === ';'

        const uri = activeEditor.document.uri;

        for (let i = 0; i < activeEditor.document.lineCount; i++) {
            const line = activeEditor.document.lineAt(i);
            const textLength = line.text.length;
            if (hasSemicolon(line.text, textLength)) {
                const start = new vscode.Position(i, textLength - 1);
                const end = new vscode.Position(i, textLength);
                const range = new vscode.Range(start, end);
                editor.delete(uri, range);
            }
        }
    }
}