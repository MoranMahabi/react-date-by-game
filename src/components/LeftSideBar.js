import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import '../style/sideMenu.css';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

class LeftSideBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            collapsed: false,
            activeGames: [],
            incomingGames: [],
            chats: []
        };

        this.getActiveGames();
        this.getIncomingGames();
        this.getChats();
    }

    componentWillUnmount() {
        if (this.timeoutId1) {
            clearTimeout(this.timeoutId1);
        }

        if (this.timeoutId2) {
            clearTimeout(this.timeoutId2);
        }

        if (this.timeoutId3) {
            clearTimeout(this.timeoutId3);
        }

        this.isCancelled = true;
    }

    getChats = () => {
        return fetch(`http://localhost:3000/dashboard/chats/${this.props.uid}`, { method: 'GET' })
            .then((response) => {
                if (!response.ok) {
                    throw response;
                }
                this.timeoutId3 = setTimeout(this.getChats, 200);
                return response.json();
            })
            .then(res => {
                if (!this.isCancelled) {
                    this.setState(() => ({ chats: res }));
                }
            })
            .catch(err => { throw err });
    }

    getIncomingGames = () => {
        return fetch(`http://localhost:3000/dashboard/incomingGames/${this.props.uid}`, { method: 'GET' })
            .then((response) => {
                if (!response.ok) {
                    throw response;
                }
                this.timeoutId1 = setTimeout(this.getIncomingGames, 200);
                return response.json();
            })
            .then(res => {
                if (!this.isCancelled) {
                    this.setState(() => ({ incomingGames: res }));
                }
            })
            .catch(err => { throw err });
    }

    getActiveGames = () => {
        return fetch(`http://localhost:3000/dashboard/activeGames/${this.props.uid}`, { method: 'GET' })
            .then((response) => {
                if (!response.ok) {
                    throw response;
                }
                this.timeoutId2 = setTimeout(this.getActiveGames, 200);
                return response.json();
            })
            .then(res => {
                if (!this.isCancelled) {
                    this.setState(() => ({ activeGames: res }));
                }
            })
            .catch(err => { throw err });
    }

    renderActiveGames() {
        return this.state.activeGames.map((item, i) => {
            let gameURL;
            let nameOfGame;
            if (item.type === 1) {
                gameURL = 'triviaGame';
                nameOfGame = 'Trivia';
            } else if (item.type === 2) {
                gameURL = 'concentrationGame';
                nameOfGame = 'Concentration';
            } else if (item.type === 3) {
                gameURL = 'truthLieGame';
                nameOfGame = 'Truth/Lie';
            }

            return (
                <Menu.Item key={item._id}>
                    <Link to={`/dashboard/${gameURL}/${item._id}/${this.props.uid}`} className="nav-text">
                        <span>
                            <img style={{ width: 70, height: 70 }} src={`http://localhost:3000/${item.image}`} alt="..." />
                        </span>
                        <span style={{ width: 70, height: 70 }}>
                            {item.name} {" "} {item.age} {" "} {nameOfGame}
                        </span>
                    </Link>
                </Menu.Item>
            )
        })
    }

    renderChats() {
        return this.state.chats.map((item, i) => {
            return (
                <Menu.Item key={item._id} >
                    <Link to={`/dashboard/chat/${item._id}/${this.props.uid}`} className="nav-text">
                        <span>
                            <img style={{ width: 70, height: 70 }} src={`http://localhost:3000/${item.image}`} alt="..." />
                        </span>
                        <span style={{ width: 70, height: 70 }}>
                            {item.name} {" "} {item.age}
                        </span>
                    </Link>
                </Menu.Item>
            )
        })
    }





    renderIncomingGames() {
        return this.state.incomingGames.map((item, i) => {
            let nameOfGame;
            if (item.type === 1) {
                nameOfGame = 'Trivia';
            } else if (item.type === 2) {
                nameOfGame = 'Concentration';
            } else if (item.type === 3) {
                nameOfGame = 'Truth/Lie';
            }
            return (
                <Menu.Item key={item._id}>
                    <div>
                        <span>
                            <img style={{ width: 50, height: 50 }} src={`http://localhost:3000/${item.imageHost}`} alt="..." />
                        </span>
                        <span style={{ width: 50, height: 50 }}>
                            {item.nameHost} {" "} {item.ageHost} {" "} {nameOfGame}
                        </span>
                    </div>
                    <div >
                        <button onClick={(e) => { this.declinedGame(item._id, item.type) }} className="btn btn-primary myBtn"> Decline </button>
                        <button onClick={(e) => { this.approvedGame(item._id, item.type) }} className="btn btn-primary myBtn"> Approve </button>
                    </div>
                </Menu.Item >
            )
        })
    }


    declinedGame(id, type) {
        fetch(`http://localhost:3000/dashboard/declinedGame/${id}/${type}`, { method: 'GET' })
            .then((response) => {
                if (!response.ok) {
                    throw response;
                }
            })
            .catch(err => { throw err });
    }

    approvedGame(id, type) {
        fetch(`http://localhost:3000/dashboard/approvedGame/${id}/${type}`, { method: 'GET' })
            .then((response) => {
                if (!response.ok) {
                    throw response;
                }
            })
            .catch(err => { throw err });
    }

    onCollapse = (collapsed) => {
        this.setState({ collapsed });
    }

    render() {
        return (
            <Sider
                collapsible
                collapsed={this.state.collapsed}
                onCollapse={this.onCollapse}
                className={(!this.state.collapsed) ? "cc" : ""}
            >
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <SubMenu
                        key="sub1"
                        title={<span><Icon type="user" /><span>Chats</span></span>}
                    >
                        {this.renderChats()}
                    </SubMenu>
                    <SubMenu
                        key="sub2"
                        title={<span><Icon type="user" /><span>Available Games</span></span>}
                    >
                        {this.renderActiveGames()}
                    </SubMenu>
                    <SubMenu
                        key="sub3"
                        title={<span><Icon type="user" /><span>Incoming Games </span></span>}
                    >
                        {this.renderIncomingGames()}
                    </SubMenu>
                </Menu>
            </Sider>
        );
    }
}

const mapStateToProps = (state) => ({
    uid: state.auth.uid,
});

export default connect(mapStateToProps)(LeftSideBar);






