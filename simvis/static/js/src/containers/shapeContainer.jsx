import React, { Component } from 'react'
import Draggable from 'react-draggable';
import { connect } from 'react-redux'
import { addTodo } from '../actions'
import { Menu, Popup } from 'semantic-ui-react';
import { debounce } from 'underscore';

import Shape from '../components/shapeElements'
import { moveShapes, addSelectedShape, resizeShapes, startMoveShapes, clearSelectedShapes, toggleEdit, changePath } from '../actions'

import svgpath from 'svgpath'

class ShapeContainer extends Component {
    constructor(props) {
        super(props);

        this.path = this.props.lineOutline ? svgpath(this.props.elements[0].d).abs() : false

        this.isClicked = false;
        this.isDragging = false;
        this.dragPos = {x:0, y:0};
        this.lastPos = null;
        this.doubleClickWIndow = false;

        this.outlineHandleSize = 5;
        this.minBound = Math.ceil(this.outlineHandleSize / 2.0);

        this.handleDragStart = this.handleDragStart.bind(this);
        this.handleDragStop = this.handleDragStop.bind(this);
        this.handleMove = this.handleMove.bind(this);
        this.handleMove = debounce(this.handleMove, 3);
        this.getResizeDims = this.getResizeDims.bind(this);
        this.handleResizeStart = this.handleResizeStart.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.handleResize = debounce(this.handleResize, 3);
        this.handleResizeStop = this.handleResizeStop.bind(this);
        this.handlePathChangeStart = this.handlePathChangeStart.bind(this);
        this.handlePathChange = this.handlePathChange.bind(this);
        this.getChangedPath = this.getChangedPath.bind(this);
        this.handlePathChangeStop = this.handlePathChangeStop.bind(this);
        this.handleContextMenu = this.handleContextMenu.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleDoubleClick = this.handleDoubleClick.bind(this);
    }

    handleDragStart(e, ui) {
        this.isClicked = true;
        this.dragPos = {x:e.pageX, y:e.pageY};
        this.lastPos = {x:0, y:0};
    }

    handleMove(e, ui) {
        if (this.isClicked && !(Math.abs(e.pageX - this.dragPos.x) < 4 && Math.abs(e.pageY - this.dragPos.y) < 4)) {
            if (!this.isDragging) {
                this.props.startMoveShapes();
                this.isDragging = true;
            }
        }

        if (this.isDragging) {
            const scale = this.props.scale;
            const deltaX = ui.x - this.lastPos.x;
            const deltaY = ui.y - this.lastPos.y;
            if (this.props.selectedShapes.indexOf(this.props.uuid) == -1) {
                this.props.addSelectedShape(this.props.uuid, true);
            }
            this.props.moveShapes({x: deltaX / scale, y: deltaY / scale});
            this.lastPos = {x:ui.x, y:ui.y};
        }
    }

    handleDragStop(e, ui) {
        if (this.isDragging) {
            const scale = this.props.scale;
            const deltaX = ui.x - this.lastPos.x;
            const deltaY = ui.y - this.lastPos.y;
            this.props.moveShapes({x: deltaX / scale, y: deltaY / scale});
            this.lastPos = null;
        } else {
            this.props.addSelectedShape(this.props.uuid, !e.shiftKey)
        }

        this.isClicked=false;
        this.isDragging=false
    }

    getResizeDims(deltaX, deltaY, scale, dir) {
        let dW=0, dH=0, dX=0, dY=0;
        if (dir.indexOf('t') > -1) {
            dY = deltaY
            dH = -deltaY
        }
        if (dir.indexOf('b') > -1) {
            dH = deltaY
        }
        if (dir.indexOf('l') > -1) {
            dX = deltaX
            dW = -deltaX
        }
        if (dir.indexOf('r') > -1) {
            dW = deltaX
        }

        return {width:dW/scale, height:dH/scale, x:dX/scale, y:dY/scale}
    }

    handleResizeStart(e, ui) {
        this.lastPos = {x:0, y:0};
    }

    handleResize(e, ui, dir) {
        const scale = this.props.scale;
        const deltaX = ui.x - this.lastPos.x;
        const deltaY = ui.y - this.lastPos.y;
        this.props.resizeShapes(this.getResizeDims(deltaX, deltaY, scale, dir));
        this.lastPos = {x:ui.x, y:ui.y};
    }

    handleResizeStop(e, ui, dir) {
        const scale = this.props.scale;
        const deltaX = ui.x - this.lastPos.x;
        const deltaY = ui.y - this.lastPos.y;
        this.props.resizeShapes(this.getResizeDims(deltaX, deltaY, scale, dir));
        this.lastPos = null;
    }

    handlePathChangeStart(e, ui, i) {
        this.lastPos = {x:0, y:0};
    }

    getChangedPath(dX, dY, i) {
        const scale = this.props.scale;
        let newPath = svgpath(this.path.toString())
        let segment = newPath.segments[i];

        if (segment[0] == 'V' && this.props.moveY != false) {
            segment[1] += dY / scale
        } else if (segment[0] == 'H' && this.props.moveX != false) {
            segment[2] += dX / scale
        } else {
            if (this.props.moveX != false) {
                segment[segment.length - 2] += dX / scale
            }
            if (this.props.moveY != false) {
                segment[segment.length - 1] += dY / scale
            }
        }

        newPath.segments[i] = segment

        this.path = newPath;

        return newPath.toString()
    }

    handlePathChange(e, ui, i) {
        const scale = this.props.scale;
        const deltaX = ui.x - this.lastPos.x;
        const deltaY = ui.y - this.lastPos.y;
        this.props.changePath(this.getChangedPath(deltaX, deltaY, i), this.props.uuid);
        this.lastPos = {x:ui.x, y:ui.y};

        // kludge to force update
        this.forceUpdate();
    }

    handlePathChangeStop(e, ui, i) {
        const scale = this.props.scale;
        const deltaX = ui.x - this.lastPos.x;
        const deltaY = ui.y - this.lastPos.y;
        this.props.changePath(this.getChangedPath(deltaX, deltaY, i), this.props.uuid);
        this.lastPos = null;

        // kludge to force update
        this.forceUpdate();
    }

    handleContextMenu(e) {
        e.preventDefault();
        this.props.contextMenuHandler(e, this.props.uuid)
    }

    handleClick(e) {
        this.doubleClickWindow = true;
        setTimeout(() => {
            this.doubleClickWindow = false
        }, 100)
    }

    handleDoubleClick(e) {
        if (this.doubleClickWindow) {
            this.props.clearSelectedShapes();
            this.props.addSelectedShape(this.props.uuid, false);
            this.props.toggleEdit(true)
        }
    }

    render() {
        const minX = this.props.minX ? this.props.minX : 25;
        const minY = this.props.minY ? this.props.minY : 25;
        const scale = this.props.scale;
        const height = this.props.dims.height;
        const width = this.props.dims.width;
        const dH = Math.max(this.props.deltaDims.height, -height + minY);
        const dW = Math.max(this.props.deltaDims.width, -width + minX);

        const visibility_style = {"visibility": this.props.toggled ? "visible" : "hidden"};
        const translate = `translate(${this.props.position.x*scale}, ${this.props.position.y*scale})`;
        const dObject = {dX:dW, dY:dH, scale:scale};

        const position = {x:0, y:0};

        const editActive = (this.props.editActive && this.props.toggled);

        let outline;
        if (this.props.lineOutline) {
            // Get points of path
            let posX, posY;

            const points = this.path.segments.map((s,i) => {
                if (i == 0) {
                    posX = s[1]
                    posY = s[2]
                } else if (s[0] != 'Z') {
                    if (s[0] == 'V') {
                        posY = s[1]
                    } else if (s[0] == 'H') {
                        posX = s[1]
                    } else {
                        posX = s[s.length - 2]
                        posY = s[s.length - 1]
                    }
                }

                return [posX, posY]
            })

            const outlinePath = svgpath(this.path.toString()).scale(scale).toString()

            outline = <g style={visibility_style} className="ignore">
                <path d={outlinePath} className="line-outline"></path>
                {
                    points.map((p,i) => {
                        return (
                            <Draggable onStart={(e,ui) => this.handlePathChangeStart(e,ui,i)} onDrag={(e,ui) => this.handlePathChange(e,ui,i)}
                                       onStop={(e,ui) => this.handlePathChangeStop(e,ui,i)} position={{x:0, y:0}} axis={"none"} key={i}>
                                <g>
                                    <circle cx={p[0]*scale} cy={p[1]*scale} r={this.outlineHandleSize}
                                            className="resizer-circle"/>
                                </g>
                            </Draggable>
                        )
                    })
                }
            </g>
        } else {
            outline = <g style={visibility_style} className="ignore">
                <rect x="0" y="0" height={(height + dH)*scale} width={(width + dW)*scale} className="shape-outline"/>
                {
                    ['tl','t','tr','r','br','b','bl','l'].map((dir,i) => {
                        let cx = (width + dW)*scale / 2;
                        let cy = (height + dH)*scale / 2;
                        if (dir.indexOf('t') > -1) {cy = 0};
                        if (dir.indexOf('b') > -1) {cy = (height + dH)*scale};
                        if (dir.indexOf('l') > -1) {cx = 0};
                        if (dir.indexOf('r') > -1) {cx = (width + dW)*scale};

                        return (
                            <Draggable onStart={this.handleResizeStart} onDrag={(e,ui) => this.handleResize(e,ui,dir)} onStop={(e,ui) => this.handleResizeStop(e,ui,dir)} position={{x:0, y:0}} axis={"none"} key={i}>
                                <g>
                                    <circle cx={cx} cy={cy} r={this.outlineHandleSize}
                                            className="resizer-circle"/>
                                </g>
                            </Draggable>
                        )
                    })
                }
            </g>
        }

        // TODO - fix crappy implementation of drag
        return (
            <g transform={translate}>
                <Draggable onStart={this.handleDragStart} onDrag={this.handleMove} onStop={this.handleDragStop} position={position} axis={"none"}>
                    <g onContextMenu={this.handleContextMenu} id={this.props.uuid} style={{...this.props.style, 'pointerEvents':"all"}} onClick={this.handleClick} onDoubleClick={this.handleDoubleClick}>
                        <Shape elements={this.props.elements} objectBBox={this.props.bbox} dObject={dObject} editActive={editActive}/>
                    </g>
                </Draggable>
                {outline}
            </g>
        )
    }
}

const mapStateToProps = ({ shapeCollection }) => ({
    selectedShapes:shapeCollection.present.selectedShapes,
    editActive:shapeCollection.present.editActive,
    layout:shapeCollection.present.layout
});

const mapDispatchToProps = {
    addSelectedShape: addSelectedShape,
    clearSelectedShapes: clearSelectedShapes,
    moveShapes: moveShapes,
    startMoveShapes: startMoveShapes,
    resizeShapes: resizeShapes,
    toggleEdit: toggleEdit,
    changePath: changePath
};

export default connect(mapStateToProps, mapDispatchToProps)(ShapeContainer)


