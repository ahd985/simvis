import React, { Component, PureComponent } from 'react'
import svgpath from 'svgpath'

export class Rect extends PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        const {x0, y0, h0, w0} = this.props.objectBBox;
        const {dX, dY, scale} = this.props.dObject;
        let height = this.props.height * scale;
        let width = this.props.width * scale;
        let x = this.props.x * scale;
        let y = this.props.y * scale;

        const x1 = x + width;
        const y1 = y + height;
        const dDX = dX * (x1 - x0) / w0;
        const dDY = dY * (y1 - y0) / h0;

        // Calculate split fraction to adjust x / width and y / height
        const xFrac = (x - x0) / (x1 - x0);
        const yFrac = (y - y0) / (y1 - y0);

        x = x + xFrac * dDX;
        y = y + yFrac * dDY;
        width = width + (1 - xFrac) * dDX;
        height = height + (1 - yFrac) * dDY;

        const attr = {
            x:x,
            y:y,
            rx:this.props.rx,
            ry:this.props.ry,
            height:height,
            width:width
        };

        return (
            <rect {...attr} id={this.props.id} className={`${this.props.ignore ? "ignore" : ""} ${this.props.static ? "static" : ""}`}/>
        )
    }
}

Rect.propTypes = {
    x: React.PropTypes.any.isRequired,
    y: React.PropTypes.any.isRequired,
    height: React.PropTypes.any.isRequired,
    width: React.PropTypes.any.isRequired
};

Rect.defaultProps = {
    rx: 0,
    ry: 0
};

export class EditableText extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const {x0, y0, h0, w0} = this.props.objectBBox;
        const {dX, dY, scale} = this.props.dObject;
        let height = this.props.height * scale;
        let width = this.props.width * scale;
        let x = this.props.x * scale;
        let y = this.props.y * scale;

        const x1 = x + width;
        const y1 = y + height;
        const dDX = dX * (x1 - x0) / w0;
        const dDY = dY * (y1 - y0) / h0;

        // Calculate split fraction to adjust x / width and y / height
        const xFrac = (x - x0) / (x1 - x0);
        const yFrac = (y - y0) / (y1 - y0);

        x = x + xFrac * dDX;
        y = y + yFrac * dDY;
        width = width + (1 - xFrac) * dDX;
        height = height + (1 - yFrac) * dDY;

        let text;
        this.props.text ? text = this.props.text : text = "Text";

        return (
            <g transform={`translate(${x}, ${y})`} className={`${this.props.ignore ? "ignore" : ""} ${this.props.static ? "static" : ""}`}>
                <rect x={0} y={0} height={height} width={width}></rect>
                <foreignObject style={{overflow:"visible"}} width={width}>
                    <div className="text-container">
                        <div className="text" xmlns="http://www.w3.org/1999/xhtml" style={{lineHeight:height + "px", fontSize:`${scale*100}%`}} contentEditable={this.props.editActive} suppressContentEditableWarning={true}>{text}</div>
                    </div>
                </foreignObject>
            </g>
        )
    }
}

export class StaticText extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const {x0, y0, h0, w0} = this.props.objectBBox;
        const {dX, dY, scale} = this.props.dObject;
        let height = this.props.height * scale;
        let width = this.props.width * scale;
        let x = this.props.x * scale;
        let y = this.props.y * scale;

        const x1 = x + width;
        const y1 = y + height;
        const dDX = dX * (x1 - x0) / w0;
        const dDY = dY * (y1 - y0) / h0;

        // Calculate split fraction to adjust x / width and y / height
        const xFrac = (x - x0) / (x1 - x0);
        const yFrac = (y - y0) / (y1 - y0);

        x = x + xFrac * dDX;
        y = y + yFrac * dDY;

        return (
            <g transform={`translate(${x}, ${y})`} style={this.props.style} className={`${this.props.ignore ? "ignore" : ""} ${this.props.static ? "static" : ""}`}>
                <text style={{textAnchor: "middle", transform:`scale(${scale},${scale})`, alignmentBaseline:"middle"}}>{this.props.text}</text>
            </g>
        )
    }
}

Rect.propTypes = {
    x: React.PropTypes.any.isRequired,
    y: React.PropTypes.any.isRequired,
    height: React.PropTypes.any.isRequired,
    width: React.PropTypes.any.isRequired
};

Rect.defaultProps = {
    rx: 0,
    ry: 0
};

export class Circle extends PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        const {x0, y0, h0, w0} = this.props.objectBBox;
        const {dX, dY, scale} = this.props.dObject;
        let r = this.props.r * scale;
        let cx = this.props.cx * scale;
        let cy = this.props.cy * scale;

        let x1 = cx + r;
        let y1 = cy + r;
        const dDX = dX * (x1 - x0) / w0;
        const dDY = dY * (y1 - y0) / h0;

        // Calculate split fraction to adjust x / width and y / height
        let xFrac = (cx - r - x0) / (x1 - x0);
        xFrac = xFrac + (1 - xFrac)/2;
        let yFrac = (cy - r - y0) / (y1 - y0);
        yFrac = yFrac + (1 - yFrac)/2;

        cx = cx + xFrac * dDX;
        cy = cy + yFrac * dDY;
        r = r + Math.min((1-xFrac) * dDX, (1-yFrac) * dDY);

        const attr = {
            cx:cx,
            cy:cy,
            r:r
        };

        return(
            <circle {...attr} style={this.props.style} id={this.props.id} className={`${this.props.ignore ? "ignore" : ""} ${this.props.static ? "static" : ""}`}/>
        )
    }
}

Circle.propTypes = {
    cx: React.PropTypes.any.isRequired,
    cy: React.PropTypes.any.isRequired,
    r: React.PropTypes.any.isRequired
};

export class Ellipse extends PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        const {x0, y0, h0, w0} = this.props.objectBBox;
        const {dX, dY, scale} = this.props.dObject;
        let rx = this.props.rx * scale;
        let ry = this.props.ry * scale;
        let cx = this.props.cx * scale;
        let cy = this.props.cy * scale;

        const x1 = cx + rx;
        const y1 = cy + ry;
        const dDX = dX * (x1 - x0) / w0;
        const dDY = dY * (y1 - y0) / h0;

        // Calculate split fraction to adjust x / width and y / height
        let xFrac = (cx - rx - x0) / (x1 - x0);
        xFrac = xFrac + (1 - xFrac)/2;
        let yFrac = (cy - ry - y0) / (y1 - y0);
        yFrac = yFrac + (1 - yFrac)/2;

        cx = cx + xFrac * dDX;
        cy = cy + yFrac * dDY;
        rx = rx + (1-xFrac) * dDX;
        ry = ry + (1-yFrac) * dDY;

        const attr = {
            cx:cx,
            cy:cy,
            rx:rx,
            ry:ry
        };

        return(
            <ellipse {...attr} id={this.props.id} style={this.props.style} className={`${this.props.ignore ? "ignore" : ""} ${this.props.static ? "static" : ""}`}/>
        )
    }
}

Ellipse.propTypes = {
    cx: React.PropTypes.any.isRequired,
    cy: React.PropTypes.any.isRequired,
    rx: React.PropTypes.any.isRequired,
    ry: React.PropTypes.any.isRequired
};

export class Path extends PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        const {x0, y0, h0, w0} = this.props.objectBBox;
        const {dX, dY, scale} = this.props.dObject;
        let d = this.props.d;

        d = svgpath(d).rel();
        let x1, x2, y1, y2, xLoc, yLoc;

        // Get height/width
        d.iterate((segment, index, xs, ys) => {
            if (index == 1) {
                x1 = xs;
                y1 = ys;
                x2 = xs;
                y2 = ys;
            } else if (index < d.segments.length - 1) {
                x1 = Math.min(x1, xs)
                x2 = Math.max(x2, xs)
                y1 = Math.min(y1, ys)
                y2 = Math.max(y2, ys)
            } else if (index > 1) {
                let posX = xs, posY = ys;
                switch(segment[0]) {
                    case 'h':
                        posX += segment[1]
                        break
                    case 'H':
                        posX = segment[1]
                        break
                    case 'v':
                        posY += segment[2]
                        break
                    case 'V':
                        posY = segment[2]
                        break
                    case 'z':
                    case 'Z':
                        posX += 0
                        posY += 0
                        break
                    case 'M':
                    case 'L':
                    case 'A':
                    case 'Q':
                    case 'C':
                    case 'T':
                    case 'S':
                        posX = segment[segment.length - 2]
                        posY = segment[segment.length - 1]
                        break
                    default:
                        posX += segment[segment.length - 2]
                        posY += segment[segment.length - 1]
                        break
                }
                x1 = Math.min(x1, posX)
                x2 = Math.max(x2, posX)
                y1 = Math.min(y1, posY)
                y2 = Math.max(y2, posY)
            }
        });

        const width = x2 - x1;
        const height = y2 - y1;

        // Calculate split fraction to adjust x / width and y / height
        const xFrac = (x1 - x0) / (x1 + width - x0);
        const yFrac = (y1 - y0) / (y1 + height - y0);

        d = d.scale((1 + (1-xFrac) * dX / w0)*scale, (1 + (1-yFrac) * dY / h0)*scale).toString();

        const attr = {d: d};

        // Add in a second no-stroke path for clicking purposes
        return(
            <g>
                <path {...attr} stroke="none" strokeWidth="10"/>
                <path {...attr} id={this.props.id} style={this.props.style} className={`${this.props.ignore ? "ignore" : ""} ${this.props.static ? "static" : ""}`}/>
            </g>
        )
    }
}

Path.propTypes = {
    d: React.PropTypes.any.isRequired
};

const elementMap = {
    Rect,
    EditableText,
    StaticText,
    Circle,
    Ellipse,
    Path
}

export default class Shape extends PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        const elements = this.props.elements;

        const renderedElements = elements.map((e,i) => {
            let Tag = elementMap[e.tag];
            let key = e.d;
            return <Tag objectBBox={this.props.objectBBox} dObject={this.props.dObject} editActive={this.props.editActive} key={key} {...e}/>
        })

        return (
            <g>
                {renderedElements}
            </g>
        )
    }
}

Shape.propTypes = {
    objectBBox: React.PropTypes.object.isRequired,
    dObject: React.PropTypes.object,
    elements: React.PropTypes.array
};

Shape.defaultProps = {
    dObject: {dX:0, dY:0, scale:1}
};
