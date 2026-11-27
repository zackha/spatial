// Browser tests import the stylesheet through Vite. Library code never imports
// CSS from JavaScript, so this is scoped to tests rather than `vite/client`.
declare module '*.css'
