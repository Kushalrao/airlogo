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
  type: 'insert-logo';
  logo: LogoData;
}

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = async (msg: PluginMessage) => {
  if (msg.type === 'insert-logo') {
    try {
      // Fetch the SVG from the CDN
      const response = await fetch(msg.logo.logo);
      if (!response.ok) throw new Error('Failed to fetch logo');
      const svgString = await response.text();

      // Create node from SVG
      const node = figma.createNodeFromSvg(svgString);
      
      // Position the logo at the center of the viewport
      const { x, y } = figma.viewport.center;
      node.x = x - node.width / 2;
      node.y = y - node.height / 2;

      // Select the newly created node
      figma.currentPage.selection = [node];
      figma.viewport.scrollAndZoomIntoView([node]);

      // Notify user of success
      figma.notify(`Inserted ${msg.logo.name} logo`);
    } catch (error) {
      console.error('Error inserting logo:', error);
      figma.notify('Failed to insert logo. Please try again.', { error: true });
    }
  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  figma.closePlugin();
};
