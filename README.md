# Airlogo - Airline Logo Library for Figma

A Figma plugin that provides easy access to airline logos for designers working on travel-related interfaces.

## Features

- 🎨 High-quality SVG airline logos
- 🔍 Search by airline name or IATA code
- 🌍 Filter by country and airline alliance
- 🚀 Quick insertion into Figma designs
- 📱 Responsive and modern UI
- 🔄 Regular updates with new airlines

## Installation

1. Open Figma
2. Go to Plugins > Development > Import plugin from manifest...
3. Select the `manifest.json` file from this repository

## Development

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/airlogo.git
   cd airlogo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the plugin:
   ```bash
   npm run build
   ```

4. For development with hot reloading:
   ```bash
   npm run watch
   ```

### Project Structure

```
airlogo/
├── code.ts              # Main plugin code
├── ui.html             # Plugin UI
├── manifest.json       # Plugin manifest
├── logos.json         # Airline metadata
└── assets/           # (Optional) Local fallback logos
```

## Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

### Adding New Airlines

To add a new airline:

1. Add the airline's metadata to `logos.json`
2. Add the SVG logo to the repository
3. Ensure the logo meets our quality standards:
   - Clean SVG format
   - Proper viewBox
   - No unnecessary elements
   - Optimized file size

## License

MIT License - see LICENSE file for details

## Acknowledgments

- All airline logos are trademarks of their respective owners
- This plugin is not affiliated with any airline or alliance
