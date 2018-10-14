import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import { Router, Route, Switch } from 'react-router-dom';
import ProfilesPage from '../components/ProfilesPage';
import MyProfilePage from '../components/MyProfilePage';
import LeftSideBar from '../components/LeftSideBar';
import TriviaGame from '../components/TriviaGame';
import ConcentrationGame from '../components/ConcentrationGame';
import TurthLieGame from '../components/TruthLieGame';
import Chat from '../components/Chat';
import NotFoundPage from '../components/NotFoundPage';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogutProfile } from '../actions/auth';
import { history } from '../routers/AppRouter';
import '../style/topMenu.css';


const { Header, Content, Footer } = Layout;

class Dashboard extends React.Component {

    onLogout = () => {
        this.props.startLogutProfile();
    };

    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <LeftSideBar> </LeftSideBar>
                <Layout>
                    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['2']}
                            style={{ lineHeight: '64px' }}
                        >
                            <Menu.Item key="2">
                                <Link to="/dashboard/profiles" className="nav-text">Profiles</Link>
                            </Menu.Item>

                            <Menu.Item key="3">
                                <Link to="/dashboard/my-profile" className="nav-text">My Profile</Link>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <button style={{height : 64, float : 'right', backgroundColor : "#ef6a8a" }} onClick={this.onLogout}>Logout</button>
                            </Menu.Item>
                        </Menu>
                    </Header>
                    <Content style={{ padding: '0 50px', marginTop: 64 }}>
                        <Router history={history}>
                            <div style={{ background: '#fff', padding: 24, minHeight: 380 }} >
                                <Switch>
                                    <Route path="/dashboard" component={ProfilesPage} exact={true} />
                                    <Route path="/dashboard/profiles" component={ProfilesPage} />
                                    <Route path="/dashboard/my-profile" component={MyProfilePage} />
                                    <Route path="/dashboard/triviaGame/:id/:uid" component={TriviaGame} />
                                    <Route path="/dashboard/concentrationGame/:id/:uid" component={ConcentrationGame} />
                                    <Route path="/dashboard/truthLieGame/:id/:uid" component={TurthLieGame} />
                                    <Route path="/dashboard/chat/:id/:uid" component={Chat} />
                                    <Route component={NotFoundPage} />
                                </Switch>
                            </div>
                        </Router>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Date By Game ©2018 Created by Moran Mahabi, Oz Benaim, Dan Nechushtan
                    </Footer>
                </Layout>
            </Layout >
        );
    }

}

const mapDispatchToProps = (dispatch) => ({
    startLogutProfile: () => dispatch(startLogutProfile())
});

const mapStateToProps = (state) => ({
    uid: state.auth.uid,
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);