/* --- COMPONENTS --- */
class Modal extends Component {
  onClose(){
    if(this.props.item.onClose){
      this.props.item.onClose();
      this.props.onClose(this.props.item);
    } else {
      this.props.onClose(this.props.item);
    }
  }
  onConfirm(){
    if(this.props.item.onConfirm){
      this.props.item.onConfirm();
      this.props.onClose(this.props.item);
    }
  }
  render() {
    const { zIndex } = this.props;
    const { type } = this.props.item;
    if (type === 'confirmation') {
      const { text } = this.props.item;
      return (
        <div className="modal-wrapper" style={{zIndex: (zIndex+1)*10}}>
          <div className="modal">
            <div className="text">{text}</div>
            <div className="buttons">
              <button className="modal-button" onClick={() => this.onConfirm()}>Confirm</button>
              <button className="modal-button" onClick={() => this.onClose()}>Close</button>
            </div>
          </div>
        </div>
      )
    } else if (type === 'custom') {
      const { content } = this.props.item;
      return (
        <div className="modal-wrapper" style={{zIndex: (zIndex+1)*10}}>
          <div className="modal">
            <button className="close" onClick={() => this.onClose()}>&times;</button>
            {content}
          </div>
        </div>
      )
    }
    return (
        <div></div>
    );
  }
}
class Modals extends Component {
  render() {
    const modals = this.props.modals.map((item,i) => <Modal item={item} key={i} zIndex={i} onClose={(item) => this.props.dispatch(closeModal(item))}/>)
    return (
      <div className="modals">
        {modals}
      </div>
    );
  }
}
const ModalContainer = connect(
	function mapStateToProps(state) {
		return {
			modals: state.modals
		};
	},
	function mapDispatchToProps(dispatch) {
		return {
			dispatch
		}
	}
)(Modals);


class CustomModalContent extends Component {
  render() {
    return (
      <div className="modal-content">Custom Modal Content</div>
    )
  }
}
class App extends Component {
  render() {
    return (
      <div className="App">
        <button className="test-button" onClick={() => this.props.dispatch(openModal({
          id: uuid.v4(),
          type: 'confirmation',
          text: 'Are you sure to do this?',
          onClose: () => console.log("fire at closing event"),
          onConfirm: () => console.log("fire at confirming event"),
        }))}>Open confirmation modal</button>

        <button className="test-button" onClick={() => this.props.dispatch(openModal({
          id: uuid.v4(),
          type: 'custom',
          content: <CustomModalContent />
        }))}>Open custom modal</button>

        <ModalContainer />
      </div>
    );
  }
}

const AppContainer = connect(
  null,
	function mapDispatchToProps(dispatch) {
    return {
      dispatch,
    }
	}
)(App);

