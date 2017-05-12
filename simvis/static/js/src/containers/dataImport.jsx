import React, { Component } from 'react'
import { Button, Icon, Menu, Grid, Segment, Sidebar, Modal, Message, Popup, Input, Form } from 'semantic-ui-react'
import Dropzone from 'react-dropzone'
import { connect } from 'react-redux'
import request from 'superagent'
import 'superagent-django-csrf'

import { setData } from '../actions'

import Handsontable from 'handsontable/dist/handsontable.full'

class ImportDataModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstModalOpen:false,
            secondModalOpen:false,
            data:null,
            hot:null,
            xSeriesIndex:0
        };

        this.onDrop = this.onDrop.bind(this);
        this.openFirstModal = this.openFirstModal.bind(this);
        this.openSecondModal = this.openSecondModal.bind(this);
        this.close = this.close.bind(this);
        this.addData = this.addData.bind(this);
    }

    onDrop(files) {
        let data = new FormData();
        data.append('file', files[0], files[0].name);

        let addData = this.addData;

        const req = request.post('data-upload')
            .send(data)
            .end(function(err, res) {
                // TODO - error catching
                addData(res.body.data)
            });

        this.openSecondModal()
    }

    openFirstModal() {
        this.setState({
            firstModalOpen:true
        })
    }

    openSecondModal() {
        this.setState({
            secondModalOpen:true
        })
    }

    close(data) {
        if (data) {
            this.props.setData(data.slice(1), data[0], this.state.xSeriesIndex)
        }

        this.setState({
            secondModalOpen:false,
            firstModalOpen:false,
            data:null
        });
    }

    addData(data) {
        this.setState({
            data:data
        })
    }

    render() {
        const {firstModalOpen, secondModalOpen, data} = this.state;

        let secondModalContent = <div id="hot-container"></div>;
        var self = this;
        if (this.state.data) {
            if (!this.state.hot) {
                const container = document.getElementById('hot-container');
                this.state.hot = new Handsontable(container, {
                    data:data,
                    rowHeaders: true,
                    colHeaders: (col) => {
                        return "<button id=\"colIndex\" value=\"" + col + "\">" + col + "</button>";
                    },
                    stretchH: "all",
                    contextMenu: {
                        callback: function (key, options) {
                            if (key === 'header_add') {
                                var selected_row = self.state.hot.getSelected()[0];
                                var header = self.state.hot.getDataAtRow(0);
                                var header_add = self.state.hot.getDataAtRow(selected_row);
                                header = header.map(function(e, i) {
                                    return header_add[i] != "" ? e + ", " + header_add[i] : e
                                });

                                self.state.hot.alter('remove_row', selected_row);
                                header.map(function(e, i) {
                                    self.state.hot.setDataAtCell(0, i, e)
                                });
                            }
                        },
                        items: {
                            "header_add": {
                                name: 'Add to header',
                                disabled: function () {
                                    // if first row, disable this option
                                    return self.state.hot.getSelected()[0] === 0;
                                }
                            }
                        }
                    },
                    cells: function (row, col, prop) {
                        var cellProperties = {};

                        if (row > 0) {
                            cellProperties.readOnly = true;
                        }

                        if (col == self.state.xSeriesIndex) {
                            this.renderer = function(instance, td) {
                                Handsontable.renderers.TextRenderer.apply(this, arguments);
                                td.style.backgroundColor = 'green';
                            }
                        } else {
                            this.renderer = function(instance, td) {
                                Handsontable.renderers.TextRenderer.apply(this, arguments);
                                td.style.backgroundColor = null;
                            }
                        }

                        return cellProperties;
                    }
                });

                Handsontable.Dom.addEvent(container, 'click', function (event) {
                    if (event.target.id == 'colIndex') {
                        self.setState({
                            xSeriesIndex:event.target.value
                        });
                        self.state.hot.render();
                    }
                })
            }
        }

        let trigger;
        if (this.props.asForm) {
            trigger = <Button onClick={this.openFirstModal}>Import Data</Button>
        } else {
            trigger = <Menu.Item onClick={this.openFirstModal}>Import or Edit Data</Menu.Item>
        }

        return (
            <Modal trigger={trigger} size='small' open={firstModalOpen} onClose={() => this.close(null)}>
                <Modal.Header>Import Data</Modal.Header>
                <Modal.Content image>
                    <Modal.Description>
                        <Dropzone onDrop={this.onDrop} multiple={false} className="dropzone">
                            <div className="dropzone-area">Try dropping some files here, or click to select files to upload.</div>
                        </Dropzone>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Modal dimmer={false} open={secondModalOpen} onOpen={this.openSecondModal} size='small'>
                        <Modal.Header>Data Manipulation</Modal.Header>
                        <Modal.Content>
                            <Message>
                                <Message.Header>
                                    We did our best to import your data as intended.  Adjust the column names of your data if desired.
                                </Message.Header>
                                <p>
                                    Hint: right-click a row to add it to the header columns as text
                                </p>
                            </Message>
                            {secondModalContent}
                        </Modal.Content>
                        <Modal.Actions>
                            <Button content='All Done' onClick={() => this.close(this.state.hot.getData())} />
                        </Modal.Actions>
                    </Modal>
                </Modal.Actions>
            </Modal>
        )
    }
}

const mapStateToProps = ({ shapeCollection }) => ({});

const mapDispatchToProps = {
    setData:setData
};

export default connect(mapStateToProps, mapDispatchToProps)(ImportDataModal)
