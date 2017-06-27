import {CompileTarget} from "./compile-target";
/**
 * Created by n.vinayakan on 14.06.17.
 */
export interface CompilerOptions {
    target: CompileTarget,
    silent: boolean;
    logError: boolean;
    optimize: boolean;
    longPtr: boolean;
}

export const defaultCompilerOptions: CompilerOptions = {
    target: CompileTarget.WEBASSEMBLY,
    silent: true,
    logError: true,
    optimize: true,
    longPtr: false
};
