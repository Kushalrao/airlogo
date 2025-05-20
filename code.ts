/// <reference types="@figma/plugin-typings" />

// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

// This shows the HTML page in "ui.html".
figma.showUI(__html__, { width: 320, height: 480 });

interface LogoData {
  name: string;
  iata: string;
  logo: string;
}

interface PluginMessage {
  type: 'insert-logo' | 'drag-start';
  logo: LogoData;
  closePlugin?: boolean;
  x?: number;
  y?: number;
}

// Handle messages from the UI
figma.ui.onmessage = async (msg: PluginMessage) => {
  if (msg.type === 'insert-logo') {
    try {
      // Fetch the SVG from the CDN
      const response = await fetch(msg.logo.logo);
      if (!response.ok) throw new Error('Failed to fetch logo');
      const svgString = await response.text();

      // Create node from SVG
      const node = figma.createNodeFromSvg(svgString);
      
      // Position the logo at the specified position or center of viewport
      if (msg.x !== undefined && msg.y !== undefined) {
        // Convert screen coordinates to Figma coordinates
        const viewport = figma.viewport.center;
        const zoom = figma.viewport.zoom;
        const figmaX = (msg.x - figma.viewport.bounds.x) / zoom;
        const figmaY = (msg.y - figma.viewport.bounds.y) / zoom;
        
        node.x = figmaX - node.width / 2;
        node.y = figmaY - node.height / 2;
      } else {
        const { x, y } = figma.viewport.center;
        node.x = x - node.width / 2;
        node.y = y - node.height / 2;
      }

      // Select the newly created node
      figma.currentPage.selection = [node];
      figma.viewport.scrollAndZoomIntoView([node]);

      // Notify user of success
      figma.notify(`Inserted ${msg.logo.name} logo`);

      // Only close the plugin if explicitly requested
      if (msg.closePlugin) {
        figma.closePlugin();
      }
    } catch (error) {
      console.error('Error inserting logo:', error);
      figma.notify('Failed to insert logo. Please try again.', { error: true });
    }
  }
};
