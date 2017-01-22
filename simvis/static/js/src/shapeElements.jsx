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
        const dDX = dX * x1 / w0;
        const dDY = dY * y1 / h0;

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

        const x1 = cx + r;
        const y1 = cy + r;
        const dDX = dX * x1 / w0;
        const dDY = dY * y1 / h0;

        // Calculate split fraction to adjust x / width and y / height
        const xFrac = (cx - r - x0) / (x1 - x0);
        const yFrac = (cy - r - y0) / (y1 - y0);

        cx = cx + xFrac * dDX;
        cy = cy + yFrac * dDY;
        r = r + Math.min((1-xFrac) / 2 * dDX, (1-yFrac) / 2 * dDY);

        const attr = {
            cx:this.props.cx,
            cy:this.props.cy,
            r:this.props.r + (this.props.dX**2 + this.props.dY**2)**0.5
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

        const x1 = cx + r;
        const y1 = cy + r;
        const dDX = dX * x1 / w0;
        const dDY = dY * y1 / h0;

        // Calculate split fraction to adjust x / width and y / height
        const xFrac = (cx - r - x0) / (x1 - x0);
        const yFrac = (cy - r - y0) / (y1 - y0);

        cx = cx + xFrac * dDX;
        cy = cy + yFrac * dDY;
        rx = rx + (1-xFrac) / 2 * dDX;
        ry = ry + (1-yFrac) / 2 * dDY;

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
        let height=0;
        let width=0;
        let x = Number.MAX_SAFE_INTEGER;
        let y = Number.MAX_SAFE_INTEGER;

        // Get height/width
        d.iterate((segment, index, xs, ys) => {
            width += segment.x;
            height += segment.y;
            x = Math.min(x, segment.x);
            y = Math.min(y, segment.y)
        });

        // Calculate split fraction to adjust x / width and y / height
        const xFrac = (x - x0) / (x + width - x0);
        const yFrac = (y - y0) / (y + height - y0);

        d = d.scale(1 + (1-xFrac) * dX, 1 + (1-yFrac) * dY)
            .translate(xFrac * dX, yFrac * dY)
            .toString();

        const attr = {d: d};

        return(
            <path {...attr} />
        )
    }
}

Path.propTypes = {
    d: React.PropTypes.string.isRequired
};

export default class Shape extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <g>
                {
                    React.cloneElement(this.props.children, {
                        objectBBox: this.props.objectBBox,
                        dObject: this.props.dObject
                    })
                }
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
