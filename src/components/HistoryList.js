import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import moment from "moment";
const HistoryList = (props) => {
  const [data, setData] = useState({});
  const userId = props.match.params.id;
  useEffect(() => {
    axios
      .post("http://localhost:3001/posts/singleHistory", { userId: userId })
      .then((res) => {
        setData(res.data[0]);
      });
  }, []);

  return (
    <div className="historyList">
      <div className="history-container">
        <div className="sidebar">
          <Link to={"/home" + data.email}>Home</Link>
          <Link to="/history">History</Link>
        </div>
        <div className="history-listing">
          <header>History</header>
          <div className="history-card">
            <div className="history-list">{data.to}</div>
            <div className="history-list">{data.cc}</div>
            <div className="history-list">{data.sub}</div>
            <div className="history-list">{data.mailBody}</div>
            <div className="history-list">
              {moment(data.sentAt).format("DD/MM/YYYY")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryList;
