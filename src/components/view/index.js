import React from 'react'
import Wizard from '../../components/wizard';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchView, reloadView } from '../../actions/viewActions';
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
                    <Grid item xs={2}></Grid>
                    <Grid item xs={8}>
                        <Paper className={styles.root}>
                            <Table className={styles.table}>
                                <TableHead>
                                <TableRow>
                                    <TableCell>Request ID</TableCell>
                                    <TableCell align="center">Travel type</TableCell>
                                    <TableCell align="center">Client Name</TableCell>
                                    <TableCell align="center">Status</TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {this.props.view.map(row => (
                                    <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        {row.id}
                                    </TableCell>
                                    <TableCell align="center">{row.traveltype.type}</TableCell>
                                    <TableCell align="center">{row.clientinfo.name}</TableCell>
                                    <TableCell align="center">{row.status.description}</TableCell>
                                    <TableCell align="center">
                                        {row.status.name === 'DRAFT' && <IconButton size="small" onClick={() => this.edit(row.id)}><i className="material-icons">edit</i></IconButton>}
                                        {row.status.name === 'DRAFT' && <IconButton size="small"><i className="material-icons">delete</i></IconButton>}
                                        {row.status.name !== 'DRAFT' && <IconButton size="small" onClick={() => this.edit(row.id)}><i className="material-icons">search</i></IconButton>}
                                    </TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </Paper>
                        </Grid>
                        <Grid item xs={2}></Grid>
                    </Hidden>

                    <Hidden smUp>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={8}>
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
                                            <IconButton size="small"><i className="material-icons">delete</i></IconButton>
                                        </CardActions>
                                    </Card>
                                    <br />
                                </div>
                            ))}

                        </Grid>
                        <Grid item xs={2}></Grid>
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

export default connect( mapStateToProps, { fetchView, reloadView, fetchLoggedUser, reloadLoggedUser, reloadWizard } )(ViewRequests)