import React, { Component } from 'react'
import { Button, Icon, Menu, Grid, Segment, Sidebar, Modal, Message, Popup, Input, Form, Table, Header } from 'semantic-ui-react'
import Dropzone from 'react-dropzone'
import { connect } from 'react-redux'
import request from 'superagent'
import 'superagent-django-csrf'

import { setData, clearData } from '../actions/index.jsx'

//import Handsontable from 'handsontable/dist/handsontable.full'

class ImportDataModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstModalOpen:false,
            secondModalOpen:false,
            data:null,
            //hot:null,
            xSeriesIndex:this.props.xSeriesIndex ? this.props.xSeriesIndex : 0
        };

        this.onDrop = this.onDrop.bind(this);
        this.openFirstModal = this.openFirstModal.bind(this);
        this.openSecondModal = this.openSecondModal.bind(this);
        this.close = this.close.bind(this);
        this.addData = this.addData.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleErase = this.handleErase.bind(this);
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
        if (this.state.data) {
            this.setState({
                firstModalOpen:true,
                secondModalOpen:true
            })
        } else {
            this.setState({
                firstModalOpen:true
            })
        }
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
        });
    }

    addData(data) {
        this.setState({
            data:data
        })
    }

    handleClick(index) {
        this.setState({xSeriesIndex:index})
    }

    handleErase() {
        this.props.clearData();
        this.setState({
            data:null,
            xSeriesIndex:0,
            secondModalOpen:false,
            firstModalOpen:true
        })
    }

    render() {
        const {firstModalOpen, secondModalOpen, data} = this.state;

        //let secondModalContent = <div id="hot-container"></div>;
        let secondModalContent = null;
        //var self = this;
        if (this.state.data) {
            const selectedHeader = "XAxis";
            const nonSelectedHeader = "YData";
            const selectedCellClass = "selected-cell";
            const nonSelectedCellClass = "non-selected-cell";
            const rowLen = this.state.data[0].length;

            secondModalContent = (
                <div id="data-table">
                    <Table celled>
                        <Table.Header>
                            <Table.Row textAlign="center">
                                <Table.HeaderCell></Table.HeaderCell>
                                {
                                    this.state.data[0].map((e, i) => {
                                        return <Table.HeaderCell key={i}><Button className="xaxis-btn" onClick={() => this.handleClick(i)}>{i == this.state.xSeriesIndex ? selectedHeader : nonSelectedHeader}</Button></Table.HeaderCell>
                                    })
                                }
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {
                                this.state.data.map((row, i) => {
                                    let rowDescription;
                                    if (i == 0) {
                                        rowDescription = "Data";
                                    } else if (i == 1) {
                                        rowDescription = "Min Val";
                                    } else if (i == 2) {
                                        rowDescription = "Max Val";
                                    }

                                    return (
                                        <Table.Row key={i}>
                                            <Table.Cell><Header>{rowDescription}</Header></Table.Cell>
                                            {row.map((e, j) => {
                                                return (
                                                    <Table.Cell key={j} active={j == this.state.xSeriesIndex}>{e}</Table.Cell>
                                                )
                                            })}
                                        </Table.Row>
                                    )
                                })
                            }
                        </Table.Body>
                    </Table>
                </div>
            )



            /*
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
            */
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
                <Modal.Content>
                    <Modal.Description>
                        <Dropzone onDrop={this.onDrop} multiple={false} className="dropzone">
                            <div className="dropzone-area">Try dropping some files here, or click to select files to upload.</div>
                        </Dropzone>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Modal dimmer={false} open={secondModalOpen} onOpen={this.openSecondModal} size='small'>
                        <Modal.Header>Data Manipulation<Button icon floated="right" onClick={this.handleErase}><Icon name='erase' /></Button></Modal.Header>
                        <Modal.Content>
                            <Message>
                                <Message.Header>
                                    We did our best to import your data as intended.  Select the column that represents your X-Series Data.
                                </Message.Header>
                            </Message>
                            {secondModalContent}
                        </Modal.Content>
                        <Modal.Actions>
                            <Button content='All Done' onClick={() => this.close(this.state.data)} />
                        </Modal.Actions>
                    </Modal>
                </Modal.Actions>
            </Modal>
        )
    }
}

const mapStateToProps = ({ shapeCollection }) => ({
    xSeriesIndex:shapeCollection.present.xSeriesIndex,
});

const mapDispatchToProps = {
    setData:setData,
    clearData:clearData
};

export default connect(mapStateToProps, mapDispatchToProps)(ImportDataModal)
