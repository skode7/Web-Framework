import {defineConfig} from 'vite';
import react, {reactCompilerPreset} from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';

// https://vite.dev/config/
export default defineConfig(({command}) => {
  return {
    plugins: [react(), babel({presets: [reactCompilerPreset()]})],
    base: command === 'build' ? '/~teemumpo/wsk-routing/upload/' : '/',
  };
});
