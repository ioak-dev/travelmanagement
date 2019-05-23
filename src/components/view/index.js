import React from 'react'
import Wizard from '../../components/wizard';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchView, reloadView, removeItem } from '../../actions/viewActions';
import { fetchLoggedUser, reloadLoggedUser } from '../../actions/userActions';
import { reloadWizard } from '../../actions/wizardActions';
import { Paper, TableHead, TableBody, Table, TableCell, TableRow, Grid, Hidden, Card, CardContent, Typography, IconButton, CardActions } from '@material-ui/core';
import moment from 'moment';

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
  });

class ViewRequests extends React.Component {
    constructor(props) {
        super(props);
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
        this.props.fetchLoggedUser();
        this.props.fetchView();
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.view);
        if (this.props.loggedUser.id !== nextProps.loggedUser.id) {
            this.props.reloadView(this.props.type, nextProps.loggedUser.id);
        }
    }

    delete(requestId) {
        this.props.removeItem(this.props.type, this.props.loggedUser.id, requestId);
    }

    edit(requestId) {
        this.props.reloadWizard(requestId, this.props.loggedUser.id);
        this.props.history.push('/createrequest');
    }


    render() {
        return (
            <div>
                <br /><br /><br />
                <Grid container direction="row" justify="center" alignItems="center"  spacing={8}>
                <Hidden smDown>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={10}>
                        <Paper className={styles.root}>
                            <Table className={styles.table}>
                                <TableHead>
                                <TableRow>
                                    <TableCell>Request ID</TableCell>
                                    {this.props.type === 'REVIEWER' && <TableCell align="center">Applicant</TableCell>}
                                    <TableCell align="center">Type</TableCell>
                                    <TableCell align="center">Client Name</TableCell>
                                    <TableCell align="center">Travel Date</TableCell>
                                    <TableCell align="center">Status</TableCell>
                                    <TableCell align="center">Submitted On</TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {this.props.view.map(row => (
                                    <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        {row.id}
                                    </TableCell>
                                    {this.props.type === 'REVIEWER' && <TableCell align="center">{row.applicant}</TableCell>}
                                    <TableCell align="center">{row.traveltype.type}</TableCell>
                                    <TableCell align="center">{row.clientinfo.name}</TableCell>
                                    <TableCell align="center">{moment(row.flightdetails.fromdate).format('YYYY-MM-DD')}</TableCell>
                                    <TableCell align="center">{row.status.description}</TableCell>
                                    <TableCell align="center">{moment(row.submittedOn).format('YYYY-MM-DD')}</TableCell>
                                    <TableCell align="center">
                                        {this.props.type === 'APPLICANT' && row.status.name === 'DRAFT' && 
                                            <div>
                                                <IconButton size="small" onClick={() => this.edit(row.id)}><i className="material-icons">edit</i></IconButton>
                                                <IconButton size="small" onClick={() => this.delete(row.id)}><i className="material-icons">delete</i></IconButton>
                                            </div>}
                                        {this.props.type === 'APPLICANT' && row.status.name !== 'DRAFT' && 
                                            <div>
                                                <IconButton size="small" onClick={() => this.edit(row.id)}><i className="material-icons">visibility</i></IconButton>
                                            </div>}
                                        {this.props.type === 'REVIEWER' && row.status.name === 'ADMIN_APPROVED' &&
                                            <div>
                                                <IconButton size="small" onClick={() => this.edit(row.id)}><i className="material-icons">playlist_add_check</i></IconButton>
                                            </div>}
                                        {this.props.type === 'REVIEWER' && row.status.name === 'COMPLETE' &&
                                            <div>
                                                <IconButton size="small" onClick={() => this.edit(row.id)}><i className="material-icons">visibility</i></IconButton>
                                            </div>}
                                        {this.props.type === 'REVIEWER' && (row.status.name === 'L1' || row.status.name === 'L2' || row.status.name === 'ADMIN') &&
                                            <div>
                                                <IconButton size="small" onClick={() => this.edit(row.id)}><i className="material-icons">call_split</i></IconButton>
                                            </div>}
                                    </TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </Paper>
                        </Grid>
                        <Grid item xs={1}></Grid>
                    </Hidden>

                    <Hidden smUp>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={10}>
                            {this.props.view.map(row => (
                                <div key={row.id}>
                                    <Card>
                                        <CardContent>
                                            <Typography color="textSecondary" gutterBottom>
                                            {row.id} {row.status.description}
                                            </Typography>
                                            <Typography variant="h5" component="h2">
                                            Client: {row.clientinfo.name}
                                            </Typography>
                                            <i className="material-icons">flight_takeoff</i>
                                            <Typography>
                                                {row.flightdetails.sector1} ({moment(row.flightdetails.fromdate).format('YYYY-MM-DD')})
                                            </Typography>
                                            <Typography>
                                                {row.flightdetails.sector2} ({moment(row.flightdetails.todate).format('YYYY-MM-DD')})
                                            </Typography>

                                            <i className="material-icons">hotel</i>
                                            <Typography>
                                                {row.hoteldetails.name}
                                            </Typography>
                                            <Typography>
                                                {moment(row.hoteldetails.fromdate).format('YYYY-MM-DD')} to {moment(row.hoteldetails.todate).format('YYYY-MM-DD')}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <IconButton size="small" onClick={() => this.edit(row.id)}><i className="material-icons">edit</i></IconButton>
                                            <IconButton size="small" onClick={() => this.delete(row.id)}><i className="material-icons">delete</i></IconButton>
                                        </CardActions>
                                    </Card>
                                    <br />
                                </div>
                            ))}

                        </Grid>
                        <Grid item xs={1}></Grid>
                    </Hidden>
                </Grid>
            </div>
            // <Wizard id="1556632582773" />
        );
    }
}


Wizard.protoTypes = {
    fetchView: PropTypes.func.isRequired,
    reloadView: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
    view: state.view.view,
    loggedUser: state.user.loggedUser
})

export default connect( mapStateToProps, { fetchView, reloadView, removeItem, fetchLoggedUser, reloadLoggedUser, reloadWizard } )(ViewRequests)