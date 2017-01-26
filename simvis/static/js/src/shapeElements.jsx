import React, { Component } from 'react'
import svgpath from 'svgpath'

export class Rect extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {x0, y0, h0, w0} = this.props.objectBBox;
        const {dX, dY} = this.props.dObject;
        let height = this.props.height;
        let width = this.props.width;
        let x = this.props.x;
        let y = this.props.y;

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
            <rect {...attr} />
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

export class Circle extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {x0, y0, h0, w0} = this.props.objectBBox;
        const {dX, dY} = this.props.dObject;
        let r = this.props.r;
        let cx = this.props.cx;
        let cy = this.props.cy;

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
            <circle {...attr} />
        )
    }
}

Circle.propTypes = {
    cx: React.PropTypes.any.isRequired,
    cy: React.PropTypes.any.isRequired,
    r: React.PropTypes.any.isRequired
};

export class Ellipse extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {x0, y0, h0, w0} = this.props.objectBBox;
        const {dX, dY} = this.props.dObject;
        let rx = this.props.rx;
        let ry = this.props.ry;
        let cx = this.props.cx;
        let cy = this.props.cy;

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
            <ellipse {...attr} />
        )
    }
}

Ellipse.propTypes = {
    cx: React.PropTypes.any.isRequired,
    cy: React.PropTypes.any.isRequired,
    rx: React.PropTypes.any.isRequired,
    ry: React.PropTypes.any.isRequired
};

export class Path extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {x0, y0, h0, w0} = this.props.objectBBox;
        const {dX, dY} = this.props.dObject;
        let d = this.props.d;

        d = svgpath(d).rel();
        let x1, x2, y1, y2;
        let x1Temp, x2Temp, y1Temp, y2Temp;

        // Get height/width
        d.iterate((segment, index, xs, ys) => {
            if (index == 1) {
                x1Temp = xs;
                y1Temp = ys
            }

            if (index == d.segments.length - 1) {
                segment[0] != "v" ? x2Temp = xs + segment[segment.length-2] : x2Temp = xs;
                segment[0] != "h" ? y2Temp = ys + segment[segment.length-1] : y2Temp = ys;
            }
        });

        x1 = Math.min(x1Temp, x2Temp);
        x2 = Math.max(x1Temp, x2Temp);
        y1 = Math.min(y1Temp, y2Temp);
        y2 = Math.max(y1Temp, y2Temp);

        const width = x2 - x1;
        const height = y2 - y1;

        // Calculate split fraction to adjust x / width and y / height
        const xFrac = (x1 - x0) / (x1 + width - x0);
        const yFrac = (y1 - y0) / (y1 + height - y0);

        d = d.scale(1 + (1-xFrac) * dX / w0, 1 + (1-yFrac) * dY / h0)
            .translate(xFrac * dX, yFrac * dY)
            .toString();

        const attr = {d: d};

        return(
            <path {...attr} />
        )
    }
}

Path.propTypes = {
    d: React.PropTypes.any.isRequired
};

export default class Shape extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let shape;
        if (this.props.children.constructor === Array)  {
            shape = this.props.children.map((child, i) => {
                return React.cloneElement(child, {
                    objectBBox: this.props.objectBBox,
                    dObject: this.props.dObject,
                    key: i
                })
            })
        } else {
            shape = React.cloneElement(this.props.children, {
                objectBBox: this.props.objectBBox,
                dObject: this.props.dObject
            })
        }

        return (
            <g>
                {shape}
            </g>
        )
    }
}

Shape.propTypes = {
    objectBBox: React.PropTypes.object.isRequired,
    dObject: React.PropTypes.object
};

Shape.defaultProps = {
    dObject: {dX:0, dY:0}
};
