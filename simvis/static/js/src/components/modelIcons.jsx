import React from 'react'

const cellIcon = <svg viewBox="0 0 100 100" width="100" height="100">
        <defs>
            <pattern id="cell-btn-pattern" x="0" y="0" width="100%" height="100%" patternContentUnits="userSpaceOnUse">
                <rect x="0" width="100%" height="100%" y="0" style={{fill: "#EEEEEE", opacity: 1}} />
                <rect x="0" width="100" height="100" y="80" style={{opacity:1, fill:"#FFF8E1"}}>
                    <animate attributeName="y" values="70;30;70" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="height" values="30;70;30" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="fill" values="#90CAF9;#64B5F6;#90CAF9" dur="3s" repeatCount="indefinite" />
                </rect>
                <rect x="0" width="100" height="1" y="80" style={{opacity:1, fill:"#ffffff"}}>
                    <animate attributeName="y" values="70;30;70" dur="3s" repeatCount="indefinite" />
                </rect>
            </pattern>
        </defs>
        <rect height="100"
          style={{opacity:1, fill:"url(#cell-btn-pattern)", fillOpacity:1, stroke:"#000000"}}
          width="100" x="0" y="0" />
    </svg>;

const heatmapIcon = <svg viewBox="0 0 100 100" width="100" height="100">
        <defs>
            <pattern id="heatmap-btn-pattern-1" x="0" y="0" width="100%" height="100%" patternContentUnits="userSpaceOnUse">
                <rect x="0" width="100%" height="100%" y="0">
                    <animate attributeName="fill" values="#FFF176;#FDD835;#F57F17;#FDD835;#FFF176" dur="5s" repeatCount="indefinite" />
                </rect>
            </pattern>
            <pattern id="heatmap-btn-pattern-2" x="0" y="0" width="100%" height="100%" patternContentUnits="userSpaceOnUse">
                <rect x="0" width="100%" height="100%" y="0">
                    <animate attributeName="fill" values="#FDD835;#F57F17;#BF360C;#F57F17;#FDD835" dur="5s" repeatCount="indefinite" />
                </rect>
            </pattern>
        </defs>
        <rect height="33" width="33" x="0" y="0" fill="url(#heatmap-btn-pattern-1)" stroke="#000000" />
        <rect height="33" width="33" x="33" y="0" fill="url(#heatmap-btn-pattern-2)" stroke="#000000" />
        <rect height="34" width="33" x="66" y="0" fill="url(#heatmap-btn-pattern-1)" stroke="#000000" />
        <rect height="33" width="33" x="0" y="33" fill="url(#heatmap-btn-pattern-2)" stroke="#000000" />
        <rect height="33" width="33" x="33" y="33" fill="url(#heatmap-btn-pattern-2)" stroke="#000000" />
        <rect height="33" width="33" x="66" y="33" fill="url(#heatmap-btn-pattern-2)" stroke="#000000" />
        <rect height="33" width="33" x="0" y="66" fill="url(#heatmap-btn-pattern-1)" stroke="#000000" />
        <rect height="33" width="33" x="33" y="66" fill="url(#heatmap-btn-pattern-2)" stroke="#000000" />
        <rect height="34" width="33" x="66" y="66" fill="url(#heatmap-btn-pattern-1)" stroke="#000000" />
    </svg>;

const lineIcon = <svg viewBox="0 0 100 100" width="100" height="100">
        <defs>
            <pattern id="line-btn-pattern" x="0" y="0" width="100%" height="100%" patternContentUnits="userSpaceOnUse">
                <rect x="0" width="25" height="100%" y="0">
                </rect>
                <rect x="25" width="25" height="100%" y="0">
                    <animate attributeName="fill" values="#66BB6A;#43A047;#1B5E20;#43A047;#66BB6A" dur="2s" repeatCount="indefinite" />
                </rect>
                <rect x="50" width="25" height="100%" y="0">
                    <animate attributeName="fill" values="#66BB6A;#43A047;#1B5E20;#43A047;#66BB6A" dur="2s" repeatCount="indefinite" />
                </rect>
                <rect x="75" width="25" height="100%" y="0">
                    <animate attributeName="fill" values="#A5D6A7;#66BB6A;#43A047;#66BB6A;#A5D6A7" dur="2s" repeatCount="indefinite" />
                </rect>
            </pattern>
        </defs>
        <line x1="0" y1="50" x2="100" y2="50.01" stroke="url(#line-btn-pattern)" strokeWidth={3}/>
    </svg>;

const toggleIcon = <svg viewBox="0 0 100 100" width="100" height="100">
        <circle cx="50" cy="50" r="45" stroke="#000000" strokeWidth="5">
            <animate attributeName="fill" values="#4CAF50;#F44336" dur="4s" repeatCount="indefinite" calcMode="discrete" />
        </circle>
    </svg>;

const legendIcon = <svg viewBox="0 0 100 100" width="100" height="100">
        <rect height="15" width="25" x="0" y="35" fill="#ffffb2" stroke="#000000" />
        <rect height="15" width="25" x="25" y="35" fill="#fecc5c" stroke="#000000" />
        <rect height="15" width="25" x="50" y="35" fill="#fd8d3c" stroke="#000000" />
        <rect height="15" width="25" x="75" y="35" fill="#e31a1c" stroke="#000000" />
        <text x="3" y="62">1</text>
        <text x="28" y="62">2</text>
        <text x="53" y="62">3</text>
        <text x="78" y="62">4</text>
    </svg>;

const reportIcon = <svg width="100" height="100" viewBox="0 0 100 100">
    <rect width="100" alignmentBaseline="after-edge" height="24" x="0" y="0" fill="#616161" />
    <text width="100" textAnchor="middle" x="50" y="21" fontSize="13" fill="#ffc107">Quench Tank</text>
    <rect width="100" alignmentBaseline="after-edge" height="24" x="0" y="25" fill="#616161" />
    <text width="100" textAnchor="middle" x="30" y="40" fontSize="10" fill="#00bfa5">Vapor Temp</text>
    <text width="100" textAnchor="middle" x="75" y="40" fontSize="10" fill="#ffeb3b">320.0</text>
    <text width="100" textAnchor="middle" x="93" y="40" fontSize="10" fill="#ffffff">K</text>
    <rect width="100" alignmentBaseline="after-edge" height="24" x="0" y="50" fill="#616161" />
    <text width="100" textAnchor="middle" x="30" y="65" fontSize="10" fill="#00bfa5">Water Temp</text>
    <text width="100" textAnchor="middle" x="75" y="65" fontSize="10" fill="#ffeb3b">305.0</text>
    <text width="100" textAnchor="middle" x="93" y="65" fontSize="10" fill="#ffffff">K</text>
    <rect width="100" alignmentBaseline="after-edge" height="24" x="0" y="75" fill="#616161" />
    <text width="100" textAnchor="middle" x="30" y="90" fontSize="10" fill="#00bfa5">Water Mass</text>
    <text width="100" textAnchor="middle" x="75" y="90" fontSize="10" fill="#ffeb3b">11.0</text>
    <text width="100" textAnchor="middle" x="93" y="90" fontSize="10" fill="#ffffff">T</text>
</svg>;

const tableIcon = <svg width="100" height="100" viewBox="0 0 100 100">
        <foreignObject width="100" height="100">
            <table width="100" height="100">
                <thead style={{fontSize:18}}>
                    <tr>
                        <th>H1</th>
                        <th>H2</th>
                        <th>H3</th>
                    </tr>
                </thead>
                <tbody style={{fontSize:10}}>
                    <tr>
                        <td>...</td>
                        <td>...</td>
                        <td>...</td>
                    </tr>
                    <tr>
                        <td>...</td>
                        <td>...</td>
                        <td>...</td>
                    </tr>
                    <tr>
                        <td>...</td>
                        <td>...</td>
                        <td>...</td>
                    </tr>
                    <tr>
                        <td>...</td>
                        <td>...</td>
                        <td>...</td>
                    </tr>
                </tbody>
            </table>
        </foreignObject>
    </svg>;

export default {
    cell:cellIcon,
    heatmap:heatmapIcon,
    line:lineIcon,
    toggle:toggleIcon,
    legend:legendIcon,
    report:reportIcon,
    table:tableIcon
}
