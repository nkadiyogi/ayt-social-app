import React from "react";
export default class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = { file: "", imagePreviewUrl: "" };
  }

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    console.log("handle uploading-", this.state.file);
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(file);
    this.props.fileInputChange({ file });
  }

  render() {
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (
        <img
          src={imagePreviewUrl}
          className="img-fluid"
          style={{
            borderRadius: "5%",
            width: "181px",
            height: "181px",
          }}
          alt="profile pic"
        />
      );
    } else {
      $imagePreview = (
        <div className="previewText"></div>
      );
    }

    return (
      <div className="previewComponent d-flex">
        <form onSubmit={(e) => this._handleSubmit(e)}>
          <input
            className="form-control"
            type="file"
            onChange={(e) => this._handleImageChange(e)}
          />
          {/* <button className="submitButton" 
              type="submit" 
              onClick={(e)=>this._handleSubmit(e)}>Upload Image</button> */}
        </form>
        <div className="imgPreview text-center w-100">{$imagePreview}</div>
      </div>
    );
  }
}
