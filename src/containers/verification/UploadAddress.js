import React, { Component } from "react";
import PropTypes from "prop-types";
import { Header, Form, Image, Button, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import Dropzone from "react-dropzone";
import Verified from "../../components/Verified";
import Pending from "../../components/Pending";
import LoadingSection from "../../components/LoadingSection";
import { UPLOAD_ADDRESS } from "../../constants";
import passportImage from "../../images/passport.jpg";

class UploadAddress extends Component {
  static propTypes = {};
  static propTypes = {
    uploadAddress: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);

    this.state = {};
  }

  doUpload = () => {
    this.props.uploadAddress(this.state.doc);
  };

  render() {
    const { doc, docPreview } = this.state;
    const { user, addressSending } = this.props;

    let component;
    switch (user.addressVerification) {
      case "V":
        component = <Verified />;
        break;
      case "P":
        component = <Pending />;
        break;
      default:
        component = (
          <div className="ui one column stackable center aligned page grid">
            <div className="column twelve wide">
              <Form encType="multipart/form-data">
                <div className="center-content">
                  <Dropzone
                    accept="image/*,application/pdf"
                    onDrop={accepted => {
                      this.setState({
                        doc: accepted[0],
                        docPreview: accepted[0].preview
                      });
                    }}
                  >
                    <Image
                      style={{ height: "100%", width: "100%" }}
                      src={docPreview || passportImage}
                    />
                  </Dropzone>
                </div>
                <Button
                  disabled={!doc}
                  floated="right"
                  primary
                  onClick={this.doUpload}
                >
                  Upload
                </Button>
              </Form>
            </div>
          </div>
        );
    }
    return (
      <div>
        <LoadingSection active={addressSending}>
          <Header as="h3">
            <Icon name="home" />
            <Header.Content>
              Address Verification
              <Header.Subheader>
                Please upload a bank statement or a utility bill for us to
                verify your address.
              </Header.Subheader>
            </Header.Content>
          </Header>
          {component}
        </LoadingSection>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  addressSending: state.ui.addressSending
});
const mapDispatchToProps = dispatch => ({
  uploadAddress: doc =>
    dispatch({
      type: UPLOAD_ADDRESS,
      payload: doc
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadAddress);
