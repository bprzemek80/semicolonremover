'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { TextEditor } from 'vscode';
import { StatusBarItem } from 'vscode';
import { eventNames } from 'cluster';
import { SemicolonRemover } from './semicolon-remover';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    console.log('Congratulations, your extension "WordCount" is now active!');
    
    let semicolonRemover = new SemicolonRemover();    

    let disposable = vscode.commands.registerCommand('extension.semicolonRemover', () => {        
        vscode.commands.executeCommand('editor.action.organizeImports')
            .then(() => {
                setTimeout(() => {
                    semicolonRemover.removeSemicolons();
                    vscode.workspace.applyEdit(semicolonRemover.editor);
                }, 500);
            });
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}

