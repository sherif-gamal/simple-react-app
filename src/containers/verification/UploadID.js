import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Header,
  Form,
  Button,
  Grid,
  Icon,
  Radio,
  Image
} from "semantic-ui-react";
import { connect } from "react-redux";
import Dropzone from "react-dropzone";
import Verified from "../../components/Verified";
import Pending from "../../components/Pending";
import LoadingSection from "../../components/LoadingSection";
import { UPLOAD_ID } from "../../constants";
import passportImage from "../../images/passport.jpg";

class UploadID extends Component {
  static propTypes = {
    uploadId: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);

    this.state = { docType: "id", submitDisabled: true };
  }

  handleChange = (e, { value }) => this.setState({ docType: value });

  uploadPassport = ({ target: { files } }) => {
    this.setState({ passport: files[0] });
  };

  uploadIDBack = ({ target: { files } }) => {
    this.setState({ idBack: files[0] });
  };

  uploadIDFront = ({ target: { files } }) => {
    this.setState({ idFront: files[0] });
  };

  doUpload = () => {
    const { docType, idFront, idBack, passport } = this.state;
    if (docType === "id") {
      this.props.uploadId(idFront, idBack);
    } else {
      this.props.uploadId(passport);
    }
  };

  render() {
    const {
      docType,
      passport,
      idFront,
      idBack,
      passportPreview,
      frontPreview,
      backPreview
    } = this.state;
    const { user, idSending } = this.props;

    const submitDisabled =
      (docType === "id" && !(idFront && idBack)) ||
      (docType === "passport" && !passport);

    let component;
    switch (user.idVerification) {
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
                <Form.Group inline>
                  <Form.Field>
                    <Radio
                      label="ID Card/Driver's licence"
                      name="radioGroup"
                      value="id"
                      checked={docType === "id"}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Radio
                      label="Passport"
                      name="radioGroup"
                      value="passport"
                      checked={docType === "passport"}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                </Form.Group>
                {docType === "passport" ? (
                  <div className="center-content">
                    <Dropzone
                      accept="image/*,application/pdf"
                      onDrop={accepted => {
                        this.setState({
                          passport: accepted[0],
                          passportPreview: accepted[0].preview
                        });
                      }}
                    >
                      <Image
                        style={{ height: "100%", width: "100%" }}
                        src={passportPreview || passportImage}
                      />
                    </Dropzone>
                  </div>
                ) : (
                  <Grid columns="2" style={{ margin: "auto" }}>
                    <Grid.Column style={{ width: "200px" }}>
                      <Dropzone
                        accept="image/*,application/pdf"
                        onDrop={accepted => {
                          this.setState({
                            idBack: accepted[0],
                            backPreview: accepted[0].preview
                          });
                        }}
                      >
                        <Image
                          style={{ height: "100%", width: "100%" }}
                          src={backPreview || passportImage}
                        />
                      </Dropzone>
                    </Grid.Column>
                    <Grid.Column style={{ width: "200px" }}>
                      <Dropzone
                        accept="image/*,application/pdf"
                        onDrop={accepted => {
                          this.setState({
                            idFront: accepted[0],
                            frontPreview: accepted[0].preview
                          });
                        }}
                      >
                        <Image
                          style={{ height: "100%", width: "100%" }}
                          src={frontPreview || passportImage}
                        />
                      </Dropzone>
                    </Grid.Column>
                  </Grid>
                )}
                <Button
                  disabled={submitDisabled}
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
        <LoadingSection active={this.props.idSending}>
          <Header as="h3">
            <Icon name="id card" />
            <Header.Content>
              Identity verification
              <Header.Subheader>
                Please upload your ID card, driver licence or passport so we can
                verify your identity.
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
  idSending: state.ui.idSending
});
const mapDispatchToProps = dispatch => ({
  uploadId: (...files) =>
    dispatch({
      type: UPLOAD_ID,
      payload: files
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadID);
