import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import { Router, Route, Switch } from 'react-router-dom';
import ProfilesPage from '../components/ProfilesPage';
import MyProfilePage from '../components/MyProfilePage';
import IncomingGames from '../components/IncomingGames';
import TriviaGame from '../components/TriviaGame'
import NotFoundPage from '../components/NotFoundPage';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogutProfile } from '../actions/auth';
import { history } from '../routers/AppRouter';



const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
    }

    onLogout = () => {
        this.props.startLogutProfile();
    };

    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <IncomingGames> </IncomingGames>
                <Layout>
                    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['2']}
                            style={{ lineHeight: '64px' }}
                        >
                            <Menu.Item key="1">Home</Menu.Item>
                            <Menu.Item key="2">
                                <Link to="/dashboard/profiles" className="nav-text">Profiles</Link>
                            </Menu.Item>

                            <Menu.Item key="3">
                                <Link to="/dashboard/my-profile" className="nav-text">My Profile</Link>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <button onClick={this.onLogout}>Logout</button>
                            </Menu.Item>
                        </Menu>
                    </Header>
                    <Content style={{ padding: '0 50px', marginTop: 64 }}>
                        <Router history={history}>
                            <div>
                                <Switch>
                                    <Route path="/dashboard" component={ProfilesPage} exact={true} />
                                    <Route path="/dashboard/profiles" component={ProfilesPage} />
                                    <Route path="/dashboard/my-profile" component={MyProfilePage} />
                                    <Route path="/dashboard/game/:id/:uid" component={TriviaGame} />
                                    <Route component={NotFoundPage} />
                                </Switch>
                            </div>
                        </Router>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Ant Design ©2018 Created by Ant UED
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






// <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>Content</div>