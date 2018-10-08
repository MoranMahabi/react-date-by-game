import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import coverCardImage from '../../../project/src/images/profile.png';
import '../style/sideMenu.css';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class IncomingGames extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            collapsed: false,
            activeGames: [],
            incomingGames: []
        };

        this.getActiveGames();
        this.getIncomingGames();
    }

    componentWillUnmount() {
        if (this.timeoutId1) {
            clearTimeout(this.timeoutId1);
        }

        if (this.timeoutId2) {
            clearTimeout(this.timeoutId2);
        }

        this.isCancelled = true;
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
        console.log(JSON.stringify("active games data: ", this.state.activeGames));
        return this.state.activeGames.map((item, i) => {
            return (
                <Menu.Item key={item._id}>
                    <Link to={`/dashboard/game/${item._id}/${this.props.uid}`} className="nav-text">
                        <div>bbbbb</div>
                        {item.nameHost}
                        ccccc   
                        <div><img alt={coverCardImage} /*style={{ width: '100%' }}*/ src={null} /></div>
                    </Link>
                </Menu.Item>
            )
        })
    }


    renderIncomingGames() {
        return this.state.incomingGames.map((item, i) => {
            return (
                <Menu.Item key={item._id}>
                    <div> {item.nameHost}
                        <button onClick={(e) => { this.declinedGame(item._id) }} className="btn btn-primary myBtn"> Decline </button>
                        <button onClick={(e) => { this.approvedGame(item._id) }} className="btn btn-primary myBtn"> Approve </button>
                    </div>
                </Menu.Item>
            )
        })
    }


    declinedGame(id) {
        fetch(`http://localhost:3000/dashboard/declinedGame/${id}`, { method: 'GET' })
            .then((response) => {
                if (!response.ok) {
                    throw response;
                }
            })
            .catch(err => { throw err });
    }

    approvedGame(id) {
        fetch(`http://localhost:3000/dashboard/approvedGame/${id}`, { method: 'GET' })
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
            >
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <SubMenu
                        key="sub1"
                        title={<span><Icon type="user" /><span>Chats</span></span>}
                    >
                        <Menu.Item key="1">Dan</Menu.Item>
                        <Menu.Item key="2">Bill</Menu.Item>
                        <Menu.Item key="3">Alex</Menu.Item>
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

export default connect(mapStateToProps)(IncomingGames);






