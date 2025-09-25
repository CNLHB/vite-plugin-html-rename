import { Plugin, ResolvedConfig } from "vite";
import path from "path";
import fs from "fs";

// 定义输入配置的类型
interface InputConfig {
  [key: string]: string;
}

// 定义插件选项的类型
type PluginOptions = string | InputConfig | undefined;

// 定义 Rollup 输出选项的类型
interface OutputOptions {
  dir?: string;
  [key: string]: any;
}

// 定义 Rollup bundle 的类型
interface Bundle {
  [fileName: string]: any;
}

const htmlRenamePlugin = (keyMap?: PluginOptions): Plugin => {
  let viteConfig: ResolvedConfig | null = null;

  // 处理 keyMap 参数
  let processedKeyMap: InputConfig | undefined;
  if (typeof keyMap === "string") {
    processedKeyMap = {
      [keyMap]: "index.html",
    };
  } else if (typeof keyMap === "object" && keyMap !== null) {
    processedKeyMap = keyMap;
  } else {
    processedKeyMap = undefined;
  }

  return {
    name: "html-rename",
    configResolved(config: ResolvedConfig): void {
      // 保存完整的 vite 配置
      viteConfig = config;
    },
    writeBundle(options: OutputOptions, bundle: Bundle): void {
      const input = processedKeyMap || viteConfig?.build?.rollupOptions?.input;
      const outDir = options.dir || viteConfig?.build?.outDir || "dist";

      if (typeof input === "object" && input !== null) {
        Object.entries(input).forEach(
          ([entryName, inputPath]: [string, string]) => {
            // 如果是 HTML 文件
            if (inputPath.endsWith(".html")) {
              const originalName = path.basename(inputPath);
              const newName = `${entryName}.html`;

              const oldPath = path.join(outDir, originalName);
              const newPath = path.join(outDir, newName);

              if (fs.existsSync(oldPath) && originalName !== newName) {
                fs.renameSync(oldPath, newPath);
                console.log(`Renamed ${originalName} to ${newName}`);
              }
            }
          }
        );
      }
    },
  };
};

export default htmlRenamePlugin;
