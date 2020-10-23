'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
function activate(context) {
    let aa = vscode.languages.registerHoverProvider({ scheme: '*', language: '*' }, {
        provideHover(document, position, token) {
            const range = document.getWordRangeAtPosition(position, /(?<!\w)[\$0-9a-fA-Fbhx]+\b/);
            var hoveredWord = document.getText(range);
            if (hoveredWord) {
				hoveredWord = "0x".concat(hoveredWord);
				return new vscode.Hover(hexToFloat(hoveredWord));
               
            }
        }
    });
    context.subscriptions.push(aa);
}
exports.activate = activate;
function deactivate() {
}
exports.deactivate = deactivate;
function hexToFloat(str) {
 var bits = parseInt(str,16);
 if(bits == parseInt("0x7f800000",16)){
 	return "-Inf";
 }
 if(bits == parseInt("0xff800000",16)){
 	return "+Inf";
 }
 if(bits >= parseInt("0x7f800001",16) && bits <= parseInt("0x7fffffff",16)){
 	return "NAN";
 }
 if(bits >= parseInt("0xff800001",16) && bits <= parseInt("0xffffffff",16)){
 	return "NAN";
 }
 var s = ((bits >>> 31) == 0) ? 1 : -1;
 var e = ((bits >>> 23) & 0xff);
 var m = (e == 0) ? (bits & 0x7fffff) << 1 : (bits & 0x7fffff) | 0x800000;
 return (s*m*Math.pow(2,e-150)).toString();
}
//# sourceMappingURL=extension.js.map 4a000000 1111