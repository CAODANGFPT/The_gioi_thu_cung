import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Col, Row, Statistic, Card } from "antd";
import "../../../assets/scss/admin/dashBoard.scss";
import { Bar, Line, Pie } from "@ant-design/charts";
import { useListQuery } from "../../../services/dashboard";

const barData: any[] = [
  { type: "tỉa lông", value: 10, color: "blue" },
  { type: "tắm", value: 35, color: "green" },
  { type: "nhuộm lông", value: 30, color: "red" },
  { type: "thuê phòng", value: 15, color: "pink" },
];
const pieData = [
  { type: "Thức ăn", value: 10 },
  { type: "đồ chơi ", value: 20 },
  { type: "quần áo", value: 30 },
];

const DashBoard = () => {
  const { data: listDashboard } = useListQuery();
  // console.log(data);

  // const lineData = [
  //   { type: "Tháng 1", value: 1000 },
  //   { type: "Tháng 2", value: 2020 },
  //   { type: "Tháng 3", value: 303 },
  //   { type: "Tháng 4", value: 3022 },
  //   { type: "Tháng 5", value: 4000 },
  //   { type: "Tháng 6", value: 7000 },
  //   { type: "Tháng 7", value: 2000 },
  //   { type: "Tháng 8", value: 3000 },
  //   { type: "Tháng 9", value: 5000 },
  //   { type: "Tháng 10", value: 4000 },
  //   { type: "Tháng 11", value: 6000 },
  //   { type: "Tháng 12", value: 1200 },
  // ];

  const lineData =
    listDashboard?.map((data) => ({
      type: `Tháng ${data?.month} / ${data?.year}`,
      total: data.total_revenue ? +data.total_revenue : 0,
    })) ?? [];

  const pieConfig = {
    data: pieData,
    angleField: "value",
    colorField: "type",
  };
  const barConfig: any = {
    data: barData,
    xField: "value",
    yField: "type",
    seriesField: "type",
    color: (datum: any, defaultColor: string) =>
      barData.find((item) => item.type === datum.type)?.color || defaultColor,
  };

  const lineConfig = {
    data: lineData,
    xField: "type",
    yField: "total",
    point: {
      size: 4,
      shape: "circle",
    },
    label: {
      style: {
        fill: "#aaa",
      },
    },
  };

  return (
    <div className="dashBoard">
      <div className="col-2">
        <Row gutter={36}>
          <Col span={24}>
            <Card bordered={false}>
              <Statistic
                title="Doanh số so với tháng trước"
                value={11.28}
                precision={2}
                valueStyle={{ color: "#3f8600" }}
                prefix={<ArrowUpOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
        </Row>
      </div>
      <div className="line">
        <h2>Bảng doanh số theo các thàng</h2>
        <Line {...lineConfig} />
      </div>

      <div className="sceen-dashBoard">
        <Row className="row-dashBoard" gutter={16}>
          <Col className="gutter-row" span={6}>
            <Card bordered={false}>
              <Statistic
                title="Trending tỉa lông xù"
                value={18.0}
                precision={2}
                valueStyle={{ color: "#3f8600" }}
                prefix={<ArrowUpOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
          <Col className="gutter-row" span={6}>
            <Card bordered={false}>
              <Statistic
                title="  nhuộm lông"
                value={15.3}
                precision={2}
                valueStyle={{ color: "#3f8600" }}
                prefix={<ArrowUpOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
          <Col className="gutter-row" span={6}>
            <Card bordered={false}>
              <Statistic
                title="dịnh vụ thuê phòng"
                value={8.0}
                precision={2}
                valueStyle={{ color: "#cf1322" }}
                prefix={<ArrowDownOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
          <Col className="gutter-row" span={6}>
            <Card bordered={false}>
              <Statistic
                title="dịch vụ tỉa lông"
                value={5.0}
                precision={2}
                valueStyle={{ color: "#cf1322" }}
                prefix={<ArrowDownOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
        </Row>
      </div>
      <div className="chart-flex">
        <div className="bar">
          <h2>biểu đồ dịch vụ </h2>
          <Bar {...barConfig} />
        </div>
        <div className="pie">
          <h2>biểu đồ sản phẩm</h2>
          <Pie {...pieConfig} />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
