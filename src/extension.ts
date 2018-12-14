'use strict';
import * as vscode from 'vscode';
import { SemicolonRemover } from './semicolon-remover';

export function activate(context: vscode.ExtensionContext) {    
    let semicolonRemover = new SemicolonRemover();    

    let disposable = vscode.commands.registerCommand('extension.semicolonRemover', () => {        
        vscode.commands.executeCommand('editor.action.organizeImports')
            .then(() => {
                setTimeout(() => {
                    semicolonRemover.removeSemicolons();
                    vscode.workspace.applyEdit(semicolonRemover.editor);
                }, 150);
            });
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {
}

