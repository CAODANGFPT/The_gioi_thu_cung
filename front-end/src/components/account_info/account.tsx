import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Upload, UploadFile, message } from "antd";
import { useState } from "react";
import "../../assets/scss/page/account.scss";
export const Account = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "Duy",
    email: "duytvph19916@fpt.edu.vn",
    address: "Nam Định",
    password: "12345",
  });
  const [image, setImage] = useState<string | undefined>();
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://res.cloudinary.com/dksgvucji/image/upload/v1699086188/duantotnghiep/ux6huuf7jf5ot4vqxvlj.jpg",
    },
  ]);
  const handleImageChange = (info: any) => {
    if (info.file.status === "uploading") {
      setLoading(true);
    } else if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      setImage(info.file.response.url);
      setLoading(false);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
      setLoading(false);
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Tải ảnh</div>
    </div>
  );
  return (
    <div>
      <div className="col_2-heading">
        <h4>Hồ sơ</h4>
      </div>
      <form action="" className="col_2-form">
        <div className="form-edit">
          <div className="account_name">
            <label>Name</label>
            <div className="col_2-input">
              <input
                type="text"
                id="password"
                className="col_2-input-password"
                value={data.password}
              />
            </div>
          </div>
          <div className="account_email">
            <label>Email</label>
            <div className="col_2-input">
              <input
                type="text"
                id="email"
                className="col_2-input-email"
                value={data.email}
              />
            </div>
          </div>
            
        </div>
        <div className="image">
          <Upload
            name="file"
            action="https://api.cloudinary.com/v1_1/dksgvucji/image/upload"
            data={{
              upload_preset: "wh3rdke8",
              cloud_name: "dksgvucji",
            }}
            listType="picture-circle"
            maxCount={1}
            fileList={fileList}
            showUploadList={true}
            className="ant-upload-wrapper ant-upload-select"
            onChange={handleImageChange}
          >
          </Upload>
        </div>
      </form>
    </div>
  );
};

export default Account;
