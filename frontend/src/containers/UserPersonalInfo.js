import {Fragment, useState} from "react";
import {CopyToClipboard} from "react-copy-to-clipboard";
import moment from "moment/moment";
import {Link, useNavigate} from "react-router-dom";
import {delete_user, logout} from "../actions/auth"
import {connect} from "react-redux";

const UserPersonalInfo = ({user,
                              loading,
                              delete_user,
                              logout
                          }) => {


    // a simple feature for copying I'd
    const [copied, setCopied] = useState({
        value: '',
        copy: false
    })

    // Delete user with djoser endpoint

    const [formData, setFormData] = useState({
        current_password: ""
    })

    const {current_password} = formData

    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    })

    // after deleting user account then navigate to Home page
    const navigate = useNavigate();

    const onSubmit = e => {
        e.preventDefault();
        delete_user(current_password, navigate)
    }

    // user info like name, email id etc

    const userInfo = () => {
        return (
            <Fragment>
                <div className="container ">
                    <div className="row">

                        <div className="offset-md-1 col-md-9 col-12">

                            <div className="card mb-4">

                                <h2 className="card-header text-center">
                                    My info
                                </h2>

                                <ul className="list-group">

                                    <li className="list-group-item">
                                        <strong className="me-2">
                                            Name:
                                        </strong>
                                        <span>
                            {user && true && true ?
                                user.username : <Fragment></Fragment>
                            }
                        </span>
                                    </li>


                                    {/*3. Email */}

                                    <li className="list-group-item">
                                        <strong className="me-2">Email: </strong>
                                        {/*{user.email}*/}
                                        {
                                            user && true && true ?
                                                user.email : <Fragment></Fragment>
                                        }

                                    </li>

                                    {/*3. User Id */}

                                    <li className="list-group-item">
                                        <strong className="me-2">My Id: </strong>

                                        <span>
                                            {userId}

                                            <CopyToClipboard text={userId}
                                                             onCopy={() => setCopied({copy: true})}>

                                                <button type="button" className="btn btn-link btn-sm"
                                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                                        title="Copy to Clipboard"
                                                    // style={styleForCopy}
                                                >
                                    <i className="fa-regular fa-copy"></i>
                                </button>

                            </CopyToClipboard>
                                            {copied.copy ?
                                                <span style={{color: 'green'}}>
                                                    <i className="fa-solid fa-circle-check"/> copied</span>
                                                : null
                                            }
                                        </span>

                                    </li>

                                    {/* 4. Date joined*/}

                                    <li className="list-group-item">
                                        <strong className="me-2">Date Joined: </strong>
                                        {/*{user.email}*/}
                                        {
                                            user && true && true ?
                                                // by do this can add hours & mints too "MMMM Do, YYYY, h:mm"
                                                moment(user.date_joined).format("MMMM Do, YYYY")
                                                :
                                                <Fragment></Fragment>
                                        }
                                    </li>
                                </ul>

                            </div>

                            {/* Change email, logout & delete account btn */}

                            {/*<Link to={'/reset-email'}*/}
                            {/*    // onClick={() => reset_email()}*/}
                            {/*      className="btn btn-primary m-2">*/}
                            {/*    Change email*/}
                            {/*</Link>*/}

                            <button onClick={() => logout()} className="btn btn-secondary m-2">
                                Logout
                            </button>

                            {deleteUserAccountModal}

                            <button data-bs-toggle="modal" data-bs-target="#deleteModal"
                                    id="#deleteModal" className="btn btn-danger m-2">
                                Delete
                            </button>

                        </div>
                    </div>
                </div>

            </Fragment>
        );
    };


    //  Delete user account popup modal
    const deleteUserAccountModal = (
        <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">

                    <div className="modal-header">
                        {/*{#    <h4 class="modal-title" id="exampleModalLabel">Logout</h4>#}*/}
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
                    </div>

                    {/* show only when user is login */}

                    <div className="modal-body mb-0 pb-1">
                        <h4>Do you want to delete account?</h4>
                        <p className="small">
                            Note: This action can't be undone.
                        </p>
                    </div>

                    <form onSubmit={e => onSubmit(e)}>

                        {/*  Password */}

                        <div className="offset-1 col-10 mb-2 pb-2">

                            <label htmlFor="validatePassword" className="form-label">
                                Current Password
                            </label>

                            <input type="password"
                                   className="form-control"
                                   id="validatePassword"
                                   name='current_password'
                                   value={current_password}
                                   onChange={e => onChange(e)}
                                   required
                            />

                        </div>

                        <div className="modal-footer">

                            <button type="button" className="btn btn-outline-secondary"
                                    data-bs-dismiss="modal"> Cancel
                            </button>

                            {loading ?
                                (
                                    <button className="btn btn-danger" data-bs-dismiss="modal" type="button" disabled>
                                        <span className="spinner-border spinner-border-sm" role="status"
                                              aria-hidden="true"/> Deleting...
                                    </button>
                                )
                                :
                                (
                                    <button
                                        // onClick={() => delete_user(current_password)}
                                        type="submit"
                                        data-bs-dismiss="modal"
                                        className="btn btn-danger">
                                        Yes, Delete
                                    </button>
                                )
                            }

                        </div>

                    </form>

                </div>
            </div>
        </div>
    )

    const userId = (
        user && true && true ?
            user.id : <Fragment></Fragment>
    )

    return (
        userInfo()
    )

}

const mapStateToProps = state => ({

    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    loading: state.auth.loading,
});

export default connect(mapStateToProps, {
    logout,
    delete_user
})(UserPersonalInfo)