d3.contextMenu = function (menu, openCallback) {

	// create the div element that will hold the context menu
	d3.selectAll('.d3-context-menu').data([1])
		.enter()
		.append('div')
		.attr('class', 'd3-context-menu');

	// close menu
	d3.select('body').on('click.d3-context-menu', function() {
		d3.select('.d3-context-menu').style('display', 'none');
	});

	// this gets executed when a context menu event occurs
	return function(data, index) {
		var elm = this;

		d3.selectAll('.d3-context-menu').html('');
		var list = d3.selectAll('.d3-context-menu').append('ul');
		list.selectAll('li').data(menu).enter()
			.append('li')
			.html(function(d) {
				return d.title;
			})
			.on('click', function(d, i) {
				d.action(elm, data, index);
				d3.select('.d3-context-menu').style('display', 'none');
			});

		// the openCallback allows an action to fire before the menu is displayed
		// an example usage would be closing a tooltip
		if (openCallback) openCallback(data, index);

		// display context menu
		d3.select('.d3-context-menu')
			.style('left', (d3.event.pageX - 2) + 'px')
			.style('top', (d3.event.pageY - 2) + 'px')
			.style('display', 'block');

		d3.event.preventDefault();
	};
};

/*
window.onresize = function() {
    var bbox = d3.select('.draw-visual').node().getBoundingClientRect();
    d3.select("#draw-svg").attr("viewbox", "(0 0 " + bbox.width + " " + bbox.height + ")")
};
*/

class SimDraw {
    constructor() {
        this.elements = {};
        this.active_element = null;

        var self = this;
        d3.select(".diagram-space").on("click", function() {
            self.deactivate_element()
        })
    }

    add_element(type, id) {
        if (type == 'rect') {
            this.elements[id] = new Rect(type, id)
        } else if (type == 'circle') {
            this.elements[id] = new Circle(type, id)
        } else if (type == 'path') {
            this.elements[id] = new Path(type, id)
        }

        return this.elements[id]
    }

    get_element(id) {
        return this.elements[id]
    }

    activate_element(id) {
        this.active_element != null && this.elements[this.active_element].deactivate();
        this.elements[id].activate();
        this.active_element = id;
    }

    deactivate_element() {
        this.active_element != null && this.elements[this.active_element].deactivate();
        this.active_element = null;
    }

    delete_element(id) {

    }
}

class Element {
    constructor(type, id, pos, dims) {
        this.type = type;
        this.id = id;
        this.pos = pos;
        this.dims = dims;
        this.element_id = "element";
        this.style = {fill: "grey", stroke: "black", cursor: "move"};
        // Outline
        this.outline_id = "outline";
        this.outline_style = {fill: "none", stroke: "black", "stroke-width": "1px", "stroke-dasharray": "5,5"};
        this.outline_type = 'rect';
        this.outline_attr = {visibility: "hidden"};
        // Resizer
        this.resizer_id = "resizer";
        this.resizer_style = {fill: "red"};
        this.resizer_type = 'circle';
        this.resizer_attr = {r: 2, cursor: "se-resize", visibility: "hidden"};

        this.menu = [
            {
                title: 'Move Forward',
                action: function (elm, d, i) {
                    var next_sib = elm.parentNode.nextSibling;
                    if (next_sib != null) {
                        if (next_sib.nextSibling != null) {
                            elm.parentNode.parentNode.insertBefore(elm.parentNode, next_sib.nextSibling)
                        } else {
                            elm.parentNode.parentNode.appendChild(elm.parentNode)
                        }
                    }
                }
            },
            {
                title: 'Move Backwards',
                action: function (elm, d, i) {
                    var prev_sib = elm.parentNode.previousSibling;
                    if (prev_sib != null) {
                        elm.parentNode.parentNode.insertBefore(elm.parentNode, prev_sib)
                    }
                }
            }
        ];
    }

    initialize() {
        var g = d3.select(".diagram")
            .append("g")
            .datum(this.pos)
            .attr("transform", "translate(" + [ this.pos.x,this.pos.y ] + ") scale(1,1)")
            .attr("id", this.id);

        g.append(this.type)
            .attr("id", this.element_id)
            .styles(this.style)
            .call(this.drag_move)
            .on("click", function() {
                context.activate_element(this.parentNode.id)
            })
            .on("contextmenu", d3.contextMenu(this.menu));

        g.append(this.outline_type)
            .attr("id", this.outline_id)
            .styles(this.outline_style)
            .attrs(this.outline_attr);

        g.append(this.resizer_type)
            .attrs(this.resizer_attr)
            .attr("id", this.resizer_id)
            .styles(this.resizer_style)
            .call(this.drag_resize);

        this.render(this.dims)
    }

    render(dims) {
        var g = d3.select("#" + this.id);
        var datum = g.datum();
        for (var attr in dims) {datum[attr] = dims[attr]};
        g.datum(datum);

        var outline = g.select("#" + this.outline_id);
        var element = g.select("#" + this.element_id);
        var resizer = g.select("#" + this.resizer_id);

        this.set_outline(outline);
        this.set_element(element);
        this.set_resizer(resizer);
    }

    move(event) {
        var g = d3.select("#" + this.id);
        var datum = g.datum();
        datum.x += event.x;
        datum.y += event.y;
        g.datum(datum)
            .attr("transform", function(d,i){
                return "translate(" + [ d.x,d.y ] + ")";
            });
    }

    activate() {
        var g = d3.select("#" + this.id);
        g.select("#" + this.outline_id).attr("visibility","visible");
        g.selectAll("#" + this.resizer_id).each(function() {d3.select(this).attr("visibility","visible")})
    }

    deactivate() {
        var g = d3.select("#" + this.id);
        g.select("#" + this.outline_id).attr("visibility","hidden");
        g.selectAll("#" + this.resizer_id).each(function() {d3.select(this).attr("visibility","hidden")})
    }
}

class Rect extends Element {
    constructor(type, id) {
        var default_pos = {x:0, y:0};
        var default_dims = {width:50, height:50, margin:5};
        super(type, id, default_pos, default_dims);

        this.drag_move = d3.drag()
            .subject(function() {return {x:0, y:0}})
            .on("drag", function() {
                context.get_element(this.parentNode.id).move(d3.event)
            });
        this.drag_resize = d3.drag()
            .on("drag", function(d) {
                context.get_element(this.parentNode.id)
                    .render({height:Math.max(1,d3.event.y - 2*d.margin), width:Math.max(1,d3.event.x - 2*d.margin)})
            });

        this.initialize();
    }

    set_element(element) {
        element.attr("x", function(d) {return d.margin})
            .attr("y", function(d) {return d.margin})
            .attr("height", function(d) {return d.height})
            .attr("width", function(d) {return d.width})
    }

    set_outline(outline) {
        outline.attr("height", function(d) {return d.height + 2*d.margin})
            .attr("width", function(d) {return d.width + 2*d.margin})
    }

    set_resizer(resizer) {
        resizer.attr("cx", function(d) {return d.width + 2*d.margin})
            .attr("cy", function(d) {return d.height + 2*d.margin})
    }
}

class Circle extends Element {
    constructor(type, id) {
        var default_pos = {x: 0, y: 0};
        var default_dims = {r: 25, margin: 5};
        super(type, id, default_pos, default_dims);

        this.drag_move = d3.drag()
            .subject(function() {return {x:0, y:0}})
            .on("drag", function() {
                context.get_element(this.parentNode.id).move(d3.event)
            });

        this.drag_resize = d3.drag()
            .on("drag", function(d) {
                var datum = d3.select("#" + this.parentNode.id).datum();
                context.get_element(this.parentNode.id)
                    .render({r:Math.max(Math.min(d3.event.x/2,d3.event.y/2) - datum.margin,1), margin:datum.margin})
            });

        this.initialize()
    }

    set_element(element) {
        element.attr("r", function(d) {return d.r})
            .attr("cx", function(d) {return d.r + d.margin})
            .attr("cy", function(d) {return d.r + d.margin})
    }

    set_resizer(resizer) {
        resizer.attr("cx", function(d) {return 2*(d.r + d.margin)})
            .attr("cy", function(d) {return 2*(d.r + d.margin)})
    }

    set_outline(outline) {
        outline.attr("height", function(d) {return 2*d.r + 2*d.margin})
            .attr("width", function(d) {return 2*d.r + 2*d.margin})
    }
}

class Path extends Element {
    constructor(type, id) {
        var default_pos = {x: 0, y: 0};
        var default_dims = {
            path: [{x: 0, y: 0}, {x: 50, y: 0}],
            "x-range": [0, 50],
            "y-range": [0, 0],
            margin: 5
        };
        super(type, id, default_pos, default_dims);

        this.drag_move = d3.drag()
            .subject(function() {return {x:0, y:0}})
            .on("drag", function() {
                context.get_element(this.parentNode.id).move(d3.event)
            });

        this.drag_resize = d3.drag()
            .on("drag", function(d,i) {
                var d_path = d3.select("#" + this.parentNode.id).datum().path;
                d_path[i].x = d3.event.x;
                d_path[i].y = d3.event.y;
                context.get_element(this.parentNode.id)
                    .render({path:d_path,
                             "x-range":[d3.min(d_path, function(d) {return d.x}), d3.max(d_path, function(d) {return d.x})],
                             "y-range":[d3.min(d_path, function(d) {return d.y}), d3.max(d_path, function(d) {return d.y})]})
            });


        this.line_function = d3.line()
            .x(function(d) {return d.x})
            .y(function(d) {return d.y})
            .curve(d3.curveLinear);

        this.initialize()
    }

    set_element(element) {
        var line_function = d3.line()
            .x(function(d) {return d.x})
            .y(function(d) {return d.y})
            .curve(d3.curveLinear);

        element.attr("d", function(d) {return line_function(d.path) + "Z"});
    }

    set_outline(outline) {
        outline.attr("height", function(d) {return d["y-range"][1] - d["y-range"][0] + 2*d.margin})
            .attr("width", function(d) {return d["x-range"][1] - d["x-range"][0] + 2*d.margin})
            .attr("x", function(d) {return d["x-range"][0] - d.margin})
            .attr("y", function(d) {return d["y-range"][0] - d.margin})
    }

    set_resizer(resizer) {
        parent = d3.select(resizer.node().parentNode);
        parent.selectAll("#" + this.resizer_id)
            .data(parent.datum().path)
            .attr("cx", function(d) {return d.x})
            .attr("cy", function(d) {return d.y})
            .enter()
            .append(this.resizer_type)
            .attr("cx", function(d) {return d.x})
            .attr("cy", function(d) {return d.y})
            .attr("id", this.resizer_id)
            .attrs(this.resizer_attr)
            .styles(this.resizer_style)
            .call(this.drag_resize)
    }
}

// Add shape to drawing
d3.selectAll(".shape-item").on("click", function() {
    var element_type = this.id;
    context.add_element(element_type, guid());
});

// using jQuery
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});

context = null;
$(document).ready(function() {
    context = new SimDraw();
    $("#data-upload-btn").on("click", function() {
        $("#data-upload-modal").modal("toggle")
    });
    $(function () {
        $('#fileupload').fileupload({
            dataType: 'json',
            done: function (e, response) {
                $(".pre-upload").css("visibility", "hidden");
                $(".post-upload").css("visibility", "visible");
                var container = $("#data-table").get()[0];
                var hot = new Handsontable(container, {
                    data: response.result.data,
                    rowHeaders: true,
                });
                hot.updateSettings({
                    contextMenu: {
                        callback: function (key, options) {
                            if (key === 'header_add') {
                                row = hot.getSelected()[0]
                            }
                        },
                        items: {
                            "header_add": {
                                name: 'Add to header',
                                disabled: function () {
                                    // if first row, disable this option
                                    return hot.getSelected()[0] === 0;
                                }
                            }
                        }
                    },
                    cells: function (row, col, prop) {
                        var cellProperties = {};

                        if (row > 0) {
                            cellProperties.readOnly = true;
                        }

                        return cellProperties;
                    }
                })
            },
            progressall: function (e, data) {
                var progress = parseInt(data.loaded / data.total * 100, 10);
                $('#progress .bar').css(
                    'width',
                    progress + '%'
                );
            }
        })
    });
});

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return "s" + s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}


