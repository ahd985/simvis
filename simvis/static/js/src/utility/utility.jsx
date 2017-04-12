export function generateB64Grid(gridSize, scale) {
    const l = gridSize*scale;

    const grid = `
    <svg width="${l*4}" height="${l*4}" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 0 ${l} L ${l*4} ${l} M ${l} 0 L ${l} ${l*4} M 0 ${l*2} L ${l*4} ${l*2} M ${l*2} 0 L ${l*2} ${l*4} M 0 ${l*3} L ${l*4} ${l*3} M ${l*3} 0 L ${l*3} ${l*4}" fill="none" stroke="#e0e0e0" opacity="0.2" stroke-width="1"/>
              <path d="M ${l*4} 0 L 0 0 0 ${l*4}" fill="none" stroke="#e0e0e0" stroke-width="1"/>
            </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)"/>
    </svg>`;

    return `url("data:image/svg+xml;base64,${btoa(grid)}")`;
}
